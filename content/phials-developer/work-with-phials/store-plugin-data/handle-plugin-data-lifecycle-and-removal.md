---
title: "Handle plugin data lifecycle and removal"
description: "Distinguishes durable data from runtime state and explains activation, deactivation, reload, uninstall, retention, and user-directed removal boundaries."
ai_disclosure: true
order: 5
---

# Handle plugin data lifecycle and removal

Treat plugin settings, key-value storage, and database rows as durable user data. Deactivation releases runtime resources; it does not erase durable state.

## Understand each lifecycle boundary

| Boundary | Durable data behavior |
| --- | --- |
| Activation | Settings load and the declared database schema is prepared before `onActivate` |
| Deactivation or disable | Settings, storage, and database data remain |
| Plugin reload | Durable data remains; explicit reload state may also pass between hooks |
| Phials restart | Durable data remains and is available on the next activation |
| Plugin update | Data remains under the stable plugin ID; the new version can run forward migrations before use |
| Uninstall with retention | Release files are removed; settings, storage, and database data remain for recovery or reinstall |
| Uninstall with data removal | Release files and all plugin-owned settings, storage, and database data are removed |

Installation, enablement, loading, and activation are separate states. A retained database can exist even while the plugin is not installed or enabled.

## Keep deactivation cleanup narrow

Use `onDeactivate` to stop runtime work:

```typescript
let pluginApi: PluginAPI | undefined;
let stopBackgroundWork: (() => void) | undefined;

export default function createPlugin(): PhialsPlugin {
	return {
		id: "example.indexer",
		name: "Indexer",
		version: "1.0.0",
		database: indexDatabase,
		onActivate(api) {
			pluginApi = api;
			stopBackgroundWork = startBackgroundWork(api);
		},
		onDeactivate() {
			stopBackgroundWork?.();
			stopBackgroundWork = undefined;
			pluginApi = undefined;
		},
		providers: [],
	};
}
```

Stop timers, abort pending work, release component references, and unsubscribe explicit listeners. Do not call `api.storage.clear()`, delete database rows, or reset settings merely because the plugin is disabled or reloaded.

## Preserve one stable namespace

The plugin ID owns the settings, storage, and database namespace. Keep it unchanged across releases. Changing the ID creates a new plugin identity with a separate data namespace; the new plugin does not automatically inherit the old plugin’s data.

Keep durable formats versioned and migrate forward:

- add a version field to structured key-value documents
- keep table and column identifiers stable
- make migration steps idempotent
- write the new version marker only after the migration succeeds
- retain enough information to retry an interrupted migration

See [Migrate plugin settings and data](../../package-and-publish/maintain-a-published-plugin/migrate-plugin-settings-and-data.md) for the release workflow.

## Offer narrow reset actions

When a feature needs its own reset, remove only the data the action names:

```typescript
async function clearCompletedTasks(
	database: PluginDatabaseAPI,
	listId: number,
): Promise<number> {
	return database.deleteFrom(
		"tasks",
		"list_id = ? AND completed = ?",
		[listId, 1],
	);
}
```

For a complete plugin-data reset, confirm the consequence immediately before the action, then clear each plugin-owned application-data store:

```typescript
async function clearApplicationData(api: PluginAPI): Promise<void> {
	await api.database.deleteFrom("tasks", "1 = 1");
	await api.database.deleteFrom("lists", "1 = 1");
	await api.storage.clear();
}
```

Delete dependent rows before parent rows. Settings have their own schema-backed reset in Phials Settings and are not cleared by `api.storage.clear()`.

Use [Confirm consequential actions](../show-dialogs-and-notifications/confirm-consequential-actions.md) when a user-triggered action cannot be undone.

## Respect uninstall retention

During uninstall, the user chooses whether to retain or remove plugin data:

- **Retain data** removes the installed plugin but keeps settings, key-value data, and database tables. Reinstalling the same plugin ID can recover them.
- **Remove data** deletes settings, key-value storage, and every database
  object durably tracked for the plugin, including objects from an older or
  currently unloadable release.

Phials stages release-file removal before requested data cleanup. A failed
cleanup restores the installed release files and reports the failure instead of
claiming that uninstall completed.

Do not work around retention by deleting data in `onDeactivate`; that hook also runs for disable and reload. Do not infer that missing release files mean data has been erased.

Before publishing an update, test:

1. activation with no existing data
2. activation with the previous release’s data
3. disable and re-enable
4. plugin reload and full Phials restart
5. an interrupted and retried migration
6. uninstall with retention followed by reinstall
7. uninstall with user-directed data removal

Recovery guidance is covered in [Recover plugin settings and data](../../test-and-troubleshoot/debug-plugin-failures/recover-plugin-settings-and-data.md).
