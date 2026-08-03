---
title: "Use Details view"
description: "Compare files in rows, arrange property columns, and add per-column calculations."
icon: phoundry-mono:folder
order: 1
ai_disclosure: true
---

# Use Details view

Details view places each file in a row and each visible property in a column. Use it when you need to compare names, dates, sizes, or Workspace Folder properties across many files.

Open **Configure view** in the toolbar, choose **View mode**, then choose **Details**.

## Choose and arrange columns

Choose **Property visibility** in **Configure view** to decide which columns appear.

- Turn a property on or off to show or hide its column. **Name** always remains visible.
- Drag visible properties to change their order.
- Choose **Reset** to restore the default property visibility and order for Details view.

To resize a column, drag the divider at the right edge of its header. To reorder columns directly in the file view, drag a header to a new position.

For a Workspace Folder, this panel includes its custom properties alongside built-in file information. To create or change a property itself, see [Add and configure properties](../../organize-files-with-phials/describe-and-classify-files/add-and-configure-properties.md).

## Freeze or wrap a column

Choose a column header to open its menu.

- Choose **Freeze Column** to keep that column visible at the left while the remaining columns scroll horizontally. Frozen columns form one continuous block at the left; moving a header across that boundary also changes whether it is frozen.
- Turn on **Wrap column** to let long values continue onto additional lines. Row height expands as needed. Turn it off to keep each value on one line.
- Choose **Hide** to remove a column. The Name column cannot be hidden.

Freezing, width, order, and wrapping are remembered as part of the Details column layout.

## Adjust the row presentation

Open **Configure view** and use **View options**:

- **Compact rows** reduces the height of rows whose columns are not wrapping.
- **Alternate Row Background** distinguishes adjacent rows.
- **Show Column Borders** adds vertical dividers.
- **Show Row Borders** adds horizontal dividers.
- **Colored Group Backgrounds** adds color when the listing is grouped by an option-backed property.

Sorting is configured separately. For the column-header shortcut and multi-level sorting controls, see [Sort files](../find-and-narrow-files/sort-files.md).

## Add a calculation row

Turn on **Calculation row** under **View options** to add a pinned row beneath the file listing. In that row, choose **Calculate** under any visible column, then choose a calculation that the column supports.

Available calculations depend on the values in the column. For example, text and option columns can count values, number columns can total or average them, date columns can show the earliest or latest date, and checkboxes can count checked values.

Calculations use all files currently supplied to Details view after search and filtering, including files inside collapsed groups. Selecting files does not limit a calculation. Phials may briefly show a loading indicator while it retrieves values.
