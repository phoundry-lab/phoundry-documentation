---
title: "Duplicate an Explorer tab"
description: "Copy an Explorer tab's browsing and view state into a new tab that can then change independently."
icon: phoundry-mono:folder
order: 3
ai_disclosure: true
---

# Duplicate an Explorer tab

Duplicate an **Explorer tab** when you want a second starting point with more context than a new tab provides.

Open the source tab's context menu and choose **Duplicate Tab**. Phials creates and activates a new Explorer tab from the source tab's current snapshot, placed immediately to the right of the source tab in the same tab group.

The duplicate copies:

- the current location and Back and Forward history;
- the file view, sorting, filtering, and grouping configuration; and
- the active saved-view selection for locations already visited in the tab.

The duplicate starts unpinned even when the source tab is pinned. The current file selection and live search results are not copied. Phials loads the duplicate's folder independently from disk.

After creation, the two Explorer tabs are not paired. Each tab has independent navigation, selection, active view state, folder loading, and filesystem monitoring. Navigating or selecting in one does not make the other follow. Changes to the files themselves and other information saved for the shared folder can still appear in both tabs because both are looking at the same underlying folder.

Do not confuse **Duplicate Tab** with the **Duplicate Current Tab** option under **New Tab Behavior**. That setting starts ordinary new tabs at the current location but does not copy history or view state. See [Choose new-tab and folder defaults](../../arrange-and-customize-phials/choose-default-behaviors/choose-new-tab-and-folder-defaults.md) to configure it.
