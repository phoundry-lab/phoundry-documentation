---
title: "Built-in command reference"
description: "Look up every shipped user-facing Phials command, its purpose, availability, and principal surface."
icon: phoundry-mono:sliders
order: 1
ai_disclosure: true
---

# Built-in command reference

This reference lists the user-facing commands that ship with Phials. It does not include developer commands or commands added by community plugins.

Most available commands can be found by opening the [Command Bar](../../arrange-and-customize-phials/customize-commands-and-shortcuts/find-and-run-commands-with-the-command-bar.md). A command may be hidden or disabled until its required tab, folder, file, or selection is active. The **Principal surface** column names another place where a command normally appears; it is not an exhaustive list.

## Application and window

| Command | Purpose | Availability | Principal surface |
| --- | --- | --- | --- |
| Open Command Bar | Search for and run available commands. | Any Phials window. | Keyboard shortcut |
| Help | Open Phials help. | Any Phials window. | Keyboard shortcut |
| Settings | Open the Settings window. | Any Phials window. | Keyboard shortcut |
| Toggle Hidden Files | Show or hide filesystem items whose names begin with a period. | Any Explorer tab. | Command Bar |
| Toggle Parent Directory | Show or hide the `..` entry in folder listings. | Any Explorer tab. | Command Bar |
| Toggle Left Panel | Show or hide the Navigator dock. | Any main window. | Keyboard shortcut |
| Toggle Right Panel | Show or hide the File dock. | Any main window. | Keyboard shortcut |
| Toggle Bottom Panel | Show or hide the bottom dock; opening an empty bottom dock also opens Terminal. | Any main window. | Keyboard shortcut |
| Zoom In | Increase the scale of the entire Phials interface. | Any Phials window. | Keyboard shortcut |
| Zoom Out | Decrease the scale of the entire Phials interface. | Any Phials window. | Keyboard shortcut |
| Reset Zoom | Return the interface to 100% scale. | Any Phials window. | Keyboard shortcut |
| Refresh DOM | Reload the current Phials window. | Any Phials window. | Command Bar |
| Open config.toml | Open the hand-editable preferences file in the default editor. | Any Phials window. | Command Bar |
| Reveal Phials home folder | Reveal the active Phials data folder in Finder, File Explorer, or the Linux file manager. | Any Phials window. | Command Bar |

## Tabs and tab groups

| Command | Purpose | Availability | Principal surface |
| --- | --- | --- | --- |
| New Tab | Open a new Explorer tab. | Any main window. | Keyboard shortcut |
| Close Tab | Close the active tab. | When a tab is active. | Keyboard shortcut |
| Next Tab | Switch to the next tab in the active tab group, wrapping at the end. | A tab group with at least two tabs. | Keyboard shortcut |
| Previous Tab | Switch to the previous tab in the active tab group, wrapping at the beginning. | A tab group with at least two tabs. | Keyboard shortcut |
| Duplicate Tab | Duplicate the active tab and its current state. | When a tab is active. | Command Bar |
| Move to New Group → Left | Split the current Layout to the left and move the active tab into the new tab group. | A movable tab and enough room to split left. | Command Bar |
| Move to New Group → Right | Split the current Layout to the right and move the active tab into the new tab group. | A movable tab and enough room to split right. | Command Bar |
| Move to New Group → Above | Split the current Layout above and move the active tab into the new tab group. | A movable tab and enough room to split above. | Command Bar |
| Move to New Group → Below | Split the current Layout below and move the active tab into the new tab group. | A movable tab and enough room to split below. | Command Bar |
| Switch to Tab 1 | Switch to the first tab in the active tab group. | When the first tab exists. | Keyboard shortcut |
| Switch to Tab 2 | Switch to the second tab in the active tab group. | When the second tab exists. | Keyboard shortcut |
| Switch to Tab 3 | Switch to the third tab in the active tab group. | When the third tab exists. | Keyboard shortcut |
| Switch to Tab 4 | Switch to the fourth tab in the active tab group. | When the fourth tab exists. | Keyboard shortcut |
| Switch to Tab 5 | Switch to the fifth tab in the active tab group. | When the fifth tab exists. | Keyboard shortcut |
| Switch to Tab 6 | Switch to the sixth tab in the active tab group. | When the sixth tab exists. | Keyboard shortcut |
| Switch to Tab 7 | Switch to the seventh tab in the active tab group. | When the seventh tab exists. | Keyboard shortcut |
| Switch to Tab 8 | Switch to the eighth tab in the active tab group. | When the eighth tab exists. | Keyboard shortcut |
| Switch to Tab 9 | Switch to the ninth tab in the active tab group. | When the ninth tab exists. | Keyboard shortcut |

## Navigation and search

| Command | Purpose | Availability | Principal surface |
| --- | --- | --- | --- |
| Go Back | Return to the previous folder in the active Explorer pane's history. | After navigating away from a folder. | Path Bar |
| Go Forward | Move to the next folder in the active Explorer pane's history. | After going back. | Path Bar |
| Go Up | Open the current folder's parent. | When the current folder has a parent. | Path Bar |
| Refresh | Rescan the current folder. | When an Explorer pane has a current folder. | Path Bar |
| Go to Home | Open the operating-system home folder. | Any Explorer tab. | Command Bar |
| Go to Path... | Reserved for navigating directly to a path. The current build registers this command and shortcut but does not yet open path entry. | Not currently functional. | Command Bar |
| Search | Open or close the search controls in the Path Bar. | Any Explorer tab. | Path Bar |
| Focus search | Clear the current search and put keyboard focus in the search field. | Any Explorer tab. | Keyboard shortcut |

## Selection and clipboard

| Command | Purpose | Availability | Principal surface |
| --- | --- | --- | --- |
| Select All | Select every selectable item in the current file view; the `..` entry is excluded. | An active Explorer tab with listed items. | File context menu |
| Cut | Mark the selected files and folders to be moved on paste. | One or more selected items other than `..`. | File context menu, Path Bar |
| Copy | Mark the selected files and folders to be duplicated on paste. | One or more selected items other than `..`. | File context menu, Path Bar |
| Paste | Move or copy the clipboard items into a selected folder, or into the current folder when no folder is selected. | After using Cut, Copy, or Copy as symlink in Phials. | File context menu, Path Bar |
| Copy as symlink | Prepare symbolic links to the selected files and folders for creation on paste. | One or more selected items other than `..`. | File context menu |
| Copy path | Copy one selected item's full path as text. | One selected item. | File context menu |
| Copy Paths | Copy the selected items' full paths as newline-separated text. | Multiple selected items other than `..`. | File context menu |

## Files, folders, and archives

| Command | Purpose | Availability | Principal surface |
| --- | --- | --- | --- |
| Open | Open the selected file with its operating-system default application. | One selected file. | File context menu |
| Open in… | Choose another installed application for the selected file. | One selected file; Phials reports when no other application is available. | Command Bar, file context menu |
| Open in Finder / Open in File Explorer / Open in File Manager | Reveal the selected item in the platform's file manager. The label follows the operating system. | One selected item other than `..`. | File context menu |
| Rename | Rename the selected file or folder. | One selected item other than `..`. | File context menu |
| Move to Trash | Move one or more selected items to the operating-system trash after confirmation. | One or more selected items other than `..`. | File context menu |
| Pin to Favorites | Add a shortcut to the selected file or folder in Favorites. | One selected item that is not already a favorite. | File context menu |
| Unpin from Favorites | Remove the selected item's shortcut from Favorites without changing the item on disk. | One selected item that is already a favorite. | File context menu |
| Expand Archive | Extract a supported ZIP, TAR, GZ, TGZ, or 7Z archive into its containing folder. | One selected supported archive. | File context menu |
| Compress | Create a ZIP, TAR.GZ, or 7Z archive from the selected items. | One or more selected items other than `..`. | File context menu |
| Flatten Directory / Flatten Directories | Move each selected folder's contents into its parent, then remove the empty folder. | One selected folder, or at least two selected folders, excluding `..`. | File context menu under **Folder Utilities** |

## Create files and folder tools

The **New** group in the Path Bar and Command Bar contains the following commands.

| Command | Purpose | Availability | Principal surface |
| --- | --- | --- | --- |
| Folder | Create a folder in the current location. | An Explorer pane with a current folder. | **New** group |
| Markdown File | Create a Markdown file, open its file tab, and focus the editor. | An Explorer pane with a current folder. | **New** group |
| Spreadsheet (CSV) | Create a CSV file in the current folder. | An Explorer pane with a current folder. | **New** group |
| Create Workspace Folder | Turn the current folder, or a selected ordinary folder, into a Workspace Folder. | A current folder or one selected folder that is not already a Workspace Folder. | **New** group, file context menu |
| New saved view | Save the current view settings under a name for this folder. | An Explorer pane with a current folder. | **New** group |

The **Add Property** group contains these property-type commands:

| Command | Purpose | Availability |
| --- | --- | --- |
| Text | Add a single-line text property. | A current folder; Phials offers to make it a Workspace Folder if needed. |
| Select | Add a single-choice option property. | A current folder. |
| Multi-select | Add a multiple-choice option property. | A current folder. |
| Tags | Add the shared Tags property. | A current folder without an existing Tags property. |
| Status | Add a workflow status property. | A current folder. |
| Rating | Add a 1–5 star Rating property. | A current folder without an existing Rating property. |
| URL | Add a clickable URL property. | A current folder. |
| Date | Add a date property with optional time or range values. | A current folder. |
| Number | Add a numeric property. | A current folder. |
| Checkbox | Add a yes-or-no checkbox property. | A current folder. |
| Relation | Add a property that connects files to another Workspace Folder. | A current folder. |
| Rollup | Add a property that summarizes values through a Relation. | A current folder with at least one Relation property. |

## File views

The **View Mode** group in the Path Bar and Command Bar contains one command for each registered file view.

| Command | Purpose | Availability | Principal surface |
| --- | --- | --- | --- |
| Details View | Show files as rows with configurable columns. | Any Explorer tab. | **View Mode** group |
| Thumbnails View | Show files as thumbnail cards. This is called **Grid view** elsewhere in the user documentation. | Any Explorer tab. | **View Mode** group |
| Masonry View | Pack ratio-aware thumbnail cards into variable-height columns. | Any Explorer tab. | **View Mode** group |
| Column View | Browse a folder branch across adjacent columns. This is called **Columns view** elsewhere in the user documentation. | Any Explorer tab. | **View Mode** group |
| Boards View | Group files into cards and columns by an option-backed property. | A Workspace Folder with properties. | **View Mode** group |
| Gallery View | Show large previews in a gallery layout. | Any Explorer tab. | **View Mode** group |
| Calendar View | Place files on a calendar using filesystem dates or date properties. | Any Explorer tab. | **View Mode** group |
| Filter | Open or close the filter controls. | Any Explorer tab. | Path Bar |
| Sort | Open or close the sort controls. | Any Explorer tab. | Path Bar |
| Configure view | Open or close settings for the active file view. | An Explorer tab that is not acting as a file picker. | Path Bar |

## Workspaces and Pages

| Command | Purpose | Availability | Principal surface |
| --- | --- | --- | --- |
| Create Workspace Folder | Turn the current or selected folder into a Workspace Folder. | A current folder or one selected ordinary folder. | **New** group, file context menu |
| Refresh Workspaces | Keep registered local Workspace Folders and rescan the home folder for portable ones. | Any Explorer tab. | Command Bar |
| Open Page | Open the selected eligible file's Page. | One selected file in a Workspace Folder. | File context menu |
| Add Property | Open the property-type choices listed above. | An Explorer pane with a current folder. | **New** group |

## Network folders

| Command | Purpose | Availability | Principal surface |
| --- | --- | --- | --- |
| Connect to Server | Mount an SMB network share. | macOS and Windows only. | Command Bar |

For factory bindings, see [Default keyboard shortcuts](./default-keyboard-shortcuts.md). To choose different bindings or change command placement, see [Customize commands and shortcuts](../../arrange-and-customize-phials/customize-commands-and-shortcuts/index.md).
