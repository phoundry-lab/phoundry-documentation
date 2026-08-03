---
title: "Let users choose and read folders"
description: "Requests a directory from the user and reads its immediate entries through the typed files API."
ai_disclosure: true
order: 2
---

# Let users choose and read folders

Use `api.files.pickDirectory()` to ask the user for a folder, then `api.files.readDirectory()` to read its immediate entries.

The picker is [always available](../../reference/manifest-and-permissions-reference/permission-gated-plugin-api-operations.md#always-available-operations). Reading the chosen folder requires [`filesystem.read`](../../reference/manifest-and-permissions-reference/plugin-permission-reference.md#filesystemread), or `filesystem.write`, which includes the supported read operations.

## Declare read permission

```json
{
  "permissions": ["filesystem.read"]
}
```

Choosing a folder does not grant a temporary per-folder permission. The manifest permission gates the Plugin API call, and the operating system can still reject a location Phials cannot read.

## Ask and read

```ts
async function chooseSourceFolder(
  api: PluginAPI,
): Promise<{ path: string; entries: readonly FileEntry[] } | null> {
  const path = await api.files.pickDirectory({
    title: "Choose a source folder",
  });

  if (path === null) return null;

  const result = await api.files.readDirectory(path);
  return { path, entries: result.entries };
}
```

`null` means the user cancelled. Cancellation is an expected outcome, not an error and not a reason to show a warning.

Supply `initialPath` when your plugin has a relevant existing location:

```ts
const path = await api.files.pickDirectory({
  title: "Choose an export folder",
  initialPath: lastExportFolder,
});
```

Do not invent a fallback path when the user cancels.

## Understand the listing

`readDirectory(path)` is shallow. It returns the immediate children plus any
typed failures encountered while materializing individual children; it does not
recursively scan descendants.

```ts
const result = await api.files.readDirectory(path);
const entries = result.entries;
const folders = entries.filter((entry) => entry.is_dir);
const markdownFiles = entries.filter(
  (entry) =>
    entry.is_file &&
    api.files.getExtension(entry.name) === "md",
);

for (const failure of result.failures) {
  api.notify.warning(
    `Could not inspect ${failure.path ?? "one child"}: ${failure.code}`,
  );
}
```

The result is a filesystem listing, not the current Explorer projection. It does not automatically adopt the user's Explorer search, filter, sort, hidden-file, or folders-first settings. Sort only when your task needs a defined order:

```ts
const byName = [...entries].sort((a, b) =>
  a.name.localeCompare(b.name, undefined, {
    numeric: true,
    sensitivity: "base",
  }),
);
```

For a file-view component, consume the pane's current listing instead of calling `readDirectory` again. See [Render files, selection, and navigation](../../add-capabilities/build-file-views/render-files-selection-and-navigation.md).

## Handle read failures

Reads can fail because the folder moved, a network volume disconnected, permissions changed, or the operating system denied access.

```ts
type FolderLoadResult =
  | { status: "loaded"; entries: FileEntry[] }
  | { status: "failed"; message: string };

async function loadFolder(
  api: PluginAPI,
  path: string,
): Promise<FolderLoadResult> {
  try {
    return {
      status: "loaded",
      entries: (await api.files.readDirectory(path)).entries,
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown filesystem error";
    api.notify.error("Could not read the selected folder.");
    return { status: "failed", message };
  }
}
```

Do not report an empty listing when the read actually failed. In a persistent interface, model loading, empty, and error as separate states.

## Avoid recursive fan-out

Do not implement an unbounded recursive scan by calling `readDirectory` for every folder in parallel. It can overwhelm slow, remote, removable, or synchronized filesystems and is not a supported substitute for a purpose-built capability.

If your task requires a known bounded walk:

- ask the user for the root
- define an explicit depth or item limit
- limit concurrency
- skip broken links
- allow cancellation
- report unreadable subfolders separately

The typed API grants only the operations it exposes. It does not imply an unrestricted recursive filesystem API.

## SDK reference

- [FileUtilsAPI](../../reference/sdk-type-reference/FileUtilsAPI.md)
- [FileEntry](../../reference/sdk-type-reference/FileEntry.md)
