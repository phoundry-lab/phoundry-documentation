---
title: "Migrate plugin settings and data"
description: "Versions durable plugin-owned state, performs idempotent forward migration, preserves recoverability, and avoids relying on host-internal storage shapes."
ai_disclosure: true
order: 3
---

# Migrate plugin settings and data

Version every durable plugin-owned format and migrate it forward before the updated plugin begins normal work.

A plugin update preserves settings, key-value storage, and database data under the stable plugin ID. Phials does not infer how an older value maps to a new plugin model.

## Establish migration rules

Use these rules for every migration:

- Move forward one version at a time.
- Make every step safe to retry.
- Validate stored values as `unknown`.
- Write the new version marker only after the step succeeds.
- Do not start providers, timers, or background work until migration finishes.
- Block activation when required data cannot be migrated safely.
- Keep enough original information to recover or retry.
- Never depend on Phials filenames, physical table names, or storage serialization.

Do not use the plugin release version as the data version. A patch can leave data unchanged, and one release can migrate several independent formats.

## Migrate settings and key-value storage

Keep a migration version in plugin storage:

```typescript
const STATE_VERSION_KEY = "migration:owned-state";
const CURRENT_STATE_VERSION = 2;

function normalizeStateVersion(value: unknown): number {
  if (value === null) return 0;
  if (
    typeof value !== "number" ||
    !Number.isInteger(value) ||
    value < 0
  ) {
    throw new Error("Cannot migrate plugin data: invalid state version");
  }
  return value;
}

async function migrateOwnedState(api: PluginAPI): Promise<void> {
  const storedVersion = await api.storage.get<unknown>(STATE_VERSION_KEY);
  let version = normalizeStateVersion(storedVersion);

  if (version < 1) {
    const legacyRefresh = api.settings.get<string>("refreshMode");
    if (legacyRefresh === "hourly") {
      await api.settings.set("refreshIntervalMinutes", 60);
    }

    await api.storage.set(STATE_VERSION_KEY, 1);
    version = 1;
  }

  if (version < 2) {
    const stored = await api.storage.get<unknown>("recent-folders");

    if (isRecentFoldersV1(stored)) {
      await api.storage.set("recent-folders", {
        version: 2,
        items: stored.paths.map((path) => ({ path, lastOpenedAt: null })),
      });
    } else if (stored !== null && !isRecentFoldersV2(stored)) {
      throw new Error("Cannot migrate recent folders: invalid stored value");
    }

    await api.storage.set(STATE_VERSION_KEY, 2);
    version = 2;
  }

  if (version !== CURRENT_STATE_VERSION) {
    throw new Error(`Unsupported plugin data version: ${version}`);
  }
}
```

Validate the legacy shape:

```typescript
interface RecentFoldersV1 {
  version: 1;
  paths: string[];
}

interface RecentFoldersV2 {
  version: 2;
  items: Array<{ path: string; lastOpenedAt: string | null }>;
}

function isRecentFoldersV1(value: unknown): value is RecentFoldersV1 {
  if (!value || typeof value !== "object") return false;
  const candidate = value as { version?: unknown; paths?: unknown };
  return (
    candidate.version === 1 &&
    Array.isArray(candidate.paths) &&
    candidate.paths.every((path) => typeof path === "string")
  );
}

function isRecentFoldersV2(value: unknown): value is RecentFoldersV2 {
  if (!value || typeof value !== "object") return false;
  const candidate = value as { version?: unknown; items?: unknown };
  return (
    candidate.version === 2 &&
    Array.isArray(candidate.items) &&
    candidate.items.every((item) => {
      if (!item || typeof item !== "object") return false;
      const entry = item as {
        path?: unknown;
        lastOpenedAt?: unknown;
      };
      return (
        typeof entry.path === "string" &&
        (entry.lastOpenedAt === null ||
          typeof entry.lastOpenedAt === "string")
      );
    })
  );
}
```

If interruption occurs after writing the transformed value but before its marker, the step sees the version-2 value on retry and leaves it unchanged before advancing the marker.

Changing a settings schema does not erase old stored keys. Read a retired key only inside its migration, write the replacement key deliberately, then stop using the retired key. Keep the old value when it is useful for recovery; remove it only through a supported, tested settings migration operation.

## Declare database migrations

The database schema owns a monotonic version and ordered forward migrations:

```typescript
export const reportDatabase: PluginDatabaseSchema = {
  version: 2,
  tables: [
    {
      name: "reports",
      columns: [
        { name: "id", type: "INTEGER", primaryKey: true },
        { name: "title", type: "TEXT", notNull: true },
        {
          name: "archived",
          type: "INTEGER",
          notNull: true,
          default: 0,
        },
      ],
    },
  ],
  migrations: [
    {
      from: 1,
      to: 2,
      async up(transaction) {
        await transaction.schema.addColumn("reports", {
          name: "archived",
          type: "INTEGER",
          notNull: true,
          default: 0,
        });
      },
    },
  ],
};
```

On a new installation, Phials creates the latest declared schema and records version 2. On an existing version-1 database, it runs the `1 → 2` migration in a transaction, records version 2 only after success, and then continues activation.

Migration steps receive a plugin-scoped transaction. Use its structured
`schema` operations and parameterized logical-table `query` / `execute`
methods. Never issue raw DDL or construct a physical table name.

Use one migration step for one durable transition. Keep old columns or tables until the new representation and recovery path have been verified in a published release. Remove them only in a later, separately tested migration.

## Run application-data migration before use

Migrate settings and key-value storage at the beginning of activation:

```typescript
export default function createPlugin(): PhialsPlugin {
  return {
    id: "acme.reports",
    name: "Reports",
    version: "2.0.0",
    database: reportDatabase,
    async onActivate(api) {
      await migrateOwnedState(api);
      await startReportServices(api);
    },
    providers: [],
  };
}
```

Phials prepares and migrates the declared database before `onActivate`. If database preparation or `migrateOwnedState()` fails, activation fails and no plugin capabilities become available.

Keep component factories and command handlers from reading durable state before this sequence completes.

## Plan recovery and downgrade behavior

A forward migration does not imply downgrade support. State one of these outcomes in release notes:

- the previous plugin release can still read the migrated data
- the migration is reversible through a tested export or backup
- downgrade is unsupported after migration

For a consequential migration, create a plugin-owned backup or export before changing the primary data. Verify that it can restore the previous supported format. Do not promise recovery from an untested copy.

Never attempt to reverse a completed migration merely because updated release artifacts roll back after an activation failure. Artifact rollback and durable-data rollback are separate operations.

## Test every starting point

Test:

1. a clean installation with no prior data
2. the immediately previous public data version
3. the oldest directly supported data version
4. each intermediate migration step
5. interruption before and after each version marker
6. malformed and partially missing values
7. database constraint or disk-write failure
8. plugin restart after successful migration
9. reinstall after uninstall with data retention
10. the documented recovery or downgrade path

Use [Store plugin data](../../work-with-phials/store-plugin-data/index.md) for the persistence contracts and [Handle plugin data lifecycle and removal](../../work-with-phials/store-plugin-data/handle-plugin-data-lifecycle-and-removal.md) for update and uninstall boundaries.
