---
title: "Inspect files in the File panel"
description: "Follow an Explorer selection in the File panel and inspect its metadata, viewer, editor, and available controls."
icon: phoundry-mono:eye
order: 1
ai_disclosure: true
---

# Inspect files in the File panel

The **File panel** follows your Explorer selection. Use it to move through files quickly without opening and closing a file tab for each one.

## Inspect the selected file

1. Activate the Explorer tab that contains the file.
2. Select one file.
3. If another panel is in front, choose **File** in the panel dock.

The panel updates to the new selection. Selecting another file replaces what the panel presents; it does not open a file tab.

If you focus a file tab or another center tab, the File panel keeps following the most recently active Explorer tab. Return to a different Explorer tab and select a file there to change that context.

## Understand what the panel shows

For a supported file, the File panel can combine:

- Read-only metadata that Phials extracts from the file or filesystem
- An appropriate viewer or editor for the file type
- Controls supplied by that viewer or editor

Metadata appears above the file representation when it is available. Choose **Show All** to include supported fields that do not currently have values, and **Show Less** to return to the populated fields. This expansion resets when you select another file.

The remaining controls depend on the file type. For format-specific guidance, see [View and inspect files](../view-and-inspect-files/index.md) and [Edit files in Phials](../edit-files-in-phials/index.md). The [metadata support reference](../../reference/file-format-and-metadata-support/metadata-support-by-file-type.md) lists what Phials can read from different formats.

## Move from inspection to a file tab

Choose **Open in Tab** in the File panel toolbar to open the selected file in persistent File mode. If that file already has a file tab, Phials focuses the existing tab instead of opening a duplicate.

When the same file is already visible in File mode, Phials does not repeat its interactive representation in the File panel. The panel can still show the file's metadata. If the file tab is showing Page mode, the File panel continues to provide the complementary file representation.

In Gallery view, the gallery itself presents the selected file, so the File panel does not repeat that representation.

## When there is no representation

With no file selected, the panel can show context for the current folder or Workspace Folder. Otherwise it shows **No file selected**.

If Phials can read metadata but has no compatible viewer or editor, the metadata can remain available above **No preview available**. See [Handle files Phials cannot display](../view-and-inspect-files/handle-files-phials-cannot-display.md) for the available alternatives.
