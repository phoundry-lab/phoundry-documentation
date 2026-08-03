---
title: "Recover plugin settings and data"
description: "Distinguishes corrupt configuration, key-value state, database state, and instance state and uses the narrowest recoverable reset."
ai_disclosure: true
order: 5
---

# Recover plugin settings and data

First identify which persistence contract owns the bad value. Plugin settings,
key-value storage, database tables, and panel or tab instance state have
different lifecycles. Clearing one does not repair another, and deleting all
plugin data destroys evidence that a narrow migration could have preserved.

## Identify the affected layer

| Visible symptom | Likely owner | Least destructive first action | Expected result |
| --- | --- | --- | --- |
| One user preference has an impossible value, or the settings interface fails | `api.settings` | Reset the plugin's settings to defaults | Declared defaults render and the plugin can read every setting |
| One cache, cursor, onboarding flag, or small saved document is malformed | `api.storage` | Delete or replace only the known key | The plugin recreates that value without affecting unrelated state |
| One record, index, or migration-dependent feature fails | `api.database` | Repair or remove the affected rows through the plugin's declared tables | Queries succeed while unrelated records remain |
| One restored panel or center tab fails, but a new instance works | Module instance state | Close the affected instance and reopen it with default state | A fresh instance works without changing settings or durable plugin data |
| Every persisted layer is known to be unrecoverable | Multiple plugin-owned stores | Uninstall and choose the explicit delete-data option | A clean reinstall starts with no prior plugin-owned data |

Before resetting anything, capture the visible error, plugin version, and a
privacy-reviewed description of the bad value's shape. That information is
often enough to write a migration rather than ask every user to reset.

## Reset plugin settings

Settings are user configuration declared by [PluginSettingsSchema](../../reference/sdk-type-reference/PluginSettingsSchema.md). Open the
plugin's Settings page and choose **Reset to defaults**. This replaces its
settings with the current schema defaults; it does not clear key-value storage,
database tables, or panel and tab state.

If the reset restores the plugin, harden the next release:

- treat loaded values as untrusted;
- validate type and allowed range before use;
- supply a default for fields introduced by newer releases;
- migrate renamed or structurally changed values; and
- render the settings interface even when one stored field is invalid.

Do not use a settings reset to clear caches or records. Those values should not
be stored as user configuration.

## Recover one key-value value

For a known corrupt storage key, ship a narrow recovery action or migration:

```ts
type SavedCursor = {
	version: 2;
	updatedAt: string;
};

async function readCursor(api: PluginAPI): Promise<SavedCursor | null> {
	const value = await api.storage.get<unknown>("sync-cursor");

	if (
		typeof value === "object" &&
		value !== null &&
		(value as { version?: unknown }).version === 2 &&
		typeof (value as { updatedAt?: unknown }).updatedAt === "string"
	) {
		return value as SavedCursor;
	}

	await api.storage.delete("sync-cursor");
	return null;
}
```

The plugin should recreate a missing cursor during the next successful
synchronization. Use `api.storage.clear()` only when every key belongs to one
reconstructible cache and the user has confirmed the scope. Never clear storage
as an automatic response to an unrelated activation or rendering error.

## Repair database state through declared tables

Database recovery should be expressed as a versioned migration or a targeted
query. Prefer:

1. a read that identifies the affected records;
2. a parameterized update that normalizes recoverable values;
3. a targeted delete for records that can be reconstructed; and
4. only then, a user-confirmed reset of the plugin database.

For example, remove only incomplete derived records:

```ts
const removed = await api.database.deleteFrom(
	"analysis_results",
	"status = ? AND source_hash IS NULL",
	["building"],
);

api.notify.info(`Removed ${removed} incomplete analysis records`);
```

Keep all table access inside the names declared by [PluginDatabaseSchema](../../reference/sdk-type-reference/PluginDatabaseSchema.md).
Do not tell users to edit a shared database file, rename tables, or run
unreviewed SQL outside the plugin. If records are valuable, add an export or
backup path before destructive migration.

## Recover one panel or tab instance

Panel and center-tab instance state is durable, serializable presentation state.
Treat restored values as versioned unknown input and normalize them before the
component uses them:

```ts
function readState(value: unknown): ReviewState {
	const saved =
		typeof value === "object" && value !== null ?
			(value as Partial<ReviewState>)
		:	{};

	return {
		documentPath:
			typeof saved.documentPath === "string" ?
				saved.documentPath
			:	null,
		mode: saved.mode === "compare" ? "compare" : "read",
	};
}
```

If one restored instance is already unusable, close that panel or tab and open
a fresh instance. If all restored instances fail after an update, add a
normalizer or provider migration so a prior state version maps to current
defaults. Do not clear plugin settings or database data to repair an instance
state shape.

## Use full deletion only as a last resort

Uninstalling a plugin normally offers to keep its data. Choose the delete-data
option only after confirming that settings, storage, and database data are all
disposable or separately backed up. The action cannot be undone.

After reinstalling, verify the original workflow before importing or
reconstructing data. If a clean install still fails, persisted data was not the
cause; return to loading, capability, interface, or permission diagnosis.

Recovery is complete when the smallest affected layer is valid, unrelated
plugin state remains intact, and the current release can read both fresh and
previously supported data shapes.
