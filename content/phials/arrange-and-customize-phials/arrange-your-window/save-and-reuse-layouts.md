---
title: "Save and reuse Layouts"
description: "Create, load, update, reload, rename, customize, and delete named center Layouts."
icon: phoundry-mono:settings
order: 3
aliases:
  - basic-use/layouts
ai_disclosure: true
---

# Save and reuse Layouts

A **Layout** is a named snapshot of the complete center arrangement. Use one when you want to return to a particular set of tab groups, tabs, active tabs, split proportions, and center-tab state.

A Layout does not include the left, right, or bottom docks. It also does not change automatically as your live center changes.

## Save the current center as a Layout

1. Arrange the center tabs and groups you want to preserve.
2. In the Navigator panel, expand **Layouts**.
3. Choose the add button beside **Layouts**.
4. Enter a name in **Save Layout**, then confirm.

Phials saves the snapshot and marks the new Layout as loaded. Pin state, Explorer state, state kept by eligible center tabs, which tab and group are active, empty groups, and divider proportions are included.

## Load a Layout

Choose an unloaded Layout in the Navigator panel, or open its menu and choose **Load Layout**. Loading replaces the current center arrangement rather than merging with it. Your docks and panels do not move.

Before loading, save any work you intend to keep. Phials runs the normal close or finalization guard for tabs that own editable work. If a tab cannot finish or you cancel its prompt, Phials keeps the current center unchanged and does not load the Layout.

The loaded Layout shows an indicator in the Navigator. If you then change a durable part of the center arrangement or tab state, the indicator changes to **Layout modified**. Automatic session saving remembers that live divergence, but it does not overwrite the named Layout.

## Keep or discard changes

Open the loaded Layout's menu:

- Choose **Update Layout** to replace its saved snapshot with the current center. Confirm the update when prompted.
- Choose **Reload Layout** to discard the current center divergence and reapply the saved snapshot.

Before choosing **Reload Layout**, update the Layout if you want to keep your current arrangement changes. Reload asks for confirmation and still respects each editable tab's normal finalization guard.

## Rename or customize a Layout

Open the Layout's menu and choose **Edit…**. Change its **Display Name**, icon, or icon color, then choose **Save**. These identity changes do not update the saved center snapshot.

## Delete a Layout

Deleting a Layout cannot be undone. Open its menu, choose **Delete Layout**, then confirm **Delete**.

Phials removes the named snapshot but leaves the current center tabs and groups as they are. If that Layout was loaded, the center simply stops being associated with a named Layout.

## Layouts, session restoration, and saved views

| System | What it remembers | How it changes |
| --- | --- | --- |
| **Layout** | One named snapshot of the complete center, excluding docks | Explicit **Save Layout** or **Update Layout** |
| **Session restoration** | The live center where you left off; dock state is restored separately | Automatically as you work |
| **Saved view** | How files appear in one folder or Workspace Folder scope | Through the saved-view controls in an Explorer tab |

Use [Create tab groups and split views](./create-tab-groups-and-split-views.md) to build the center arrangement before saving it. Use [Save and reuse views](../../organize-files-with-phials/save-and-reuse-views/index.md) when you want to preserve a folder's view mode, sorting, filters, grouping, and related presentation instead of the whole center.
