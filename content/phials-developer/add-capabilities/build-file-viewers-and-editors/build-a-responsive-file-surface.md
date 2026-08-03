---
title: "Build a responsive file surface"
description: "Implements the reusable Svelte viewer or editor component supplied through PreviewProvider.surface and adapts it to its container."
ai_disclosure: true
order: 2
---

# Build a responsive file surface

Implement one Svelte component for every presentation of the file. Phials mounts `PreviewProvider.surface` inside a named CSS container and passes the current [FileEntry](../../reference/sdk-type-reference/FileEntry.md), optional shared session, and destination. The component owns file-specific content; the surrounding shell owns filename, open, close, navigation, and standard editor chrome.

## Start with a complete surface

This first version reads the diagram source when it mounts. The session article moves that state out of the component so it survives presentation changes.

```svelte
<!-- src/DiagramSurface.svelte -->
<script lang="ts">
	import { onMount } from "svelte";
	import { getPluginAPI } from "./main.js";

	let { file }: PreviewSurfaceProps = $props();

	let source = $state("");
	let loading = $state(true);
	let error = $state<string | null>(null);

	onMount(() => {
		let cancelled = false;

		void getPluginAPI()
			.files.readText(file.path)
			.then((snapshot) => {
				if (!cancelled) source = snapshot.content;
			})
			.catch((cause) => {
				if (!cancelled) {
					error =
						cause instanceof Error ? cause.message : String(cause);
				}
			})
			.finally(() => {
				if (!cancelled) loading = false;
			});

		return () => {
			cancelled = true;
		};
	});
</script>

<section class="diagram-surface" aria-label={`Diagram file ${file.name}`}>
	{#if loading}
		<p class="status">Loading diagram…</p>
	{:else if error}
		<p class="status error" role="alert">Could not read the diagram: {error}</p>
	{:else}
		<div class="canvas" aria-label="Diagram canvas">
			<p>{source || "This diagram is empty."}</p>
		</div>
		<aside class="details">
			<h2>{file.name}</h2>
			<p>{file.size.toLocaleString()} bytes</p>
		</aside>
	{/if}
</section>

<style>
	.diagram-surface {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		gap: 0.75rem;
		width: 100%;
		height: 100%;
		min-height: 0;
		padding: 0.75rem;
		overflow: auto;
		color: var(--color-txt-primary);
		background: var(--color-surface-base);
	}

	.canvas {
		min-height: 12rem;
		padding: 1rem;
		overflow: auto;
		border: 1px solid var(--color-border-muted);
		border-radius: 0.5rem;
		background: var(--color-surface-sunken);
		white-space: pre-wrap;
	}

	.details {
		min-width: 0;
		padding: 0.75rem;
		border-radius: 0.5rem;
		background: var(--color-surface-raised);
	}

	.status {
		margin: auto;
		color: var(--color-txt-secondary);
	}

	.error {
		color: var(--color-semantic-error);
	}

	@container preview-surface (min-width: 44rem) {
		.diagram-surface {
			grid-template-columns: minmax(0, 1fr) minmax(12rem, 18rem);
			padding: 1rem;
		}
	}
</style>
```

The host provides `container-name: preview-surface` and `container-type: inline-size`. The component therefore changes layout according to its actual inline space, including when a panel is resized or the surface is embedded in another document.

`api.files.readText` requires the `filesystem.read` plugin permission. Add it to the manifest for a read-only viewer and explain why the plugin needs file contents. An editor can request `filesystem.write`, which also grants the corresponding reads. See [Request the least plugin permissions](../../package-and-publish/configure-the-plugin-manifest/request-the-least-plugin-permissions.md).

## Respond to the container, not the destination

Use CSS container queries for ordinary layout changes:

- move supporting information beside the main content when there is room;
- collapse multi-column controls into a vertical flow at narrow widths;
- keep text and controls usable without forcing a minimum panel width; and
- place scrolling on the file-specific region that needs it.

Do not use viewport media queries to infer a panel width, and do not branch on `"module"` versus `"page"` merely to choose compact or wide CSS. The same destination can have many sizes.

JavaScript measurement remains appropriate when pixels affect imperative rendering, such as sizing a canvas backing buffer or calculating a virtualized range. Observe the smallest owning element, release the observer on unmount, and keep presentational breakpoint decisions in CSS.

## Leave the shell to Phials

The surface should not add:

- a duplicate filename or File/Page switcher;
- open-in-tab, close, or back controls;
- a second top toolbar;
- destination padding intended to align with Phials chrome; or
- global styles that affect other plugin or host content.

Render loading and file-specific failures inside the surface because they explain whether the file can be interpreted. Uncaught component failures are contained by the host's plugin-surface boundary.

For shared styling and accessibility foundations, see [Design responsive and accessible plugin surfaces](../../get-started/use-svelte-and-phoundry-ui/design-responsive-and-accessible-plugin-surfaces.md).
