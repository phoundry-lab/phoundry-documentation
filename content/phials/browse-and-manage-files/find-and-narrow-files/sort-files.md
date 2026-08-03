---
title: "Sort files"
description: "Order a File view by one or more file, metadata, or Workspace Folder fields."
icon: phoundry-mono:folder
order: 1
ai_disclosure: true
---

# Sort files

Sort criteria control the order of items in the active Explorer tab. Add more than one criterion when ties in the first field should be resolved by another field.

## Choose a sort

1. Choose **Sort** above the File view.
2. If the complete editor is not open, choose **Edit all sorts** at the start of the Sort row.
3. In **Sort by**, choose a field and **Ascending** or **Descending**.

You can sort by **Name**, **Extension**, **Size**, **Created**, **Modified**, or **Kind**. A Workspace Folder also offers its applicable properties, and available metadata fields appear when Phials has discovered them for the folder.

If **Folders First** is enabled in Settings, folders remain ahead of files. The active criteria still determine the order within the folder and file sets.

## Sort by several criteria

1. Choose **Add sort** in the complete editor.
2. Choose the next field and direction.
3. Repeat for each additional tie-breaker.

Phials applies the criteria from left to right. For example, **Kind — Ascending**, then **Name — Ascending** puts each kind together and alphabetizes items within that kind. A final Name comparison keeps otherwise equal items in a predictable order.

To change precedence, remove criteria with their close controls and add them again in the intended order. Phials does not add the same field twice.

## Reset sorting

Choose **Reset** in the complete Sort editor. Phials restores the baseline **Name — Ascending** criterion.

Sorting is part of the current File view configuration. If a saved view is active, a sort change marks that view as changed; use **Save view settings** to keep it or **Reset view** to restore the saved criteria. Without a saved view, the change belongs to the Explorer tab and is not saved as the folder's reusable configuration.

See [Update or reset a saved view](../../organize-files-with-phials/save-and-reuse-views/update-or-reset-a-saved-view.md) to keep a sort with the rest of a view.
