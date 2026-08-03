---
title: "Read and update plugin settings"
description: "Uses api.settings, reacts to effective values, persists changes, and recovers malformed durable values safely."
ai_disclosure: true
order: 2
---

# Read and update plugin settings

Use the plugin-scoped `api.settings` object for user choices declared in the
plugin settings schema. Phials loads settings before `onActivate`.

## Read effective values

`get()` and `getAll()` return values valid under the active schema. When a
durable value is missing or malformed, the declared default is returned:

```typescript
const SETTINGS = {
	enabled: "enabled",
	refreshMinutes: "refreshMinutes",
} as const;

function currentPreferences(settings: PluginSettings) {
	return {
		enabled: settings.get<boolean>(SETTINGS.enabled),
		refreshMinutes: settings.get<number>(SETTINGS.refreshMinutes),
	};
}
```

`getAll()` returns an immutable snapshot. Do not mutate it; use `set`, `unset`,
or `reset`.

## Persist before starting dependent work

`set()` validates against the schema and persists before publishing the new
effective snapshot:

```typescript
async function changeRefreshInterval(
	settings: PluginSettings,
	next: number,
): Promise<void> {
	try {
		await settings.set(SETTINGS.refreshMinutes, next);
		restartReportSchedule(next);
	} catch (error) {
		showSaveError(error);
	}
}
```

If persistence fails, readers and subscribers continue to observe the previous
value. Validate custom-interface input as well so the user receives an immediate
field-level message.

## Subscribe without a UI framework

Use `onChange()` for services and non-Svelte consumers:

```typescript
function watchPreferences(settings: PluginSettings) {
	applyPreferences(settings.getAll());
	return settings.onChange(() => {
		applyPreferences(settings.getAll());
	});
}
```

The returned subscription has `unsubscribe()`. Each callback receives an
immutable `{ key, value }` record after persistence succeeds. Custom settings
components receive this same reactive [PluginSettings](../../reference/sdk-type-reference/PluginSettings.md) object and can derive
directly from `get()` or `getAll()`.

## Recover malformed or retired values

`getStored(key)` bypasses effective-value validation for explicit migration and
recovery only:

```typescript
const retired = api.settings.getStored("oldRefreshSeconds");
if (typeof retired === "number" && Number.isFinite(retired)) {
	await api.settings.set(
		SETTINGS.refreshMinutes,
		Math.max(5, retired / 60),
	);
	await api.settings.unset("oldRefreshSeconds");
}
```

Malformed durable values remain recoverable until explicitly replaced or
removed. Do not use `getStored()` for normal feature behavior.

## Reset one field or all fields

- `unset(key)` removes one durable value and reveals its schema default.
- `reset()` removes every durable settings value and reveals all defaults.

Neither operation clears `api.storage` or `api.database`.

## Choose the correct durable store

| Need | Use |
| --- | --- |
| User-facing behavior exposed in Settings | `api.settings` |
| A small durable cache, cursor, or last-seen state | `api.storage` |
| Structured records, indexes, relationships, or queries | `api.database` |
| Temporary state for one mounted component | Svelte state |
| State for one panel or center-tab instance | module instance state |

Test missing values, malformed durable values, rejected writes, persistence
failure, field reset, full reset, reload, and restart. See
[Recover plugin settings and data](../../test-and-troubleshoot/debug-plugin-failures/recover-plugin-settings-and-data.md)
for recovery guidance.
