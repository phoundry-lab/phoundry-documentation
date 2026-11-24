---
title: "Move, copy, and link files"
description: "Move or copy items between Phials locations, or create symbolic links to them."
icon: phoundry-mono:folder
order: 2
ai_disclosure: true
---

# Move, copy, and link files

Drag files for quick spatial moves, or use **Cut**, **Copy**, and **Paste** when the destination is not visible. Phials refreshes affected Explorer tabs after the operation.

## Drag to move or copy

Drag selected items to any of these destinations:

- A folder in a view such as Details, Grid, or Columns
- The open folder's background
- A location in the Navigator
- A folder in the breadcrumb path
- Another Explorer tab

A drag that starts in Phials moves items by default. To copy instead, hold `Option` on macOS or `Ctrl` on Windows and Linux while you drop.

If the destination contains items with the same names, Phials asks you to choose **Replace existing files**, **Skip these files**, or **Keep both (auto-rename)**. Replacing moves the existing destination items to Trash before writing the incoming items.

Phials prevents a folder from being moved into itself or one of its descendants.

## Bring in files from another app

On desktop, drop files or folders from your system’s file manager to copy them into the current local folder or a location in the Navigator. You can also drop an image from a browser if it provides an image file or an image address Phials can download.

Select your own computer in the device menu before dropping items. If you drop local files while browsing another computer, Phials opens the files on this device. To add files to a folder on that computer, use a transfer method outside Phials.

## Use Cut, Copy, and Paste

1. Select the items and choose **Cut** or **Copy**.
2. Open the destination folder.
3. Choose **Paste**.

If one folder is selected when you paste, Phials uses that folder as the destination. Otherwise, it uses the folder you are browsing. Name conflicts from clipboard paste are kept as auto-renamed copies.

Moving items from within Phials updates Favorites that point to them. Moves between Workspace Folders also reconcile the affected Workspace Folder data after the files arrive.

## Create symbolic links

A symbolic link points to the original file or folder without copying its contents.

1. Select one or more source items.
2. Choose **Copy as symlink** from the context menu.
3. Open the destination folder and choose **Paste**.

Phials creates absolute links with the same names as the source items. If a name is already present, the new link is auto-renamed. The link stops resolving if the original item later moves or is removed outside an operation that updates the link.

On Windows, creating symbolic links can require permission from the operating system. If the paste fails, enable the Windows setting or privilege that allows your account to create symbolic links, then try again.
