---
title: "Filter files"
description: "Show only items that match file facts, metadata, or Workspace Folder properties."
icon: phoundry-mono:folder
order: 2
ai_disclosure: true
---

# Filter files

A filter narrows the active File view without moving or changing files. Each condition combines a field, an operator, and a value, such as `Kind is Image` or `Modified is after July 1`.

## Add a filter

1. Choose **Filter** above the File view.
2. If the complete editor is not open, choose **Edit all filters** at the start of the Filter row.
3. Choose the field, operator, and value for the first condition.
4. Choose **Add filter** for another condition at the same level.

The field picker includes built-in facts such as **Name**, **Extension**, **Kind**, **Size**, **Created**, and **Modified**. It also includes applicable metadata fields and, inside a Workspace Folder, properties such as dates, options, tags, ratings, numbers, and checkboxes. Relation properties are not available as filter fields.

The value control follows the field: dates use a date picker, sizes include a unit, ratings use stars, and option-backed properties use their existing options. For complete field and operator tables, see [Filter fields, operators, and values](../../reference/search-and-filter-syntax/filter-fields-operators-and-values.md).

## Combine conditions with AND or OR

The logic control between conditions determines which items remain:

- **AND** requires every condition at that level to match.
- **OR** requires at least one condition at that level to match.

Choose **Add filter group** when part of the rule needs its own logic. For example, `Kind is Image AND (Rating ≥ 4 OR Tag contains Portfolio)` uses an OR group inside an AND rule. A new filter group starts with OR and its first condition.

Logic belongs to each group. Changing an inner group from OR to AND does not change its parent. Choose **Ungroup** to move a group's conditions into its parent without deleting them.

See [Combine filters with AND, OR, and groups](../../reference/search-and-filter-syntax/combine-filters-with-and-or-and-groups.md) for evaluation examples.

## Include subfolders

Set the filter scope to **Flatten (recursive)** to evaluate files in the current folder and its descendants. Phials presents matching files in one File view and hides the intervening folder rows. Return the scope to **Current folder** to evaluate only the folder you are browsing; in that scope, folders can match conditions too.

Recursive filtering only changes what Phials presents. It does not move files or flatten the folders on disk.

## Edit or clear filters

Choose a filter chip to edit its field, operator, or value. Choose the close control on a chip to remove that condition, or choose **Clear all** in the complete editor to remove the whole filter tree.

Closing the Filter row does not clear its conditions. The **Filter** control remains highlighted while browse filters are active. Search uses a separate filter tree, so search filters do not replace the filters configured for ordinary folder browsing.

Filters are part of the current File view configuration. If a saved view is active, use **Save view settings** to keep the filter tree or **Reset view** to restore the saved one.
