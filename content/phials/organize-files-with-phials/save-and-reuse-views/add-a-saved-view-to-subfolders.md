---
title: "Add a saved view to subfolders"
description: "Copy one saved view into immediate or nested subfolders while preserving existing same-named views."
icon: phoundry-mono:vial
order: 4
ai_disclosure: true
---

# Add a saved view to subfolders

Copy a **saved view** to other ordinary folders when several parts of a folder tree should begin with the same configuration. Each recipient gets an independent copy, so later edits in one folder do not change the others.

This action is available only when the current folder has its own saved-view list. It is not offered inside a **Workspace Folder**, a normal folder set up with shared Phials data, because the Workspace Folder already uses one list throughout its folder tree. See [Use saved views throughout a Workspace Folder](./use-saved-views-throughout-a-workspace-folder.md) for that behavior.

## Choose the subfolders

1. Open the source saved view's menu and choose **Add view to subdirectories**.
2. In the dialog, choose **Immediate subfolders only** or **All nested subfolders**.
3. Review the folder count, then choose **Continue**.

The count follows the same file-visibility rules as Explorer. Hidden folders are included only when hidden files are shown, and folders excluded by your hidden-name patterns are not targeted. The current folder is not included because it already owns the source view.

If no eligible subfolders exist, the dialog shows **No subdirectories to update** and leaves **Continue** unavailable. If the count is 100 or more, Phials warns that the operation may take a while.

## Monitor or cancel the copy

Phials shows the current folder, numeric progress, and a progress bar while it copies. A target folder that already contains a saved view with the same name is skipped rather than overwritten. Other write failures are recorded while Phials continues with the remaining folders.

Choose **Cancel** to stop before the remaining folders are processed. Cancellation does not roll back copies already completed. The final summary reports how many views were added, skipped because the name exists, failed, or were not processed. Expand **Failed paths** when you need to identify folders that require another attempt.

Each successful target receives the source view's full stored configuration, automatically saved state, columns, icon, and saved-view-specific options under a new identity. The copied view does not become active in that folder. Explorer tabs already showing an affected folder reload their saved-view list without changing their active selection.
