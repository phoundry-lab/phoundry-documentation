---
title: "Set view defaults and Workspace Folder availability"
description: "Defines item-size defaults and limits a view to Workspace Folder contexts when the capability requires them."
ai_disclosure: true
order: 5
---

# Set view defaults and Workspace Folder availability

Set a file view's initial item size with `defaultItemSizePreset`. Set `collectionOnly: true` when the view depends on Workspace Folder capabilities such as properties or a folder-wide schema.

These are provider defaults and availability rules. They do not replace the pane's persisted state.

## Choose an initial item size

```ts
import { PhiIcons } from "phoundry-ui/icons";
import ReviewCardsView from "./ReviewCardsView.svelte";

export const reviewCardsView: FileBrowserViewProvider = {
  type: "view",
  id: "acme.review-cards",
  name: "Review cards",
  priority: 100,
  icon: PhiIcons.document,
  component: ReviewCardsView,
  defaultItemSizePreset: "md",
};
```

Available presets are:

```ts
type ViewItemSizePreset = "xs" | "sm" | "md" | "lg";
```

Choose the smallest preset that comfortably communicates the view's primary information:

| Preset | Typical use |
| --- | --- |
| `xs` | dense rows, compact timelines, or text-first items |
| `sm` | small cards with one secondary value |
| `md` | general-purpose cards or previews |
| `lg` | image-first layouts where visual inspection is the task |

The preset seeds the pane the first time it uses the provider. After that, Phials preserves the user's size for the pane or active saved view.

## Consume the effective size

Use `pane.view.itemSize` in the component. It is the effective size in CSS pixels after Phials resolves the provider preset, user adjustment, pane state, and any saved-view override.

```svelte
<script lang="ts">
  let { pane }: FileBrowserViewProps = $props();

  const cardStyle = $derived(
    `grid-template-columns: repeat(auto-fill, minmax(${pane.view.itemSize}px, 1fr))`,
  );
</script>

<div class="grid gap-3 p-3" style={cardStyle}>
  <!-- cards -->
</div>
```

Treat the value as a layout input, not a setting you own. Do not copy it into plugin storage or hard-code a separate slider. The Explorer's item-size control updates the pane context and handles persistence.

If the view uses more than one dimension, derive secondary measurements from the effective size:

```ts
const previewHeight = Math.round(pane.view.itemSize * 0.72);
```

Use reasonable minimums for labels and controls so the smallest setting remains operable.

## Limit a view to Workspace Folders

Some layouts require a Workspace Folder's property schema. A board grouped by a property, a calendar driven by date properties, or a review queue built from Workspace Folder metadata cannot behave meaningfully in an ordinary folder.

Mark that dependency on the provider:

```ts
import { PhiIcons } from "phoundry-ui/icons";
import EditorialBoardView from "./EditorialBoardView.svelte";

export const editorialBoardView: FileBrowserViewProvider = {
  type: "view",
  id: "acme.editorial-board",
  name: "Editorial board",
  priority: 100,
  icon: PhiIcons.document,
  component: EditorialBoardView,
  defaultItemSizePreset: "md",
  collectionOnly: true,
};
```

With `collectionOnly: true`, Phials offers the view only while the pane is browsing a Workspace Folder. If the user navigates beyond that context, Phials selects an available fallback view for the pane. Returning later can restore the Workspace Folder's persisted view.

Do not mark a view `collectionOnly` merely because it becomes richer in a Workspace Folder. A gallery that can optionally display properties should remain available in ordinary folders and adapt through `pane.workspaceFolder.active`.

## Adapt without restricting availability

Use the public context when Workspace Folder data is optional:

```svelte
<script lang="ts">
  let { pane }: FileBrowserViewProps = $props();

  const showReviewState = $derived(
    pane.workspaceFolder.active &&
      pane.workspaceFolder.properties.has("acme.review-status"),
  );
</script>
```

The view can then add the property-backed presentation only when it applies. This is preferable to hiding the entire provider when the core layout still works.

For required properties, render a useful setup state inside the Workspace Folder rather than failing:

```svelte
{#if !pane.workspaceFolder.properties.has("acme.review-status")}
  <EmptyState
    title="Add a Review status property"
    description="This board groups files by Review status."
  />
{:else}
  <EditorialBoard {pane} />
{/if}
```

The provider is available because the Workspace Folder capability exists; the component explains the smaller missing prerequisite.

## Decide whether Workspace Folder scope is required

Use `collectionOnly: true` when all of these are true:

1. The primary layout depends on Workspace Folder data.
2. There is no honest, useful ordinary-folder version of the view.
3. The view can explain and recover from a missing property inside a Workspace Folder.

Leave it off when:

- the layout works with ordinary [FileEntry](../../reference/sdk-type-reference/FileEntry.md) fields
- Workspace Folder properties only add optional decoration
- the provider can degrade to a simpler but still useful presentation

## Verify defaults and transitions

Test the view in at least these states:

1. A new pane selects the provider and starts at the expected size.
2. The user changes item size, changes views, and returns.
3. The pane has an active saved view with its own size.
4. The pane enters and leaves a Workspace Folder.
5. A `collectionOnly` view loses availability and Phials selects a valid fallback.
6. The Workspace Folder exists but lacks a property the component prefers.
7. Two panes use different item sizes or Workspace Folder contexts.

The important invariant is that a provider default never overwrites a deliberate pane or saved-view choice.

## SDK reference

- [FileBrowserViewProvider](../../reference/sdk-type-reference/FileBrowserViewProvider.md)
- [ViewItemSizePreset](../../reference/sdk-type-reference/ViewItemSizePreset.md)
- [PluginPaneContext](../../reference/sdk-type-reference/PluginPaneContext.md)
