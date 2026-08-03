---
title: "Use Columns view"
description: "Follow a folder branch across adjacent columns before committing to a new Explorer path."
icon: phoundry-mono:folder
order: 3
ai_disclosure: true
---

# Use Columns view

Columns view lays out each level of a folder branch in an adjacent column. Use it to look several levels ahead while keeping the Explorer tab anchored at its current path.

Open **Configure view** in the toolbar, choose **View mode**, then choose **Columns**.

## Follow a folder branch

Choose a folder once to reveal its contents in the next column. Continue choosing folders to extend the branch to the right.

This traversal is temporary: the path bar and navigation history do not change while you are only extending the branch. It lets you inspect a destination before committing to it.

Double-click a folder when you want to make it the Explorer tab's current location. Phials then updates the path bar and adds one entry to the tab's navigation history.

Using the path bar, **Go Back**, **Go Forward**, or **Go Up** also commits normal navigation and starts a new Columns branch from that location. For those controls, see [Navigate folders and paths](../navigate-locations/navigate-folders-and-paths.md).

## Select files within a column

Choose a file to select it for previews, properties, and file commands. Modifier and range selection work within the directory shown by that column.

A selection cannot span multiple directory columns. Choosing a file in another column clears the previous column's selection. Choosing another folder branch also clears a file selection that no longer belongs to the active column.

## Understand what is remembered

The temporary branch remains available while Columns view stays mounted, including when you switch to another Explorer tab and return. It is not added to navigation history and is not restored after you leave Columns view, navigate elsewhere, or restart Phials.

Columns view does not currently offer property-visibility or view-specific presentation controls. The app-wide **File visibility** settings in **General options** still apply.
