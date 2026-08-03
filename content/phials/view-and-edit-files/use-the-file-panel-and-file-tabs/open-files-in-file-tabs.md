---
title: "Open files in file tabs"
description: "Keep a file open in File mode, reuse or pin its file tab, and understand what Phials restores."
icon: phoundry-mono:eye
order: 2
ai_disclosure: true
---

# Open files in file tabs

A **file tab** keeps one file open in the center while you browse elsewhere. The tab is named for the file and contains both **File** and **Page** modes.

## Open a file in File mode

For a direct route from a selection-following inspection:

1. Select the file in an Explorer tab.
2. Choose **Open in Tab** in the File panel toolbar.

The file tab opens in **File** mode. A file whose primary **Open** action uses Phials also opens this way; see [Open files in Phials or another app](../../browse-and-manage-files/manage-files-and-folders/open-files-in-phials-or-another-app.md) for the other destinations.

Phials keeps one file tab for the same file. Opening that file again focuses its existing tab, even if it is in another tab group, and switches it to File mode instead of creating a duplicate.

## Work in File mode

File mode presents the underlying file through its available viewer or editor. When metadata is available, it appears above the file representation. The toolbar combines the **File** and **Page** switcher with controls for the current viewer or editor.

Choose **File options**, then toggle **Compact properties** to change the metadata layout in this file tab. Phials saves that choice with the tab. **Show All** and **Show Less** only change which supported metadata fields are currently visible; the Show All state resets when the subject changes.

Viewer and editor controls vary by file type. Continue with [View and inspect files](../view-and-inspect-files/index.md) or [Edit files in Phials](../edit-files-in-phials/index.md) for those procedures.

Choose **Page** when you want the same file's Workspace Folder properties and body. File and Page are modes of one tab, and each keeps its own working state as you switch. See [Use Pages](../use-pages/index.md) for Page procedures.

## Keep a tab from being replaced

When you open another file, Phials can reuse the active unpinned file tab if its viewer or editor is in a safe state. To keep that tab on its current file, open the tab menu and choose **Pin Tab**. Choose **Unpin Tab** when contextual reuse is acceptable again.

Pinning protects the file tab from replacement. It is not required for session restoration.

When a file is renamed or moved within Phials, an indexed file tab retains the file's stable identity and follows the changed path.

## Close or restore file tabs

Open the tab menu and choose **Close Tab** to close one file tab. Before closing or replacing a tab, Phials asks its active editor to finish or confirm pending work. If the work cannot be finalized, the tab remains open.

Phials restores both pinned and unpinned file tabs with the window session. It preserves their tab-group placement, active File or Page mode, compatible viewer, Page body mode and scroll position, and the File metadata layout choice.

If the saved viewer is no longer available, Phials falls back to another compatible viewer when possible. If it cannot resolve a saved Workspace Folder or indexed file, it keeps the tab in an unavailable state rather than silently attaching it to a different file. Choose **Close Tab** when you no longer need that unavailable tab.
