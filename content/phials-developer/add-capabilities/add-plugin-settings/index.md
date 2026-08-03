---
title: "Add plugin settings"
description: "Define plugin settings, update their values, and provide a custom settings interface when needed."
ai_disclosure: true
---

# Add plugin settings

Add plugin settings for choices the user controls, such as a default sort, a feature toggle, a refresh interval, or a preferred folder. Phials persists settings by plugin ID and presents them with the plugin’s capabilities in Settings.

Most plugins need only a [PluginSettingsSchema](../../reference/sdk-type-reference/PluginSettingsSchema.md). Phials builds the controls, loads saved values before activation, applies defaults for new fields, and provides a standard **Reset to defaults** action.

```typescript
const SETTINGS = {
	showSummary: "showSummary",
	refreshMinutes: "refreshMinutes",
} as const;

const settings: PluginSettingsSchema = {
	title: "Document summary",
	fields: [
		{
			key: SETTINGS.showSummary,
			type: "boolean",
			label: "Show summary",
			description: "Show a generated summary above document details.",
			default: true,
		},
		{
			key: SETTINGS.refreshMinutes,
			type: "number",
			label: "Refresh interval",
			description: "Minutes between background refreshes.",
			default: 30,
			min: 5,
			max: 240,
			step: 5,
		},
	],
};

export default function createPlugin(): PhialsPlugin {
	return {
		id: "example.document-summary",
		name: "Document summary",
		version: "1.0.0",
		settings,
		providers: [
			// Capability providers
		],
	};
}
```

## Build the settings contract

1. [Define plugin settings](define-plugin-settings.md) with stable keys, useful defaults, field constraints, and reset behavior.
2. [Read and update plugin settings](read-and-update-plugin-settings.md) through `api.settings` and keep long-lived interfaces synchronized with persisted changes.
3. [Build a custom settings interface](build-a-custom-settings-interface.md) only when the schema-generated controls cannot express the interaction.

Plugin settings are for user-configurable behavior. They are not a general persistence bucket. Use [Choose between settings, storage, and a database](../../work-with-phials/store-plugin-data/choose-between-settings-storage-and-a-database.md) for cached state, progress, indexes, records, and other plugin-owned data.

## Public settings contracts

The generated reference provides exact signatures for:

- [PluginSettingsSchema](../../reference/sdk-type-reference/PluginSettingsSchema.md)
- [SettingsField](../../reference/sdk-type-reference/SettingsField.md)
- [PluginSettings](../../reference/sdk-type-reference/PluginSettings.md)
- [PluginSettingsComponentProps](../../reference/sdk-type-reference/PluginSettingsComponentProps.md)

A plugin can contribute several capabilities but has one settings namespace and one optional settings interface.
