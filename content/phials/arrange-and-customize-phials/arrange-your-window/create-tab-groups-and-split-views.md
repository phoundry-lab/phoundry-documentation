---
title: "Create tab groups and split views"
description: "Reorder center tabs, create and resize tab groups, and manage intentional empty groups."
icon: phoundry-mono:settings
order: 2
ai_disclosure: true
---

# Create tab groups and split views

Every center tab belongs to a **tab group**. Two or more tab groups form a **split view**, allowing an Explorer tab, file tab, Help, Terminal, or another eligible tab to remain visible beside another.

## Create a tab group

For the shortest non-pointer path:

1. Open the menu for the tab you want to move.
2. Choose **Move to New Group**.
3. Choose **Left**, **Right**, **Above**, or **Below**.

Phials creates a group beside the current one and moves the existing tab into it. The two groups begin at equal size. Only the targeted region splits; other groups keep their proportions.

The command is unavailable when that tab is the only tab in its group, because moving it would not leave content on both sides. Open or move another tab into the group first. A direction is also unavailable when there is not enough space to keep both resulting groups usable.

You can create the same local split by dragging a center tab to the corresponding edge of a non-empty tab group. The highlighted placeholder shows the new group's position before you drop.

## Reorder or move tabs

- Drag a tab along its own tab bar to change its order.
- Drag a tab onto another group's tab bar to move it into that group.
- Drag a tab to another group's edge to create a new group there.

Moving a tab preserves the same tab and its state; it does not duplicate the tab. Use **Duplicate Tab** when you want an independent copy.

Eligible panels can move between a dock and a center tab group without losing their state. Explorer tabs remain center-only. See [Arrange docks and panels](./arrange-docks-and-panels.md) for dock placement.

## Resize a split view

Drag the divider between neighboring groups. Phials limits the divider so neither group becomes too small to use, then remembers the resulting proportion.

Split views can contain further local splits rather than being limited to a fixed two- or four-region preset. New splits remain subject to the available window size.

## Work with an empty group

Closing the last tab in the entire center leaves one **Empty group** with a **New Tab** control. Phials does not immediately reopen an Explorer tab.

Most empty groups in a multi-group split are removed automatically. An edge move that intentionally leaves its source group empty can preserve that group as a future destination. Use **New Tab** to fill it, drag a tab into it, or choose **Close Group** to remove it. The final root group cannot be removed.

For the complete tab-closing and restart behavior, see [Close tabs and restore your session](../../browse-and-manage-files/work-with-explorer-tabs/close-tabs-and-restore-your-session.md).

## Restore or save the arrangement

Phials automatically restores the live tab groups, open tabs, active tabs, intentional empty groups, and divider proportions after restart. This is session restoration, not a named Layout.

Use [Save and reuse Layouts](./save-and-reuse-layouts.md) when you want to return to a specific named center arrangement rather than whichever split view was open when you last quit.
