---
title: "Edit Markdown files"
description: "Write Markdown in Editor or Raw mode and recover safely from autosave errors, conflicts, or a missing file."
icon: phoundry-mono:eye
order: 1
aliases:
  - basic-use/markdown-editor
  - previews/markdown
ai_disclosure: true
---

# Edit Markdown files

Edit a Markdown file in a visual block presentation or directly in its source. Both presentations change the same file and use conflict-checked autosave.

## Create or open a Markdown file

To create one in the active folder, choose **New** > **Markdown File**, enter a name, and confirm. Phials selects the new file, opens it in a file tab, and places focus in the editor so you can begin typing.

To edit an existing `.md`, `.markdown`, or `.mdc` file, open it in Phials. You can edit it in the File panel, File mode, or as the body of its Page.

For ordinary file naming and creation behavior, see [Create and rename files and folders](../../browse-and-manage-files/manage-files-and-folders/create-and-rename-files-and-folders.md).

## Choose Editor or Raw mode

Markdown opens in **Editor** mode. It presents the document as editable blocks:

- Type `/` in an empty text block to choose a block type.
- Select text to apply inline formatting or add a link.
- Use a block's controls to move, duplicate, change, or delete it.
- Use the standard Undo and Redo shortcuts to revise the current editing session.

Choose **Switch to raw markdown** when you need exact control of Markdown source. Choose **Switch to rich editor** to return. The two modes share one document; switching does not require a save and keeps your latest source.

If Editor mode cannot represent part of the source cleanly, it shows a parse note instead of silently removing the text. Use Raw mode to inspect and correct that source. If the visual editor itself fails to load, choose **Raw mode** in the error state.

To enable spelling suggestions for prose blocks, open **Settings** > **Editors** > **Markdown Editor** and turn on **Enable spellcheck**. Code and Raw mode are excluded.

## Add links, images, and file embeds

Standard Markdown links and images remain as written in the file. A relative image such as `![](photo.jpg)` resolves from the Markdown file's folder without rewriting the saved path.

Type `[[` to find and link to a file or Workspace Folder known to Phials. Type `![[` at the start of a standalone block to embed a whole file or folder. File embeds are for inspection; use their **Open** action to edit the embedded file in its normal file tab.

Moving or renaming an embedded target does not rewrite the Markdown reference. If an embed becomes unresolved, use **Change target**, or edit the original target directly in Raw mode.

## Let autosave finish

Every committed Markdown source change schedules autosave. A focused inline edit may remain in the editor until you leave that edit, switch modes, save explicitly, or leave the editor. Command-S on macOS or Ctrl-S on Windows and Linux flushes pending work immediately.

Closing the file tab or Phials waits for the newest change to finish saving. If a save error or conflict remains unresolved, Phials keeps the document open instead of discarding it.

Files larger than 1 MB show **File too large to edit**. Use another editor or reduce the file size before editing it in Phials.

## Recover from an autosave problem

When a temporary write fails, Phials retries, then shows the error while retaining your newest source. Choose **Retry** after correcting the underlying access or storage problem.

If the file changed outside Phials while local work was pending, autosave pauses:

- **Reload** discards the editor version and loads the external version.
- **Overwrite** replaces the external version with the editor version.

Either choice discards one version. Copy any text you need to preserve before choosing.

If the file was moved or deleted outside Phials, choose **Recreate File** to write the editor version back to the old location, or **Discard** to abandon the pending editor version. Phials does not recreate a missing file without your choice.

When an external change arrives while the editor has no local work, Phials reloads it automatically.

The same Editor, Raw, autosave, and recovery behavior applies when a Markdown file supplies a Page body. Per-file notes for other file types are covered in [Write notes about files](../../organize-files-with-phials/add-notes-and-connect-files/write-notes-about-files.md).
