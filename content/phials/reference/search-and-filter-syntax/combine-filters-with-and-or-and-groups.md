---
title: "Combine filters with AND, OR, and groups"
description: "Understand how Phials evaluates AND, OR, nested groups, and empty filter trees."
icon: phoundry-mono:sliders
order: 3
ai_disclosure: true
---

# Combine filters with AND, OR, and groups

Every filter tree has a root group. That group can contain conditions and nested groups, and every group owns its own **AND** or **OR** setting.

- **AND** passes when every direct child passes.
- **OR** passes when at least one direct child passes.
- A group's setting applies only to its direct children.
- A setting has no effect when its group has only one child.

For the steps to build and edit a tree, see [Filter files](../../browse-and-manage-files/find-and-narrow-files/filter-files.md).

## Flat conditions

Suppose a group contains these conditions:

- A: `Kind is Image`
- B: `Rating ≥ 4`

| A | B | A AND B | A OR B |
| --- | --- | --- | --- |
| Pass | Pass | Pass | Pass |
| Pass | Fail | Fail | Pass |
| Fail | Pass | Fail | Pass |
| Fail | Fail | Fail | Fail |

The UI shows the group's logic control between its conditions. Changing that control changes the logic for every direct child at that level.

## Nested groups

Phials evaluates the deepest group first, then uses that group's result as one result in its parent. For example:

```text
Kind is Image
AND
(
  Rating ≥ 4
  OR
  Tags contains Portfolio
)
```

This tree passes an item only when it is an Image and either has a rating of at least four or contains the Portfolio tag.

| Kind is Image | Rating ≥ 4 | Tags contains Portfolio | Result |
| --- | --- | --- | --- |
| Pass | Pass | Fail | Pass |
| Pass | Fail | Pass | Pass |
| Pass | Fail | Fail | Fail |
| Fail | Pass | Pass | Fail |

Nested groups can contain further groups. The same depth-first rule applies at every level; there is no separate operator-precedence rule to remember.

## Adding and removing groups

**Add filter** adds a condition to the group where you chose it. **Add filter group** adds a nested OR group at that location and gives it an initial condition. You can change the new group's logic without changing its parent.

**Ungroup** removes only the selected group boundary. Its children move into the parent in their existing order and then use the parent's logic.

When you remove the last condition from a nested group, Phials removes that empty group. The root group remains even when it has no conditions. An empty root passes every item, which is equivalent to having no active filter.

## Browse filters and search filters

Ordinary Browse filtering and Search each own an independent filter tree. Editing one does not edit or replace the other. Both use the same fields, value controls, AND/OR rules, and depth-first evaluator.

Search evaluates its filter tree after the name or content query finds candidates. Search therefore still requires a non-empty text query; a search filter tree by itself does not scan files. Recursive and **All files** searches can expose a broader metadata field catalog than an ordinary Browse filter.
