---
title: "Add and organize favorites"
description: "Keep shortcuts to important files and folders in the Navigator panel and arrange them into favorite groups."
icon: phoundry-mono:folder
order: 1
aliases:
  - basic-use/favorites
ai_disclosure: true
---

# Add and organize favorites

A favorite is a shortcut to a file or folder. It keeps the original item in place and gives you a faster way to reach it from the Navigator panel.

## Pin a file or folder

1. In an Explorer tab, select one file or folder.
2. Right-click it and choose **Pin to Favorites**.
3. Choose **Top level**, an existing favorite group, or **New Group**.

The favorite appears under **Favorites** in the Navigator panel. **Pin to Favorites** in the command bar adds the selected item at the top level.

Choose a favorite that points to a folder to navigate there in the current Explorer tab. Choose a favorite that points to a file to open it with the same behavior Phials normally uses for that file type. Middle-click a favorite that points to a folder to open it in a new Explorer tab.

Removing a favorite removes only the shortcut. It does not remove the original file or folder.

## Create and arrange favorite groups

A favorite group organizes shortcuts inside Phials; it does not create a folder on disk.

1. Choose **New Group** in the **Favorites** header.
2. Enter a name.
3. Drag favorites into the group.

Drag favorites to reorder them, move them between groups, or return them to the top level. Drag favorite groups to reorder the groups. Favorite groups cannot be nested.

Choose a favorite group to expand or collapse it. Right-click one to rename it, expand or collapse it, or delete it. Deleting a group removes the favorites inside it, but it does not affect their original files or folders.

## Customize a favorite

Right-click a favorite and choose **Edit** to change its display name, icon, or icon color. These changes affect only the shortcut.

For a favorite that points to a folder, **Edit** also lets you choose a different target folder. A favorite that points to a file keeps its original target path; remove and pin the file again if you need the shortcut to point somewhere else.

You can also right-click a favorite to copy its path, open it in Finder or File Explorer, move it to another favorite group, or choose **Remove from Favorites**.

## If a favorite becomes unavailable

When you rename or move a favorite target in Phials, Phials updates the shortcut to follow it. Changes made in another app cannot always be tracked.

An unavailable favorite that points to a file remains listed with a warning instead of being removed automatically. Choosing it shows **File unavailable** and its stored path. Reconnect the drive or network share, restore the file to that path, or choose **Remove from Favorites**. You can still copy the stored path while the file is unavailable.
