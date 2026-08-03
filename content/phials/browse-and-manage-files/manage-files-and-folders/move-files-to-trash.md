---
title: "Move files to Trash"
description: "Send files and folders to the system Trash, then find or restore them with system tools."
icon: phoundry-mono:folder
order: 4
ai_disclosure: true
---

# Move files to Trash

**Move to Trash** removes items from their current folder without permanently deleting them. Phials uses your operating system's Trash or Recycle Bin.

## Move one or more items to Trash

1. Select the files and folders.
2. Choose **Move to Trash** from the context menu.
3. Review the confirmation. For a folder, its complete contents will move with it.
4. Choose **Move to Trash**.

You can also use `Command-Delete` on macOS or `Delete` on Windows and Linux.

Phials refreshes the folder and clears the selection. A Favorite that points to a trashed item becomes unavailable; a Favorite for a trashed folder is removed. File ratings and tags associated with a single-item Trash action are removed from the active Workspace Folder data.

## Find or restore a trashed item

When Phials shows **Trash** at the end of **Locations**, select it to browse your home-volume Trash. On platforms where Phials cannot browse Trash directly, open Trash or Recycle Bin in your system file manager.

Use your operating system's restore action to return an item. If you restore it to a different path, path-based Phials features can continue to show the old location until you update or recreate them. Refresh the relevant Explorer tab after restoring an item outside Phials.

Emptying Trash permanently deletes its contents. If you use **Empty Trash** from Phials, the confirmation applies only to the displayed home-volume Trash; Trash on other mounted volumes is not included.

See [Open drives, cloud storage, and Trash](../navigate-locations/open-drives-cloud-storage-and-trash.md) for more about the **Locations** section.
