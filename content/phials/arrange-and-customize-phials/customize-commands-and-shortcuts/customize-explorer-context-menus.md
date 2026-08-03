---
title: "Customize Explorer context menus"
description: "Arrange the shared Explorer context menu, hide or restore entries, and control its separators."
icon: phoundry-mono:settings
order: 3
aliases:
  - advanced/context-menu
ai_disclosure: true
---

# Customize Explorer context menus

Control the order and visibility of actions in Explorer context menus. Phials uses one shared arrangement across Explorer file views, then shows only the entries that apply to the file, folder, selection, or empty space where you opened the menu.

This arrangement does not change context menus for Navigator rows, tabs, properties, panels, or other specialized surfaces.

## Open the context-menu editor

Open Settings. Under **Commands**, choose **Context Menus**.

The editor has two sides:

- **Available** contains commands and supported submenus that are hidden from the Explorer menu. Its search box filters only this side.
- **Menu** contains the complete shared arrangement. It stays visible while you search so its order does not shift.

## Show, hide, and arrange entries

- To show an entry, drag it from **Available** into **Menu**, or choose its **Add to menu** button. The button adds it at the end.
- To hide a command or submenu, choose its **Return to palette** button in **Menu**, or drag it back to **Available**.
- To reorder an entry, drag its move handle. With the handle focused, you can also press the Up or Down Arrow key.
- To add a divider, drag or add **Separator**. You can add more than one and place each independently. Removing a separator deletes that instance instead of returning it to **Available**.

The supported submenu entries include **Open in…**, **Pin to Favorites**, **New**, and **Folder Utilities**. You can position or hide each submenu as one entry, but its child commands and their order are not independently customizable here.

Every completed change applies to subsequently opened Explorer menus, including menus in other open Phials windows. There is no Apply or Save step.

## How one arrangement adapts to each menu

The **Menu** side deliberately shows the complete authored arrangement. When you open an Explorer context menu, Phials omits entries that do not apply in that context while preserving the relative order of the remaining entries. It also removes separators at the beginning or end and collapses adjacent separators for that menu only. Your saved arrangement is not changed.

For example, an action that requires one file disappears from a multi-selection or empty-space menu. It returns in its configured position the next time it applies. Commands from an active community plugin follow the same behavior.

## Restore entries or factory structure

Choose **Show All** to append every hidden command and submenu to **Menu** without moving your existing entries or changing your separators.

Choose **Reset Layout** to restore the factory-relative order and default separators for entries already shown in **Menu**. Hidden commands and submenus remain hidden, so use **Show All** as well when you want every available entry back.
