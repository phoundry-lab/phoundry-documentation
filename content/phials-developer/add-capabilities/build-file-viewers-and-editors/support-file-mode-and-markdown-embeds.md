---
title: "Support File mode and Markdown embeds"
description: "Opts into supported destinations and preserves inspection-only behavior inside embeds."
ai_disclosure: true
order: 5
---

# Support File mode and Markdown embeds

Destination support is explicit. A responsive surface is not automatically safe or useful in every product location, so opt into Page-tab File mode and Markdown embeds independently.

```ts
const diagramProvider: PreviewProvider = {
	type: "preview",
	id: "acme.diagram.viewer",
	name: "Acme Diagram",
	extensions: ["acme-diagram"],
	surface: DiagramSurface,
	createSession: ({ file }) => new DiagramSession(file),
	toolbar: DiagramToolbar,
	destinations: {
		pageTab: true,
		embed: true,
	},
};
```

Omitting a capability or setting it to `false` means Phials uses another eligible provider or its standard fallback in that destination.

## Support File mode

`pageTab: true` makes the provider eligible for the File mode of the universal Page tab. The surface receives `destination === "page"` there.

File mode contains the file-specific viewer or editor. It is distinct from the Page mode that presents Workspace Folder properties and note content. A [PreviewProvider](../../reference/sdk-type-reference/PreviewProvider.md) does not own the File/Page switcher, tab title, filename editor, Metadata presentation, or Page body.

Keep the surface usable from narrow through wide Page-tab groups. Page-tab eligibility is a routing decision, not permission to build a separate fullscreen component.

## Make an embed inspection-only

`embed: true` is a safety promise: the same surface can mount inside a Markdown `![[target]]` block without changing the target file.

Use the `destination` prop to remove mutation behavior:

```svelte
<script lang="ts">
	import { CodeEditor } from "phoundry-ui";
	import type { DiagramSession } from "./DiagramSession.svelte.js";

	let { session, destination }: PreviewSurfaceProps = $props();
	const diagram = $derived(session as DiagramSession | undefined);
	const inspectionOnly = $derived(destination === "embed");
</script>

{#if diagram}
	<CodeEditor
		value={diagram.source}
		language="json"
		readonly={inspectionOnly}
		onchange={inspectionOnly ? undefined : (value) => diagram.setSource(value)}
		class="h-full"
	/>
{/if}
```

The example assumes the editable session from the next article supplies `setSource`.

For an embed:

- make editors, form fields, annotation tools, destructive shortcuts, drag mutations, and persistence actions unavailable;
- keep inspection interactions such as scroll, selection, zoom, page navigation, and playback when they are safe;
- ensure the toolbar contribution also omits edit controls when `destination === "embed"`; and
- do not rely only on disabled host Save controls—the file surface itself must not mutate.

Phials suppresses the standard session editor controls in embeds, but the provider still owns the semantics of its custom component and toolbar.

## Respect embed ownership

Phials owns the persistent embed header, displayed filename, Open action, fallback, focus boundary, frame size, suspension, and single-live-surface decision. Your surface should:

- fill the available width and height;
- use internal scrolling where the file viewer needs it;
- pause expensive work or playback when unmounted;
- restore presentation-independent state from the shared session; and
- avoid rendering another header or an Open button.

Markdown file surfaces may grow with document content under the host's document-flow policy. Other file embeds receive a bounded frame. Do not store embed dimensions or host navigation state in the file format.

If you cannot guarantee inspection-only behavior, leave `embed` unset. The Markdown target still resolves; Phials shows a summary or thumbnail with an Open action instead of treating the file as unavailable.

See [PreviewDestination](../../reference/sdk-type-reference/PreviewDestination.md) and [`PreviewDestinationCapabilities`](../../reference/sdk-type-reference/PreviewDestinationCapabilities.md) for the exact API values.
