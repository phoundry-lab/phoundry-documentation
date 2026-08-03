---
title: "Flatten folder contents"
description: "Move a folder's immediate contents up one level and send the empty folder to Trash."
icon: phoundry-mono:folder
order: 6
ai_disclosure: true
---

# Flatten folder contents

Flattening removes one level of folder structure. Phials moves every item immediately inside a folder into its parent, then sends the now-empty folder to Trash.

For example, flattening `Projects/Archive` moves the items inside `Archive` into `Projects`. It does not unpack the contents of subfolders.

> **Warning:** Flattening changes the location of every item in the folder and is not reversible as one action. If the parent already has an item with the same name, Phials keeps both by auto-renaming the moved item. Review the folder and its parent before continuing.

## Flatten one folder

1. Select the folder.
2. Open its context menu and choose **Folder Utilities** > **Flatten Directory**.
3. Review the confirmation, then choose **Flatten**.

## Flatten several folders

1. Select two or more folders.
2. Open the context menu and choose **Folder Utilities** > **Flatten Directories**.
3. Review the number of folders, then choose **Flatten**.

Phials preserves ratings and tags for files it moves. Other path-based references can need attention after the operation.

Flattening processes items and selected folders in sequence. If an operation fails partway through, some items might already be in their parent while others remain in the original folder. Refresh the Explorer tab and inspect both locations before retrying. The original folder can remain empty if Phials cannot send it to Trash.
