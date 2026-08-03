---
title: "Work with files and folders"
description: "Use supported Plugin API operations to inspect, change, watch, open, and reveal filesystem items."
ai_disclosure: true
---

# Work with files and folders

Use `api.files` for supported filesystem work. It provides cross-platform path helpers, typed directory listings, revision-aware text and binary writes, cancellable folder summaries, recoverable mutations, directory watches, and native reveal behavior. Pane-owned opening lives on `api.explorer`.

Filesystem access is permission-gated. A path supplied by a user or received from Phials is not itself an access grant. Your plugin manifest must request the permission required by the operation, and Phials must have access to that location through the operating system.

## Choose the smallest permission

| Operation | Method | Permission |
| --- | --- | --- |
| Inspect path strings | `getExtension`, `getBasename`, `getDirname`, `joinPath` | [Always available](../../reference/manifest-and-permissions-reference/permission-gated-plugin-api-operations.md#always-available-operations) |
| Ask the user for a folder | `pickDirectory` | [Always available](../../reference/manifest-and-permissions-reference/permission-gated-plugin-api-operations.md#always-available-operations) |
| List/summarize a folder, read text or bytes, inspect Git, or create an asset URL | `readDirectory`, `getFolderSummary`, `readText`, `readBinary`, `api.git`, `toAssetUrl` | [`filesystem.read`](../../reference/manifest-and-permissions-reference/plugin-permission-reference.md#filesystemread) |
| Watch a folder | `watchDirectory` | [`filesystem.read`](../../reference/manifest-and-permissions-reference/plugin-permission-reference.md#filesystemread) |
| Create, write, rename, or trash | `writeText`, `writeBinary`, `createDirectory`, `renamePath`, `trash` | [`filesystem.write`](../../reference/manifest-and-permissions-reference/plugin-permission-reference.md#filesystemwrite) |
| Open in Phials or reveal in the native file manager | `pane.navigation.openPath`, `api.files.revealPath` | [Always available](../../reference/manifest-and-permissions-reference/permission-gated-plugin-api-operations.md#always-available-operations) |

`filesystem.write` includes the supported read operations, so a plugin that reads and writes files requests only `filesystem.write`. Request `filesystem.read` when the plugin never changes filesystem content. See [Request the least plugin permissions](../../package-and-publish/configure-the-plugin-manifest/request-the-least-plugin-permissions.md).

```json
{
  "permissions": ["filesystem.read"]
}
```

Permissions gate the supported Plugin API. They do not make arbitrary filesystem locations portable or guarantee operating-system access. Do not use raw host commands, browser URLs, or imported native filesystem packages to bypass `api.files`.

## Work through the tasks

1. [Work with paths and file entries](work-with-paths-and-file-entries.md)
2. [Let users choose and read folders](let-users-choose-and-read-folders.md)
3. [Read and write text files safely](read-and-write-text-files-safely.md)
4. [Create, rename, and trash files and folders](create-rename-and-trash-files-and-folders.md)
5. [Watch folders for changes](watch-folders-for-changes.md)
6. [Open and reveal files and folders](open-and-reveal-files-and-folders.md)

## Keep ownership clear

`api.files` performs one requested operation. Your plugin still owns:

- deciding why the operation is necessary
- asking for confirmation before consequential changes
- retaining revision tokens between a read and write
- representing partial failures without claiming the whole batch succeeded
- releasing watches when their feature is no longer active
- explaining permission or operating-system errors in user-facing terms

Phials owns:

- permission enforcement and the approved host-command allowlist
- cross-platform path and Trash behavior
- atomic text and binary replacement with one conflict contract
- file-opening policy and native file-manager integration
- deactivation cleanup for retained watches

For binary content needed during metadata extraction, use the provider-specific metadata API described in [Extract file metadata](../../add-capabilities/extract-file-metadata/index.md). General `api.files` text operations are deliberately UTF-8 only.

## SDK reference

- [FileUtilsAPI](../../reference/sdk-type-reference/FileUtilsAPI.md)
- [FileEntry](../../reference/sdk-type-reference/FileEntry.md)
- [PluginTextFileSnapshot](../../reference/sdk-type-reference/PluginTextFileSnapshot.md)
- [PluginTextWriteResult](../../reference/sdk-type-reference/PluginTextWriteResult.md)
- [PluginDirectoryWatch](../../reference/sdk-type-reference/PluginDirectoryWatch.md)
