---
title: "Move or reconnect a Workspace Folder"
description: "Preserve a Workspace Folder's identity when you rename, move, rediscover, or reconnect it."
icon: phoundry-mono:vial
order: 3
ai_disclosure: true
---

# Move or reconnect a Workspace Folder

A **Workspace Folder** is a normal folder Phials has set up with properties, notes, relations, saved views, and other Phials data. Move or rename it without losing that data by following the recovery path for its local or portable storage mode.

## Move or rename the folder in Phials

Use Phials' ordinary rename or move controls when possible. After the filesystem operation succeeds, Phials updates the registered folder location and keeps the same Workspace Folder identity. Its properties, notes, saved views, and relations remain attached.

If you move a folder that contains other registered Workspace Folders, Phials updates those locations too.

## Move a portable Workspace Folder elsewhere

A portable Workspace Folder carries its complete data bundle in its hidden `.phials` folder. Move the complete folder with a tool that preserves hidden items, then open the folder at its new location in Phials.

If the new location is under your home folder, you can instead choose **Refresh Workspaces** to rediscover it. Opening or rediscovering the moved folder reads the same stable identity from its portable data and updates Phials' association.

Do not treat two copies of the same portable Workspace Folder as independent folders. Both copies contain the same identity. Keep one as the active copy, or use the other only as a backup, to avoid divergent versions of the same Workspace Folder data.

## Reconnect locally stored data after an external move

When you move or rename a locally stored Workspace Folder outside Phials, the content folder has no portable marker that Phials can follow. The folder may appear as unavailable while its data remains safely stored in Phials Home.

To reconnect it:

1. In **Workspaces**, open the unavailable Workspace Folder's menu.
2. Choose **Locate Folder…**.
3. Choose the moved original folder at its new location.

Phials associates the retained data with that folder and restores the existing Workspace Folder identity. Choose the actual moved folder, not a different folder with similar contents. Phials will not reconnect it to a location already owned by another Workspace Folder.

If the folder is still in its expected location but appears unavailable, verify that the drive, server, cloud location, or folder permission is available before reconnecting it. See [Fix file and folder access problems](../../reference/troubleshoot-phials/fix-file-and-folder-access-problems.md).

Moves and reconnections preserve Workspace Folder identity. Cross-folder Relations become available again when both the source and target Workspace Folders are present. If you removed the original Phials data and later set up the folder again, that creates a new identity instead of reconnecting the old one.
