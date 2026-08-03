---
title: "View fonts and 3D models"
description: "Review font character samples and explore 3D models with material, geometry, grid, rotation, and fullscreen controls."
icon: phoundry-mono:eye
order: 7
aliases:
  - previews/font
  - previews/model3d
ai_disclosure: true
---

# View fonts and 3D models

Phials includes visual inspection surfaces for font files and common 3D model formats. Neither surface installs, converts, or changes the original file.

## Review a font

Select a font file to see it typeset with its own face. The representation includes:

- Uppercase, lowercase, numbers, and symbols
- A **Waterfall** that repeats a sample across sizes from 12 px to 72 px
- A collapsed **Pangrams** section with several sample sentences

Use the character sets to check basic glyph coverage and the waterfall to compare spacing and legibility across display and text sizes. Expand **Pangrams** to inspect a wider mix of letter shapes.

The preview shows a fixed sample rather than a complete glyph map. It does not expose OpenType features, variable-font axes, kerning tables, font metadata, or an editable custom sample. Use a dedicated font tool for those checks or to install the font.

Font thumbnails use the font itself to render a small sample when the WebView can load it. If loading fails, the sample may appear in a fallback face instead.

## Explore a 3D model

Select a supported 3D model for a quick interactive view, or open it in a **file tab** for more space. Drag to orbit around the model, scroll to zoom, and use the camera controls to inspect it from different angles.

Use the viewer controls to choose:

- **Material** for the model's normal materials
- **Wireframe** to inspect topology
- **Normals** to inspect surface orientation
- **Grid** to show or hide the reference plane
- **Auto Rotate** to turn the model continuously

The statistics overlay reports model dimensions, vertex count, triangle count, mesh count, and animation-clip count when present. Embedded animations play automatically for inspection; there is no clip picker or animation timeline.

With the 3D viewer active, use `V` to cycle Material, Wireframe, and Normals, `G` to toggle the grid, and `R` to toggle automatic rotation.

Phials centers and scales the loaded model for presentation. The displayed size is therefore a viewing aid; use the dimensions in the statistics overlay when you need the model's original bounds.

Some model formats refer to external textures or material files. If those dependencies are missing or their paths cannot be resolved, the geometry may load with fallback materials. A loader error appears in the viewer when the model itself cannot be decoded.

For the exact font and model extensions supported by the built-in viewers, see [File viewing and editing support](../../reference/file-format-and-metadata-support/file-viewing-and-editing-support.md). Thumbnail coverage is listed in [Thumbnail support by file type](../../reference/file-format-and-metadata-support/thumbnail-support-by-file-type.md).
