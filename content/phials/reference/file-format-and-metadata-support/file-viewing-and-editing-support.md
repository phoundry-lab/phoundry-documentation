---
title: "File viewing and editing support"
description: "Check supported file extensions, in-app viewing and editing capabilities, opening behavior, platform limits, and size boundaries."
icon: phoundry-mono:sliders
order: 1
ai_disclosure: true
---

# File viewing and editing support

Phials can display many file types in the **File panel** and can open selected formats in **File mode** inside a file tab. Some formats also support playback, source editing, structured editing, or specialized inspection.

The tables below describe the features included with Phials. A listed extension means Phials routes that filename to the indicated feature. A damaged file, an unusual codec, or missing linked assets can still prevent it from loading.

## Images and media

| File type | Extensions | In Phials | Primary open | Limits and boundaries |
| --- | --- | --- | --- | --- |
| Raster images | `.png`, `.jpg`, `.jpeg`, `.gif`, `.webp`, `.bmp`, `.tiff`, `.tif`, `.ico`, `.heic`, `.heif`, `.avif`, `.dds` | View and zoom. Edit PNG, JPEG, WebP, BMP, TIFF, and GIF with annotate, crop, rotate, resize, and convert tools. | File tab | Editing is limited to images no larger than 6000 pixels on either edge. ICO, HEIC, HEIF, AVIF, and DDS are view-only. Animated images are treated as raster images rather than video. |
| SVG graphics | `.svg` | Switch between the rendered graphic and editable source. | File tab | Files over 1 MiB show the size-limit state instead of either view. Saving changes the SVG source. |
| Camera RAW | `.raw`, `.dng`, `.cr2`, `.cr3`, `.crw`, `.nef`, `.nrw`, `.arw`, `.srf`, `.sr2`, `.orf`, `.rw2`, `.raf`, `.pef`, `.ptx`, `.rwl`, `.srw`, `.x3f`, `.dcr`, `.kdc`, `.3fr`, `.fff`, `.iiq`, `.mef`, `.mrw`, `.erf`, `.mos`, `.bay` | View a decoded JPEG representation and inspect camera metadata. | File tab | Read-only. Phials uses bundled ExifTool and, when needed, bundled FFmpeg. A file that neither tool can decode has no in-app image representation. |
| Video | `.mp4`, `.webm`, `.ogg`, `.ogv`, `.mov`, `.m4v`, `.avi`, `.mkv`, `.mpeg`, `.mpg`, `.3gp` | Play video with transport, volume, fit, loop, and caption controls. | File tab | Read-only. Playback codec support also depends on the system WebView. Bundled FFmpeg supplies thumbnails and metadata, not the visible player's codec support. |
| Audio | `.wav`, `.wave`, `.flac`, `.alac`, `.aiff`, `.aif`, `.aifc`, `.ape`, `.wv`, `.tta`, `.tak`, `.shn`, `.dsd`, `.dsf`, `.dff`, `.pcm`, `.au`, `.snd`, `.caf`, `.w64`, `.rf64`, `.mp3`, `.mp2`, `.mp1`, `.aac`, `.m4a`, `.m4b`, `.m4r`, `.oga`, `.opus`, `.wma`, `.mka`, `.ac3`, `.eac3`, `.ec3`, `.dts`, `.dtshd`, `.ra`, `.ram`, `.gsm`, `.amr`, `.awb`, `.spx`, `.mpc`, `.voc`, `.vox`, `.qcp` | Play through the audio player and edit supported embedded tags and cover art in the File panel. | Audio player | There is no audio File mode in a file tab. If the system WebView cannot play a file directly, Phials can create a cached WAV playback copy with bundled FFmpeg. Tag saving depends on the file's tag container. |
| MIDI, tracker, and soundfont files | `.mid`, `.midi`, `.kar`, `.rmi`, `.xmf`, `.mxmf`, `.mod`, `.s3m`, `.xm`, `.it`, `.umx`, `.sf2`, `.sfz` | Inspect or edit supported embedded tags in the File panel. | System default app | The in-app audio player does not play these files. The tag reader may not support every format in this category. |

The `.ogg` and `.webm` extensions can contain audio, video, or both. Phials currently treats both extensions as video for file viewing, so they open in a file tab rather than the audio player.

## Documents, source, and data

| File type | Extensions | In Phials | Primary open | Limits and boundaries |
| --- | --- | --- | --- | --- |
| Plain text and code | `.txt`, `.text`, `.log`, `.json`, `.yaml`, `.yml`, `.xml`, `.csv`, `.tsv`, `.css`, `.scss`, `.less`, `.js`, `.jsx`, `.ts`, `.tsx`, `.mjs`, `.cjs`, `.toml`, `.ini`, `.conf`, `.cfg`, `.env`, `.sh`, `.bash`, `.zsh`, `.fish`, `.ps1`, `.bat`, `.cmd`, `.py`, `.rs`, `.go`, `.java`, `.c`, `.cpp`, `.cc`, `.h`, `.hpp`, `.cs`, `.rb`, `.php`, `.swift`, `.kt`, `.kts`, `.scala`, `.lua`, `.pl`, `.pm`, `.r`, `.sql`, `.svelte`, `.vue`, `.astro`, `.gitignore`, `.dockerignore`, `.editorconfig`, `.prettierrc`, `.eslintrc` | View and edit source with line numbers and syntax highlighting. | File tab | Files over 1 MiB show the size-limit state. Higher-priority features claim CSV, TSV, HTML, and other specialized formats before the general text editor. |
| Markdown | `.md`, `.markdown`, `.mdc` | Edit in the formatted Editor or Raw source mode. | File tab | Files over 1 MiB show the size-limit state. Markdown saves automatically; conflicts and missing files use the editor's recovery controls. |
| HTML | `.html`, `.htm` | Switch between an isolated rendered document and editable Raw source. | File tab | Files over 1 MiB show the size-limit state. Saving is explicit. Rendered scripts can run inside a restricted frame but cannot access Phials. `.xhtml` is not handled by this feature. |
| Flat spreadsheets | `.csv`, `.tsv` | View and edit one table, including headers, rows, and columns. | File tab | Phials reads the complete file into memory. Saving rewrites the complete file. |
| Workbook spreadsheets | `.xlsx`, `.xls`, `.ods` | View and edit existing sheets, cells, headers, rows, and columns. | File tab | Phials reads the complete workbook into memory. You cannot add, rename, delete, duplicate, reorder, or hide sheets. Saving rewrites the complete workbook. |
| SQLite databases | `.db`, `.sqlite`, `.sqlite3`, `.db3`, `.s3db`, `.sl3` | Browse tables and page through rows. | File tab | Read-only. Phials opens the database with read-only SQLite access and displays 100 rows per page by default. BLOB values are represented by their byte size rather than decoded. |
| PDF documents | `.pdf` | Read continuous pages, navigate by page, and change zoom or fit. | File tab | Read-only. Phials does not fill forms, accept passwords, search text, annotate, or edit PDFs. It loads the document through PDF.js. |

CSV and TSV use the spreadsheet feature rather than the general text editor. HTML uses its rendered/source feature rather than the general text editor.

## Folders, packages, and technical files

| File type | Extensions or match | In Phials | Primary open | Limits and boundaries |
| --- | --- | --- | --- | --- |
| Ordinary folders | Folder | Inspect file counts, total size, and type composition. Folders with Workspace Folder data show a Workspace-specific summary. | Navigate into the folder | Folder analysis is read-only and may continue in the background. |
| Git repositories | Folder recognized as a Git working tree | Inspect branch, remote, status, commits, languages, and repository size information. | Navigate into the folder | Inspection is read-only; Git commands and source editing remain separate actions. |
| Steam game folders | A game directory directly under a Steam library's `steamapps/common` folder | Inspect local game information and artwork. | Navigate into the folder | Available only when Phials can resolve the local Steam installation and game records. |
| Archives | `.zip`, `.7z`, `.tar`, `.tar.gz`, `.tgz` | Inspect entries and compression totals, then extract. | System default app | Inspection is read-only. The list shows at most 500 entries. Archives over 500 MiB wait for you to choose **View Preview** before listing contents. Password-protected archives can be identified and extracted after you provide the password. |
| macOS applications | `.app` bundle | Inspect bundle identity, version, architecture, signing, sandbox, and related files; uninstall with review. | Open the application | macOS only. An app bundle is inspected as one application even though it is a folder on disk. |
| macOS disk images | `.dmg` | Inspect a detected app inside the image and install it to Applications. | System default app | macOS only. Phials mounts the image read-only while inspecting it. Images without a detectable app still remain ordinary disk-image files. |
| Windows executables | `.exe` | Inspect the file and its Windows Shell icon without running it. | Open the executable | Windows only. Read-only inspection does not execute or install the file. MSI packages are not included. |

## Fonts, 3D models, and fallback files

| File type | Extensions | In Phials | Primary open | Limits and boundaries |
| --- | --- | --- | --- | --- |
| Fonts | `.ttf`, `.otf`, `.woff`, `.woff2` | View character sets, specimen text, and a size waterfall. | System default app | Read-only. The file must be loadable by the system WebView's font engine. |
| 3D models | `.gltf`, `.glb`, `.obj`, `.stl`, `.fbx`, `.dae`, `.ply`, `.3ds` | Orbit, pan, zoom, change material presentation, and inspect mesh statistics. | File tab | Read-only. Linked textures, materials, and buffers must remain at the relative paths recorded by the model. Large models are loaded into memory. |
| Other files | Any unmatched extension | Show the ordinary file icon and an unavailable-viewer message. | System default app | An unavailable viewer does not prevent metadata, Workspace Folder properties, Pages, or opening the file in another app. |

Your per-extension opening choice can replace any primary-open behavior in this table. See [Choose how files open](../../arrange-and-customize-phials/choose-default-behaviors/choose-how-files-open.md).

For format-specific controls, see [View and inspect files](../../view-and-edit-files/view-and-inspect-files/index.md). For saving, autosave, and recovery behavior, see [Edit files in Phials](../../view-and-edit-files/edit-files-in-phials/index.md).
