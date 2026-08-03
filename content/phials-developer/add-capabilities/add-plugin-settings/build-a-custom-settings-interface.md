---
title: "Build a custom settings interface"
description: "Supplies settingsComponent for specialized UI while retaining the schema as the source of defaults and reset behavior."
ai_disclosure: true
order: 3
---

# Build a custom settings interface

Set `PhialsPlugin.settingsComponent` when the generated field controls cannot express the relationship between settings. A custom interface is appropriate for dependent choices, validation that needs immediate explanation, a live preview, or a specialized picker.

Keep a complete [PluginSettingsSchema](../../reference/sdk-type-reference/PluginSettingsSchema.md). Phials still uses it to:

- establish defaults before activation
- identify the plugin as configurable
- provide the standard **Reset to defaults** action
- restore current values after reset
- support recovery when the custom interface cannot render

## Define the schema first

This example has a service URL and a refresh interval:

```typescript
export const SETTINGS = {
	serviceUrl: "serviceUrl",
	refreshMinutes: "refreshMinutes",
} as const;

export const DEFAULTS = {
	serviceUrl: "https://example.com/api",
	refreshMinutes: 30,
} as const;

export const settingsSchema: PluginSettingsSchema = {
	title: "Report service",
	fields: [
		{
			key: SETTINGS.serviceUrl,
			type: "string",
			label: "Service URL",
			description: "HTTPS endpoint used to refresh report data.",
			default: DEFAULTS.serviceUrl,
			placeholder: "https://example.com/api",
		},
		{
			key: SETTINGS.refreshMinutes,
			type: "number",
			label: "Refresh interval",
			description: "Minutes between service requests.",
			default: DEFAULTS.refreshMinutes,
			min: 5,
			max: 240,
			step: 5,
		},
	],
};
```

The schema remains accurate even though Phials does not render its generic field loop while the custom component is present.

## Build against the public component props

The settings component receives the plugin definition and its reactive [PluginSettings](../../reference/sdk-type-reference/PluginSettings.md) object:

```svelte
<!-- src/ReportServiceSettings.svelte -->
<script lang="ts">
	import {
		FormField,
		NumberInput,
		TextInput,
	} from "phoundry-ui";
	import { DEFAULTS, SETTINGS } from "./settings";

	let {
		plugin,
		settings,
	}: PluginSettingsComponentProps = $props();

	const serviceUrl = $derived(
		settings.get<string>(SETTINGS.serviceUrl) ??
			DEFAULTS.serviceUrl,
	);
	const refreshMinutes = $derived(
		settings.get<number>(SETTINGS.refreshMinutes) ??
			DEFAULTS.refreshMinutes,
	);

	let serviceUrlError = $state("");
	let savingUrl = $state(false);

	async function updateServiceUrl(value: string) {
		const next = value.trim();

		try {
			const url = new URL(next);
			if (url.protocol !== "https:") {
				throw new Error("Use an HTTPS URL.");
			}
		} catch {
			serviceUrlError = "Enter a valid HTTPS URL.";
			return;
		}

		serviceUrlError = "";
		savingUrl = true;
		try {
			await settings.set(SETTINGS.serviceUrl, next);
		} finally {
			savingUrl = false;
		}
	}

	async function updateRefreshMinutes(value: number) {
		if (value < 5 || value > 240) return;
		await settings.set(SETTINGS.refreshMinutes, value);
	}
</script>

<div class="settings-grid" aria-label="{plugin.name} settings">
	<FormField
		id="report-service-url"
		label="Service URL"
		description="HTTPS endpoint used to refresh report data."
		error={serviceUrlError}
	>
		<TextInput
			id="report-service-url"
			aria-describedby="report-service-url-desc"
			value={serviceUrl}
			disabled={savingUrl}
			onchange={updateServiceUrl}
		/>
	</FormField>

	<FormField
		id="report-refresh-minutes"
		label="Refresh interval"
		description="Minutes between service requests."
	>
		<NumberInput
			id="report-refresh-minutes"
			aria-describedby="report-refresh-minutes-desc"
			value={refreshMinutes}
			min={5}
			max={240}
			step={5}
			onchange={updateRefreshMinutes}
		/>
	</FormField>
</div>

<style>
	.settings-grid {
		display: grid;
		gap: 1rem;
		min-width: 0;
	}
</style>
```

The `settings` prop is the same plugin-scoped persistence contract available through the Plugin API. Reads participate in Svelte reactivity, so a successful write or host reset updates the derived values.

Use Phoundry UI public exports rather than importing Phials settings rows or application source. Follow [Use Svelte and Phoundry UI](../../get-started/use-svelte-and-phoundry-ui/index.md) for component, styling, accessibility, and focus conventions.

## Register the component

```typescript
import ReportServiceSettings from "./ReportServiceSettings.svelte";

export default function createPlugin(): PhialsPlugin {
	return {
		id: "example.report-service",
		name: "Report service",
		version: "1.0.0",
		settings: settingsSchema,
		settingsComponent: ReportServiceSettings,
		providers: [
			// Capability providers
		],
	};
}
```

Phials places the component inside the plugin settings presentation and keeps the standard reset action outside it. Do not duplicate the complete reset control in the custom component. A narrower reset for one related group is acceptable when its consequence is clear.

## Preserve schema and interaction semantics

A custom interface owns:

- layout and grouping
- specialized input or preview behavior
- validation messages
- loading and save-failure states
- when a deliberate user edit is persisted

The schema continues to own:

- field keys and types
- defaults
- generic labels and descriptions
- numeric constraints and select options
- complete reset

Keep those definitions synchronized through shared constants. Do not silently save a value the schema cannot represent.

## Verify custom behavior

Test:

- first use with schema defaults
- previously saved values
- invalid input and a failed `set`
- keyboard order, labels, errors, and focus
- loading and disabled states
- the standard reset while the component is mounted
- plugin reload and full Phials restart
- light and dark themes, narrow width, and increased text size

If the custom component fails, the plugin should still activate with safe schema defaults. Recovery is covered in [Recover plugin settings and data](../../test-and-troubleshoot/debug-plugin-failures/recover-plugin-settings-and-data.md).
