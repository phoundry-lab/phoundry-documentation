---
title: "Find and customize Workspace Folders"
description: "Find Workspace Folders, refresh portable-folder discovery, and change a folder's display name or icon."
icon: phoundry-mono:vial
order: 1
ai_disclosure: true
---

# Find and customize Workspace Folders

A **Workspace Folder** is a normal folder Phials has set up with **Workspace Folder data** such as properties, notes, relations, and saved views. Phials remembers each one so you can return to it and use its data across the app.

## Let Phials set up a folder when needed

Use a Workspace Folder feature in an ordinary folder, such as adding a property, rating a file, or opening a Page that needs a per-file note. Phials prepares locally stored Workspace Folder data and continues the action. The folder's ordinary contents do not change.

If you want to prepare a folder before using one of those features, open its menu in the file view and choose **Create Workspace Folder**. Manual setup is optional.

## Open a known Workspace Folder

Workspace Folders appear under **Workspaces** in the **Navigator**, the named panel that also contains Favorites, Locations, Saved searches, and Layouts. Choose an entry to open the folder.

You can also add the **Workspaces** panel to a dock. It presents known Workspace Folders as expandable groups so you can inspect their immediate files and nested Workspace Folders without first opening each root. For help adding or moving panels, see [Arrange docks and panels](../../arrange-and-customize-phials/arrange-your-window/arrange-docks-and-panels.md).

Phials adds a Workspace Folder to these lists when it sets up the folder or encounters an existing portable folder. You do not need to maintain a separate list yourself.

## Refresh Workspace Folder discovery

Choose **Refresh Workspaces** from the control beside the Navigator's **Workspaces** heading when a portable Workspace Folder under your home folder is not listed. Phials keeps registered locally stored folders and scans your home folder for portable ones.

If the portable folder is outside your home folder, open it directly. Phials recognizes its portable data and adds it to Workspaces. If Phials cannot read the location, resolve the access problem first; see [Fix file and folder access problems](../../reference/troubleshoot-phials/fix-file-and-folder-access-problems.md).

## Change the displayed name or icon

Customize how a Workspace Folder appears in Phials without renaming it on disk:

1. Open the Workspace Folder's menu in the Navigator or Workspaces panel.
2. Choose **Edit Workspace Folder…**.
3. Enter the name you want Phials to display. You can also choose an icon and icon color.
4. Choose **Save**.

The display name and icon are part of the Workspace Folder data, so they travel with a portable folder. Clearing the custom name makes Phials use the folder's current filesystem name again. Neither choice renames or changes the ordinary folder.
