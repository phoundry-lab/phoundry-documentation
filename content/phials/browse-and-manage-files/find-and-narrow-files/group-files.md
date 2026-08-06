---
title: "Group files"
description: "Collect files into collapsible sections while preserving their active sort order."
icon: phoundry-mono:folder
order: 3
ai_disclosure: true
---

# Group files

Grouping divides the active File view into labeled sections. It changes presentation only: files stay in their original folders, and the active sort still controls their order inside each group.

## Choose a grouping field

1. Choose **Group** above the File view.
2. Choose a field under **File properties** or **Workspace properties**.

Built-in choices are **Extension**, **Kind**, **Created**, and **Modified**. In a Workspace Folder, Phials also offers option, multi-option, tag, date, checkbox, and rating properties.

Files without a value appear in a final section such as **No Extension**, **No Date**, or **No Status**. Grouping by a multi-option or Tags property can place the same file in more than one group.

## Change group order

Open **Group**, then choose **Ascending** or **Descending** under **Direction**. This changes the order of the group sections, not the order of files inside them. Option-backed groups follow the configured option order; date groups use periods such as **Today**, **Yesterday**, and **This Week**.

To change order inside every group, configure [Sort files](./sort-files.md). For example, group by **Kind** and sort by **Modified — Descending** to show the newest items first within each kind.

## Collapse or expand a group

Choose a group header to collapse its files, then choose it again to expand them. Details, Grid, Masonry, and Columns views let you collapse each group independently.

When a saved view is active, collapsed groups save automatically as view state and do not mark the view as changed. The grouping field and direction are part of the view configuration; use **Save view settings** to keep those choices.

## Remove grouping

Open **Group** and choose **None**. Phials returns to one continuous File view using the active sort order.
