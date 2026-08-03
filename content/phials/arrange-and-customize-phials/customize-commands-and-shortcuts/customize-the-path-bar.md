---
title: "Customize the Path Bar"
description: "Choose which commands appear after the Path Bar breadcrumb, arrange them, and create command dropdowns."
icon: phoundry-mono:settings
order: 2
aliases:
  - customizing/path-bar-tab-bar
ai_disclosure: true
---

# Customize the Path Bar

Keep frequently used commands beside the current location in each Explorer tab. The **Path Bar** always starts with Back, Forward when forward history exists, Up, and the breadcrumb. These navigation controls are fixed; your customizable items appear after the breadcrumb.

## Open Path Bar settings

Open the Path Bar's context menu and choose **Edit Path Bar**. You can also open Settings, then choose **Path Bar** under **Commands**.

The **Path Bar** area at the top shows the current custom items in visual order. **Available Items** contains commands that have not already been placed, plus three repeatable layout items:

- **Separator** adds a visual divider.
- **Spacer** adds flexible space between items.
- **Dropdown** creates a menu that can contain several commands.

## Add, arrange, or remove items

1. Use **Search commands...** if you need to narrow **Available Items**.
2. Drag a command or layout item into the **Path Bar** area.
3. Drag items within that area to put them in the order you want.
4. Select an item to open **Selected Item** and change its available options.

Changes apply to normal Explorer Path Bars as you make them; there is no Apply or Save step. A command can appear only once, either directly in the Path Bar or inside one custom dropdown. While it is placed, Phials removes it from **Available Items**.

To remove an item, select it and choose the delete button in **Selected Item**, or focus its item in the **Path Bar** area and press Delete or Backspace. You can also open a custom Path Bar item's context menu in the main window and choose **Remove**.

## Change an item's appearance

For a selected command, you can choose another icon, turn on **Show label**, and enter a **Label**. If the command opens its own menu, **Show Chevron** controls whether the dropdown indicator appears.

For a selected **Dropdown**, choose its icon and label, then drag commands from **Available Items** into its **Commands** area. You can reorder those commands or remove one with its close button. Dropdowns collect commands only; they do not create custom sub-toolbars.

Separators and spacers do not have appearance options.

## What happens when space is limited

As an Explorer tab becomes narrower, Phials hides decorative separators first, may collapse custom commands to icons, and then moves custom actions into **More actions**. The fixed navigation controls and breadcrumb remain in the Path Bar. Widening the tab restores items to their configured positions.

## Reset the Path Bar

Choose **Reset** beside the **Path Bar** area to remove every custom command, separator, spacer, and dropdown. The fixed navigation controls remain. Resetting the Path Bar does not change the fixed Filter, Sort, Group, Configure view, Search, or New controls below it, and it does not reset keyboard shortcuts or Explorer context menus.
