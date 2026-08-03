---
title: "Back up and restore Workspace Folder data"
description: "Back up a complete Workspace Folder and restore its files, Workspace Folder data, identity, and connections."
icon: phoundry-mono:vial
order: 4
ai_disclosure: true
---

# Back up and restore Workspace Folder data

A **Workspace Folder** is a normal folder Phials has set up with **Workspace Folder data**. A complete backup protects both the ordinary content folder and the data Phials associates with it. Keep the complete data bundle together so properties, notes, saved views, the display name and icon, and connections between files remain usable after restoration.

Quit Phials before copying or restoring Workspace Folder data. This prevents a property, note, saved view, or other change from occurring partway through the copy.

## Back up locally stored Workspace Folder data

Locally stored data stays in Phials Home rather than inside the content folder. To protect one locally stored Workspace Folder:

1. Quit Phials.
2. Back up the ordinary content folder.
3. Back up its complete Workspace Folder data bundle from Phials Home.
4. Keep both copies from the same point in time.

For recovery after a full device loss, reset, or new installation, also protect the Phials Home information that associates a local bundle with its content folder. A whole-Phials backup is often simpler than selecting one local bundle by hand. See [Back up and restore Phials data](../../reference/phials-data-and-storage/back-up-and-restore-phials-data.md) for the exact files and consistency boundary.

## Back up a portable Workspace Folder

A portable Workspace Folder keeps its complete data bundle in the hidden `.phials` folder. Quit Phials, then back up the complete content folder with a tool that includes hidden items. A copy that omits `.phials` contains the ordinary files but not their properties, notes, saved views, or other Workspace Folder data.

## Restore locally stored data

Restoring can replace newer Workspace Folder data. Before you overwrite an existing bundle or content folder, preserve the current version as a separate safety copy.

1. Quit Phials.
2. Restore the ordinary content folder.
3. Restore its complete local data bundle to the matching place in Phials Home.
4. Open Phials and open the Workspace Folder.

If the content folder now has a different location but the original Phials Home registration is intact, use **Locate Folder…** to reconnect it. If you are restoring to a new or reset installation, restore the matching Phials Home registration data before opening Phials; a local bundle alone does not identify which content folder it belongs to.

## Restore portable data

1. Quit Phials.
2. Restore the complete folder, including its hidden `.phials` data.
3. Open the restored folder in Phials. If it is under your home folder, **Refresh Workspaces** can also rediscover it.

The restored portable bundle carries its Workspace Folder identity. Do not use the restored folder and another surviving copy as two independent Workspace Folders because both have that same identity.

## Back up connected Workspace Folders together

A Relation identifies both the connected file and its Workspace Folder. When a workflow depends on Relations across folders, back up all connected Workspace Folders at the same point in time. If a target folder is absent after restoration, its connected values can appear unavailable. Restoring or rediscovering that folder with its original identity makes those connections resolvable again.
