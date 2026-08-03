---
title: "Read and write text files safely"
description: "Reads text with a revision token, writes against the expected revision, and handles saved and conflict results explicitly."
ai_disclosure: true
order: 3
---

# Read and write text files safely

Use `readText` and `writeText` for UTF-8 text. A read returns both content and an opaque revision token. Pass that token back when saving so Phials can detect an external change instead of silently overwriting it.

Reading requires [`filesystem.read`](../../reference/manifest-and-permissions-reference/plugin-permission-reference.md#filesystemread). Writing requires [`filesystem.write`](../../reference/manifest-and-permissions-reference/plugin-permission-reference.md#filesystemwrite), which also grants the supported read operations.

```json
{
  "permissions": ["filesystem.write"]
}
```

## Keep the revision with the content

```ts
interface TextDocument {
  path: string;
  content: string;
  revision: string;
}

async function loadDocument(
  api: PluginAPI,
  path: string,
): Promise<TextDocument> {
  const snapshot = await api.files.readText(path);
  return {
    path,
    content: snapshot.content,
    revision: snapshot.revision,
  };
}
```

Treat `revision` as an opaque value. Do not parse it, display it, compare it lexically, or derive one yourself.

## Save against the expected revision

```ts
async function saveDocument(
  api: PluginAPI,
  document: TextDocument,
  nextContent: string,
): Promise<
  | { status: "saved"; document: TextDocument }
  | { status: "conflict"; actualRevision: string | null }
> {
  const result = await api.files.writeText(
    document.path,
    nextContent,
    {
      expectedRevision: document.revision,
    },
  );

  if (result.status === "conflict") {
    return result;
  }

  return {
    status: "saved",
    document: {
      path: document.path,
      content: nextContent,
      revision: result.revision,
    },
  };
}
```

On success, replace the old revision with `result.revision`. Reusing the earlier token makes the next save conflict with your own completed write.

Phials writes through an atomic same-directory replacement. Readers see either the previous complete file or the new complete file, not a partially written intermediate state.

## Handle a conflict as a state

`status: "conflict"` means the on-disk revision no longer matches the snapshot your edit began from. `actualRevision` is `null` when the path no longer exists.

Do not catch a conflict as a generic write error. Preserve the user's unsaved content and offer an explicit choice:

1. Reload the current disk version and discard the pending edit.
2. Keep both versions by saving the pending edit under a new name.
3. Review or merge the two versions.
4. Replace the disk version after clear confirmation.

Reload before showing disk content:

```ts
async function reloadAfterConflict(api: PluginAPI, path: string) {
  try {
    return await api.files.readText(path);
  } catch {
    return null;
  }
}
```

The actual revision in the conflict result tells you that the baseline changed; it is not a substitute for reading the changed content.

## Overwrite only after confirmation

`overwrite: true` bypasses the revision comparison. Use it only after the user chooses to replace the newer disk version.

```ts
async function overwriteAfterConfirmation(
  api: PluginAPI,
  document: TextDocument,
  nextContent: string,
): Promise<TextDocument | null> {
  const confirmed = await api.modal.confirm({
    title: "Replace the newer file?",
    message:
      "The file changed outside this plugin. Replacing it will discard those changes.",
    confirmLabel: "Replace file",
    cancelLabel: "Keep both",
    danger: true,
  });

  if (!confirmed) return null;

  const result = await api.files.writeText(
    document.path,
    nextContent,
    {
      expectedRevision: document.revision,
      overwrite: true,
    },
  );

  if (result.status !== "saved") {
    throw new Error("The confirmed overwrite did not complete");
  }

  return {
    path: document.path,
    content: nextContent,
    revision: result.revision,
  };
}
```

See [Confirm consequential actions](../show-dialogs-and-notifications/confirm-consequential-actions.md).

## Create a new text file without replacing one

Use `expectedRevision: null` to create a text file only if no file exists at that path:

```ts
const result = await api.files.writeText(path, initialContent, {
  expectedRevision: null,
});

if (result.status === "conflict") {
  api.notify.warning("A file already exists with that name.");
}
```

Do not set `overwrite: true` for routine creation. A name collision is information the user should resolve.

## Separate conflicts from failures

`writeText` resolves with a discriminated result for a revision conflict. It rejects for an operational failure such as an unavailable volume, denied access, invalid path, or failed atomic replacement.

```ts
try {
  const result = await api.files.writeText(path, content, {
    expectedRevision,
  });
  // Handle saved or conflict.
} catch (error) {
  // Preserve pending content and report that the write did not complete.
}
```

Never clear dirty state before a `saved` result. A rejected promise and a conflict both leave the pending content unsaved.

## SDK reference

- [PluginTextFileSnapshot](../../reference/sdk-type-reference/PluginTextFileSnapshot.md)
- [PluginTextWriteResult](../../reference/sdk-type-reference/PluginTextWriteResult.md)
- [FileUtilsAPI](../../reference/sdk-type-reference/FileUtilsAPI.md)
