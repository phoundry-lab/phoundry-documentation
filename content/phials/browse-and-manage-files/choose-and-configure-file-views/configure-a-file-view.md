---
title: "Configure a file view"
description: "Switch file views and control visible properties, view options, and app-wide file visibility."
icon: phoundry-mono:folder
order: 7
ai_disclosure: true
---

# Configure a file view

Use **Configure view** to change how files are presented in the active Explorer tab. The panel stays open while you adjust options, so you can see each result immediately.

## Open the panel and switch file views

1. Choose **Configure view** in the toolbar.
2. Choose **View mode**.
3. Choose **Details**, **Grid**, **Masonry**, **Columns**, **Boards**, or **Calendar**.

The available choices depend on the current location. Boards appears only when the Explorer tab is inside a Workspace Folder with properties.

Switching file views does not move, rename, or otherwise change files. Close the panel with **Close Configure view** when you are done.

## Choose visible properties

Choose **Property visibility** to open the **Properties** page.

- Turn a property on or off to show or hide it.
- Drag visible properties into the order you want.
- Choose **Reset** to restore the current file view's default property visibility and order.

Details, Grid, Masonry, and Boards use this configuration in different ways: Details creates columns, Grid and Masonry create card captions, and Boards adds values to cards. Details always keeps Name visible.

Columns and Calendar do not currently support property visibility. Their **Properties** page shows the available Workspace Folder properties, but its visibility and reordering controls are disabled.

Property visibility only changes presentation. To create, rename, or change the definition of a Workspace Folder property, see [Add and configure properties](../../organize-files-with-phials/describe-and-classify-files/add-and-configure-properties.md).

## Change options for the active file view

The **View options** section changes with the selected file view:

- Details offers row density, borders, alternating backgrounds, colored group backgrounds, and a calculation row.
- Grid offers item size, thumbnail orientation, card styling, compact properties, previews, and colored group backgrounds.
- Masonry offers item size, compact properties, thumbnail or note previews, hover properties, and colored groups.
- Calendar offers compact properties for Month and Week.
- Columns and Boards currently have no additional presentation options in this section.

For Grid and Masonry, **Item size** provides **S**, **M**, and **L** presets.

View-specific options act as global defaults when no saved view is active. When an active saved view overrides those defaults, **Use global defaults** appears; choose it to remove that saved view's overrides. See [Update or reset a saved view](../../organize-files-with-phials/save-and-reuse-views/update-or-reset-a-saved-view.md).

## Change app-wide file visibility

Open **General options** in the toolbar for app-wide listing choices. These apply across Phials, not only to the active Explorer tab or file view:

- **Show Hidden Files** includes hidden files that are not excluded by a hidden-file rule.
- **Show Parent Directory** adds a parent-folder entry where the file view supports it.
- **Show File Extensions** includes extensions in displayed filenames.
- **Folders First** places folders before files in the current sort direction.

These settings change which entries are shown or how their names are presented. They do not change anything on disk.
