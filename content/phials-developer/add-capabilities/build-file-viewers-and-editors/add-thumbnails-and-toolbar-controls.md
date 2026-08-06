---
title: "Add thumbnails and toolbar controls"
description: "Contributes optional thumbnail and toolbar components while keeping destination chrome host-owned."
ai_disclosure: true
order: 3
---

# Add thumbnails and toolbar controls

Add a thumbnail when a small representation helps identify the file in visual file views. Add a toolbar contribution when the active viewer needs file-specific controls such as page navigation, zoom, playback, or display modes. Both are optional and separate from the main surface.

## Build a bounded thumbnail

A thumbnail receives the file and requested sizes. It should finish quickly, avoid interactive controls, and fail softly so Phials can show the normal file-type icon.

```svelte
<!-- src/DiagramThumbnail.svelte -->
<script lang="ts">
	let {
		file,
		size,
		generatedSize = size,
	}: ThumbnailProviderProps = $props();

	const label = $derived(file.name.slice(0, 2).toUpperCase());
	const fontSize = $derived(
		Math.max(12, Math.min(28, Math.round(generatedSize * 0.22))),
	);
</script>

<div
	class="diagram-thumbnail"
	style={`font-size: ${fontSize}px`}
	aria-hidden="true"
	title={file.name}
>
	<span>{label}</span>
</div>

<style>
	.diagram-thumbnail {
		display: grid;
		width: 100%;
		height: 100%;
		place-items: center;
		overflow: hidden;
		border-radius: 0.375rem;
		color: var(--color-txt-on-accent);
		background:
			linear-gradient(145deg, transparent 48%, rgb(255 255 255 / 12%) 49%),
			var(--color-accent-primary);
		font-weight: 700;
		letter-spacing: 0.04em;
	}
</style>
```

`size` is the displayed size. `generatedSize` is the requested source/render resolution and may be larger for a dense display. `quality` is available for lossy encoded output. Preserve aspect ratio for content thumbnails, bound file reads and decoding work, cancel abandoned asynchronous work, and release canvases, object URLs, or document handles when the component unmounts.

Ratio-aware hosts such as Masonry initially reserve a square frame. If the thumbnail has meaningful intrinsic dimensions, report them after the content loads so the host can fit the frame without learning file-format details:

```svelte
<script lang="ts">
	let { file, onIntrinsicDimensions }: ThumbnailProviderProps = $props();
</script>

<img
	src={thumbnailUrl}
	alt={file.name}
	onload={(event) =>
		onIntrinsicDimensions?.({
			width: event.currentTarget.naturalWidth,
			height: event.currentTarget.naturalHeight,
		})}
/>
```

The callback is optional. Report the source or rendered content dimensions, not the current CSS box; Phials validates the values and may clamp extreme ratios for a usable card. Dimensionless or synthetic thumbnails can omit the callback and remain square.

Do not reuse the full file surface as a thumbnail. It carries unnecessary state and interaction, and it may read the complete file many times while a directory scrolls.

## Build one toolbar contribution

The toolbar component receives the same file and shared session as the active surface:

```svelte
<!-- src/DiagramToolbar.svelte -->
<script lang="ts">
	import { Button } from "phoundry-ui";
	import type { DiagramSession } from "./DiagramSession.svelte.js";

	let { session }: PreviewToolbarContributionProps = $props();
	const diagram = $derived(session as DiagramSession | undefined);
</script>

{#if diagram}
	<div class="diagram-toolbar" aria-label="Diagram zoom">
		<Button
			variant="ghost"
			size="sm"
			onclick={() => diagram.zoomOut()}
			disabled={diagram.zoom <= 0.5}
			title="Zoom out"
		>
			−
		</Button>
		<span aria-live="polite">{Math.round(diagram.zoom * 100)}%</span>
		<Button
			variant="ghost"
			size="sm"
			onclick={() => diagram.zoomIn()}
			disabled={diagram.zoom >= 3}
			title="Zoom in"
		>
			+
		</Button>
		<Button
			variant="ghost"
			size="sm"
			onclick={() => diagram.resetZoom()}
			disabled={diagram.zoom === 1}
		>
			Reset
		</Button>
	</div>
{/if}

<style>
	.diagram-toolbar {
		display: flex;
		align-items: center;
		gap: 0.25rem;
	}

	.diagram-toolbar span {
		min-width: 3.5rem;
		text-align: center;
		font-variant-numeric: tabular-nums;
	}
</style>
```

This is one reactive contribution even though it contains several related controls. Phials places it at the trailing side of the correct host toolbar. Keep passive status in the surface unless it is integral to operating a control, as the zoom percentage is here.

Do not render filename, close, open-in-tab, File/Page switching, Save, Revert, dirty state, or other host actions. Standard editing controls come from `PreviewSession.editor`.

## Register both components

Add the components to the provider:

```ts
import DiagramThumbnail from "./DiagramThumbnail.svelte";
import DiagramToolbar from "./DiagramToolbar.svelte";

const diagramProvider: PreviewProvider = {
	type: "preview",
	id: "acme.diagram.viewer",
	name: "Acme Diagram",
	extensions: ["acme-diagram"],
	surface: DiagramSurface,
	thumbnail: DiagramThumbnail,
	toolbar: DiagramToolbar,
	destinations: { pageTab: true, embed: true },
};
```

If the toolbar offers editing or persistence actions of its own, check `destination` and omit them when it is `"embed"`. Inspection-safe navigation, zoom, and playback controls may remain.

See [ThumbnailProviderProps](../../reference/sdk-type-reference/ThumbnailProviderProps.md) and [`PreviewToolbarContributionProps`](../../reference/sdk-type-reference/PreviewToolbarContributionProps.md) for the exact props.
