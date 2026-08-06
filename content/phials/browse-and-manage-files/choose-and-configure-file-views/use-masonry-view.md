---
title: "Use Masonry view"
description: "Browse ratio-aware thumbnails in compact, variable-height columns."
icon: phoundry-mono:view-masonry
order: 3
ai_disclosure: true
---

# Use Masonry view

Masonry view presents files as compact visual cards whose heights follow their thumbnail proportions. Files enter in the active sort order and fill the currently shortest column, making it useful for scanning folders that mix landscape, square, and portrait media.

Open **Configure view** in the toolbar, choose **View mode**, then choose **Masonry**.

## Choose what each card shows

Choose **Property visibility** in **Configure view**.

- **Name** controls whether the filename appears in the metadata overlay.
- Other visible properties appear in the same order as the property list.
- Properties without a value are omitted.
- Turn **Compact properties** on to wrap populated properties inline with their icons.

By default, the filename and properties appear only while a card is pointed to or has keyboard focus. Turn off **Properties on hover** to keep the overlay visible.

## Choose preview content

Use **Preview** under **View options**:

- **Thumbnail** fits the card to the preview's proportions. Previews without usable dimensions use a square frame, and unusually wide or tall previews are bounded so the card remains usable.
- **Note content** uses a square card to show the beginning of a member note or Markdown body. This option is available inside a Workspace Folder.

Masonry always uses card backgrounds and has no thumbnail-orientation or no-preview option.

## Adjust size and grouping

Choose **Item size** **S**, **M**, or **L** to change the target column width. The available width determines the number of equal-width columns.

Grouped listings give each expanded group its own Masonry layout. Use **Colored groups** to tint groups backed by colored property options. Collapsing a group hides its cards without changing the files or their active sort order.

Use the arrow keys to move spatially between cards. Range selection continues to follow the active sort order.
