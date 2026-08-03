---
title: "Build file views"
description: "Add an Explorer file view with selection, navigation, columns, sorting, and configuration."
ai_disclosure: true
aliases:
  - types/view
---

# Build file views

A file view changes how the Explorer presents the files in the current pane. It does not own directory reading, filtering, selection, navigation, or saved-view persistence. Phials continues to own those behaviors and gives the view a typed [PluginPaneContext](../../reference/sdk-type-reference/PluginPaneContext.md).

Build a file view when files need a genuinely different spatial or task-oriented presentation: a contact sheet, review queue, timeline, comparison table, or another layout that the built-in views cannot express. If you only need to add structured information to an existing view, consider a [metadata column](../extract-file-metadata/control-metadata-columns-and-automatic-visibility.md) first.

## What a file view owns

A file-view provider owns:

- a stable provider ID, display name, icon, and position in the view switcher
- a Svelte component that lays out the current listing
- layout-specific pointer and keyboard interactions
- optional columns and sortable values
- optional view-specific configuration rows
- an initial item-size preset
- whether the view is available outside a Workspace Folder

Phials owns:

- reading the current folder and maintaining the visible listing
- filters, searches, hidden-file rules, and the `..` parent entry
- the pane's selection anchor and selected paths
- opening files and navigating into folders
- item-size and sort persistence
- saved-view overrides
- switching to an available view when the current provider is no longer valid

This division matters. A view should render `pane.listing.entries`; it should not scan the directory itself or keep a second selection model.

## The public pane context

The component receives one prop:

```ts
interface FileBrowserViewProps {
  pane: PluginPaneContext;
}
```

The pane context exposes the current, already-projected Explorer state:

```ts
pane.listing.entries
pane.selection
pane.navigation
pane.view.itemSize
pane.view.sorting
pane.view.options
pane.workspaceFolder
```

The important rule is that this context belongs to one pane. Do not read whichever pane happens to be active globally. A file view can remain mounted while the user works in another split.

## Build the capability

Work through the articles in order:

1. [Define and register a file view](define-and-register-a-file-view.md)
2. [Render files, selection, and navigation](render-files-selection-and-navigation.md)
3. [Add view columns and sorting](add-view-columns-and-sorting.md)
4. [Add file-view configuration controls](add-file-view-configuration-controls.md)
5. [Set view defaults and Workspace Folder availability](set-view-defaults-and-workspace-folder-availability.md)

For a complete provider, start with registration, make the basic listing and interactions correct, and then add optional columns or configuration. This keeps the view useful even before it has specialized controls.

## Design for the Explorer contract

A good file view feels like another native way to browse the same pane:

- A selected file stays selected when the user changes views.
- Opening a folder navigates the current pane, not a new private browser.
- Sorting affects the complete listing, not only the currently rendered rows.
- Configuration follows the active saved view when one is active.
- Leaving a Workspace Folder never strands the pane on an unavailable view.

Use [Svelte 5 and Phoundry UI](../../get-started/use-svelte-and-phoundry-ui/index.md) for the component and configuration rows. Use [file entries](../../work-with-phials/work-with-files-and-folders/work-with-paths-and-file-entries.md) as the source of file identity and basic metadata.

## Related SDK reference

- [FileBrowserViewProvider](../../reference/sdk-type-reference/FileBrowserViewProvider.md)
- [FileBrowserViewProps](../../reference/sdk-type-reference/FileBrowserViewProps.md)
- [PluginPaneContext](../../reference/sdk-type-reference/PluginPaneContext.md)
- [ViewAPI](../../reference/sdk-type-reference/ViewAPI.md)
