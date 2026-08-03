---
title: "Arrange docks and panels"
description: "Show, resize, group, move, and close panels in the left, right, and bottom docks."
icon: phoundry-mono:settings
order: 1
aliases:
  - customizing/arranging-panels
ai_disclosure: true
---

# Arrange docks and panels

Use the **left dock**, **right dock**, and **bottom dock** to keep supporting panels around the center. A **panel** is a named surface such as Navigator, File, Page, Tags, or Terminal while it occupies a dock.

## Show, hide, and resize docks

Choose a dock toggle in the window chrome to show or hide that dock. You can also run **Toggle Left Dock**, **Toggle Right Dock**, or **Toggle Bottom Dock** from the Command Bar.

Hiding a dock does not close its panels or discard their state. Show the dock again to continue where you left off.

To resize a dock, drag the boundary between it and the center. Side docks retain their chosen width, and the bottom dock retains its height. The bottom dock also provides **Maximize** and **Restore** controls; side docks use manual resizing instead.

## Add or group panels

Open the options menu in a dock's panel tab bar, choose **Add panel**, then choose the panel you want. Phials activates the new panel and opens the dock if needed.

Several panels can share one tab strip. Drag a panel's tab icon within the strip to reorder it, or onto another panel group's tab strip to place the panels together. Choose a tab icon to bring that panel to the front.

To create another panel group, drag a panel to a split target at the edge of an expanded group. Side docks arrange split groups vertically; the bottom dock arranges them horizontally. The new group starts with half of the target group's space. Drag the divider between groups to resize them.

A sole panel cannot split its own group by moving against that same group. Add another panel or move a panel from elsewhere when you want to create the split.

In a split side dock, open the group's options menu and choose **Collapse group** to leave only its tab bar visible. Choose **Expand group** to restore its content.

## Move a panel

Drag a panel's tab icon to a compatible tab strip in another dock. You can also open its tab menu and choose **Move to**, then choose **Left Dock**, **Right Dock**, or **Bottom Dock**. Only supported destinations are offered.

Some panels can also move into the center. Choose **Center** from **Move to**, or drag the panel to a center tab group. It becomes a center tab and keeps the same state. To return an eligible center tab to a dock, open its tab menu and use **Move to Dock**.

For center placement and split behavior, see [Create tab groups and split views](./create-tab-groups-and-split-views.md).

## Close a panel

Open the panel tab's menu and choose **Close**, or middle-click its tab icon. Closing removes that panel; hiding its dock does not.

If you close the last panel in a dock's only group, the dock remains available with an empty tab strip so you can add another panel. Empty groups among several groups are removed. Closing some feature panels can also end their owned activity. For example, see [Use the Terminal](../use-tools-and-community-plugins/use-the-terminal.md) before removing a Terminal panel with running sessions.

## Understand what Phials restores

Phials saves dock visibility, dock sizes, panel placement, panel groups, and the active panel automatically. It restores that global panel arrangement after restart.

Named Layouts do not include docks or panels. Loading a Layout changes only the center, leaving this panel arrangement in place. See [Save and reuse Layouts](./save-and-reuse-layouts.md) for that boundary.
