---
title: "Watch folders for changes"
description: "Subscribes to directory changes, refreshes derived state, and releases the watch during plugin deactivation."
ai_disclosure: true
order: 5
---

# Watch folders for changes

Use `api.files.watchDirectory()` when a long-lived plugin feature must refresh after the immediate contents of one folder change. Watching requires [`filesystem.read`](../../reference/manifest-and-permissions-reference/plugin-permission-reference.md#filesystemread), or `filesystem.write`.

A watch is an invalidation signal, not a change log. The callback deliberately has no filename or event type. Reread the state your feature needs.

## Subscribe and refresh

```ts
async function watchListing(
  api: PluginAPI,
  path: string,
  publish: (entries: readonly FileEntry[]) => void,
): Promise<PluginDirectoryWatch> {
  let refreshing = false;
  let refreshAgain = false;

  const refresh = async () => {
    if (refreshing) {
      refreshAgain = true;
      return;
    }

    refreshing = true;
    try {
      do {
        refreshAgain = false;
        const result = await api.files.readDirectory(path);
        publish(result.entries);
        if (result.failures.length > 0) {
          api.notify.warning(
            `${result.failures.length} folder entries could not be inspected.`,
          );
        }
      } while (refreshAgain);
    } catch (error) {
      api.notify.warning("The watched folder could not be refreshed.");
    } finally {
      refreshing = false;
    }
  };

  await refresh();
  return api.files.watchDirectory(path, () => {
    void refresh();
  });
}
```

The `refreshAgain` flag coalesces events that arrive during a read. This avoids overlapping reads while ensuring the final state is fetched after a burst.

Do not treat one callback as one file mutation. Operating systems can coalesce, duplicate, or reorder watch events, and one user action can produce several filesystem changes.

## Release the watch

Keep the returned handle and unsubscribe when the feature stops using the folder:

```ts
let directoryWatch: PluginDirectoryWatch | null = null;

export default function createPlugin(): PhialsPlugin {
  return {
    id: "acme.folder-summary",
    name: "Folder summary",
    version: "1.0.0",
    providers: [],

    async onActivate(api) {
      const folder = api.settings.get<string>("folder");
      if (!folder) return;

      directoryWatch = await watchListing(
        api,
        folder,
        updateSummary,
      );
    },

    onDeactivate() {
      directoryWatch?.unsubscribe();
      directoryWatch = null;
    },
  };
}
```

`unsubscribe()` is idempotent. Call it before replacing a watch with one for another folder.

Phials also releases retained file watches when the plugin deactivates. Explicit cleanup is still the correct local ownership pattern: it stops work as soon as the feature closes and makes replacement logic predictable.

## Replace a watched folder

```ts
async function changeWatchedFolder(
  api: PluginAPI,
  nextPath: string,
) {
  directoryWatch?.unsubscribe();
  directoryWatch = null;

  directoryWatch = await watchListing(
    api,
    nextPath,
    updateSummary,
  );
}
```

Unsubscribe first. Keeping both watches during a settings change can publish stale results from the old folder after the new one is active.

## Handle watch failures

`watchDirectory` rejects when the path is invalid, unavailable, unreadable, or the operating system cannot establish a watch. A watch can also become ineffective later when a volume disconnects or the folder moves.

Design the interface so the user can:

- see which folder is being watched
- retry after restoring access
- choose another folder
- distinguish the last known data from a current successful refresh

If a refresh fails, preserve the last successful state but mark it stale. Do not clear it and imply the folder is empty.

## Watch only while useful

Avoid broad or permanent watches:

- watch the smallest folder that owns the derived state
- do not create one watch per row
- stop watching when a panel, tab, or workflow closes
- use one shared refresh pipeline when several components need the same result
- do not recursively add watches to every descendant

If a file-view component only needs the current Explorer listing, use its reactive pane context. Phials already owns that directory watch.

## SDK reference

- [PluginDirectoryWatch](../../reference/sdk-type-reference/PluginDirectoryWatch.md)
- [FileUtilsAPI](../../reference/sdk-type-reference/FileUtilsAPI.md)
