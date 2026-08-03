---
title: "Approved host command reference"
description: "Lists only supported api.invoke commands with arguments, return values, permission requirements, platform or version boundaries, and typed alternatives."
ai_disclosure: true
order: 4
---

# Approved host command reference

`api.invoke` accepts only the literal command names in this page. Every command
is available from Plugin API `1.0.0` unless a row says otherwise.

Prefer the typed alternative when one exists. The generic supplied to
`api.invoke<T>()` describes the expected result to TypeScript; it does not
validate the runtime payload.

## Shared result shapes

The tables use these wire shapes:

```ts
type SystemPathKey =
	| "home"
	| "desktop"
	| "documents"
	| "downloads"
	| "pictures"
	| "videos";

type SystemPaths = Partial<Record<SystemPathKey, string>>;

interface DriveInfo {
	path: string;
	label: string;
	ejectable: boolean;
	drive_type: "internal" | "external" | "disk_image" | "network";
	network_target?: string | null;
}

interface EmbeddedAudioCover {
	mime_type: string;
	data_base64: string;
}

type RawFileMetadata = Record<string, string>;
```

Structured results should still be validated at the plugin boundary.

## Always-approved system commands

| Command | Arguments | Result | Permission | Platform | API | Typed alternative |
| --- | --- | --- | --- | --- | --- | --- |
| `get_system_paths_cmd` | None | `SystemPaths` | None | All; keys depend on available OS folders | `1.0.0` | None |
| `get_drives_cmd` | None | `DriveInfo[]` | None | All; drive kinds and network details vary by OS | `1.0.0` | None |
| `ffmpeg_available_cmd` | None | `boolean` | None | All; checks bundled or system FFmpeg | `1.0.0` | None |
| `is_macos_cmd` | None | `boolean` | None | All | `1.0.0` | None |
| `get_full_disk_access_status_cmd` | None | `{ granted: boolean }` | None | macOS heuristic; returns `true` on other platforms | `1.0.0` | None |

Example:

```ts
const available = await api.invoke<boolean>("ffmpeg_available_cmd");
```

## Thumbnail commands

| Command | Arguments | Result | Permission | Platform | API | Typed alternative |
| --- | --- | --- | --- | --- | --- | --- |
| `get_image_thumbnail_cmd` | `{ path: string; size: number; format: "webp" \| "jpg" \| "jpeg" \| "png"; quality: number }` | `string` cache-file path | `filesystem.read` | All; codec/tool availability can affect formats | `1.0.0` | Use a `PreviewProvider.thumbnail` component when contributing file thumbnails |
| `get_folder_thumbnail_cmd` | `{ path: string; size: number; format: "webp" \| "jpg" \| "jpeg" \| "png"; quality: number }` | `string` cache-file path | `filesystem.read` | All; folder contents and codec availability affect output | `1.0.0` | Use a provider thumbnail when the thumbnail belongs to a file capability |

`size` is the requested square edge in pixels. `quality` is an integer from
`0` through `100`. The returned path identifies a host-managed cache file and
must not be persisted as plugin data.

## Read commands

These commands require `filesystem.read` or `filesystem.write`.

| Command | Arguments | Result | Platform | API | Typed alternative |
| --- | --- | --- | --- | --- | --- |
| `read_directory` | `{ path: string }` | `FileEntry[]` | All | `1.0.0` | `api.files.readDirectory(path)` |
| `get_file_metadata_cmd` | `{ path: string; expectedSize?: number; expectedModified?: number }` | `RawFileMetadata \| null` | All; extractor support varies by file format | `1.0.0` | Use the raw metadata supplied to `MetadataProvider.extract`; use `PreviewAPI.getMetadata(file)` for normalized metadata in preview callbacks |
| `get_embedded_audio_cover_cmd` | `{ path: string }` | `EmbeddedAudioCover \| null` | All; supported audio formats only | `1.0.0` | None |
| `read_text_file_cmd` | `{ path: string }` | `string` | All; UTF-8 text | `1.0.0` | `api.files.readText(path)` for a revision-aware snapshot |
| `read_plugin_text_file_cmd` | `{ path: string }` | [PluginTextFileSnapshot](../../reference/sdk-type-reference/PluginTextFileSnapshot.md) | All; UTF-8 text | `1.0.0` | `api.files.readText(path)` |
| `watch_directory_cmd` | `{ path: string }` | `void` | All | `1.0.0` | `api.files.watchDirectory(path, handler)` |
| `unwatch_directory_cmd` | `{ path: string }` | `void` | All | `1.0.0` | `PluginDirectoryWatch.unsubscribe()` |

[PluginTextFileSnapshot](../../reference/sdk-type-reference/PluginTextFileSnapshot.md) contains `{ content: string; revision: string }`.
Prefer that revision-aware contract over `read_text_file_cmd` for editable
text.

The typed directory watch also owns event filtering and lifecycle cleanup. Raw
watch registration does not deliver a callback through `api.invoke`.

## Write commands

These commands require `filesystem.write`, which also satisfies the read
command group.

| Command | Arguments | Result | Platform | API | Typed alternative |
| --- | --- | --- | --- | --- | --- |
| `create_directory_cmd` | `{ path: string }` | `void` | All | `1.0.0` | `api.files.createDirectory(path)` |
| `rename_path_cmd` | `{ path: string; newName: string }` | `string` destination path | All | `1.0.0` | `api.files.renamePath(path, destination)` |
| `write_plugin_text_file_cmd` | `{ path: string; content: string; expectedRevision: string \| null; overwrite?: boolean }` | [PluginTextWriteResult](../../reference/sdk-type-reference/PluginTextWriteResult.md) | All; UTF-8 atomic replacement | `1.0.0` | `api.files.writeText(path, content, options)` |

[PluginTextWriteResult](../../reference/sdk-type-reference/PluginTextWriteResult.md) is:

```ts
type PluginTextWriteResult =
	| { status: "saved"; revision: string }
	| { status: "conflict"; actualRevision: string | null };
```

`rename_path_cmd` accepts a new basename, not an arbitrary destination path.
The typed `renamePath` enforces same-directory rename and derives `newName`
from the destination.

## Commands not in the allowlist

Any other string is rejected before native invocation. No permission enables:

- shell or process execution;
- arbitrary Tauri commands;
- global Phials configuration writes;
- session or window-state mutation;
- direct access to another plugin's settings, storage, or database;
- permanent-delete commands;
- raw binary read or write commands, whose transport is owned by typed APIs;
- installer or registry-management commands; or
- host-only file, collection, or application services absent from this page.

Clipboard and network operations are not host commands. Use
`api.clipboard.readText()`, `api.clipboard.writeText()`, and `api.fetch()` with
their corresponding permissions.

For task guidance and error handling, see
[Call approved host commands](../../work-with-phials/use-app-and-explorer-context/call-approved-host-commands.md).
