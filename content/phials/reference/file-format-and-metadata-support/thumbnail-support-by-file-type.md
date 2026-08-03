---
title: "Thumbnail support by file type"
description: "Check how Phials represents each file type in thumbnail-capable views, including cache controls, tools, limits, and icon fallbacks."
icon: phoundry-mono:sliders
order: 3
ai_disclosure: true
---

# Thumbnail support by file type

Thumbnail-capable file views can show file contents, extracted artwork, or a specialized static representation. If Phials cannot create the expected representation, it falls back to the ordinary icon for that file type.

Details view keeps ordinary file-type icons. The table describes thumbnails used in Grid and other surfaces that request a thumbnail.

## Thumbnail types

| File type | Thumbnail | Source and limits | Cache behavior |
| --- | --- | --- | --- |
| Raster images | The image, fitted without cropping | `.png`, `.jpg`, `.jpeg`, `.gif`, `.webp`, `.bmp`, `.tiff`, `.tif`, `.ico`, `.heic`, `.heif`, `.avif`, `.dds`. Phials uses bundled FFmpeg when helpful and its image decoder as a fallback; DDS has a dedicated decoder. | Generated disk thumbnail when **Enable Cache** is on. With it off, Phials tries to display the original file directly. **Size** and **Quality** apply to generated files. |
| Camera RAW | A fitted thumbnail from the decoded JPEG representation | All Camera RAW extensions listed in [File viewing and editing support](./file-viewing-and-editing-support.md). Phials prefers a camera-embedded image at least 512 pixels on its long edge, then falls back to bundled FFmpeg. | The decoded JPEG representation and its generated thumbnail are stored in app cache. Generation requires **Enable Cache**. **Size** and **Quality** apply to the thumbnail. |
| SVG | The graphic rendered directly | `.svg`; no source raster is generated first. | Not controlled by the disk-cache toggle. |
| Video | An extracted video frame, cropped to fill its tile | All registered video extensions. Bundled FFmpeg extracts the frame; an unsupported or damaged video uses the video icon. | Generated disk thumbnail only when **Enable Cache** is on. **Size** and **Quality** apply. |
| Audio | Cover artwork, or a music icon with an audio badge | Phials checks common sibling artwork names such as `cover`, `folder`, `album`, or `front` in JPEG, PNG, or WebP, then checks embedded cover art. | Loaded from the source file or sibling image. Not controlled by the thumbnail disk-cache settings. |
| PDF | The first page, fitted without cropping | PDF.js rasterizes page 1. Password-protected, damaged, or unreadable PDFs use the PDF icon. | Session memory plus the shared thumbnail disk cache. With **Enable Cache** off, Phials uses the PDF icon and does not rasterize. **Size** and **Quality** apply. |
| Text and code | A fixed-dark source miniature with line numbers and syntax color | The literal first 32 lines or 32 KiB, whichever comes first. Empty, whitespace-only, unreadable, or invalid UTF-8 content uses the file icon. Missing syntax support falls back to plain source text. | Session memory only. Generation requires **Enable Cache**. **Size** applies; **Quality** does not. |
| HTML and Markdown | Ordinary file icon | Phials does not render HTML pages or Markdown documents into thumbnails. | No generated thumbnail. |
| Spreadsheets | A theme-colored 2-column by 3-row table snapshot | `.csv`, `.tsv`, `.xlsx`, `.xls`, `.ods`. Workbooks sample their first sheet. Files over 2 MiB or files that cannot be parsed use the spreadsheet icon. | Session memory only. The disk-cache toggle and **Quality** setting do not apply. |
| SQLite databases | Ordinary database icon | `.db`, `.sqlite`, `.sqlite3`, `.db3`, `.s3db`, `.sl3` | No generated thumbnail. |
| Folders | A folder shell containing a composite of up to four images directly inside the folder | The scan is shallow and uses the first supported images in case-insensitive alphabetical path order. Folders with no usable images use the folder icon. | Generated in the shared disk cache when **Enable Cache** is on. **Size** and **Quality** apply. |
| Steam game folders | Local cover, hero, or icon artwork | Available when Phials can resolve a local Steam record and artwork path. Otherwise it uses the Steam icon. | Uses existing local artwork rather than the thumbnail disk cache. |
| macOS applications | The app bundle's icon | `.app` on macOS. Phials reads the bundle's icon and converts it to PNG with macOS tools. | Generated app-icon disk cache. It is not disabled by **Enable Cache**. **Size** applies; **Quality** does not. |
| macOS disk images | The detected contained app's icon | `.dmg` on macOS. On a cold request, Phials mounts the image read-only to find an app icon. If none exists, it records the miss and uses the disk-image icon. | Generated disk cache, including remembered misses. It is not disabled by **Enable Cache**. **Size** applies; **Quality** does not. |
| Windows executables | The icon supplied by Windows Shell | `.exe` on Windows. Extraction never runs or installs the executable. | Generated app-icon disk cache. It is not disabled by **Enable Cache**. **Size** applies; **Quality** does not. |
| Fonts | An `Aa` specimen rendered in the font with an extension label | `.ttf`, `.otf`, `.woff`, `.woff2`. A file the WebView cannot load may show fallback text. | Rendered directly; not controlled by disk-cache settings. |
| 3D models | A static 3D file icon with an extension badge | `.gltf`, `.glb`, `.obj`, `.stl`, `.fbx`, `.dae`, `.ply`, `.3ds`. Phials deliberately does not render live model scenes in file-view tiles. | No generated content thumbnail. |
| Archives and other files | Ordinary file-type icon | Archives, unsupported formats, and failed thumbnail loads retain their normal icons. | No generated content thumbnail. |

## Thumbnail settings

Open **Settings**, choose **Files**, then **Media** to change generated-thumbnail behavior:

- **Enable Cache** controls the generated image, Camera RAW, video, PDF, text, and folder paths described above. It does not globally disable direct artwork, font specimens, spreadsheet snapshots, app icons, executable icons, or disk-image icons.
- **Size** sets the requested generated size from 64 to 512 pixels. The default is 256 pixels. A file view's item-size control changes how large the tile appears and is separate from this generation setting.
- **Quality** sets JPEG generation quality from 40% to 95%. The default is 80%. It affects raster, Camera RAW, video, PDF, and folder output, not direct or in-memory representations.
- **Clear Thumbnail Cache** removes the shared on-disk thumbnail and app-icon cache. Phials regenerates applicable entries when they are requested again. Session-only thumbnails disappear when their in-memory cache is released or Phials restarts.

Camera RAW decoded representations live in their own regenerable cache even though their derived grid thumbnails use the shared thumbnail cache. Metadata uses a separate cache and a separate **Clear metadata cache** action.

For the settings procedure, see [Configure thumbnails and media behavior](../../arrange-and-customize-phials/choose-default-behaviors/configure-thumbnails-and-media-behavior.md).
