---
title: "Back up and restore Phials data"
description: "Choose a complete Phials backup scope and restore durable data without splitting identities or databases."
icon: phoundry-mono:sliders
order: 4
ai_disclosure: true
---

# Back up and restore Phials data

Phials does not create a single built-in backup archive. Use your normal backup or synchronization tool, and choose a scope that includes every durable store needed for the result you want.

Quit Phials before copying or restoring app data. This is the consistency boundary for `app.db`, local Workspace Folder databases, session stores, and related journal files.

## Choose a backup scope

| Goal | Include | Usually exclude |
| --- | --- | --- |
| Restore global Phials settings and state | Complete Phials Home | OS caches |
| Restore all Phials work on another installation | Complete Phials Home, all ordinary content locations, and every portable Workspace Folder including `.phials` | OS caches; transferable license or trial assumptions |
| Protect one locally stored Workspace Folder | Its ordinary content folder, its complete bundle under `Phials Home/vials/`, and the matching registry in `data/app.db` | OS caches |
| Protect one portable Workspace Folder | The complete content folder, including hidden `.phials` | Phials Home, unless you also want app-wide settings and current registration |
| Restore community plugins and their data | Complete `plugins/`, `data/plugins.db`, `state/plugin-data.json`, and plugin settings in `state/session.json`; copying all of Phials Home is safer | Plugin staging leftovers and OS caches |
| Preserve a warm cache | OS app-cache directory in addition to durable data | Nothing, but cache restoration is optional and may be stale |

Because `app.db` contains both the local Workspace Folder registry and other app state, a whole-Phials Home backup is safer than trying to extract one registry row. Likewise, `plugins.db` contains both durable plugin data and regenerable feature caches; keep the complete file when plugin data matters.

## Make a consistent backup

1. Finish active edits, property changes, plugin installs, and Workspace Folder storage conversions.
2. Quit Phials completely.
3. Run **Reveal Phials home folder**, then back up that entire folder when the selected scope includes global or locally stored data.
4. Back up the ordinary content folders needed by the selected scope.
5. For each portable Workspace Folder, confirm that the hidden `.phials` directory is included.
6. Keep related content and Workspace Folder data from the same backup point, especially when Relations connect several folders.

Whole-app backup normally excludes [caches and temporary data](./caches-and-temporary-data.md). Omitting them affects only the speed of the first reads after restoration.

## Restore durable data

> **Warning:** Restoring can replace newer settings, notes, property values, saved views, plugin data, and Workspace Folder identity records. Quit Phials and preserve the current versions as a separate safety copy before overwriting anything.

1. Quit Phials.
2. Restore ordinary content folders and complete portable Workspace Folders, including hidden `.phials` bundles.
3. Restore the complete Phials Home to the same resolved location, or configure the intended `PHIALS_HOME` before launch.
4. Start Phials only after every related copy is in place.
5. Reconnect an unavailable locally stored Workspace Folder with **Locate Folder…** when its content folder now has a different path.
6. Reinstall or reactivate anything that is device-specific. A copied `license.json` or `trial.json` is not a promise that access transfers to another machine.

Do not combine a restored Workspace Folder bundle with a newly created bundle for the same folder. Restore the original bundle and registry together so its stable identity, file identities, notes, and Relations remain aligned.

## Restore a portable Workspace Folder

A portable bundle is self-identifying. Restore the complete folder, then open it in Phials or use **Refresh Workspaces** when it is under your home folder. Keep any other copy as an inactive backup; two independently edited copies carry the same identity.

## Restore a locally stored Workspace Folder

A local bundle is not self-locating. Restore its content folder, its complete `vials/<workspace-id>/` bundle, and the `app.db` registry from a matching backup. If you restore all of Phials Home, those last two pieces stay together automatically.

For a task-focused procedure, see [Back up and restore Workspace Folder data](../../organize-files-with-phials/use-workspace-folders/back-up-and-restore-workspace-folder-data.md). See [Workspace Folder data and portable bundles](./workspace-folder-data-and-portable-bundles.md) for the exact bundle contents.
