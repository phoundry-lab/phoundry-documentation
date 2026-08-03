---
title: "Create and switch saved views"
description: "Capture a folder's current file-view configuration as a named saved view and switch between saved configurations."
icon: phoundry-mono:vial
order: 1
ai_disclosure: true
---

# Create and switch saved views

Create a **saved view**, a named file-view configuration, when you want to return to the same presentation without rebuilding it. An ordinary folder owns its own saved-view list. A **Workspace Folder**, a normal folder Phials has set up with shared Phials data, uses one list across its complete folder tree.

## Create a saved view

First, arrange the current folder as you want it. A saved view can capture the current view mode, sort and filter rules, grouping, item size, Calendar date source and scale, Details columns, collapsed groups, and related presentation state. For the controls that build this state, see [Configure a file view](../../browse-and-manage-files/choose-and-configure-file-views/configure-a-file-view.md), [Sort files](../../browse-and-manage-files/find-and-narrow-files/sort-files.md), [Filter files](../../browse-and-manage-files/find-and-narrow-files/filter-files.md), and [Group files](../../browse-and-manage-files/find-and-narrow-files/group-files.md).

1. In a folder with no saved views, choose **Create saved view** in the saved views strip. If the folder already has views, choose the **+** at the end of the strip.
2. In **Create View**, keep or replace the suggested name. The suggestion uses the selected view mode, adding a number when that name is already present.
3. Keep the current view mode or choose another one, then choose **Create**.

Phials creates and activates the view. If you chose a different view mode in the dialog, the new view uses that mode's default item size while retaining the applicable current sort, filter, grouping, and column state.

A saved view does not capture selected files, tab navigation history, or a live search query. Use [Save and reuse searches](../../browse-and-manage-files/find-and-narrow-files/save-and-reuse-searches.md) when the query itself is what you need to keep.

## Switch saved views

Choose a saved-view pill to activate it. Phials applies its stored configuration to the current Explorer tab. When the strip is too narrow, use the saved-view dropdown; the active view remains identified by name and icon.

When a folder has at least one saved view, exactly one is active. Choosing the active pill opens its menu instead of turning it off. If Phials cannot restore a previously active view, such as after that view was deleted elsewhere, it activates the first remaining view. A folder with no saved views uses your default folder-view settings.

The active choice belongs to each **Explorer tab**, a tab that browses one location, rather than to the folder globally. Two tabs showing the same folder can use different saved views, and Phials remembers each tab's choice when you leave and return to that folder or restore your session.
