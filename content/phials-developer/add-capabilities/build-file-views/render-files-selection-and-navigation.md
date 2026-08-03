---
title: "Render files, selection, and navigation"
description: "Consumes the public Explorer context, presents the current listing efficiently, and preserves expected selection and navigation behavior."
ai_disclosure: true
order: 2
---

# Render files, selection, and navigation

Render the files from `pane.listing.entries`. This is the current pane's visible listing after Phials applies directory loading, search, filters, hidden-file rules, and the active sort. Keeping that projection host-owned lets selection and navigation remain consistent across every file view.

## Render the current listing

```svelte
<script lang="ts">
  let { pane }: FileBrowserViewProps = $props();

  const files = $derived(pane.listing.entries);

  function select(file: FileEntry, event: MouseEvent) {
    const toggle = event.metaKey || event.ctrlKey;
    const selected = pane.selection.paths.includes(file.path);
    pane.selection.set(
      toggle
        ? selected
          ? pane.selection.paths.filter((path) => path !== file.path)
          : [...pane.selection.paths, file.path]
        : [file.path],
    );
  }

  function open(file: FileEntry) {
    void pane.navigation.openPath(file.path);
  }
</script>

<div
  class="grid grid-cols-[repeat(auto-fill,minmax(12rem,1fr))] gap-2 p-2"
  role="listbox"
  aria-label="Files"
  aria-multiselectable="true"
>
  {#each files as file (file.path)}
    <button
      type="button"
      role="option"
      aria-selected={pane.selection.isSelected(file.path)}
      class={[
        "min-w-0 rounded-md p-3 text-left",
        pane.selection.isSelected(file.path)
          ? "bg-surface-selected text-primary"
          : "bg-surface hover:bg-surface-hover",
      ]}
      onclick={(event) => select(file, event)}
      ondblclick={() => open(file)}
    >
      <span class="block truncate font-medium">{file.name}</span>
      <span class="block truncate text-sm text-secondary">{file.path}</span>
    </button>
  {/each}
</div>
```

Key the loop by `file.path`. Names can repeat, and a file can move to a different position after sorting without becoming a different item.

[FileEntry](../../reference/sdk-type-reference/FileEntry.md) tells you whether an entry is a file, folder, symbolic link, Workspace Folder, or the `..` parent entry. It also includes basic metadata such as size, modification time, MIME type, and category. See [Work with paths and file entries](../../work-with-phials/work-with-files-and-folders/work-with-paths-and-file-entries.md).

## Use the shared selection model

The pane's selection API carries selection across views. Use it for every selection change:

```ts
pane.selection.paths.includes(file.path);
pane.selection.set([file.path]);
pane.selection.set([...pane.selection.paths, file.path]);
pane.selection.clear();
pane.selection.selectAll();
```

Build toggle or range updates from `pane.selection.paths` and the complete `pane.listing.entries`, then commit the resulting ordered paths once with `set()`. Do not calculate ranges from only mounted DOM elements.

For a pointer-driven view:

- A plain click selects one entry.
- Command-click or Control-click toggles an entry.
- Shift-click extends the range.
- Clicking empty space clears selection when that is natural for the layout.
- Context-click selects an unselected target before showing actions.

Use `pane.selection.entries[0]` only when the layout explicitly accepts the first selected file.

## Navigate through the pane

Call `pane.navigation.openPath(file.path)` for the view's primary open gesture. Phials applies the correct behavior for the entry:

- folders and the `..` entry navigate the current pane
- files open through the configured file action
- Workspace Folder boundaries remain attached to the pane
- navigation history is updated

Use `pane.navigation.navigateTo(path)` only when your layout presents an explicit folder destination rather than an existing [FileEntry](../../reference/sdk-type-reference/FileEntry.md).

```ts
await pane.navigation.navigateTo(destinationPath);
```

Never replace `window.location`, construct a private directory reader, or open files by guessing an operating-system command. The pane API preserves Phials' navigation, file-action, and safety rules.

## Add layout-appropriate keyboard navigation

The view owns the relationship between keys and spatial movement because only the view understands its layout. Keep the result consistent with the Explorer:

- Arrow keys move focus by one logical item, row, or column.
- Home and End move to the beginning or end of the relevant sequence.
- Enter calls `pane.navigation.openPath` for the focused entry.
- Space selects or toggles the focused entry without opening it.
- Shift extends selection; Command or Control toggles it.
- Focus remains visible after scrolling.

Update selection through `pane.selection`; do not store a second selected-path set in component state. Local state is appropriate for ephemeral layout details such as the focused index, a drag target, or an open disclosure row.

Use semantic roles and labels that match the layout. A card wall can be a `listbox`; a tabular view should use a grid or table pattern. Phoundry UI supplies the shared focus, menu, tooltip, and surface primitives described in [Use Svelte 5 and Phoundry UI](../../get-started/use-svelte-and-phoundry-ui/index.md).

## Render large listings efficiently

`pane.listing.entries` can contain a large directory. Follow these rules:

1. Consume the supplied projection. Do not sort, filter, or reread the directory in every component update.
2. Key items by path.
3. Keep row components shallow and derive only the values they display.
4. Virtualize long one-dimensional lists and dense grids. Keep the full `items` array as the source for range selection while mounting only the visible window plus a small overscan.
5. Avoid one asynchronous request per mounted row. Use provider-backed metadata already present on the entry, or batch and cache enrichment.
6. Use `pane.view.itemSize` as the effective item dimension instead of maintaining a separate zoom preference.

When virtualization changes the mounted range, preserve focus by file path rather than DOM position. Scrolling an item out of view must not deselect it.

## Handle listing changes

The listing can change while the component remains mounted: the user can navigate, search, change filters, sort, reveal hidden files, or modify the directory on disk. Treat `pane.listing.entries` as replaceable reactive input.

If the focused path disappears:

- keep any surviving selection owned by `pane.selection`
- move local focus to the nearest sensible visible entry
- do not restore an entry that Phials removed from the listing

If the listing is empty, render a quiet empty state that explains the current result. Phials owns directory-loading and fatal-error surfaces around the view; the component should not duplicate them.

Next, add declarative [columns and sorting](add-view-columns-and-sorting.md) when the layout exposes comparable file values.

## SDK reference

- [PluginPaneContext](../../reference/sdk-type-reference/PluginPaneContext.md)
- [FileEntry](../../reference/sdk-type-reference/FileEntry.md)
