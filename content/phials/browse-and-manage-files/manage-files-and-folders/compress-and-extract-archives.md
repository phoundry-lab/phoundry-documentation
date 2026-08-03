---
title: "Compress and extract archives"
description: "Create ZIP, TAR.GZ, or 7Z archives and expand supported archives beside the original."
icon: phoundry-mono:folder
order: 5
ai_disclosure: true
---

# Compress and extract archives

Phials can create `.zip`, `.tar.gz`, and `.7z` archives. It can extract `.zip`, `.tar`, `.tar.gz`, `.tgz`, and `.7z` archives.

## Compress files and folders

1. Select one or more items from the same folder.
2. Choose **Compress** from the context menu.
3. Enter an **Archive Name** and choose **ZIP**, **TAR.GZ**, or **7Z**.
4. For an encrypted archive, choose **ZIP**, enable **Protect with password**, and enter the password twice.

> **Warning:** Phials writes directly to the chosen archive filename. If that filename already exists, it can be replaced. Choose a unique name when you need to keep the existing archive.

5. Choose **Compress**.

Phials creates the archive beside the selected items. For one item, the suggested archive name is that item's full name. For multiple items, the suggested name is the containing folder's name. **Compression Complete** shows the created path.

TAR.GZ does not support passwords. Phials can extract encrypted 7Z archives, but creating a password-protected 7Z archive is not supported; use ZIP when you need encryption.

If compression fails, Phials shows **Compression Failed**. An incomplete output file can remain beside the selected items; remove it or choose another name before retrying.

## Extract an archive

> **Warning:** If a folder with the destination name already exists, extraction uses that folder and can replace files with matching paths. Rename the archive or move the existing folder first when you need to preserve it unchanged.

1. Select one supported archive.
2. Choose **Expand Archive** from the context menu.
3. If prompted, enter the archive password and choose **Extract**.

Phials creates a folder beside the archive using the archive name without its extension. For example, `photos.tar.gz` expands into `photos`. **Extraction Complete** reports how many files were extracted and shows the destination path.

An incorrect password returns you to the password prompt. Other failures show **Extraction Failed**. Files extracted before a failure can remain in the destination folder, so inspect or remove that folder before retrying.

A plain `.gz` file is not a supported multi-file archive and cannot be expanded with this command.
