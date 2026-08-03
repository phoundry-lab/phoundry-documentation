---
title: "Build plugin components with Svelte 5"
description: "Introduces the component contracts used by plugin UI surfaces and the Svelte-specific patterns authors need without reteaching Svelte fundamentals."
ai_disclosure: true
order: 1
---

# Build plugin components with Svelte 5

A plugin interface is an ordinary Svelte 5 component compiled into your `main.js` release artifact. Phials mounts it when the capability needs to appear and supplies the props declared by the public SDK.

The plugin starter makes the SDK declarations ambient, so types such as [PreviewSurfaceProps](../../reference/sdk-type-reference/PreviewSurfaceProps.md) and [ModuleProviderProps](../../reference/sdk-type-reference/ModuleProviderProps.md) are available in `.svelte` files without importing from the Phials application.

## Use the props for the surface

Each component slot has a specific contract:

| Plugin interface | Public props |
| --- | --- |
| File viewer or editor | [PreviewSurfaceProps](../../reference/sdk-type-reference/PreviewSurfaceProps.md) |
| File toolbar contribution | [PreviewToolbarContributionProps](../../reference/sdk-type-reference/PreviewToolbarContributionProps.md) |
| File thumbnail | [ThumbnailProviderProps](../../reference/sdk-type-reference/ThumbnailProviderProps.md) |
| File view | [FileBrowserViewProps](../../reference/sdk-type-reference/FileBrowserViewProps.md) |
| Panel or center tab | [ModuleProviderProps](../../reference/sdk-type-reference/ModuleProviderProps.md) |
| Custom plugin settings | [PluginSettingsComponentProps](../../reference/sdk-type-reference/PluginSettingsComponentProps.md) |

Destructure the complete props type with `$props()`. This catches a misspelled field and makes optional host input visible at the component boundary.

The following component is a complete file surface:

```svelte
<!-- src/TextSurface.svelte -->
<script lang="ts">
	import { Button } from "phoundry-ui";

	let {
		file,
		destination,
	}: PreviewSurfaceProps = $props();

	let detailsVisible = $state(false);
	const destinationLabel = $derived(destination ?? "current surface");
</script>

<article class="text-surface" aria-labelledby="text-surface-title">
	<header class="text-surface__header">
		<div>
			<h2 id="text-surface-title">{file.name}</h2>
			<p>Shown in {destinationLabel}</p>
		</div>

		<Button
			variant="secondary"
			size="sm"
			active={detailsVisible}
			onclick={() => (detailsVisible = !detailsVisible)}
		>
			{detailsVisible ? "Hide details" : "Show details"}
		</Button>
	</header>

	{#if detailsVisible}
		<dl>
			<div>
				<dt>Path</dt>
				<dd>{file.path}</dd>
			</div>
		</dl>
	{:else}
		<p>Select <strong>Show details</strong> to inspect this file.</p>
	{/if}
</article>

<style>
	.text-surface {
		box-sizing: border-box;
		min-width: 0;
		height: 100%;
		overflow: auto;
		padding: 1rem;
		color: var(--text-primary);
	}

	.text-surface__header {
		display: flex;
		align-items: start;
		justify-content: space-between;
		gap: 1rem;
	}

	h2,
	p,
	dl {
		margin: 0;
	}

	header p,
	dt {
		color: var(--text-secondary);
	}

	dd {
		margin: 0.25rem 0 0;
		overflow-wrap: anywhere;
	}
</style>
```

Register the component in the provider that owns the file viewing capability:

```typescript
import TextSurface from "./TextSurface.svelte";

const textSurfaceProvider: PreviewProvider = {
	type: "preview",
	id: "example.text-surface",
	name: "Text surface",
	extensions: [".txt"],
	surface: TextSurface,
	destinations: {
		pageTab: true,
	},
};
```

Phials creates the component and updates its props. Do not instantiate or mount the component yourself.

## Keep state at the right boundary

Use Svelte state for information owned by one mounted component:

- `$state` for mutable interface state such as an expanded section
- `$derived` or `$derived.by` for values computed from props or state
- callback props and DOM events for explicit changes

Use provider-owned state when several presentations of the same file must share work. File viewers and editors can receive a [PreviewSession](../../reference/sdk-type-reference/PreviewSession.md); panels and tabs can persist their opaque instance state through `updateState`. See [Share viewer state with a preview session](../../add-capabilities/build-file-viewers-and-editors/share-viewer-state-with-a-preview-session.md) and [Manage instances and persisted state](../../add-capabilities/add-panels-and-tabs/manage-instances-and-persisted-state.md).

Do not copy a prop into local state merely to keep it synchronized. Derive from the prop, or handle the event that changes the value. This avoids competing sources of truth when Phials reuses a mounted surface with new input.

## Own resources and cleanup

A component owns resources it starts: observers, timers, subscriptions, and DOM listeners. Prefer event handlers in markup and return cleanup from `onMount` for work that begins with the component:

```svelte
<script lang="ts">
	import { onMount } from "svelte";

	let connected = $state(false);

	onMount(() => {
		const controller = new AbortController();
		window.addEventListener(
			"online",
			() => (connected = true),
			{ signal: controller.signal },
		);

		return () => controller.abort();
	});
</script>
```

For behavior attached to one element, use a Svelte attachment so setup and cleanup remain beside the element:

```svelte
<script lang="ts">
	function observeSize(element: HTMLElement) {
		const observer = new ResizeObserver(([entry]) => {
			console.debug("Plugin surface width", entry.contentRect.width);
		});

		observer.observe(element);
		return () => observer.disconnect();
	}
</script>

<section {@attach observeSize}>…</section>
```

CSS container queries are preferable when size changes only affect layout. Use an observer when JavaScript behavior actually depends on measured geometry.

Plugin deactivation removes active provider registrations, but a mounted component should still release everything it owns when it is unmounted.

## Keep the component portable

A public plugin component should depend on:

- its declared props
- Svelte
- package dependencies in the plugin project
- the Plugin API or a provider-specific extension when the public contract supplies one

Avoid assumptions about a host DOM ancestor, a fixed element ID, the active window, or undocumented fields that happen to exist on an object at runtime. The [public SDK support contract](../../reference/plugin-contract-and-compatibility/public-sdk-support-contract.md) defines the supported boundary.

Run `npm run check` in the starter project after changing a component. This validates Svelte markup, component props, and the synchronized public SDK together.
