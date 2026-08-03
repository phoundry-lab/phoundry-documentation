---
title: "Summarize connected files with Rollups"
description: "Create a read-only Rollup that lists, counts, or calculates values from related files."
icon: phoundry-mono:vial
order: 4
ai_disclosure: true
---

# Summarize connected files with Rollups

A **Rollup** is a read-only property that follows a Relation and summarizes values from its connected files. Use one to count related files, list their statuses, total a number, or find the earliest date without copying those values onto the source file.

## Create a Rollup

A Rollup requires a Relation property in the same Workspace Folder. If you do not have one, first [connect files with a Relation](./connect-files-with-relations.md).

1. Open the **New** menu in an Explorer tab.
2. Choose **Add Property**, then **Rollup**.
3. In **Configure Rollup**, choose the source **Relation**.
4. Choose the **Property** to summarize from the Relation's target Workspace Folder. Choose **Name** to summarize filenames.
5. Choose **Calculate**, then choose **Create**.

Phials gives the Rollup a descriptive name such as **Sum of Price** or **Earliest Due Date**. You can rename it later without changing its calculation.

You cannot use another Rollup as the source property. The initial source choices are Name and ordinary properties in the target Workspace Folder; filesystem metadata is not available as a Rollup source.

## Choose a calculation

The available calculations depend on the source property:

| Source | Available summaries |
| --- | --- |
| Any supported source | Show values, show unique values, count values, count unique, count empty, count not empty |
| Relation itself | Count related files |
| Number or Rating | Sum, average, minimum, maximum |
| Date | Earliest, latest |

For a property that can contain several options, list calculations flatten those options across the related files. Count values, count empty, and count not empty count related-file cells rather than individual options.

## Read Rollup results

Rollup values update when the source Relation or a connected file's source property changes. They are derived results, so choosing the value does not open an editor.

- **Updating…** means Phials is recalculating a result after a source change.
- **Unavailable** means the Relation, target Workspace Folder, source property, or a required target file cannot be resolved.
- An empty numeric or date aggregate stays empty when no connected file has a usable value. Count calculations can show zero.

Numeric and date results can participate in sorting, filtering, and Details calculations. List results are display-only in this release and cannot be used for sorting, filtering, grouping, or Details calculations. Grouping by any Rollup is unavailable.

## Reconfigure or repair a Rollup

1. Open **Configure view**.
2. Choose **Property visibility**.
3. Choose the Rollup property's settings control.
4. Change its **Relation**, **Property**, or **Calculate** choice.

Changes save immediately. Choosing another Relation resets Property to **Name** and Calculate to **Show values**. Choosing another Property resets Calculate to **Show values**. These resets keep the Rollup valid but do not rename it.

If a source is unavailable, choose another valid Relation or Property. Deleting a Relation does not delete its dependent Rollups; they retain their configuration and show **Unavailable** until repaired.
