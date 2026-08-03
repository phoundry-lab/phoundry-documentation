---
title: "View a selected file's Page"
description: "Use the Page panel to follow Explorer selections and read each file's properties and Page body."
icon: phoundry-mono:eye
order: 1
ai_disclosure: true
---

# View a selected file's Page

Use the **Page panel** to inspect one file after another without opening a file tab for each one. It follows the selection in the active Explorer tab and combines the selected file's Workspace Folder properties with its Page body.

## Show the selected file's Page

1. Choose **Page** in a dock.
2. Select a regular file in an Explorer tab.

The Page panel shows the file when it is indexed inside a Workspace Folder. Selecting another eligible file updates the panel. A folder, the parent-folder entry, or an unindexed file does not have a Page presentation.

If the Page panel is not part of your window, add it to a dock. See [Arrange docks and panels](../../arrange-and-customize-phials/arrange-your-window/arrange-docks-and-panels.md).

## Read the Page

A Page has three parts:

- The title is the file's actual filename. Edit the title to rename the file; whether its extension appears follows the app-wide **Show File Extensions** setting.
- The property block shows Workspace Folder property values for this file. Its order and visibility are specific to Pages, not the active file view.
- The body supplies Markdown context. For an `.md`, `.markdown`, or `.mdc` file, the body is that file's contents. For another regular file, the body is a separate per-file note.

To change a value, choose it beside the property name. See [Set property values on files](../../organize-files-with-phials/describe-and-classify-files/set-property-values-on-files.md) for the controls used by each property type. For writing and saving behavior, see [Write notes about files](../../organize-files-with-phials/add-notes-and-connect-files/write-notes-about-files.md).

## Respond to an empty state

The Page panel explains why it cannot show a Page:

- **Select a file** appears when there is no regular file selected. Select an indexed file inside a Workspace Folder.
- **Not in a workspace folder** appears for a regular file outside a Workspace Folder. Choose **Open Page** to prepare the needed Workspace Folder data and open Page mode. When Phials explains what it will add, approve the setup to continue.
- **File not indexed** appears when the selected file has not been added to its Workspace Folder index. Choose **Open Page** to reconcile the file and open its Page.
- **Page open in tab** appears when the selected file's Page is already visible in Page mode. Switch that file tab to **File**, or select another file, to use the Page panel again.

Choosing **Open in Tab** in the Page panel toolbar keeps the current Page open in a file tab.
