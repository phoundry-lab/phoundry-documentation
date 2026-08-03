---
title: "Create, rename, and trash files and folders"
description: "Performs supported mutations, distinguishes Trash from permanent deletion, and reports partial or failed work safely."
ai_disclosure: true
order: 4
---

# Create, rename, and trash files and folders

Filesystem mutations require [`filesystem.write`](../../reference/manifest-and-permissions-reference/plugin-permission-reference.md#filesystemwrite). Request it only when changing files is part of the plugin's declared purpose.

```json
{
  "permissions": ["filesystem.write"]
}
```

Use `createDirectory` for one folder, revision-aware `writeText` for a UTF-8 file, `renamePath` for a same-folder rename, and `trash` for recoverable removal.

## Create one folder

```ts
async function createReviewFolder(
  api: PluginAPI,
  parent: string,
): Promise<string> {
  const path = api.files.joinPath(parent, "Review");
  await api.files.createDirectory(path);
  return path;
}
```

`createDirectory` creates one folder. Its parent must already exist, and the operation fails rather than merging with an existing path. This makes a name collision visible to your plugin.

Validate user-entered input as one leaf name before joining it to the parent. See [Work with paths and file entries](work-with-paths-and-file-entries.md).

## Create one text file

`writeText` creates a UTF-8 file when the expected revision is `null` and the destination does not exist:

```ts
async function createReadme(
  api: PluginAPI,
  folder: string,
): Promise<PluginTextWriteResult> {
  const path = api.files.joinPath(folder, "README.md");
  return api.files.writeText(path, "# Review\n", {
    expectedRevision: null,
  });
}
```

Handle `status: "conflict"` as an existing-name collision. Do not overwrite it silently. For edits to an existing file, follow [Read and write text files safely](read-and-write-text-files-safely.md).

## Rename within one folder

`renamePath(source, destination)` changes one leaf name. The source and destination must have the same parent folder.

```ts
async function renameForReview(
  api: PluginAPI,
  source: string,
): Promise<string> {
  const parent = api.files.getDirname(source);
  const destination = api.files.joinPath(
    parent,
    `review-${api.files.getBasename(source)}`,
  );

  await api.files.renamePath(source, destination);
  return destination;
}
```

The operation rejects when the source is missing, the new name is invalid, the destination exists, or the filesystem cannot complete the rename. It is not a general move API; do not supply a different destination parent.

After success, replace stored path references with the destination. The old path is no longer valid.

## Move items to Trash

`trash(paths)` asks the operating system to move files and folders to Trash or the Recycle Bin. It does not permanently delete them.

Confirm a user-initiated destructive action before calling it:

```ts
async function confirmAndTrash(
  api: PluginAPI,
  paths: string[],
): Promise<boolean> {
  if (paths.length === 0) return true;

  const confirmed = await api.modal.confirm({
    title: paths.length === 1 ? "Move item to Trash?" : "Move items to Trash?",
    message:
      paths.length === 1
        ? "You can recover it from the system Trash."
        : `Move ${paths.length} items to the system Trash?`,
    confirmLabel: "Move to Trash",
    cancelLabel: "Cancel",
    danger: true,
  });

  if (!confirmed) return false;

  const outcomes = await api.files.trash(paths);
  return outcomes.every((outcome) => outcome.status === "succeeded");
}
```

Use the product term **Trash** in labels and messages. Do not say “permanently delete,” “erase,” or “remove forever.”

## Report partial failures accurately

A multi-item Trash request preserves input order and reports success or a typed failure for every path:

```ts
async function trashWithOutcomes(
  api: PluginAPI,
  paths: string[],
): Promise<readonly PluginPathOutcome[]> {
  return api.files.trash(paths);
}
```

Afterward, summarize what happened:

```ts
const failed = outcomes.filter((item) => item.status === "failed");

if (failed.length === 0) {
  api.notify.success("Moved all items to Trash.");
} else {
  api.notify.warning(
    `Moved ${outcomes.length - failed.length} of ${outcomes.length} items to Trash.`,
  );
}
```

Do not roll back successful Trash operations by guessing their recovery paths. Trash placement and restoration belong to the operating system.

## Preserve user control

Before any mutation:

- show the actual filename or item count
- distinguish create, rename, and Trash outcomes
- require confirmation for consequential bulk work
- keep a pending text edit until the write reports `saved`

After a failure:

- leave failed paths available for retry
- refresh the relevant listing
- do not claim all work succeeded
- avoid exposing raw paths in a notification when they contain private information; provide details in the plugin interface when needed

See [Confirm consequential actions](../show-dialogs-and-notifications/confirm-consequential-actions.md).

## SDK reference

- [FileUtilsAPI](../../reference/sdk-type-reference/FileUtilsAPI.md)
- [PluginTextWriteResult](../../reference/sdk-type-reference/PluginTextWriteResult.md)
