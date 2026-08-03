---
title: "Inspect apps, executables, disk images, and archives"
description: "Inspect application bundles, Windows executables, macOS disk images, and archive contents before acting on them."
icon: phoundry-mono:eye
order: 6
aliases:
  - previews/dmg-handler
  - previews/macos-app
ai_disclosure: true
---

# Inspect apps, executables, disk images, and archives

Phials can present useful information for several technical file types that do not have document-like contents. The available representation depends strongly on the operating system and file format.

## Inspect a macOS application bundle

On macOS, select an `.app` bundle to see its extracted icon and application details. The summary can include:

- Version and build
- Bundle ID, architecture, and size
- Minimum macOS version, application category, and copyright
- Signing, App Store, and sandbox status

Expand **Details** or **Security** when those sections are present. These fields report information found in the bundle; they are not a guarantee that the app is safe to run.

The representation also provides **Uninstall**. Phials first looks for related application files, then opens a confirmation where you can choose what to move to Trash. Review that list carefully, especially for applications that share support files with related tools.

Application-bundle inspection is macOS-only. On Windows or Linux, use the system's file tools or open the bundle on a Mac.

## Inspect a Windows executable

On Windows, select an `.exe` file to see its embedded application icon when available, plus its name and file size. The representation is read-only and does not run the executable.

Phials does not currently present PE headers, signatures, version resources, dependencies, or malware analysis in this surface. Use Windows security tools and a dedicated executable inspector when you need to establish trust or examine internals.

The specialized executable representation is Windows-only. On macOS or Linux, the file uses a generic representation unless another compatible viewer is installed.

## Inspect and install from a macOS disk image

On macOS, selecting a `.dmg` temporarily mounts the disk image for inspection and unmounts it after gathering information. When Phials finds an application inside, it can show the app icon, version, bundle ID, architecture, minimum macOS version, and signing or sandbox information.

Choose **Install to Applications** to copy the detected application into `/Applications`. Phials reports success or the installation error in the representation. If the disk image does not contain a recognizable application bundle, it shows **No application found in this DMG** instead of offering the install action.

DMG inspection and installation are macOS-only. A disk image from an unknown source should still be treated as untrusted even when its metadata and signature fields are visible.

## Inspect an archive

Select a supported archive to review its format, entry counts, archive and uncompressed sizes, compression ratio, password requirement, and a scrollable **Contents** list. The list shows at most the first 500 entries and marks when the result has been trimmed.

For archives larger than 500 MB, Phials defers the detailed listing so the File panel remains responsive. Choose **View Preview** when you want Phials to scan it, or extract it without loading the listing first.

Choose **Extract archive** to create an extracted sibling folder. For destination naming, conflicts, password prompts, and failure cleanup, follow [Compress and extract archives](../../browse-and-manage-files/manage-files-and-folders/compress-and-extract-archives.md).

A warning inside the archive representation can indicate that only partial information was available. **Could not preview archive** means Phials could not read the container at all; you can still try the system default application if the file is valid but uses an unsupported variation.

See [File viewing and editing support](../../reference/file-format-and-metadata-support/file-viewing-and-editing-support.md) for the exact archive formats Phials handles.
