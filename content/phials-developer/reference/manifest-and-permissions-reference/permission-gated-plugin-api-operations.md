---
title: "Permission-gated Plugin API operations"
description: "Maps typed API methods and provider helpers to the permissions they require and identifies always-available operations."
ai_disclosure: true
order: 3
---

# Permission-gated Plugin API operations

This page maps typed public operations to manifest permissions. Prefer these
typed services over `api.invoke`; the typed API owns argument shapes, result
types, plugin scoping, and cleanup.

## Always-available operations

Operations marked **None** require no manifest permission. They remain limited
to their documented scope: a user choice, plugin-owned data, read-only app
context, an activated provider, or host-owned feedback. They do not grant
general filesystem, clipboard, network, or host-command access.

## File operations

| Operation | Permission | Result or consequence |
| --- | --- | --- |
| `api.files.getExtension(filename)` | None | Lowercase extension without the period, or `""` |
| `api.files.getBasename(path)` | None | Last path segment |
| `api.files.getDirname(path)` | None | Parent path |
| `api.files.joinPath(...parts)` | None | Joined portable path string |
| `api.files.pickDirectory(options?)` | None | User-selected path or `null` |
| `api.explorer.getActivePane()` / `getPane(id)` | None | Explicitly acquires a reactive Public Explorer pane facade |
| `pane.navigation.openPath(path)` | None | Opens through the exact pane's supported primary Phials action |
| `api.files.revealPath(path)` | None | Reveals the path in the native file manager |
| `api.files.readDirectory(path)` | `filesystem.read` or `filesystem.write` | Entries plus ordered child-materialization failures |
| `api.files.toAssetUrl(path)` | `filesystem.read` or `filesystem.write` | Trusted-renderer asset URL for one absolute file path |
| `api.files.readBinary(path)` | `filesystem.read` or `filesystem.write` | Raw-byte snapshot plus opaque revision |
| `api.files.getFolderSummary(path, { signal })` | `filesystem.read` or `filesystem.write` | Cancellable recursive counts and byte total |
| `api.git.getInfo(path)` / `getLanguages(path)` | `filesystem.read` or `filesystem.write` | Fixed read-only repository projections with sanitized remotes |
| `api.files.readText(path)` | `filesystem.read` or `filesystem.write` | [PluginTextFileSnapshot](../../reference/sdk-type-reference/PluginTextFileSnapshot.md) with content and opaque revision |
| `api.files.watchDirectory(path, handler)` | `filesystem.read` or `filesystem.write` | [PluginDirectoryWatch](../../reference/sdk-type-reference/PluginDirectoryWatch.md); `unsubscribe()` releases it |

`MetadataProvider.extract` receives target-bound `api.readFile()` and
`api.readTextFile()` methods that require no filesystem permission. They accept
no path and expire with the extraction callback. Reading any other file uses
the permission-gated `api.files` methods above.
| `api.files.writeText(path, content, options)` | `filesystem.write` | [PluginTextWriteResult](../../reference/sdk-type-reference/PluginTextWriteResult.md): saved revision or conflict |
| `api.files.createDirectory(path)` | `filesystem.write` | Creates one directory |
| `api.files.renamePath(source, destination)` | `filesystem.write` | Renames within one directory |
| `api.files.writeBinary(path, content, options)` | `filesystem.write` | Atomic saved-or-conflict result using the shared revision contract |
| `api.files.trash(paths)` | `filesystem.write` | Ordered per-path success/failure outcomes |

`filesystem.write` implies supported reads. `pickDirectory` is always available
because the user chooses a path; reading the selected directory or its files is
separately gated.

## Clipboard and network

| Operation | Permission | Result |
| --- | --- | --- |
| `api.clipboard.readText()` | `clipboard.read` | Current clipboard text |
| `api.clipboard.writeText(text)` | `clipboard.write` | `void` after replacement |
| `api.fetch(input, init?)` | `network.fetch` | Standard `Response` |

Clipboard permissions do not imply each other. `network.fetch` gates only the
supported Plugin API wrapper; it is not a renderer network sandbox.

## Workspace Folder operations

| Operation group | Permission | Result |
| --- | --- | --- |
| `api.workspaceFolders` schema, value, tag, rating, known-folder, and existing-Page reads | `workspace-folders.read` or `workspace-folders.write` | Typed immutable Workspace Folder projections |
| `api.workspaceFolders` property, tag, rating, and schema mutations | `workspace-folders.write` | Validated atomic changes |
| `api.workspaceFolders.openPage` with implicit creation | `workspace-folders.write` | Host-mediated confirmation, creation, reconciliation, and opening |

`workspace-folders.write` implies protected reads. Do not pair it with
`workspace-folders.read`.

## Provider-scoped helpers

These operations are always available only in the provider callback or surface
scope that declares them:

| Operation | Manifest permission | Scope |
| --- | --- | --- |
| `MetadataAPI.readFile()` | None | Reads only the exact host-selected extraction target as `Uint8Array` |
| `MetadataAPI.readTextFile()` | None | Reads only the exact host-selected extraction target as UTF-8 text |
| `PreviewAPI.getMetadata(file)` | None | Preview-specific factories receiving [PreviewAPI](../../reference/sdk-type-reference/PreviewAPI.md) |
| `PreviewAPI.openFullscreen(file)` | None | Preview-specific factories receiving [PreviewAPI](../../reference/sdk-type-reference/PreviewAPI.md) |
| `PreviewAPI.navigateTo(path)` | None | Preview-specific factories receiving [PreviewAPI](../../reference/sdk-type-reference/PreviewAPI.md) |
| `FileMatchAPI.matchesExtension(file, extensions)` | None | Provider matching callbacks receiving [FileMatchAPI](../../reference/sdk-type-reference/FileMatchAPI.md) |
| `FileMatchAPI.matchesMime(file, mimeTypes)` | None | Provider matching callbacks receiving [FileMatchAPI](../../reference/sdk-type-reference/FileMatchAPI.md) |
| `FileMatchAPI.matchesCategory(file, categories)` | None | Provider matching callbacks receiving [FileMatchAPI](../../reference/sdk-type-reference/FileMatchAPI.md) |

Do not retain a specialized API beyond its documented lifetime or cast a base
[PluginAPI](../../reference/sdk-type-reference/PluginAPI.md) to obtain it.
Phials invalidates retained base, Preview, and Metadata API objects when that
activation deactivates.

## Plugin-owned data

Plugin-owned settings and data are namespaced by the activated plugin ID and do
not require manifest permissions:

| Service | Always-available operations |
| --- | --- |
| `api.settings` | `get`, `set`, `getAll` |
| `api.storage` | `get`, `set`, `delete`, `keys`, `clear` |
| `api.database` | `query`, `execute`, `insert`, `update`, `deleteFrom`, `selectAll` for declared plugin tables |

`api.database` throws when the exported [PhialsPlugin](../../reference/sdk-type-reference/PhialsPlugin.md) has no database schema.
Manifest permissions do not expand a plugin beyond its own settings namespace,
storage namespace, or declared database tables.

## App context, panels, events, and feedback

These base Plugin API operations require no manifest permission:

| Service | Always-available operations |
| --- | --- |
| `api.appSettings` | Read `thumbnailsEnabled`, `thumbnailSize`, `thumbnailQuality`, `showHiddenFiles`, and `showParentDirectory` |
| `api.modules` | `openCenter(moduleProviderId, state, options?)` for an activated center-capable [ModuleProvider](../../reference/sdk-type-reference/ModuleProvider.md) |
| `api.events` | `on`, `once`, `emit`, `register`; subscriptions remain subject to lifecycle cleanup |
| `api.modal` | `confirm`, `prompt`, `alert`, `choose` |
| `api.notify` | `info`, `success`, `warning`, `error` |

No permission makes an unknown module provider, event, database table, or app
setting available.

## Approved host commands

`api.invoke` performs two checks:

1. the command name must be in the community-plugin allowlist; and
2. the current manifest permission set must include the command's required
   permission, when any.

An allowed name can still fail because of invalid arguments, an unavailable
tool, an unsupported platform condition, a missing path, or operating-system
access rules.

See [Approved host command reference](./approved-host-command-reference.md) for
the complete command-by-command mapping. A permission never authorizes a host
command absent from that table.
