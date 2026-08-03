---
title: "Add and configure properties"
description: "Create a Workspace Folder property, choose its type, and change its name, icon, or options."
icon: phoundry-mono:vial
order: 1
aliases:
  - vials/properties
ai_disclosure: true
---

# Add and configure properties

A **property** is a field you define for files in one Workspace Folder. Add a property when you want to record information that Phials cannot read from the files themselves, such as a project owner, review date, or approval status.

## Add a property

1. Browse the folder whose files you want to describe.
2. Choose **New** in the Path Bar, then choose **Add Property**.
3. Choose the type of value the property will hold.

If the folder does not already have Workspace Folder data, Phials prepares it and continues creating the property. The new property becomes visible in the current file view.

Choose a type based on the values you need:

- **Text**, **Number**, **Date**, **Checkbox**, and **URL** store ordinary single values.
- **Select** stores one reusable choice. **Multi-select** stores several choices. **Status** stores one workflow state. See [Use Select, Multi-select, and Status properties](./use-select-multi-select-and-status-properties.md).
- **Rating** stores one to five stars. **Tags** stores shared labels. A Workspace Folder can have only one property of each of these types.
- **Relation** connects files, and **Rollup** summarizes values from connected files. See [Connect files with Relations](../add-notes-and-connect-files/connect-files-with-relations.md) and [Summarize connected files with Rollups](../add-notes-and-connect-files/summarize-connected-files-with-rollups.md).

A property's type cannot be changed after creation. If you need a different type, create a replacement property and set its values before deleting the original.

## Open a property's configuration

Use the entry point nearest to where you are working:

- Open **Configure view**, choose **Properties**, then choose the settings control beside the Workspace property.
- In Details view, open the property column's header menu and choose **Configure property…**.
- In a File or Page property list, choose the property name, then choose **Configure property…**.

In **Configure property**, choose an icon and edit the display name. Phials saves the name when you press Enter or leave the field; press Escape before leaving the field to restore the last saved name.

Choice-based properties also show their reusable options here. For option creation, colors, ordering, and deletion, see [Use Select, Multi-select, and Status properties](./use-select-multi-select-and-status-properties.md). Rating has no additional configuration. Tags add icon-aware shared options, covered in [Tag files across Workspace Folders](./tag-files-across-workspace-folders.md).

## Delete a property

Deleting a property removes its definition and all values stored for that property in the Workspace Folder. This cannot be undone. If a Relation feeds a Rollup, deleting the Relation also leaves the named Rollup unavailable until you configure a new source.

1. Open **Configure property** for the property you want to remove.
2. Choose the Delete icon.
3. Review the confirmation, then choose **Delete**.

Deleting a property does not change the files themselves or remove file metadata that Phials reads from them.
