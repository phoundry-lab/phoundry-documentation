---
title: Theming
layout: ui
order: 1
---

<script lang="ts">
	import UiDocHeader from '$lib/docs/ui/UiDocHeader.svelte';
	import Example from '$lib/docs/ui/Example.svelte';
	import PropTable from '$lib/docs/ui/PropTable.svelte';
	import type { PropDef } from '$lib/docs/ui/PropTable.svelte';
	import Separator from '$phoundry/components/display/Separator.svelte';
	import CodeBlock from '$lib/docs/ui/CodeBlock.svelte';
	import ThemeGallery from '$lib/docs/ui/demos/ThemeGallery.svelte';

	const cssSetupCode = `@import 'phoundry-ui/styles';`;

	const basicUsageCode = `import { getThemeManager, builtinThemes } from 'phoundry-ui';

const tm = getThemeManager();

// Register the built-in theme palettes
for (const theme of builtinThemes) {
  tm.register(theme);
}

// Apply based on user preferences (persistence is your responsibility)
tm.applyBasedOnPreference({
  colorScheme: 'system',
  lightTheme: 'phi.default-light',
  darkTheme: 'phi.default-dark',
});`;

	const managerMethods: PropDef[] = [
		{ name: 'register(theme)', type: 'ThemeDefinition', description: 'Register a theme. Replaces existing themes with the same ID.' },
		{ name: 'unregister(id)', type: 'string → boolean', description: 'Remove a theme by ID. Clears active theme if it matches.' },
		{ name: 'getThemesByMode(mode)', type: "'light' | 'dark' → ThemeDefinition[]", description: "Get themes that match a mode (includes 'both')." },
		{ name: 'activeThemeId', type: 'string | null', description: 'Reactive getter for the currently applied theme ID.' },
		{ name: 'apply(id)', type: 'string', description: 'Apply a theme by ID (ignores color-scheme preference).' },
		{ name: 'applyBasedOnPreference(settings)', type: 'ThemeSettings', description: 'Apply the correct theme based on colorScheme, lightTheme, and darkTheme.' },
		{ name: 'clearTheme()', type: 'void', description: 'Remove all CSS variables set by the active theme.' }
	];

	const themeDefProps: PropDef[] = [
		{ name: 'id', type: 'string', required: true, description: "Unique identifier (e.g. 'phi.nord-dark')." },
		{ name: 'name', type: 'string', required: true, description: 'Human-readable name shown in theme pickers.' },
		{ name: 'author', type: 'string', description: 'Theme author attribution.' },
		{ name: 'mode', type: "'light' | 'dark' | 'both'", required: true, description: 'Which system appearance this theme targets.' },
		{ name: 'variables', type: 'ThemeVariables', required: true, description: 'CSS variable overrides (primary set).' },
		{ name: 'lightVariables', type: 'ThemeVariables', description: "Separate variable set for light mode (only when mode is 'both')." },
		{ name: 'preview', type: '{ background, foreground, accent }', description: 'Preview colors for theme picker UI.' }
	];
</script>

<UiDocHeader
	title="Theming"
	description="Phoundry UI uses CSS custom properties for theming. All components reference semantic tokens that can be overridden globally, per-component, or dynamically at runtime via the ThemeManager."
/>

## CSS setup

Import the style files in your app's root layout or CSS entry point:

<CodeBlock lang="css" code={cssSetupCode} />

The bundle includes Tailwind integration, source registration for packaged
components, theme variables, component tokens, utility classes, and editor
styles in the intended order.

## ThemeManager

The `ThemeManager` is a singleton that handles runtime theme registration and
application. It applies themes by setting CSS custom properties on
`document.documentElement`, and listens for system color-scheme changes to
re-apply automatically.

<Example title="Basic usage" code={basicUsageCode}>
	<p class="text-xs text-txt-secondary">
		The ThemeManager ships with built-in themes across many families. Register them all at once,
		or pick only the ones you need.
	</p>
</Example>

## Built-in themes

<ThemeGallery />

<Separator />

<PropTable props={themeDefProps} title="ThemeDefinition" />

<PropTable props={managerMethods} title="ThemeManager methods" />
