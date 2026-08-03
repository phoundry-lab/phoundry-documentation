---
title: "View images and graphics"
description: "Inspect raster images, SVG graphics, and Camera RAW files, then use the right controls for closer viewing."
icon: phoundry-mono:eye
order: 1
aliases:
  - previews/ai-image
  - previews/image
ai_disclosure: true
---

# View images and graphics

Phials can present ordinary raster images, SVG graphics, and Camera RAW files without sending them to another app. Select an image for a quick look in the **File panel**, or open it in a **file tab** for a persistent, larger view.

## Inspect a raster image

1. Select the image in an Explorer tab.
2. If necessary, choose **File** in the panel dock.
3. Check the image and any metadata shown above it.
4. Choose **Open in Tab** when you need more room or want to keep the image open.

The File panel fits the image to its available space. In a file tab, use **Zoom out**, **Zoom in**, and **Reset zoom** in the toolbar. You can also scroll over the image to zoom smoothly. **Reset zoom** returns to the fit-to-view baseline rather than forcing the image to its native pixel size.

Phials treats images that contain generative-image data like ordinary images; it does not extract or present embedded generation workflows.

## Switch between an SVG and its source

SVG files open in **Rendered** mode. Use the toolbar switcher to choose:

- **Rendered** for the visual result
- **Code** for the XML source

The Code view is useful when you need to inspect paths, fills, view boxes, or embedded text. Editing and saving the source is covered in [Edit text, code, HTML, and SVG](../edit-files-in-phials/edit-text-code-html-and-svg.md). SVG files larger than 1 MB show **File too large to edit** instead of loading the in-app Rendered or Code view, although the operating system may still be able to render them in another app.

## View a Camera RAW file

Camera RAW files use a decoded proxy so Phials can show the photograph without changing the original file. The first view may take longer while Phials extracts an embedded preview or creates a compatible image. Subsequent views can reuse the cached proxy.

RAW viewing is read-only. Phials does not provide a RAW development workflow, export controls, or image adjustments for the original camera file. If the proxy cannot be created, the viewer shows **No preview available**; use [Open files in Phials or another app](../../browse-and-manage-files/manage-files-and-folders/open-files-in-phials-or-another-app.md) to continue in a RAW-capable application.

## Use thumbnails and metadata

Supported image formats can provide visual thumbnails in Grid and Gallery views. Camera RAW thumbnails use the same proxy pipeline as the viewer, so a failed RAW decode can fall back to a generic icon.

Available metadata varies by format and by what the file actually contains. It can include dimensions, camera details, dates, color information, or other technical fields. Use **Show All** above the representation when you need to see supported fields that are currently empty.

For complete coverage, see [Thumbnail support by file type](../../reference/file-format-and-metadata-support/thumbnail-support-by-file-type.md) and [Metadata support by file type](../../reference/file-format-and-metadata-support/metadata-support-by-file-type.md). To change a supported raster image, continue with [Edit images](../edit-files-in-phials/edit-images.md).
