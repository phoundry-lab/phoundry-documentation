---
title: "Reset Phials safely"
description: "Back up durable data, understand the exact deletion boundary, and reset Phials only as a last resort."
icon: phoundry-mono:sliders
order: 5
ai_disclosure: true
---

# Reset Phials safely

**Reset all user data** deletes the active Phials Home and operating-system caches, then relaunches Phials. Use it only after targeted access, cache, configuration, and session recovery have failed.

## Prepare for reset

1. [Inspect and record diagnostic information](./inspect-and-share-diagnostic-information.md), including the app version and any errors.
2. Run **Reveal Phials home folder** from the Command Bar so you know which folder the reset will remove.
3. Quit Phials and make a complete backup of Phials Home. This protects settings, sessions, app databases, installed community plugins, and all locally stored Workspace Folder bundles.
4. Protect any ordinary content folders you need. For a portable Workspace Folder, confirm its hidden `.phials` bundle is included.
5. Reopen Phials only after the backup is complete.

See [Back up and restore Phials data](../phials-data-and-storage/back-up-and-restore-phials-data.md) for consistency and identity boundaries. A copy made while Phials is running may split a database from its current transaction journals.

## Understand what reset removes

| Removed | Preserved |
| --- | --- |
| The complete active Phials Home, including `config.toml`, session and shortcut state, app and plugin databases, licenses and trial state, installed community plugins, and local bundles under `vials/` | Ordinary files and folders outside Phials Home |
| Contents of the operating system's Phials application-cache directory, including thumbnails, metadata, and media proxies | Portable Workspace Folder bundles stored as `.phials` inside content folders outside Phials Home |
| A legacy Tauri app-data directory when Phials can remove it | The content of mounted drives, cloud-sync folders, and server shares |

Reset does not move removed Phials Home data to system Trash and does not provide an undo. Locally stored Workspace Folder data is inside Phials Home, so resetting without a backup permanently removes its properties, values, notes, Relations, Page configuration, saved views, and stable identity. Portable `.phials` bundles outside Phials Home survive, but their current app-side registration is removed with `app.db`.

> **Warning:** Continue only if the backup contains every locally stored Workspace Folder and other Phials data you may need. The reset deletes the active Phials Home and OS caches, then restarts Phials. Typing `RESET` and confirming the second dialog authorizes that irreversible deletion.

## Run the reset

1. Open Settings.
2. Under **Developer**, choose **Debug**.
3. In **Danger Zone**, find **Reset all user data** and choose **Reset**.
4. Enter `RESET`, then choose **Continue**.
5. In **Reset all user data?**, choose **Reset**.

Phials closes its app database, clears the OS cache, deletes Phials Home, attempts to remove legacy app data, and relaunches.

## After reset

- App preferences, shortcuts, tabs, Layouts, favorites, saved searches, and installed community plugins begin from defaults or empty state.
- Activate your license or choose the available startup access path again. Copied license and trial files are device-sensitive.
- Open a portable Workspace Folder or run **Refresh Workspaces** to register its surviving identity again.
- Restore a complete Phials Home backup only while Phials is closed. Restore its matching ordinary content folders before launch when local Workspace Folder paths or Relations depend on them.

If reset shows **Reset failed**, do not assume nothing changed. Cache clearing occurs before Phials Home deletion, and the operation is not transactional. Preserve the remaining folders, record the complete error, and verify the active paths in **Debug Info** before trying again.
