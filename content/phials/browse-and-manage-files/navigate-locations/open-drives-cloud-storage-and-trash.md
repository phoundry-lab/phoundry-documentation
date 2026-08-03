---
title: "Open drives, cloud storage, and Trash"
description: "Browse mounted drives, local cloud-sync folders, and System Trash from Locations in the Navigator panel."
icon: phoundry-mono:folder
order: 3
ai_disclosure: true
---

# Open drives, cloud storage, and Trash

The **Locations** area in the Navigator panel collects browsable storage roots. It can include your computer's internal storage, external drives, mounted disk images, network volumes, local cloud-sync folders, and System Trash when the platform supports browsing it in Phials.

## Open a drive or mounted volume

Choose a row under **Locations** to browse it in the active Explorer tab. Middle-click a row to open it in a new Explorer tab.

Right-click a location to:

- Open it in Phials.
- Open it in Finder on macOS or File Explorer on Windows.
- Copy its filesystem path.

On macOS, removable drives and disk images that Phials can eject show an eject control. Finish any file operation that uses the volume, then choose **Eject** before disconnecting it. On Windows, use File Explorer to eject removable storage; Phials does not currently eject Windows volumes.

## Open a cloud-sync folder

Phials discovers existing local cloud-sync roots and adds them to **Locations** with the provider's name and icon. On macOS, this includes iCloud Drive and provider folders registered in the system's CloudStorage area. On Windows, it includes registered sync roots and OneDrive folders. Phials also recognizes common local folders for Dropbox, Google Drive, OneDrive, and Proton Drive when they exist.

Choose a cloud location just like another folder. The cloud provider still controls downloading, uploading, offline availability, and account access. Phials does not connect to provider accounts or show provider sync status. If no supported local sync root is present, no cloud row appears.

Cloud-location discovery is available on macOS and Windows. It does not discover cloud-sync roots on Linux.

## Browse System Trash when available

When Phials can expose the current user's System Trash as a real folder, **Trash** appears as the final row under **Locations**. Choose it to browse the trashed items in an Explorer tab.

Dropping files or folders onto **Trash** uses the operating system's normal move-to-Trash behavior. To permanently remove everything shown there, right-click **Trash**, choose **Empty Trash**, and confirm the destructive action.

The **Trash** row represents the Trash on the computer's home volume. It does not combine Trash from external volumes, and **Empty Trash** does not empty those external-volume locations. If **Trash** is not shown under **Locations**, use Finder or File Explorer to browse, restore, or empty System Trash.

To move selected items to Trash from a file listing, see [Move files to Trash](../manage-files-and-folders/move-files-to-trash.md).
