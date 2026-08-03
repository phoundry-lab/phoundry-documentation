---
title: "Metadata support by file type"
description: "Check which structured metadata fields Phials reads from each file type, where the values appear, and which audio tags can be edited."
icon: phoundry-mono:sliders
order: 2
ai_disclosure: true
---

# Metadata support by file type

**Metadata** is information Phials reads from a file or the filesystem. It is separate from the reader-defined **properties** stored in a Workspace Folder.

Structured metadata can appear in the File panel and as optional Details columns. A field appears only when the file contains a usable value. If extraction fails, Phials omits the affected fields rather than displaying invented values or an error value; basic filesystem facts can still remain available.

## Structured metadata fields

| File type | Scope | Fields Phials can show | Source |
| --- | --- | --- | --- |
| Regular files | All regular files | **Size**, **Created**, **Modified**. Media extractors can also supply **Duration** and **Bitrate**. | Filesystem facts plus the matching file reader |
| Raster images | `.jpg`, `.jpeg`, `.png`, `.tiff`, `.tif`, `.webp` | **Dimensions**, **Camera**, **Lens**, **Exposure**, **Aperture**, **ISO**, **Focal Length**, **Captured**, **Color Type**, **Bit Depth**, **Software**, **Artist**, **Description**, **Comment** | Image headers, EXIF, and PNG text chunks read by Phials |
| Camera RAW | `.raw`, `.dng`, `.cr2`, `.cr3`, `.crw`, `.nef`, `.nrw`, `.arw`, `.srf`, `.sr2`, `.orf`, `.rw2`, `.raf`, `.pef`, `.ptx`, `.rwl`, `.srw`, `.x3f`, `.dcr`, `.kdc`, `.3fr`, `.fff`, `.iiq`, `.mef`, `.mrw`, `.erf`, `.mos`, `.bay` | **Dimensions**, **Camera**, **Lens**, **Exposure**, **Aperture**, **ISO**, **Focal Length**, **Captured**, **White Balance**, **Color Temperature**, **Flash**, **Metering Mode**, **Exposure Program**, **GPS**, **Software**, **Description** | Bundled ExifTool |
| Audio | `.mp3`, `.flac`, `.wav`, `.ogg`, `.oga`, `.m4a`, `.aac`, `.wma`, `.aiff`, `.aif`, `.opus` | Embedded tags listed under [Editable audio tags](#editable-audio-tags), plus **Sample Rate**, **Channels**, **Bit Depth**, **Overall Bitrate**, **Duration**, and **Bitrate** | Phials' audio tag reader |
| Video | `.mp4`, `.webm`, `.ogg`, `.ogv`, `.mov`, `.m4v`, `.avi`, `.mkv`, `.mpeg`, `.mpg`, `.3gp` | **Dimensions**, **Duration**, **Frame Rate**, **Video Codec**, **Audio Codec**, **Title**, **Description**, **Media Created**, **Encoder**, and base **Bitrate** | Bundled ffprobe |
| PDF | `.pdf` | **Pages**, **Title**, **Author**, **PDF Version**, **Document Created** | PDF.js and the PDF information dictionary |
| Code and structured text | Files Phials classifies as code, data, configuration, or markup | **Language**, **Lines** | Filename mapping plus a buffered line count on disk |

Raster formats that Phials can view but that are absent from the raster-metadata row, including GIF, BMP, ICO, HEIC, HEIF, AVIF, and DDS, receive base filesystem facts but no structured image fields from the image metadata reader.

The code language field comes from the filename. The line count is a physical line count and is omitted for files over 10 MiB, unreadable files, and extensions outside Phials' code-metadata list. Plain `.txt`, `.text`, `.log`, and Markdown files are not part of the code-metadata scope even though Phials can display them.

Video and Camera RAW metadata use tooling bundled with release builds. If the tool cannot read one file, Phials omits that file's specialized fields. The File panel does not show an installation prompt for the file.

## Editable audio tags

File metadata is read-only in Phials except for supported embedded audio tags and cover art. The audio tag editor exposes these editable fields when the file and its tag container support them:

- Track and album: **Title**, **Artist**, **Album Artist**, **Album**, **Year**, **Genre**, **Track**, **Track Total**, **Disc**, **Disc Total**, **Subtitle**, **Disc Subtitle**, and **Grouping**.
- Credits and publishing: **Composer**, **Conductor**, **Lyricist**, **Writer**, **Remixer**, **Producer**, **Arranger**, **Engineer**, **Performer**, **Label**, **Publisher**, **Copyright**, **Comment**, **Lyrics**, and **Language**.
- Dates and musical information: **Recording Date**, **Release Date**, **Original Release**, **BPM**, **Key**, **Mood**, **Media Type**, **Work**, **Movement**, **Movement #**, and **Movement Total**.
- Encoding and identifiers: **Encoder**, **Encoded By**, **Encoder Settings**, **ISRC**, **Catalog #**, **Barcode**, **MusicBrainz Recording ID**, **MusicBrainz Track ID**, **MusicBrainz Release ID**, **MusicBrainz Release Group ID**, **MusicBrainz Artist ID**, **MusicBrainz Release Artist ID**, and **MusicBrainz Work ID**.
- ReplayGain: **ReplayGain Track Gain**, **ReplayGain Album Gain**, **ReplayGain Track Peak**, and **ReplayGain Album Peak**.
- Artwork: embedded JPEG, PNG, GIF, or BMP cover art up to 8 MiB. WebP cover art can be displayed but not embedded by the editor.

**Sample Rate**, **Channels**, **Bit Depth**, and **Overall Bitrate** are derived technical values and remain read-only. Clearing a supported editable field removes that tag value when the format permits it. Save writes to the original audio file; it does not turn the values into Workspace Folder properties.

See [Edit audio tags](../../view-and-edit-files/edit-files-in-phials/edit-audio-tags.md) for the procedure.

## Dates and missing values

Filesystem **Created** and **Modified** describe the file on disk. Image **Captured**, video **Media Created**, PDF **Document Created**, and audio recording or release dates come from information embedded in the file and can differ from filesystem dates.

Phials leaves a structured field empty when the source tag is absent, blank, unreadable, over its extraction limit, or unsupported by that container. It does not substitute the filesystem date for an absent embedded date.
