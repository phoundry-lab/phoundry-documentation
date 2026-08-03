---
title: "Navigate folders and paths"
description: "Use Explorer history, breadcrumb segments, or a typed path to reach a folder."
icon: phoundry-mono:folder
order: 2
ai_disclosure: true
---

# Navigate folders and paths

The path bar above a file listing shows where the active Explorer tab is and provides several ways to move through folders.

## Move through navigation history

Use the navigation controls at the start of the path bar:

- **Go Back** returns to the previous folder in this Explorer tab.
- **Go Forward** returns to the next folder after you have gone back.
- **Go Up** opens the current folder's parent.

The default shortcuts are:

| Action | macOS | Windows |
| --- | --- | --- |
| Go Back | Command-[ | Alt-Left Arrow |
| Go Forward | Command-] | Alt-Right Arrow |
| Go Up | Command-Up Arrow | Alt-Up Arrow |

Each Explorer tab keeps its own path and navigation history. Switching tabs does not mix their histories. If you go back and then navigate to a different folder, that new route replaces the forward history for that tab.

## Use breadcrumb segments

The breadcrumb in the path bar divides the current path into clickable folders. Choose any segment to jump directly to that folder.

Long paths collapse some middle folders behind an ellipsis. Choose the ellipsis to see and open one of those folders. The final segment is the folder currently shown in the Explorer tab.

## Type or paste a path

1. Click empty space inside the final breadcrumb area.
2. Type or paste a folder path.
3. Press Enter.

Phials accepts absolute paths, a home-relative path beginning with `~`, and paths surrounded by quotation marks. The path must resolve to an existing folder. If it points to a file or a folder that does not exist, Phials shows **Invalid path** and leaves the Explorer tab at its current location.

Press Escape before submitting to cancel path entry.

## Open a location in another Explorer tab

Middle-click a folder, drive, cloud location, network share, or other browsable row in the Navigator panel to open it in a new Explorer tab. The new tab becomes active and starts its own navigation history. For more tab controls, see [Open and switch Explorer tabs](../work-with-explorer-tabs/open-and-switch-explorer-tabs.md).
