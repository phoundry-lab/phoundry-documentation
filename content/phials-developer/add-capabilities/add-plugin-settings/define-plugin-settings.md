---
title: "Define plugin settings"
description: "Declares the settings schema, supported field types, defaults, labels, descriptions, constraints, and reset behavior."
ai_disclosure: true
order: 1
---

# Define plugin settings

Define a [PluginSettingsSchema](../../reference/sdk-type-reference/PluginSettingsSchema.md) when a user should be able to configure plugin behavior. The schema is the durable contract for field identity, defaults, generated controls, and reset.

## Declare stable keys and defaults

Keep setting keys in one shared constant:

```typescript
export const SETTINGS = {
	enabled: "enabled",
	displayName: "displayName",
	refreshMinutes: "refreshMinutes",
	layout: "layout",
	exportFolder: "exportFolder",
} as const;

export const pluginSettingsSchema: PluginSettingsSchema = {
	title: "Report tools",
	fields: [
		{
			key: SETTINGS.enabled,
			type: "boolean",
			label: "Enable report tools",
			description: "Add report actions to supported documents.",
			default: true,
		},
		{
			key: SETTINGS.displayName,
			type: "string",
			label: "Report author",
			description: "Name included in newly generated reports.",
			default: "",
			placeholder: "Ada Lovelace",
		},
		{
			key: SETTINGS.refreshMinutes,
			type: "number",
			label: "Refresh interval",
			description: "Minutes between source checks.",
			default: 30,
			min: 5,
			max: 240,
			step: 5,
		},
		{
			key: SETTINGS.layout,
			type: "select",
			label: "Default layout",
			description: "Layout used for a new report.",
			default: "summary",
			options: [
				{ value: "summary", label: "Summary" },
				{ value: "detailed", label: "Detailed" },
			],
		},
		{
			key: SETTINGS.exportFolder,
			type: "path",
			label: "Export folder",
			description: "Folder suggested when exporting a report.",
			default: "",
			directory: true,
		},
	],
};
```

Assign the schema to `PhialsPlugin.settings`.

Keys are persisted under the plugin’s stable ID. Use short, descriptive keys and never reuse an old key for a different meaning or type. Labels and descriptions can improve over time without changing identity.

## Choose the field type

| Type | Use it for | Field-specific options |
| --- | --- | --- |
| `boolean` | an on-or-off choice | `default` |
| `string` | short user-entered text | `default`, `placeholder` |
| `number` | a numeric value | `default`, `min`, `max`, `step` |
| `select` | one value from a stable list | `default`, `options` |
| `path` | a file or folder selected through Phials | `default`, `directory` |

Every field needs `key`, `type`, `label`, and a default of the matching type. Add a description when the effect, scope, or unit is not obvious from the label.

For a select:

- use stable machine values and clear user-facing labels
- make `default` equal one option’s `value`
- preserve a value when only its label changes
- migrate a saved value before removing its option

For a number:

- make the default fall within `min` and `max`
- choose a `step` that reflects meaningful precision
- state the unit in the label or description
- validate values again before using them in sensitive or expensive work

`placeholder` is an input hint, not a default. A blank string remains the actual value until the user changes it.

For a path, `directory: true` requests a folder; omitted or `false` requests a file. Selecting a path does not grant permission to read or write it. The operation using that path still follows the [plugin permission contract](../../reference/manifest-and-permissions-reference/permission-gated-plugin-api-operations.md).

## Understand loading and defaults

Before plugin activation, Phials creates the current setting record in this order:

1. Start with every field’s current schema default.
2. Overlay previously saved values by key.
3. Make the resulting values available through `api.settings`.

This has useful consequences:

- a newly added field receives its default for existing users
- changing a default does not overwrite an existing user choice
- disabling, reloading, or restarting the plugin retains saved settings
- a setting is available during `onActivate`

Normal [PluginSettings](../../reference/sdk-type-reference/PluginSettings.md) reads already substitute the declared default when a
saved value is missing or malformed. Use `getStored(key)` only inside explicit
migration or recovery code.

## Define reset behavior

Phials provides **Reset to defaults** for any plugin with a non-empty schema. Reset replaces the current settings record with the defaults from the current schema:

- every current field returns to its declared default
- keys removed from the current schema are dropped
- plugin storage and database data are not changed
- the plugin remains installed and enabled

Choose defaults that produce a complete, safe, useful configuration without additional setup. A default should not point to a developer machine, include credentials, enable destructive work, or depend on a path that may not exist.

A custom settings interface does not replace this contract. Its fields still belong in the schema so defaults and reset remain available.

## Evolve a schema safely

Adding a field is non-breaking when its default works for existing users. Renaming a key or changing its type requires a forward migration:

1. Read the previous key or shape.
2. Validate and convert it.
3. Write the new key.
4. Continue accepting the previous value long enough for interrupted upgrades to recover.

Do not infer migration from a label change. Keep migration idempotent so activation or reload can retry safely.

Use settings only for supported field values that can be represented as JSON-safe primitives. For arbitrary structured data, continue with [Store plugin data](../../work-with-phials/store-plugin-data/index.md).
