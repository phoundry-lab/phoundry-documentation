---
title: "Add thumbnails and toolbar controls"
description: "Adds independently selected static Thumbnail renderers and Preview toolbar contributions."
ai_disclosure: true
order: 3
---

# Add thumbnails and toolbar controls

A Thumbnail is a compact Preview of a File. Contribute a [ThumbnailProvider](../../reference/sdk-type-reference/ThumbnailProvider.md) when your format benefits from a small visual representation. Phials selects it independently of the Preview or Editor provider, renders a static image or sanitized HTML fragment, and owns caching. Toolbar controls remain optional contributions of a Preview provider.

Plugin API 2.0.0 replaces the old `PreviewProvider.thumbnail` component field. A Thumbnail renderer is a function, and does not mount your full Preview surface.

## Render from captured inputs

The following renderer makes a small page from a bounded text prefix. The image contains File contents; Phials keeps the filename, extension badge, selection and loading state outside the raster.

```ts
// src/diagram-thumbnail.render.ts
export const DIAGRAM_THUMBNAIL_ID = "acme.diagram.thumbnail";
export const DIAGRAM_THUMBNAIL_VERSION = "demo-text-1";

/** A bounded File-content illustration; filename and interactive Preview stay outside the image. */
export async function renderDiagramThumbnail(
  context: ThumbnailRenderContext,
): Promise<ThumbnailRenderResult> {
  context.signal.throwIfAborted();
  const text = await context.content.readTextPrefix(undefined, 16 * 1024);
  context.signal.throwIfAborted();
  const color = (token: string): string => {
    const captured = context.variants[`theme.${token}`];
    if (!captured) throw new Error("Captured Thumbnail theme unavailable");
    return captured;
  };
  const background = color("surface-raised");
  const foreground = color("txt-primary");
  const border = color("border-muted");
  const canvas = document.createElement("canvas");
  const release = () => {
    canvas.width = 0;
    canvas.height = 0;
  };
  context.signal.addEventListener("abort", release, { once: true });
  try {
    context.signal.throwIfAborted();
    const size = context.generation.size;
    canvas.width = size;
    canvas.height = Math.max(1, Math.floor(size * 0.75));
    const drawing = canvas.getContext("2d");
    if (!drawing) throw new Error("Thumbnail canvas unavailable");
    drawing.fillStyle = background;
    drawing.fillRect(0, 0, canvas.width, canvas.height);
    drawing.strokeStyle = border;
    drawing.strokeRect(
      0.5,
      0.5,
      Math.max(0, canvas.width - 1),
      Math.max(0, canvas.height - 1),
    );
    drawing.fillStyle = foreground;
    drawing.font = `${Math.max(1, size * 0.085)}px monospace`;
    drawing.textBaseline = "top";
    const margin = size * 0.08;
    const lineHeight = size * 0.105;
    const lines = text.split(/\r\n|\n|\r/).slice(0, 5);
    for (const [index, line] of lines.entries()) {
      context.signal.throwIfAborted();
      // These are source contents, not a filename, status label, or extension badge.
      drawing.fillText(
        line,
        margin,
        margin + index * lineHeight,
        Math.max(1, size - margin * 2),
      );
    }
    return await context.encode(canvas, "image/png");
  } finally {
    context.signal.removeEventListener("abort", release);
    release();
  }
}

export const diagramThumbnailProvider: ThumbnailProvider = {
  type: "thumbnail",
  id: DIAGRAM_THUMBNAIL_ID,
  name: "Diagram Thumbnail",
  extensions: ["acme-diagram"],
  rendererVersion: DIAGRAM_THUMBNAIL_VERSION,
  presentationVariants: ["platform", "theme"],
  render: renderDiagramThumbnail,
};
```

`context.file` is the assigned File. `context.host` identifies the captured executing Host and session, which can be Remote even when the Client has no Local Host. Read source or auxiliary inputs through `context.content`, and use `context.settings`, `context.generation` and declared `context.variants` instead of ambient Settings or the currently selected Host. The example requires `filesystem.read`; automatic cache writes do not require `filesystem.write`.

Generation pixels come from `context.generation.size`, with the Host's size limit and quality already applied. Do not multiply by the Client device pixel ratio. `context.encode` applies the captured generation parameters and returns static PNG, JPEG or WebP. Use PNG when useful alpha needs to survive. Images must be decodable and nonanimated, with at most 16 MiB of encoded output and no edge larger than the captured generation size (the framework maximum is 4096 pixels); Phials extracts their intrinsic dimensions from the output. No size callback or presentation component is needed.

The example declares `theme` because it uses captured semantic colors, and `platform` because its fallback monospace font can vary by Client platform. A renderer that does not depend on either should omit them. The theme snapshot also identifies effective and preferred system color schemes, so SVG media inputs can be revalidated. Do not query current CSS, Settings or OS state after the framework captures inputs.

## Return semantic HTML

Plugin API 2.1.0 also accepts a static HTML fragment. Declare `pluginApiVersion: "2.1.0"` or newer when using this result:

```ts
return {
  status: "html",
  html: "<h1>Document title</h1><p>A short excerpt.</p>",
};
```

Escape File-derived text when constructing markup. Phials sanitizes fresh and cached fragments before display. Supported tags are `div`, `span`, `p`, `br`, `hr`, `h1`–`h6`, `ul`, `ol`, `li`, `strong`, `b`, `em`, `i`, `s`, `code`, and `pre`; the only supported attribute is `start` for ordered lists. Scripts, resource-loading elements, links, styles, classes, event handlers, and other attributes are removed. The result has no interactive behavior.

Fragments are limited to 32 KiB of UTF-8 input and sanitized output, 512 DOM nodes, and 16 nesting levels. Phials supplies semantic typography and current Client theme colors, reflows the content at the actual tile width, and clips it to the View's Thumbnail frame. HTML has no intrinsic pixel dimensions. Do not declare a theme variant merely to use this default styling; declare variants only when they affect the returned content. There is no custom CSS or component lifecycle to maintain.

HTML receives the same captured content reads, cancellation, Host persistence, freshness validation, and cache cleanup as images. Increment `rendererVersion` when changing a provider from raster to HTML output.

## Read and declare dependencies

Tracked `readText`, `readBinary`, bounded text/binary prefixes, `readDirectory` and `openSnapshot` bind reads to the original Host and Plugin permissions. `openSnapshot` exposes source size/revision and bounded byte ranges without first loading the whole File; close it in `finally`. This is useful for large PDF and archive formats. Each range belongs to one granted source. Content limits still apply, so choose a smaller format-specific bound before allocating a complete buffer.

Use `selectDirectory(path, { stems, extensions, contains })` for a deterministic bounded cover search. Its successful absence is an input too: adding a matching cover can invalidate a previous no-image result. When output also depends on a supported file or directory observed elsewhere, declare it with `content.declareInput({ type: "file", path, revision })` or `{ type: "directory", path, selection }`. Do not treat an opaque string as an input identity. Unsupported external/network assets do not become supported merely by declaring them.

Plugin Settings automatically contribute to identity. Their captured values are available during rendering; durable provenance retains a Settings fingerprint rather than the values. Changing the renderer's behavior requires a new `rendererVersion` even if the Plugin's public method signature is unchanged. Plugin release version, source/dependency revisions, generation policy, Settings fingerprint and declared presentation variants also distinguish cache entries.

## Finish, cancel and fail

Return a raster `Blob`, `{ status: "html", html }`, a framework-minted result from `context.native`, or `{ status: "no-image" }` for a successful deterministic conclusion that the format has no image. Throw read, parser or rendering errors; Phials shows the normal File icon and can retry. Do not catch every failure and turn it into no-image, because a transient failure must not become a persistent negative entry.

Observe `context.signal`, cancel parser/render tasks that support cancellation, and close snapshots and document handles, remove owned FontFaces, and release object URLs and canvas backing stores on completion or retirement. If an operation cannot physically stop, keep its actual work represented until it settles and reject any late output. One Client's withdrawal does not cancel other consumers of shared work. Native image, video, audio artwork, folder and icon helpers use the same captured request and opaque output rules; providers never supply cache paths or publication tokens.

Phials coordinates repeated demand and persists valid output on the owning Host automatically. Clients with matching captured inputs can reuse the same validated record after a restart or from another attached Client. Memory hits still require Host freshness validation. Cache clear, source/dependency changes, Plugin retirement and relevant Settings/presentation changes retire old results. A valid Thumbnail can remain available in bounded Client memory if disk persistence fails, while diagnostics identify that it was not persisted.

## Register independently

Register the dedicated renderer and Preview provider as separate contributions. They can share matching criteria, but selecting one does not select the other. Matching uses extension, MIME, category or `canHandle`, with explicit priority when needed. Host feature/platform requirements describe executing Host eligibility, independently of the Client OS.

```ts
import DiagramSurface from "./DiagramSurface.svelte";
import DiagramToolbar from "./DiagramToolbar.svelte";
import { diagramThumbnailProvider } from "./diagram-thumbnail.render";
import { definePlugin } from "@phoundry/phials-plugin-sdk/manifest";
import { pluginManifest } from "./plugin.manifest";

const diagramPreviewProvider: PreviewProvider = {
  type: "preview",
  id: "acme.diagram.viewer",
  name: "Acme Diagram",
  extensions: ["acme-diagram"],
  surface: DiagramSurface,
  toolbar: DiagramToolbar,
  destinations: { pageTab: true, embed: true },
};

export default definePlugin(pluginManifest, {
  providers: [diagramPreviewProvider, diagramThumbnailProvider],
});
```

A minimal manifest for this renderer requests read access and can declare its renderer catalog:

```ts
// src/plugin.manifest.ts
import { definePluginManifest } from "@phoundry/phials-plugin-sdk/manifest";
import { version } from "../package.json";
import {
  DIAGRAM_THUMBNAIL_ID,
  DIAGRAM_THUMBNAIL_VERSION,
} from "./diagram-thumbnail.render";

export const pluginManifest = definePluginManifest({
  id: "acme.diagram",
  name: "Acme Diagram",
  version,
  minAppVersion: "0.1.0",
  pluginApiVersion: "3.0.0",
  author: "Acme",
  description: "Diagram Preview and static Thumbnails",
  permissions: ["filesystem.read"],
  thumbnailProviders: [
    { id: DIAGRAM_THUMBNAIL_ID, rendererVersion: DIAGRAM_THUMBNAIL_VERSION },
  ],
});
```

The manifest targets Plugin API 3.0.0. Its optional `thumbnailProviders` catalog can declare `[{ id: "acme.diagram.thumbnail", rendererVersion: "demo-text-1" }]`, matching the actual shipped provider. This lets the Host prove that an older renderer is obsolete for proactive cache cleanup. Leaving the catalog out still enables automatic caching; the Host conservatively retains renderer variants it cannot prove obsolete. A declared catalog must agree with the loaded providers.

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

## Register toolbar controls

The Preview's `toolbar` field still contributes one component beside the active surface. If it offers editing or persistence actions, check `destination` and omit them for `"embed"`; inspection-safe navigation, zoom and playback may remain.

See [ThumbnailProvider](../../reference/sdk-type-reference/ThumbnailProvider.md), [ThumbnailRenderContext](../../reference/sdk-type-reference/ThumbnailRenderContext.md), [ThumbnailContentSnapshot](../../reference/sdk-type-reference/ThumbnailContentSnapshot.md), and [PreviewToolbarContributionProps](../../reference/sdk-type-reference/PreviewToolbarContributionProps.md) for the exact contracts.
