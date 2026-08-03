---
title: "Use Phoundry UI components"
description: "Explains the recommended component library, compatible dependency pinning, and how shared components follow Phials chrome and behavior."
ai_disclosure: true
order: 2
---

# Use Phoundry UI components

Use Phoundry UI for common controls and presentation patterns in a plugin interface. Its components share Phials sizing, semantic colors, focus treatment, and interaction conventions, which reduces the amount of behavior your plugin must recreate.

The npm package name is `phoundry-ui`. The plugin starter already includes it and its Svelte and Iconify peer dependencies.

## Keep the package set compatible

Treat these dependencies as one compatibility set:

- `svelte`
- `phoundry-ui`
- `@iconify/svelte`
- the Svelte Vite plugin used by the starter

Keep the versions supplied by the current plugin starter when creating a project. When adopting a newer Phoundry UI release, update from the supported version range, rebuild the release artifacts, run `npm run check`, and test the interface in the oldest Phials version declared by `minAppVersion`.

Import only from public package exports:

```typescript
import {
	Button,
	EmptyState,
	FormField,
	TextInput,
} from "phoundry-ui";
import {
	PhiIcons,
	registerPhoundryIcons,
} from "phoundry-ui/icons";
```

Do not import package source paths or files beneath `phoundry-ui/dist`. Public exports carry the supported component and type contract.

## Build forms from shared controls

Phoundry UI controls use Svelte 5 callback props and snippets. Keep the state in your component and pass explicit values and callbacks:

```svelte
<script lang="ts">
	import {
		Button,
		EmptyState,
		FormField,
		TextInput,
	} from "phoundry-ui";

	let label = $state("");
	let savedLabels = $state<string[]>([]);

	function addLabel() {
		const next = label.trim();
		if (!next) return;

		savedLabels = [...savedLabels, next];
		label = "";
	}
</script>

<section class="label-editor" aria-labelledby="label-editor-title">
	<h2 id="label-editor-title">Labels</h2>

	<FormField
		id="new-label"
		label="New label"
		description="Use a short name that identifies the file."
	>
		<TextInput
			id="new-label"
			aria-describedby="new-label-desc"
			value={label}
			placeholder="Research"
			oninput={(value) => (label = value)}
		/>
	</FormField>

	<Button
		variant="primary"
		disabled={!label.trim()}
		onclick={addLabel}
	>
		Add label
	</Button>

	{#if savedLabels.length === 0}
		<EmptyState
			icon={PhiIcons.info}
			title="No labels yet"
			description="Add a label to begin."
			size="sm"
		/>
	{:else}
		<ul aria-label="Saved labels">
			{#each savedLabels as savedLabel}
				<li>{savedLabel}</li>
			{/each}
		</ul>
	{/if}
</section>
```

Prefer the component’s typed props for supported visual states. For example, use `Button`’s `variant`, `size`, `active`, `loading`, `disabled`, and `fullWidth` props instead of replacing its internal background, spacing, or focus classes.

The `class` prop is useful for additive layout such as width, alignment, or surrounding margin. It is not a guarantee that a conflicting Tailwind utility overrides component-owned styling.

## Register and preload icons

Phoundry UI exports a curated `PhiIcons` map and two Iconify collections: `phoundry-mono` for interface glyphs and `phoundry-colored` for file artwork. Register the collections once in your plugin entry before a plugin component renders:

```typescript
import {
	PhiIcons,
	registerPhoundryIcons,
} from "phoundry-ui/icons";

registerPhoundryIcons();

export default function createPlugin(): PhialsPlugin {
	return {
		id: "example.labels",
		name: "Labels",
		version: "1.0.0",
		providers: [
			// Provider registrations
		],
	};
}
```

List icons used in provider metadata in `pluginManifest.icons` so Phials can
preload them before it imports plugin code and renders host-owned chrome.
Components can pass the same icon IDs to Phoundry UI controls.

Use an icon-only control only when it has an accessible name:

```svelte
<Button
	icon={PhiIcons.refresh}
	iconOnly
	title="Refresh labels"
	aria-label="Refresh labels"
	onclick={refreshLabels}
/>
```

The visible tooltip helps pointer users; the accessible name is required for assistive technology.

## Choose host interactions for host-level feedback

Use the Plugin API for dialogs and notifications that belong to the Phials window. This keeps stacking, dismissal, focus restoration, and user preferences under the host:

```typescript
const shouldContinue = await api.modal.confirm({
	title: "Replace saved labels?",
	message: "The labels on this file will be replaced.",
	confirmLabel: "Replace",
	cancelLabel: "Cancel",
	danger: true,
});

if (shouldContinue) {
	await replaceLabels();
	api.notify.success("Labels replaced");
}
```

See [Show dialogs and notifications](../../work-with-phials/show-dialogs-and-notifications/index.md) for the complete interaction contracts. Use local Phoundry UI controls for interaction contained inside your component.

## Verify a component in context

A shared component supplies behavior, but the plugin still owns its wording, state model, and placement. Test:

- default, hover, focus, disabled, loading, error, and empty states
- keyboard use without a pointer
- the active light and dark Phials themes
- narrow panel and wide center-tab placements
- text expansion and long filenames

Run `npm run check` before building, then follow [Test plugin logic and interfaces](../../test-and-troubleshoot/test-and-validate-your-plugin/test-plugin-logic-and-interfaces.md) for interface testing.
