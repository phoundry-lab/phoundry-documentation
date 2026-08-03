---
title: "Edit images"
description: "Annotate, crop, rotate, resize, or convert a supported raster image and choose whether to replace it or save a copy."
icon: phoundry-mono:eye
order: 3
ai_disclosure: true
---

# Edit images

Edit a supported raster image in a file tab, then replace the file or keep the original by saving an edited copy. Image editing changes pixels; it does not edit SVG source or Camera RAW files.

## Enter edit mode

1. Select or open an editable image.
2. Choose **Edit**.

If you start from the File panel, Phials opens or focuses the image's file tab and enters **Annotate**. Image tools run only in File mode in a file tab.

If **Edit** is unavailable, the format is view-only or the image exceeds the editing limit. Phials can edit supported images up to 6000 pixels wide and 6000 pixels high. See [File viewing and editing support](../../reference/file-format-and-metadata-support/file-viewing-and-editing-support.md) for the exact format boundary.

## Choose an editing tool

- **Annotate** adds pen strokes, lines, shapes, arrows, text, redaction, or focus areas. Its Undo and Redo controls apply to the annotation layer; focus areas have their own remove and clear controls.
- **Crop** provides free, preset, or custom aspect ratios. Use **Apply** to commit the crop to the working image. Rotate left and right are also available here.
- **Resize** sets exact dimensions or a percentage. The aspect ratio starts locked; unlock it only when you intend to stretch the image.
- **Convert** chooses PNG, JPEG, WebP, BMP, or TIFF and offers quality controls where applicable.

Applied crops and 90-degree rotations share an edit history. Choose **Revert** in the Crop options to step back through those operations. This Revert is not a whole-session reset and does not undo annotations or resize settings.

## Save the result

Before choosing **Save**, decide whether the original should be replaced. For edits that retain the current format, **Save** writes over the original file without a separate overwrite confirmation.

Choose **Save as Copy** to keep the original. Phials writes a sibling named with `_edited` before the extension, using the selected conversion format when applicable. Check whether that sibling already exists before saving; Phials does not ask before replacing the same generated filename.

When **Convert** selects another format, the normal Save action writes a sibling with the chosen extension rather than changing the original file's extension in place.

After a successful save, Phials returns to image view and refreshes the file presentation. If saving fails, the editor keeps the unsaved edit and shows the error. Dismiss the message after reading it, correct the underlying problem, then save again.

The image editor does not merge external changes. If another app changes the image during your edit, choose **Cancel**, close the file tab, and reopen the image before editing the newer version.

## Cancel an edit

Choose **Cancel** to leave edit mode and return to the image viewer. If the session has changes, Phials asks whether to **Discard** them.

Discard permanently abandons every unsaved change in the image edit. Choose the dialog's cancel action to return to the editor when you still need to save or make a copy.

Save or Cancel the edit before closing its file tab.

For zoom and read-only image controls, see [View images and graphics](../view-and-inspect-files/view-images-and-graphics.md).
