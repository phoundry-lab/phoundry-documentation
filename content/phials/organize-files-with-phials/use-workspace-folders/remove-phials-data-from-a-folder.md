---
title: "Remove Phials data from a folder"
description: "Remove a folder's Workspace Folder data without deleting its ordinary files and folders."
icon: phoundry-mono:vial
order: 5
ai_disclosure: true
---

# Remove Phials data from a folder

Remove **Workspace Folder data**, such as properties, notes, relations, and saved views, when you want a folder to remain ordinary filesystem content without its Phials features. Phials moves the complete data bundle to the system Trash and removes the folder from known Workspaces. It does not move, modify, or delete the ordinary content folder.

This action removes the folder's ratings, tags, property definitions and values, notes, Page configuration, saved views, display name and icon, and relation data. Treat it as destructive. Back up the Workspace Folder first if you may need that information again; recreating Workspace Folder data later produces a new identity and does not recover the removed connections.

## Remove data from an available folder

1. Open the Workspace Folder's menu in the Navigator or Workspaces panel.
2. Choose **Remove Phials data…**.
3. Review the folder name and the listed data-loss boundary.
4. Choose **Move data to Trash**.

For locally stored data, Phials moves the folder's bundle out of Phials Home. For portable data, Phials moves the hidden `.phials` bundle out of the content folder. In both cases, the ordinary files and subfolders stay where they are.

If moving the bundle to Trash fails, Phials keeps the data association instead of removing only its record. Resolve the reported access problem and try again.

## Remove data for a missing local folder

If a locally stored Workspace Folder is unavailable, its data can still remain in Phials Home. In **Workspaces**, open the unavailable folder's menu, choose **Remove Phials data…**, and confirm with **Move data to Trash**. The unavailable content folder is not affected.

## Forget an unavailable portable folder

Phials cannot move portable data to Trash while the folder that contains it is unavailable. In **Workspaces**, open the unavailable folder's menu, choose **Forget**, then confirm **Forget missing folder?** with **Forget**.

Forgetting removes only Phials' record of the unavailable folder. The portable `.phials` data remains with that folder. If the folder becomes available later, opening it or rediscovering it under your home folder adds it to Workspaces again with its existing identity.

Restoring removed data requires the complete bundle, not only the ordinary folder. Before emptying the system Trash, see [Back up and restore Workspace Folder data](./back-up-and-restore-workspace-folder-data.md) and [Workspace Folder data and portable bundles](../../reference/phials-data-and-storage/workspace-folder-data-and-portable-bundles.md) for the storage boundary.
