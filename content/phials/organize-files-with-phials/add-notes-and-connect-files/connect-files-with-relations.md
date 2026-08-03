---
title: "Connect files with Relations"
description: "Create a Relation property and choose, remove, or order connected files."
icon: phoundry-mono:vial
order: 2
aliases:
  - vials/relations
ai_disclosure: true
---

# Connect files with Relations

A **Relation** is a property that connects one source file to one or more files in a chosen Workspace Folder. It records a connection without moving, copying, or embedding either file.

## Create a Relation property

1. Open the **New** menu in an Explorer tab.
2. Choose **Add Property**, then **Relation**.
3. In **Select Workspace Folder**, choose the folder whose files this Relation will target.
4. Choose **Create**.

Choose **Current Workspace Folder** to connect files within the same folder. To target another folder, it must already appear under **Workspaces** in Phials. See [Find and customize Workspace Folders](../use-workspace-folders/find-and-customize-workspace-folders.md) if the folder is not listed.

Phials creates the property with the name **Relation**. To rename it, open **Configure view**, choose **Property visibility**, then choose the property's settings control. The Relation's target Workspace Folder is part of its definition; every source file using that property chooses targets from the same folder.

If the source folder does not have Workspace Folder data, adding the property prepares that data as part of the action after the Workspace Folder explanation is approved.

## Connect files

Use the Relation anywhere its value is editable, such as a Page or a Details cell:

1. Choose the empty Relation value. On a Page, choose **Show All** first if the empty property is hidden.
2. Search for a file in the configured target Workspace Folder.
3. Choose a result to add it under **Selected files**.
4. Repeat to connect more files.

The picker excludes files already selected, so one Relation value cannot contain the same target twice. Changes are stored when you add, remove, or reorder a target.

## Order or remove connected files

Open the Relation value again. Under **Selected files**:

- Drag selected files into the order you want. This order is retained wherever the Relation value is shown.
- Choose **Remove** beside a file to remove that connection.

Removing a target from one source file does not delete the target file and does not change Relation values on other source files.

## Understand direction and file identity

A Relation is directional: the value belongs to the source file and points to its selected targets. The target files are not changed.

Supported renames and moves within a Workspace Folder keep the connection because Phials tracks the source and target by their Workspace Folder identities, not only by their visible filenames. Keeping both Workspace Folders available to Phials is important for cross-folder Relations.

Relation target names are not direct navigation links in this release. To open a target, open its Workspace Folder and find the file by name. Phials also does not expose incoming connections from the target side; see [Follow backlinks between files](./follow-backlinks-between-files.md).

Deleting a Relation property removes that property's connections from every source file. If a Rollup depends on it, Phials identifies the dependent Rollup before deletion; the Rollup becomes unavailable until you configure another source Relation.
