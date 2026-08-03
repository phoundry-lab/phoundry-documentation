---
title: "Phials Home and global app data"
description: "Locate Phials Home and identify the settings, databases, sessions, plugins, and local bundles it contains."
icon: phoundry-mono:sliders
order: 1
ai_disclosure: true
---

# Phials Home and global app data

**Phials Home** is the app-owned folder that holds durable settings, global state, installed community plugins, and locally stored Workspace Folder bundles. It is separate from the ordinary files and folders you browse.

## Reveal the active Phials Home

Open the Command Bar and run **Reveal Phials home folder**. This is the reliable way to locate the active folder because Phials can be launched with a custom `PHIALS_HOME` location.

You can also open Settings, enable Developer mode, choose **Developer**, then choose **Show Phials folder**. The same page shows the resolved path to `config.toml`.

Without a `PHIALS_HOME` override, the default is a hidden `.phials` folder in your operating-system home folder:

| Platform | Default Phials Home |
| --- | --- |
| macOS | `/Users/<name>/.phials` |
| Windows | `C:\Users\<name>\.phials` |
| Linux | `/home/<name>/.phials` |

`~/.phials` is shorthand for the macOS or Linux default, not a universal literal path. On Windows, `%USERPROFILE%\.phials` refers to the default location.

If you set the `PHIALS_HOME` environment variable before launching Phials, every Phials Home path below is relative to that folder instead. Quit Phials before moving an existing Phials Home or changing that override.

## Durable contents

| Relative path | User-visible purpose | Backup class |
| --- | --- | --- |
| `config.toml` | App preferences, including appearance, Explorer defaults, file visibility, opening behavior, thumbnails, Terminal, and some feature settings | Durable |
| `data/app.db` | Ordinary-folder saved views and column layouts, saved network locations, local Workspace Folder registration, and cross-Workspace indexes | Durable as a whole |
| `data/plugins.db` | Data stored by shipped features and community plugins, including Recents and some feature caches | Durable as a whole |
| `state/session.json` | Restored tabs and tab groups, Layouts, favorites, saved searches, panel arrangement, Navigator state, command customization, and plugin settings | Durable |
| `state/shortcuts.json` | Custom keyboard shortcuts | Durable |
| `state/plugin-data.json` | Namespaced key/value data stored by community plugins | Durable when you want plugin data restored |
| `vials/<workspace-id>/` | Complete bundles for Workspace Folders stored locally in Phials Home | Durable; copy each bundle as one unit |
| `plugins/<plugin-id>/` | Installed community-plugin packages and their bundled assets | Durable if you want the same installed plugins |
| `license.json` | Signed local license entitlement cache | Device-sensitive; you may need to activate again after moving devices |
| `trial.json` | Local trial record tied to a machine fingerprint | Device-sensitive; it is not a transferable trial |

Phials also creates app-managed directories such as `themes/`, and regenerable files such as `open-with-probes/`. Preserve the complete Phials Home for a full backup instead of selecting only the familiar filenames.

`app.db` and `plugins.db` both contain a mixture of durable state and rebuildable data. Do not delete either database as a cache-clearing shortcut.

## Data outside Phials Home

Phials Home does not contain:

- ordinary files and folders you browse;
- portable Workspace Folder bundles stored as `.phials` inside their content folders;
- OS-managed thumbnail, metadata, Camera RAW, and audio-proxy caches;
- OS-managed window geometry, which is stored separately and can be recreated if omitted from a backup.

See [Caches and temporary data](./caches-and-temporary-data.md) for the regenerable stores and [Back up and restore Phials data](./back-up-and-restore-phials-data.md) before copying or replacing durable data.
