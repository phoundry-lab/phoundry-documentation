---
title: "Choose new-tab and folder defaults"
description: "Choose where new Explorer tabs start and the fallback view, sort, and grouping for unconfigured folders."
icon: phoundry-mono:settings
order: 1
ai_disclosure: true
---

# Choose new-tab and folder defaults

Choose where a new Explorer tab begins and how Phials presents a folder before a restored tab state or saved view supplies a more specific configuration.

## Choose where new Explorer tabs start

1. Open **Settings**.
2. Under **General**, find **Startup**.
3. Set **New Tab Behavior** to one of these choices:
   - **Use Default Directory** opens every new Explorer tab at **Default Directory**.
   - **Duplicate Current Tab** opens it at the active Explorer tab's current folder.
4. If you chose **Use Default Directory**, choose **Browse** beside **Default Directory** and select a folder. Use **Reset to home** to return to your system home folder.

The behavior applies to the tab-bar **+**, the **New Tab** command, and its keyboard shortcut. It affects new Explorer tabs only; it does not move a tab that is already open or replace tabs restored from your previous session.

Despite its name, **Duplicate Current Tab** copies only the current folder as the new tab's starting point. It does not copy selection, navigation history, file-view settings, tab groups, or split views. Use [Duplicate an Explorer tab](../../browse-and-manage-files/work-with-explorer-tabs/duplicate-an-explorer-tab.md) when you want the complete Explorer-tab state copied.

If no Explorer tab is active, Phials uses the default directory instead. Leaving **Default Directory** unset means your system home folder.

## Set fallback folder presentation

In **Settings → General**, find **Defaults**, then set:

- **Explorer View Mode** for the initial file view
- **Default primary sort** to **Name**, **Size**, **Created**, **Modified**, **Extension**, or **Kind**
- **Default sort order** to **Ascending** or **Descending**
- **Default group by** to **None**, **Extension**, **Kind**, **Created**, or **Modified**

These choices supply a baseline when a folder has no more specific presentation state. A restored Explorer tab keeps its restored state, and an active saved view supplies its own view, sort, filter, and grouping. Changing these defaults does not rewrite a saved view.

Default groups start in ascending order. Change the direction in the active file view when you need a different arrangement.

To change the folder you are looking at now, use [Configure a file view](../../browse-and-manage-files/choose-and-configure-file-views/configure-a-file-view.md), [Sort files](../../browse-and-manage-files/find-and-narrow-files/sort-files.md), or [Group files](../../browse-and-manage-files/find-and-narrow-files/group-files.md). To preserve a named configuration for later use, see [Save and reuse views](../../organize-files-with-phials/save-and-reuse-views/index.md).
