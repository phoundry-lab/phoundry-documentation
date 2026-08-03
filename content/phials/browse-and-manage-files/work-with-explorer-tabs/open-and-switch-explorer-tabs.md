---
title: "Open and switch Explorer tabs"
description: "Create Explorer tabs, choose where they begin, switch among them, and reorder them within a tab group."
icon: phoundry-mono:folder
order: 1
ai_disclosure: true
---

# Open and switch Explorer tabs

Keep several locations or file-view configurations open by giving each one its own **Explorer tab**. An Explorer tab is a center tab that browses one location and owns its navigation, selection, and view state.

## Open a new Explorer tab

Choose the **+** button in a tab bar, or choose **New Tab** from the Command Bar. The new Explorer tab opens at the end of the target tab group and becomes active. The default shortcut is `Command+T` on macOS and `Ctrl+T` on Windows and Linux.

Where the tab begins depends on **New Tab Behavior** in Settings:

- **Use Default Directory** opens the configured **Default Directory**, or your system home folder when no directory is configured.
- **Duplicate Current Tab** opens the current Explorer location in a new tab. Despite its name, this setting copies only the location; it does not copy navigation history, selection, or file-view state.

To change this preference, see [Choose new-tab and folder defaults](../../arrange-and-customize-phials/choose-default-behaviors/choose-new-tab-and-folder-defaults.md).

You can also middle-click a folder or location in the Navigator panel to open it in a new Explorer tab. This explicit new-tab gesture always creates another tab instead of reusing an existing one.

## Switch and reorder tabs

Select a tab to make it active. The active Explorer tab receives navigation, selection, and file commands.

- `Ctrl+Tab` switches to the next tab in the active tab group and wraps after the last tab.
- `Ctrl+Shift+Tab` switches to the previous tab and wraps before the first.
- `Command+1` through `Command+9` on macOS, or `Ctrl+1` through `Ctrl+9` on Windows and Linux, switch by position in the active tab group.

Drag a tab along its current tab bar to change its order. Moving tabs between groups or creating split views belongs to [Create tab groups and split views](../../arrange-and-customize-phials/arrange-your-window/create-tab-groups-and-split-views.md).

Each Explorer tab keeps its own current location, history, selection, and active file view. When you return to a hidden Explorer tab, Phials catches its folder up from disk so it does not need to keep every hidden location under continuous watch.
