---
title: "Call approved host commands"
description: "Uses api.invoke only for documented allowlisted commands, requests required permissions, handles runtime rejection, and prefers a typed API whenever one exists."
ai_disclosure: true
order: 4
---

# Call approved host commands

Use `api.invoke()` only for a documented approved host command that has no typed [PluginAPI](../../reference/sdk-type-reference/PluginAPI.md) alternative. The invoke allowlist is a public compatibility and security boundary: an implementation command is not callable merely because its name is known.

Prefer typed APIs because they provide stable arguments, typed results, plugin scoping, permission mapping, and cleanup:

```ts
// Preferred
const directory = await api.files.readDirectory(path);
const entries = directory.entries;
const snapshot = await api.files.readText(path);
const watch = await api.files.watchDirectory(path, refresh);

// Do not replace these with raw command strings.
```

Similarly, use `api.modules.openCenter()` for center tabs, `MetadataAPI.readFile()` for metadata extraction, `api.clipboard` for clipboard work, and `api.fetch` for approved network requests.

## Call an approved command

Supply the expected return type and documented arguments:

```ts
async function detectMediaSupport(
  api: PluginAPI,
): Promise<boolean> {
  try {
    return await api.invoke<boolean>("ffmpeg_available_cmd");
  } catch {
    api.notify.warning(
      "Media support could not be checked",
    );
    return false;
  }
}
```

The TypeScript generic describes the result to your plugin; it does not validate the runtime payload. Validate structured results at the boundary:

```ts
type SystemPaths = Partial<
  Record<
    | "home"
    | "desktop"
    | "documents"
    | "downloads"
    | "pictures"
    | "videos",
    string
  >
>;

async function getDownloadsPath(
  api: PluginAPI,
): Promise<string | null> {
  const result =
    await api.invoke<unknown>("get_system_paths_cmd");

  if (
    typeof result !== "object" ||
    result === null ||
    !("downloads" in result)
  ) {
    return null;
  }

  const downloads = (result as SystemPaths).downloads;
  return typeof downloads === "string" ? downloads : null;
}
```

Do not build command names dynamically. Use one literal command with a locally declared result type so compatibility changes are reviewable.

## Understand allowlist and permission checks

Community plugins receive this effective command boundary:

| Availability | Approved command group |
| --- | --- |
| Always available | System paths, drive discovery, media-tool availability, macOS detection, Full Disk Access status, and cached image or folder thumbnails |
| `filesystem.read` | Directory reads, file metadata, embedded audio covers, text and binary reads, plugin text reads, and directory watch registration |
| `filesystem.write` | Directory creation, Trash operations, same-directory rename, text and binary writes, and plugin text writes; also grants the read command group |

The exact command names, arguments, return values, and platform boundaries are listed in the [Approved host command reference](../../reference/manifest-and-permissions-reference/approved-host-command-reference.md). Request permissions in `manifest.json`:

```json
{
  "id": "com.example.media-inspector",
  "name": "Media Inspector",
  "version": "1.0.0",
  "minAppVersion": "1.0.0",
  "pluginApiVersion": "1.0.0",
  "author": "Example",
  "description": "Inspects selected media files.",
  "permissions": ["filesystem.read"]
}
```

Request only the smallest permission set required by the plugin's documented workflows. Adding or expanding permissions is a user-visible release change and can require renewed approval.

An approved command can still be unavailable to a particular plugin:

1. The command is approved, but the manifest does not request its required permission.
2. The manifest requests the permission, but the current installed permission set has not been approved.
3. The app or plugin API version does not include that command.
4. The native operation fails for a path, platform, unavailable tool, or operating-system access rule.

Treat all four as expected runtime failure paths.

## Handle rejection without guessing

Catch errors at the user action that requested the operation:

```ts
async function refreshFolder(
  api: PluginAPI,
  path: string,
): Promise<FileEntry[]> {
  try {
    const result = await api.files.readDirectory(path);
    if (result.failures.length > 0) {
      api.notify.warning(
        `${result.failures.length} folder entries could not be inspected.`,
      );
    }
    return [...result.entries];
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Unknown error";

    api.notify.error(
      `Could not read the folder: ${message}`,
    );
    return [];
  }
}
```

Do not retry with a different raw command, import Tauri's `invoke`, or suggest a broader permission unless the documented operation actually requires it. A command absent from the approved reference remains unsupported regardless of manifest permissions.

Keep technical details in logs when they would help diagnosis, but make user-facing messages explain the failed outcome and a safe next action. Never expose file contents, credentials, or raw native errors in a toast.

## Prefer typed alternatives

Before adding `api.invoke`, check these public services:

| Operation | Typed API |
| --- | --- |
| Paths, folder selection, directory reads, text writes, rename, Trash, watches, open, and reveal | `api.files` |
| Plugin configuration | `api.settings` |
| Plugin data | `api.storage` or `api.database` |
| Center-tab opening | `api.modules` |
| Metadata-provider file reads | [MetadataAPI](../../reference/sdk-type-reference/MetadataAPI.md) |
| Dialogs and feedback | `api.modal` and `api.notify` |
| Clipboard | `api.clipboard` |
| Network requests | `api.fetch` |

The typed method owns its permission and transport behavior. `api.invoke` is not a general escape hatch and does not authorize arbitrary filesystem, shell, process, configuration, database, or app-state access.

For permission details, see the [Plugin permission reference](../../reference/manifest-and-permissions-reference/plugin-permission-reference.md) and [Permission-gated Plugin API operations](../../reference/manifest-and-permissions-reference/permission-gated-plugin-api-operations.md).
