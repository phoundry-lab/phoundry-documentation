---
title: "Edit text, code, HTML, and SVG"
description: "Edit syntax-highlighted source, render HTML or SVG changes, and save or revert the file explicitly."
icon: phoundry-mono:eye
order: 2
ai_disclosure: true
---

# Edit text, code, HTML, and SVG

Edit plain text and many source-code formats in a syntax-highlighted editor. HTML and SVG add a rendered presentation so you can check the in-memory result before saving the source.

## Edit source

1. Select the file to edit it in the File panel, or open it in a file tab for more room.
2. Change the source in File mode.
3. Choose **Save**, or press Command-S on macOS or Ctrl-S on Windows and Linux.

The unsaved indicator clears after the write succeeds. Use the standard Undo and Redo shortcuts to step through changes made during the current source-editing session.

Choose **Revert** to restore the version that Phials last loaded or successfully saved. Revert discards every unsaved source change in the session and cannot be undone after the editor resets.

If saving fails, the file remains unsaved in Phials. Correct the reported access or storage problem, then choose **Save** again.

## Check HTML before saving

HTML files open in **Rendered** mode. Choose **Raw** to edit the HTML source, then return to **Rendered** to render the current in-memory source. You do not need to save before checking the result.

Rendered mode may load the document's relative resources and run its scripts inside a restricted frame. For viewing and navigation boundaries, see [Read PDFs and text-based files](../view-and-inspect-files/read-pdfs-and-text-based-files.md).

## Check SVG before saving

SVG files open in **Rendered** mode. Choose **Code** to load and edit the XML source. Return to **Rendered** to see the current unsaved source; this does not write the file.

Use the raster image editor only for supported pixel-based images. SVG editing remains source-based and does not provide the image editor's crop, annotation, or resize tools.

## Protect changes made in another app

Text, code, HTML, and SVG editors do not detect or merge external changes while the file remains open. **Save** can replace changes written by another app after Phials loaded the file.

If you know the file changed elsewhere, do not save the stale version in Phials. Copy any local text you need, choose **Revert**, then close and reopen the file to load the disk version before applying your changes again.

Phials keeps a file tab open while it still has unsaved explicit-save changes. Save or Revert before closing it.

## Know the edit limit

Files larger than 1 MB show **File too large to edit**. This limit applies to generic text and code, HTML source, and SVG source. Viewing support and the exact set of recognized source formats are listed in [File viewing and editing support](../../reference/file-format-and-metadata-support/file-viewing-and-editing-support.md).
