---
title: "Set property values on files"
description: "Edit Workspace Folder property values from Details, Grid, File, and Page surfaces."
icon: phoundry-mono:vial
order: 2
ai_disclosure: true
---

# Set property values on files

Set property values to describe one file without changing its name, location, contents, or embedded metadata. Phials saves each value as Workspace Folder data for that file.

If the field you need does not exist, [add and configure the property](./add-and-configure-properties.md) first.

## Choose where to edit

You can edit the same Workspace Folder properties from several surfaces:

- **Details view** is best for comparing many files. Make the property visible through **Configure view** > **Properties**, then choose the file's cell in that column.
- **Grid view** is useful while browsing visual cards. Make the property visible, point to a card, then choose **Edit properties**.
- The **File panel** shows the selected file's property list alongside its file presentation.
- The **Page panel** and Page mode show properties above the Page body. Choose a value beside its property name.
- The file-explorer context menu's **Edit Property** submenu is best when you want to set the same value on several files at once. See [Set a property value on several files at once](#set-a-property-value-on-several-files-at-once) below.

For the view-specific controls, see [Use Details view](../../browse-and-manage-files/choose-and-configure-file-views/use-details-view.md), [Use Grid view](../../browse-and-manage-files/choose-and-configure-file-views/use-grid-view.md), or [Choose which properties appear on Pages](../../view-and-edit-files/use-pages/choose-which-properties-appear-on-pages.md).

## Enter or clear a value

- For **Text**, **Number**, and **URL**, choose the value, enter the replacement, then press Enter or leave the field. Press Escape before leaving the field to discard that edit. Remove all text to clear the value.
- For **Date**, choose a start date and optionally a time or end date. Use the date control's clear action to remove the value.
- For **Checkbox**, choose the box to turn it on or off.
- For **Select** and **Status**, choose one reusable option. **Multi-select** and **Tags** let you choose several options; choose a selected option again to remove it.
- For **Rating**, choose one to five stars. Choose the current star again to clear the rating.

Relation values connect files and Rollup values are read-only. See [Connect files with Relations](../add-notes-and-connect-files/connect-files-with-relations.md) and [Summarize connected files with Rollups](../add-notes-and-connect-files/summarize-connected-files-with-rollups.md) for those workflows.

Edits apply to the file whose cell, card, File presentation, or Page you are editing. Selecting several files does not apply one value to all of them on these surfaces; edit each file separately, or use **Edit Property** from the context menu to change several files at once (below).

Property values move with the file when Phials can preserve its identity inside the Workspace Folder. They do not become embedded file metadata.

## Set a property value on several files at once

Select one or more files or folders inside a Workspace Folder, right-click the selection, and choose **Edit Property**. The submenu lists every property defined for that Workspace Folder, in the same order as **Configure properties**.

- Choosing a value-bearing property (Text, Number, URL, Checkbox, Rating, Select, Status, Multi-select, Tags, Date, or Relation) opens that property's editor. If every selected file currently shares the same value, the editor starts with that value already filled in; otherwise it starts empty.
- Committing a value (for example, choosing an option, entering text, or checking the box) **replaces** that property's value on every selected file, including clearing it if you leave the value empty. This is different from Details, Grid, File, and Page, which only ever edit one file at a time.
- Choosing **Formula** or **Rollup** opens that property's definition editor instead of a value editor — these are shortcuts to [Add and configure properties](./add-and-configure-properties.md), and they do not change any file's value.
- If a value cannot be saved to every selected file, Phials keeps the values that did save, shows an error naming how many files failed, and leaves the editor open so you can retry.

**Edit Property** only appears when the selection is inside a Workspace Folder that has at least one property, and only for indexed files and folders in that selection.
