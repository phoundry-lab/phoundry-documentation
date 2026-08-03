---
title: "Use Select, Multi-select, and Status properties"
description: "Create reusable colored choices for single values, multiple values, or workflow states."
icon: phoundry-mono:vial
order: 3
ai_disclosure: true
---

# Use Select, Multi-select, and Status properties

Use option-backed properties when a consistent set of choices is more useful than free-form text. Every option has a label and color, and changing an option updates its presentation everywhere that property appears in the Workspace Folder.

## Choose the property type

- **Select** stores one choice, such as a department or content type.
- **Multi-select** stores any number of choices, such as skills or channels.
- **Status** stores one workflow state, such as Not started, In progress, or Done.

Create the chosen type through **New** > **Add Property**, as described in [Add and configure properties](./add-and-configure-properties.md).

## Create and choose options while editing a file

1. Choose the property's value in Details, Grid, File, or Page.
2. Search for an existing option and choose it.
3. If the choice does not exist, enter its label and choose **Create \"label\"**.

For Select and Status, choosing an option replaces the previous choice and closes the list. For Multi-select, the list stays open so you can add or remove several choices.

## Configure reusable options

Open the property's name menu and choose **Configure property…**, or open **Configure view** > **Properties** and choose its settings control.

- Choose **Add option**, enter a label, then confirm it. Phials appends the new option to the list.
- Use an option's overflow control to rename it or change its color. Label changes save when you press Enter or leave the field; press Escape to restore the saved label.
- Drag Select or Multi-select options to change their order. You cannot reorder while a search is narrowing the list. Status options cannot be reordered.

The configured order is reused in value menus and other property surfaces. Renaming or recoloring an option also updates every file that uses it because files store the option itself, not a copy of its label.

## Delete an option

Deleting an option immediately removes that choice from every file using it in this Workspace Folder. There is no confirmation for Select, Multi-select, or Status options, and the removal cannot be undone.

Open the option's overflow control, then choose **Delete option**.

Tags use a separate shared vocabulary and a broader deletion boundary. See [Tag files across Workspace Folders](./tag-files-across-workspace-folders.md) before changing or deleting tag definitions.
