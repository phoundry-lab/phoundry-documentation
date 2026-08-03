---
title: "Define and register a file view"
description: "Supplies identity, ordering, icon, component, and FileBrowserViewProvider registration."
ai_disclosure: true
order: 1
---

# Define and register a file view

A file view is a [FileBrowserViewProvider](../../reference/sdk-type-reference/FileBrowserViewProvider.md) whose component receives the current pane. Register the provider in your plugin's `providers` array.

## Create the view component

Start with a component that accepts [FileBrowserViewProps](../../reference/sdk-type-reference/FileBrowserViewProps.md). The listing and interactions come from the pane; the component only decides how to present them.

```svelte
<!-- src/ReviewCardsView.svelte -->
<script lang="ts">
  let { pane }: FileBrowserViewProps = $props();

  const files = $derived(pane.listing.entries);
</script>

<div class="grid gap-3 p-3" aria-label="Review cards">
  {#each files as file (file.path)}
    <button
      type="button"
      class={[
        "rounded-md border p-3 text-left",
        pane.selection.paths.includes(file.path)
          ? "border-accent bg-surface-selected"
          : "border-subtle bg-surface",
      ]}
      aria-pressed={pane.selection.paths.includes(file.path)}
      onclick={() => pane.selection.set([file.path])}
      ondblclick={() => pane.navigation.openPath(file.path)}
    >
      <span class="block truncate">{file.name}</span>
    </button>
  {/each}
</div>
```

The example uses Svelte's reactive props directly. When the directory, filter, search, sort, or selection changes, Phials updates the pane context and the component reacts.

## Define the provider

Keep the provider in a small TypeScript file so the identity and defaults are easy to review.

```ts
// src/review-cards-view.ts
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

Provider fields have the following responsibilities:

| Field | Purpose |
| --- | --- |
| `type` | Must be `"view"`. |
| `id` | Stable, globally unique provider identity. Namespace it to your plugin. |
| `name` | Human-readable label in the view switcher and menus. |
| `priority` | Sort position. Lower values appear first; use `100` or greater for plugin views unless adjacency is intentional. |
| `icon` | Iconify-compatible icon identifier shown by Phials. |
| `component` | Svelte component that accepts [FileBrowserViewProps](../../reference/sdk-type-reference/FileBrowserViewProps.md). |

Changing `id` creates a different provider from Phials' perspective and breaks persisted references to the old view. Treat it as part of your plugin's durable data contract. The display name, icon, and priority can evolve without changing identity.

Provider IDs share one namespace. Use a reverse-domain or organization prefix such as `com.example.review-cards` or a short, well-established organization prefix such as `acme.review-cards`.

## Register the provider

Return the provider from your plugin entry point:

```ts
// src/main.ts
import { mount, unmount } from "svelte";
import { reviewCardsView } from "./review-cards-view";

export { mount, unmount };

export default function createPlugin(): PhialsPlugin {
  return {
    id: "acme.review-tools",
    name: "Review tools",
    version: "1.0.0",
    providers: [reviewCardsView],
  };
}
```

Phials activates the plugin, validates its providers, and adds the view to the Explorer's view switcher. The component is mounted only when a pane uses the view. Separate panes can mount separate instances at the same time, so keep component state local and use the supplied `pane`.

List `reviewCardsView.icon` in the typed source manifest's `icons` field. The
runtime plugin definition does not duplicate preload metadata.

## Choose a useful priority

Priority determines ordering, not importance or exclusivity. Phials' built-in views occupy the early positions. Starting plugin views at `100` leaves room for Phials to add built-in views without interleaving them unexpectedly.

If one plugin contributes several related views, give them neighboring priorities:

```ts
const compactReviewPriority = 100;
const expandedReviewPriority = 110;
```

The provider ID is used as a stable tie-breaker when priorities match.

## Verify registration

[Run the plugin locally](../../test-and-troubleshoot/run-your-plugin-locally/index.md), then check that:

1. The view appears once in the Explorer view switcher.
2. Its label and icon communicate the layout rather than the plugin brand.
3. Selecting it mounts the component in the current pane.
4. Two split panes can use the view independently.
5. Reloading Phials preserves the selected view where the pane state is persisted.

Next, connect the component to the full [listing, selection, and navigation contract](render-files-selection-and-navigation.md).

## SDK reference

- [FileBrowserViewProvider](../../reference/sdk-type-reference/FileBrowserViewProvider.md)
- [FileBrowserViewProps](../../reference/sdk-type-reference/FileBrowserViewProps.md)
