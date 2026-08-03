---
title: "Store Workspace Folder data locally or portably"
description: "Choose whether a Workspace Folder's Phials data stays in Phials Home or travels inside the folder."
icon: phoundry-mono:vial
order: 2
ai_disclosure: true
---

# Store Workspace Folder data locally or portably

A **Workspace Folder** is a normal folder Phials has set up with **Workspace Folder data**, such as properties, notes, relations, and saved views. Choose local storage when you want the content folder to remain free of Phials-owned files. Choose portable storage when its data needs to travel with the folder through copies, backups, or synchronization.

Phials uses local storage by default. Both choices keep the same ratings, tags, properties, notes, relations, saved views, display identity, and stable Workspace Folder identity.

| Choice | Where the Workspace Folder data stays | Practical effect |
| --- | --- | --- |
| Stored in Phials Home | Outside the content folder, with this Phials installation | Copying only the content folder does not include its Workspace Folder data. The folder itself receives no Phials marker. |
| Portable | In a hidden `.phials` folder inside the Workspace Folder | Copying or synchronizing the complete folder can carry its Workspace Folder data with it. The copy tool must include hidden items. |

See [Workspace Folder data and portable bundles](../../reference/phials-data-and-storage/workspace-folder-data-and-portable-bundles.md) for the complete bundle contents and exact storage locations.

## Make a Workspace Folder portable

1. Open the Workspace Folder's menu in the Navigator or Workspaces panel.
2. Choose **Make portable**.
3. Keep the Workspace Folder in place until the conversion finishes.

Phials moves the complete data bundle into the hidden `.phials` folder and preserves the Workspace Folder's identity. If Phials cannot validate or complete the move, it keeps the original storage association instead of switching to a partial bundle.

Do not edit, rename, or move items inside `.phials` separately. When copying, synchronizing, or backing up the Workspace Folder, confirm that the hidden folder is included.

## Store portable data in Phials Home again

1. Open the Workspace Folder's menu in the Navigator or Workspaces panel.
2. Choose **Store in Phials Home**.
3. Keep the Workspace Folder available until the conversion finishes.

Phials moves the complete bundle into Phials Home and removes the portable bundle from the content folder after the conversion succeeds. The display identity, file identities, saved views, notes, properties, and relations remain associated with the same Workspace Folder.

For backup decisions, local storage means protecting the content folder and its Phials Home data as separate items. Portable storage means protecting the complete folder, including `.phials`. See [Back up and restore Workspace Folder data](./back-up-and-restore-workspace-folder-data.md).
