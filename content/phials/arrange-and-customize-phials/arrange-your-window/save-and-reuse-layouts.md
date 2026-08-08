---
title: "Create and switch Layouts"
description: "Create, switch, duplicate, rename, customize, and delete autosaved center Layouts."
icon: phoundry-mono:settings
order: 3
aliases:
  - basic-use/layouts
ai_disclosure: true
---

# Create and switch Layouts

A **Layout** is a named, automatically saved center environment. It includes tab groups, center tabs, active tabs, split proportions, Explorer locations and history, file-view state, pinning, and serializable state kept by eligible center tabs.

Exactly one Layout is active. Changes to the center are saved into that Layout as you work, so switching away and returning brings you back to where you left it. Layouts do not include the left, right, or bottom docks; those panels and their arrangement remain global.

## Start with the Default Layout

A fresh Phials profile begins with an ordinary Layout named **Default**. You can use, rename, customize, or duplicate it like any other Layout. The active Layout and the final remaining Layout cannot be deleted, so the catalog always has a center environment to restore.

## Create a new Layout

1. In the Navigator panel, expand **Layouts**.
2. Choose the add button beside **Layouts**.
3. Enter a unique name in **New Layout**, then choose **Create**.

Phials finishes and saves the outgoing Layout, then creates and activates a clean Layout with one Explorer tab. The Explorer opens the configured default directory, or your system home folder when no default directory is set. **Duplicate Current Tab** does not affect New Layout.

Layout names ignore surrounding spaces and must be unique regardless of capitalization.

## Switch Layouts

Choose an inactive Layout in the Navigator, or open its menu and choose **Switch to Layout**. Switching replaces the complete center rather than merging arrangements. The Navigator uses its ordinary active-row styling to show the active Layout.

Phials prepares the destination before changing the live center and runs the normal finalization guard for editable tabs. If preparation fails, work cannot be finalized, or you cancel a prompt, the current Layout stays active. Docks and panels do not move.

If Phials cannot save the outgoing Layout, it blocks the switch and offers **Retry**, **Discard Layout Changes**, or **Return to Phials**. Discard returns that Layout to its last successfully persisted center state before retrying the transition.

## Duplicate a Layout

Open any Layout's menu and choose **Duplicate Layout**, then enter a unique name. Phials inserts the independent copy immediately after its source and activates it.

The duplicate begins with the source's complete persisted center state, icon, and color. It receives new internal identities for its tab groups, tabs, Explorer panes, and center module instances, so later changes do not alter the source. Serializable module state is copied; ephemeral resources such as live Terminal processes restart rather than becoming a second connection to the same resource.

## Rename or customize a Layout

Open the Layout's menu and choose **Edit Layout**. Change its display name, icon, or icon color, then choose **Save**. Names remain case-insensitively unique. Identity changes do not disturb the center environment.

## Delete a Layout

Open an inactive Layout's menu, choose **Delete Layout**, then confirm **Delete**. Deletion cannot be undone. You cannot delete the active Layout or the final remaining Layout; switch to another Layout first when necessary.

## Layouts and saved views

| System                       | What it remembers                                                 | How it changes                                     |
| ---------------------------- | ----------------------------------------------------------------- | -------------------------------------------------- |
| **Layout**                   | One named complete center environment, excluding docks            | Automatically while that Layout is active          |
| **Global panel arrangement** | Dock visibility, size, panel placement, groups, and active panels | Automatically as you arrange panels                |
| **Saved view**               | How files appear in one folder or Workspace Folder scope          | Through the saved-view controls in an Explorer tab |

There is no separate unnamed center session, Save Layout, Update Layout, or Reload Layout operation. Restart restoration opens the active Layout where it was last saved. Use [Create tab groups and split views](./create-tab-groups-and-split-views.md) to arrange its center. Use [Save and reuse views](../../organize-files-with-phials/save-and-reuse-views/index.md) when you want a reusable folder presentation rather than a complete center environment.
