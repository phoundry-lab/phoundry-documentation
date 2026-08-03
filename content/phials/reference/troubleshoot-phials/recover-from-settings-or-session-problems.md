---
title: "Recover from settings or session problems"
description: "Repair one preference or restored-session store before considering a complete Phials reset."
icon: phoundry-mono:sliders
order: 3
ai_disclosure: true
---

# Recover from settings or session problems

Use the narrowest recovery that matches the problem. App preferences live separately from the restored session, keyboard shortcuts, databases, and Workspace Folder bundles, so most problems do not require a complete reset.

## Reset one customization first

When Phials opens normally, use the owning surface's reset action:

- In **Commands** → **Shortcuts**, reset one command or choose **Reset All to Defaults**.
- In **Commands** → **Path Bar**, choose **Reset** to remove Path Bar customizations.
- In **Commands** → **Context Menus**, choose **Reset Layout**.
- In **Files** → **Visibility**, choose **Reset to default** for hidden-file patterns.
- Under **General**, use **Reset to home** beside **Default Directory** when an unavailable startup folder keeps returning.

Use the task article for details and consequences. For example, see [Change keyboard shortcuts](../../arrange-and-customize-phials/customize-commands-and-shortcuts/change-keyboard-shortcuts.md), [Customize the Path Bar](../../arrange-and-customize-phials/customize-commands-and-shortcuts/customize-the-path-bar.md), or [Customize Explorer context menus](../../arrange-and-customize-phials/customize-commands-and-shortcuts/customize-explorer-context-menus.md).

For an unwanted restored tab, close that tab and quit Phials normally. For a restored location that should remain but is offline, repair its access instead of deleting session state; see [Fix file and folder access problems](./fix-file-and-folder-access-problems.md).

## Recover invalid app preferences

If settings repeatedly return to defaults, fail to save, or Phials reports that `config.toml` is invalid, replace only that file with a fresh default configuration.

1. In Settings under **Developer** → **Debug**, choose **Show Phials folder**. If Phials cannot open Settings, locate the active Phials Home using [Phials Home and global app data](../phials-data-and-storage/phials-home-and-global-app-data.md).
2. Quit Phials completely.
3. Make a safety copy of `config.toml`.

> **Warning:** Renaming `config.toml` removes all current app preferences on the next launch, including appearance, Explorer defaults, visibility, opening behavior, media settings, and Path Bar configuration. It does not remove session state, shortcuts, databases, plugins, ordinary files, or Workspace Folder bundles.

4. Rename `config.toml` to `config.toml.disabled`.
5. Start Phials. Missing configuration loads with factory defaults; the file is recreated when Phials next saves a preference.

To undo this recovery, quit Phials, move aside the newly created `config.toml`, and restore the safety copy. Correct any invalid TOML before using it again.

## Recover damaged restored state

Phials validates the saved center session at startup. If the current per-window snapshot cannot be restored, it tries a retained legacy session and otherwise creates a fresh Explorer tab. A location that is merely unavailable remains preserved and is not evidence that the session file is damaged.

If corrupted or unwanted state still prevents a usable startup, replace the complete session store:

1. Reveal Phials Home, then quit Phials.
2. Make a safety copy of `state/session.json`.

> **Warning:** Renaming `state/session.json` removes more than open tabs. The replacement starts without saved favorites, saved searches, Layouts, Navigator and panel state, command customization, plugin settings, and the restored center session. It preserves `config.toml`, custom shortcuts in `state/shortcuts.json`, app databases, installed plugin files, ordinary files, and Workspace Folder bundles.

3. Rename `state/session.json` to `session.json.disabled`.
4. Start Phials and confirm that the fresh state is usable.

If this does not solve the problem, quit Phials before restoring the safety copy. Collect [diagnostic information](./inspect-and-share-diagnostic-information.md) before moving to [Reset Phials safely](./reset-phials-safely.md).

Do not use session recovery to reconnect a moved Workspace Folder. Its local bundle and registry are separate durable data; follow [Move or reconnect a Workspace Folder](../../organize-files-with-phials/use-workspace-folders/move-or-reconnect-a-workspace-folder.md).
