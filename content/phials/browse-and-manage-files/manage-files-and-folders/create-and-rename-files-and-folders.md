---
title: "Create and rename files and folders"
description: "Create folders, Markdown files, or CSV spreadsheets and rename existing items."
icon: phoundry-mono:folder
order: 1
ai_disclosure: true
---

# Create and rename files and folders

Use the **New** menu to create an item in the folder you are browsing. Renaming from Phials keeps its path-aware features in step with the filesystem change.

## Create a folder or file

1. Open the destination in an Explorer tab.
2. Choose **New** from the toolbar, or open the context menu for the destination folder and choose **New**.
3. Choose one of the filesystem items:
   - **Folder**
   - **Markdown File**
   - **Spreadsheet (CSV)**

> **Warning:** Before you choose **Create**, check that the destination does not already contain a file with that name. Creating a file writes directly to the resulting filename.

4. Enter a name, then choose **Create**.

Phials adds `.md` or `.csv` when the name does not already end with the expected extension. A new Markdown file opens in a file tab with the editor focused.

## Rename an item

1. Select one file or folder.
2. Choose **Rename** from its context menu. You can also press `F2`.
3. Enter the complete new name. For a file, include its extension.
4. Confirm the rename.

Phials refreshes the folder and updates the selected item. It also updates path-based features such as Favorites and Recents, moves file ratings and tags to the new path, and updates an open file tab when that surface owns the rename. Renaming a registered Workspace Folder updates its registered location.

If the new name is already in use, Phials leaves the original item unchanged. A name cannot be empty or contain a path separator.
