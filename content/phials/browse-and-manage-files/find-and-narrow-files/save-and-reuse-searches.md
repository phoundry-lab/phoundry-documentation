---
title: "Save and reuse searches"
description: "Name a search configuration and apply or manage it from the Navigator."
icon: phoundry-mono:folder
order: 5
ai_disclosure: true
---

# Save and reuse searches

A **saved search** keeps a query, its scope and matching options, and its search-specific filter tree. It does not keep the current File view mode, sorting, grouping, or selection.

## Save a search

1. Run a non-empty search and finish configuring its scope, target, mode, options, and filters.
2. Choose **Save** in the Search row.
3. Enter a name, then confirm.

The **Saved searches** section appears in the Navigator after you save the first search. Saved searches remain available across app restarts on this device.

A **This folder** search remembers the folder where you saved it. An **All files** search keeps its home-folder scope instead of a starting folder.

## Apply a saved search

Choose the search in **Saved searches**. Phials opens the Search row and runs the stored query automatically. For **This folder**, it first returns the destination Explorer tab to the remembered folder.

Phials applies a saved search to the most recently used unpinned Explorer tab in the active tab group. If no unpinned Explorer tab is available, it creates one, leaving pinned tabs unchanged.

The Navigator highlights a saved search while the active Explorer tab matches all of its stored settings. Editing the query, options, or filters removes that highlight without changing the saved search.

## Pin, rename, duplicate, or delete

Open a saved search's context menu, then choose:

- **Pin** to place it before unpinned searches, or **Unpin** to return it to the ordinary list.
- **Rename** to change only its Navigator label.
- **Duplicate** to create an unpinned copy named `Copy of` the original.

> **Warning:** Deleting a saved search cannot be undone. It removes only the stored search configuration; it does not delete matching files.

Choose **Delete**, review the named search, then confirm.

Saved searches are distinct from [saved views](../../organize-files-with-phials/save-and-reuse-views/create-and-switch-saved-views.md), which store how a folder's File view is configured, and from Layouts, which store a window arrangement.
