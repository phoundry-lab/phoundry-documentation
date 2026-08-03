---
title: "Work with paths and file entries"
description: "Uses typed path helpers and FileEntry without assuming one platform’s path syntax."
ai_disclosure: true
order: 1
---

# Work with paths and file entries

Treat filesystem paths as opaque strings and use `api.files` to inspect or combine them. Do not split paths on `/`, concatenate with a hard-coded separator, or assume a drive-letter or POSIX-root format.

The path helpers are [always available](../../reference/manifest-and-permissions-reference/permission-gated-plugin-api-operations.md#always-available-operations). Reading a path from disk is a separate operation and requires [`filesystem.read`](../../reference/manifest-and-permissions-reference/plugin-permission-reference.md#filesystemread).

## Use the path helpers

```ts
function describePath(api: PluginAPI, path: string) {
  const name = api.files.getBasename(path);
  const parent = api.files.getDirname(path);
  const extension = api.files.getExtension(name);
  const sidecar = api.files.joinPath(parent, `${name}.review.json`);

  return { name, parent, extension, sidecar };
}
```

The helpers have narrow, predictable jobs:

| Method | Result |
| --- | --- |
| `getBasename(path)` | The final path segment. |
| `getDirname(path)` | The path without its final segment. |
| `getExtension(filename)` | The lower-case extension without the leading dot, or `""` when there is none. |
| `joinPath(...parts)` | One path formed with the host-supported separator and redundant boundary separators removed. |

Pass the filename, not an entire path, to `getExtension` when you already have a [FileEntry](../../reference/sdk-type-reference/FileEntry.md). A leading-dot filename such as `.gitignore` has no extension.

```ts
const extension = api.files.getExtension(file.name);
```

Do not normalize a path for display and then use the display string for I/O. Keep the original path as identity.

## Join trusted segments

`joinPath` combines segments; it does not prove that a user-supplied segment stays under a root. Reject names that represent navigation or contain path separators before using them as one leaf name.

```ts
function isSafeLeafName(name: string): boolean {
  const trimmed = name.trim();
  return (
    trimmed.length > 0 &&
    trimmed !== "." &&
    trimmed !== ".." &&
    !trimmed.includes("/") &&
    !trimmed.includes("\\")
  );
}

function childPath(api: PluginAPI, folder: string, name: string): string {
  if (!isSafeLeafName(name)) {
    throw new Error("Expected one file or folder name");
  }
  return api.files.joinPath(folder, name);
}
```

Use this check for a user-entered leaf name. Do not use it to reject an absolute path returned by `pickDirectory` or supplied by Phials.

## Read `FileEntry`

[`readDirectory`](let-users-choose-and-read-folders.md) returns `FileEntry[]`. Each entry carries stable identity and inexpensive filesystem facts:

```ts
function entryKind(entry: FileEntry): string {
  if (entry.symlink_broken) return "Broken link";
  if (entry.is_vial) return "Workspace Folder";
  if (entry.is_dir) return "Folder";
  if (entry.is_file) return "File";
  return "Other";
}
```

Important fields include:

| Field | Meaning |
| --- | --- |
| `name` | Leaf filename as stored on disk. |
| `path` | Full path to use for subsequent `api.files` calls. |
| `icon` | Host-resolved Iconify glyph for consistent presentation. |
| `is_file`, `is_dir` | Effective navigable type. |
| `is_vial` | The entry is a Workspace Folder root. |
| `isChildVial` | The entry is a nested Workspace Folder. |
| `is_symlink` | The listing node is a symbolic link or directory junction. |
| `symlink_target` | Resolved target when available, or stored link text for a broken link. |
| `symlink_broken` | The link target cannot be resolved. |
| `size`, `created`, `modified` | Basic filesystem values. Times are millisecond timestamps when present. |
| `mimeType`, `category` | Host-derived classification when available. |

Use `entry.path` for identity and actions. `name` is not unique within a broader result set, and `symlink_target` is not the path the user selected.

## Handle symbolic links deliberately

The effective `is_file` and `is_dir` values follow a healthy link target so normal open and navigation behavior works. `is_symlink` preserves the fact that the listing node is a link.

For a broken link:

- do not try to read or open the missing target
- allow reveal or Trash operations on the link path itself when appropriate
- explain the broken target rather than presenting it as an ordinary file

Never replace `entry.path` with `entry.symlink_target` automatically. That can change the item the user intended to rename, reveal, or trash.

## Keep paths out of URLs

A filesystem path is not a browser URL. Do not pass it to `fetch`, `new URL()`, or an `<img src>` value. Use the capability-specific Plugin API that consumes the path.

Paths can contain spaces, Unicode, leading dots, and characters meaningful to a shell. Do not quote or escape them yourself when passing them to `api.files`; the typed API does not invoke a shell.

## SDK reference

- [FileUtilsAPI](../../reference/sdk-type-reference/FileUtilsAPI.md)
- [FileEntry](../../reference/sdk-type-reference/FileEntry.md)
