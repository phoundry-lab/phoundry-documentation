---
title: "Open and reveal files and folders"
description: "Hands a path to its primary action or reveals it in the native file manager without conflating those outcomes."
ai_disclosure: true
order: 6
---

# Open and reveal files and folders

Use a Public Explorer pane's `navigation.openPath` when the user wants to act on an item in Phials. Use `api.files.revealPath` when the user wants to locate it in Finder, File Explorer, or the platform's equivalent file manager.

Both operations are [always available](../../reference/manifest-and-permissions-reference/permission-gated-plugin-api-operations.md#always-available-operations). They do not read file contents through your plugin, so they do not require `filesystem.read`.

## Open through Phials

```ts
async function openResult(api: PluginAPI, entry: FileEntry) {
  const pane = api.explorer.getActivePane();
  if (!pane) return;
  try {
    await pane.navigation.openPath(entry.path);
  } catch (error) {
    api.notify.error(`Could not open ${entry.name}.`);
  }
}
```

Pane-owned `openPath` hands the path to Phials' primary action while preserving the exact originating pane:

- a folder opens or focuses an Explorer location
- a file opens through the applicable Phials file action or viewer
- existing matching tabs can be focused instead of duplicated
- the user's configured open behavior remains authoritative

Do not assume that “open” means launching the system default application, creating a new tab, or navigating the currently active pane. Phials owns that decision.

Use a command label such as **Open** when this is the intended outcome.

## Reveal in the native file manager

```ts
async function revealResult(api: PluginAPI, entry: FileEntry) {
  try {
    await api.files.revealPath(entry.path);
  } catch {
    await api.modal.alert({
      title: "Could not reveal item",
      message:
        "The item may have moved, or its folder may be unavailable.",
    });
  }
}
```

`revealPath` opens the native file manager at the item's parent location and selects or highlights the item when the platform supports it. It does not open the file's contents.

Use the platform-aware label Phials supplies for native file-manager actions when your surface provides one. In explanatory prose, **Reveal in file manager** is the neutral cross-platform term.

## Choose by user intent

| User intent | Method |
| --- | --- |
| View, edit, play, or navigate to the item in Phials | `pane.navigation.openPath(path)` |
| Find the item next to neighboring files in the operating system | `revealPath(path)` |

Do not call both methods for one action. Opening and revealing are distinct visible outcomes.

## Use the selected path

Pass the path representing the item the user acted on:

```ts
await api.files.revealPath(entry.path);
```

For a symbolic link, `entry.path` reveals the link node. Do not silently replace it with `symlink_target`; that would reveal a different filesystem item.

Before offering the action, make sure the path still belongs to the current item. If a prior rename succeeded, update your stored path to the destination.

## Handle unavailable paths

Open and reveal can fail because:

- the item moved or was trashed
- a removable or network volume disconnected
- the operating system denied the action
- no applicable Phials open action is available

Catch failures at the user action boundary and keep the message outcome-specific:

- “Could not open this file.”
- “Could not reveal this item in the file manager.”

Do not report a permission-manifest problem unless the rejected operation actually required a plugin permission.

## Avoid raw operating-system integration

Do not launch shell commands, construct `file:` URLs, or import platform-specific opener packages. Those approaches bypass Phials' primary-action policy, complicate portability, and fall outside the supported Plugin API.

If your plugin needs to display content rather than ask Phials to open it, contribute a [file viewer](../../add-capabilities/build-file-viewers-and-editors/index.md).

## SDK reference

- [FileUtilsAPI](../../reference/sdk-type-reference/FileUtilsAPI.md)
- [FileEntry](../../reference/sdk-type-reference/FileEntry.md)
