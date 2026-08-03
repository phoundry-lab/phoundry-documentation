---
title: "Write notes about files"
description: "Write an autosaved Markdown body for a file and understand whether it edits the file or a separate note."
icon: phoundry-mono:vial
order: 1
aliases:
  - vials/notes
ai_disclosure: true
---

# Write notes about files

A file's **Page body** gives you a Markdown writing surface beside its Workspace Folder properties. Use it for research, decisions, descriptions, or any context that belongs with the file rather than inside a property value.

## Open the Page body

1. Select a regular file.
2. Open the **Page panel** if it is not already visible.
3. Write in the body beneath the file's properties.

If the file is not ready for a Page, choose **Open Page** in the Page panel. When Workspace Folder data is needed, Phials explains what it will add and continues after you approve. You do not need to create a Workspace Folder as a separate preliminary task.

You can also open the file in a file tab and choose **Page** to give the body more room. The Page panel and Page mode use the same content; opening another surface does not create another note.

For Page navigation and property presentation, see [Use Pages](../../view-and-edit-files/use-pages/index.md).

## Know which content you are editing

The Page body has one source:

- For a Markdown file with an `.md`, `.markdown`, or `.mdc` extension, the body is the file's own contents. Editing the Page changes that file.
- For any other indexed regular file, the body is a separate **per-file note** stored in the file's Workspace Folder data. Editing it does not change the subject file.

An empty Page body is immediately editable. You do not need to add or enable a Note property.

## Write and save

Use **Editor** for the visual block editor or **Raw** to edit Markdown source. The body uses the same Markdown authoring features as a Markdown file; see [Edit Markdown files](../../view-and-edit-files/edit-files-in-phials/edit-markdown-files.md) for formatting, links, and embeds.

Page bodies autosave after their Markdown source changes. There is no routine Save or Revert step. Command-S on macOS or Ctrl-S on Windows and Linux flushes pending changes immediately.

Closing a file tab or Phials waits for the latest Page-body change to finish saving. If saving fails, Phials keeps the document available and shows a recovery action instead of silently discarding the change.

## Resolve an external-change conflict

If the same Markdown file or per-file note changes outside the active editor while you have local work, autosave pauses and shows a conflict banner:

- Choose **Reload** to replace the editor content with the externally changed version.
- Choose **Overwrite** to keep the editor content and replace the external version.

Choose carefully: either action discards one version. A temporary write failure instead shows **Retry**.

## Keep a note with its file

When you rename or move a file within its Workspace Folder through Phials, its per-file note remains attached to that file. Markdown files move with their own contents as usual.

Per-file notes live with the Workspace Folder data. A portable Workspace Folder carries them in its hidden `.phials` bundle; a locally stored Workspace Folder keeps them in Phials Home. See [Store Workspace Folder data locally or portably](../use-workspace-folders/store-workspace-folder-data-locally-or-portably.md).
