---
title: "Use saved views throughout a Workspace Folder"
description: "Use one saved-view list across a Workspace Folder and understand portability, refresh, and per-tab activation."
icon: phoundry-mono:vial
order: 5
ai_disclosure: true
---

# Use saved views throughout a Workspace Folder

A **Workspace Folder** is a normal folder Phials has set up with **Workspace Folder data**, including saved views, properties, notes, and related information. Its root owns one saved-view list for the complete folder tree.

## Reuse one view in every subfolder

Create or activate a saved view anywhere inside the Workspace Folder. The same saved-view pills remain available as you move between its root and subfolders, and the active view stays selected. You do not need to copy the view to each subfolder.

Because the definition is shared, changing a saved view from any subfolder updates that one Workspace Folder definition. The configuration is then available everywhere in the folder tree, although different file contents can make the result look different from one subfolder to another.

The active choice is not shared. Each Explorer tab remembers its own active saved view for the Workspace Folder on that device. Two tabs can therefore show the same subfolder with different saved views, and a portable Workspace Folder does not force another device to activate the same one.

## Understand where definitions travel

Saved-view definitions are part of the Workspace Folder data. When the data is stored in Phials Home, the definitions remain with that device's Phials data. When the Workspace Folder is portable, its definitions travel with the complete portable data bundle and can synchronize with the folder through your normal file-sync system. See [Store Workspace Folder data locally or portably](../use-workspace-folders/store-workspace-folder-data-locally-or-portably.md) before changing that storage choice.

If an ordinary folder already has root-level saved views when it becomes a Workspace Folder, Phials carries those definitions into the Workspace Folder data while preserving their order and identities. Saved views previously copied into separate descendant folders are not merged into the new shared list.

## Refresh definitions changed elsewhere

An Explorer tab does not continuously poll saved-view definitions. If another open tab, another Phials instance, or a synchronized portable bundle changes them while the tab remains open, choose **Refresh** in that Explorer tab. Leaving the Workspace Folder and returning also reloads its definitions. Phials keeps the active selection when that view still exists; if it was removed, the first remaining view becomes active.

## Recover from a removed property

A saved view can refer to Workspace Folder properties in its columns, sorting, filters, grouping, Boards columns, or Calendar date source. If one of those properties is deleted, the saved view still opens, but the affected parts can no longer produce their original result. They may be omitted from the current presentation, show empty values, or require a replacement.

Choose an available property or clear the affected setting, then choose **Save view settings** to update the saved definition. Property creation and deletion are covered in [Add and configure properties](../describe-and-classify-files/add-and-configure-properties.md).
