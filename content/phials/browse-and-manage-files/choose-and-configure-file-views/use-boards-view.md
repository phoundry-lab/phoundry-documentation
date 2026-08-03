---
title: "Use Boards view"
description: "Group Workspace Folder files into option-based columns and update values by moving cards."
icon: phoundry-mono:folder
order: 4
ai_disclosure: true
---

# Use Boards view

Boards view turns the options of a Workspace Folder property into columns. Use it to track files through a workflow, assign them to categories, or scan tags as a board.

Boards is available when the Explorer tab is inside a Workspace Folder that has properties. Open **Configure view** in the toolbar, choose **View mode**, then choose **Boards**.

## Choose the board columns

Boards can use a **Status**, **Select**, **Multi-Select**, or **Tags** property. Each option becomes a column, followed by a **No _property_** column for files without a value. Each column header shows its option and file count.

If the active saved view already groups by an eligible property, Boards uses that property. Otherwise, it chooses the first suitable property in this order: Status, Select, Tags, then Multi-Select.

To choose a different grouping property, activate a saved view, choose **Group** in the toolbar, then choose the property. To keep and reuse that arrangement, see [Create and switch saved views](../../organize-files-with-phials/save-and-reuse-views/create-and-switch-saved-views.md).

If the Workspace Folder has no eligible property, choose **Configure Grouping**. In **Configure Board Columns**, create a Status, Select, Multi-Select, or Tags property.

## Read board cards

Each card shows the filename. The other properties shown on cards come from **Property visibility** in **Configure view**, in the same order as the visible-property list.

Boards leaves out the Name property, the property that already defines the columns, and automatically added file information. Empty values are also omitted.

## Change a file's property by moving its card

Drag a card to another column to update the grouping property:

- For Status and Select, the destination replaces the current value. Moving the card to the **No _property_** column clears it.
- For Multi-Select and Tags, the destination option is added, so a file can appear in more than one column.

Moving a card within the same column does not set a manual order. The board continues to use the listing's current sort order.

Choose a card once to select it for file commands and property details. Open it in the usual way to open the file.
