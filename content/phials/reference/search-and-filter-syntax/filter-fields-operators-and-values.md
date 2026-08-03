---
title: "Filter fields, operators, and values"
description: "Look up filterable file facts, metadata and properties, their operators, and value controls."
icon: phoundry-mono:sliders
order: 2
ai_disclosure: true
---

# Filter fields, operators, and values

A filter condition has three parts: a field, an operator, and, except for the empty operators, a value. The field's type determines which operators and value control Phials presents.

For the steps to create and edit conditions, see [Filter files](../../browse-and-manage-files/find-and-narrow-files/filter-files.md).

## Built-in fields

| Field | Type and value | Notes |
| --- | --- | --- |
| **Name** | Text | Compares the complete filename shown in the File view. |
| **Extension** | Dynamic choice | Offers extensions found in the current listing. Folders have an empty extension. |
| **Kind** | Dynamic choice | Offers file kinds found in the current listing, such as Image, Code, Audio, and Folder. |
| **Size** | Number plus B, KB, MB, or GB | Defaults to MB. Unit conversion uses 1 KB = 1,024 B, 1 MB = 1,024 KB, and 1 GB = 1,024 MB. |
| **Created** | Date | Compares the item's creation date by local calendar day. A creation date may be unavailable on some filesystems. |
| **Modified** | Date | Compares the item's modification date by local calendar day. |

In **Current folder** scope, folder rows are evaluated like files. In recursive Flatten scope, Phials presents matching files in one list and omits folder rows.

## Workspace Folder properties

Inside a Workspace Folder, the field picker also includes supported properties from that Workspace Folder.

| Property type | Filter type | Value control |
| --- | --- | --- |
| Text, URL | Text | Text input |
| Number | Number | Number input |
| Date | Date | Date picker |
| Select, Status | Single choice | Existing property options |
| Multi-select, Tags | Multiple-choice membership | One existing option per condition |
| Checkbox | Boolean | Checked or unchecked value |
| Rating | Rating number | Star picker |
| Rollup returning a number or date | Number or date | Control for the rollup's result type |

Relation properties and Rollups that return lists are not available as filter fields.

## Metadata fields

Metadata providers can contribute string, number, date, boolean, array, or dynamic-choice fields. Phials maps them to the corresponding operators and value controls below.

Ordinary Browse filters offer metadata fields available in the folder's column configuration. A recursive or **All files** search can offer all registered metadata fields because its results may span folders with different metadata. Metadata might not be extracted when a result first appears; until extraction finishes, Phials treats that field as empty and then evaluates the condition again when the value arrives.

Dynamic-choice metadata fields use provider-supplied choices when available. Otherwise, Phials builds the choices from distinct values it has discovered. Array metadata uses one text value per condition.

## Operators by value type

### Text

| Operator | Match rule |
| --- | --- |
| **contains** | The field includes the value. |
| **does not contain** | The field does not include the value. |
| **is** | The whole field equals the value. |
| **is not** | The whole field does not equal the value. |
| **starts with** | The field begins with the value. |
| **ends with** | The field ends with the value. |
| **is empty** | The value is missing or contains only whitespace. |
| **is not empty** | The value exists and contains a non-space character. |

Text comparison is case-insensitive.

### Number, Size, and Rating

| Operator | Match rule |
| --- | --- |
| `=` | Equal to the value |
| `≠` | Not equal to the value |
| `<` | Less than the value |
| `>` | Greater than the value |
| `≤` | Less than or equal to the value |
| `≥` | Greater than or equal to the value |
| **is empty** | No value is available. |
| **is not empty** | A value is available, including zero. |

Size values are converted from the selected unit before comparison. Rating uses the same numeric comparisons, with a star picker for its value.

### Date

| Operator | Match rule |
| --- | --- |
| **is** | Same local calendar day |
| **is not** | A different local calendar day |
| **is before** | An earlier local calendar day |
| **is after** | A later local calendar day |
| **is on or before** | The same or an earlier local calendar day |
| **is on or after** | The same or a later local calendar day |
| **is empty** | No date is available. |
| **is not empty** | A date is available. |

Time of day does not affect a date comparison.

### Single choice and dynamic choice

The available operators are **is**, **is not**, **is empty**, and **is not empty**. **Extension**, **Kind**, Select, Status, and dynamic-choice metadata fields use this family.

### Multi-select, Tags, and metadata arrays

| Operator | Match rule |
| --- | --- |
| **contains** | At least one item equals the selected or entered value. |
| **does not contain** | No item equals the selected or entered value. |
| **is empty** | The list has no items or is unavailable. |
| **is not empty** | The list has at least one item. |

Membership comparison is case-insensitive and exact. For example, `Tags contains Art` matches an `Art` option but not an `Article` option. Add another condition when more than one item must be tested.

### Boolean

Boolean fields use **is**, **is not**, **is empty**, and **is not empty** with a checked or unchecked value. Empty means the field has no stored or extracted value; it is distinct from unchecked.

## Empty and unfinished conditions

**is empty** and **is not empty** do not take a comparison value. Empty means missing or `null`, a blank text value, or a list with no items. Numbers and booleans are not empty when their value is zero or false.

A newly added condition may not yet have a value. Until you enter or choose one, an operator that requires a value does not exclude items.
