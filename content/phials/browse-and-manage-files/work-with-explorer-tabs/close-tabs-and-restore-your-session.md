---
title: "Close tabs and restore your session"
description: "Close one or several tabs and understand which open tabs and Explorer state Phials restores after restart."
icon: phoundry-mono:folder
order: 4
ai_disclosure: true
---

# Close tabs and restore your session

Close tabs you no longer need while leaving the rest of the center ready for your next session. Phials saves the live center automatically and restores every tab that remains open, regardless of pin state.

## Close one tab

Open a tab's context menu and choose **Close Tab**, or middle-click the tab. The standard shortcut is `Command+W` on macOS and `Ctrl+W` on Windows and Linux.

Pinning protects a tab from contextual replacement, not from an explicit close. If a file tab has unsaved, conflicted, or in-progress work, Phials runs that tab's normal save or finalization check before closing it.

When you close the active tab, Phials activates the tab immediately to its right. If you closed the rightmost tab, it activates the tab to the left. Closing an inactive tab does not change the active tab.

## Close several tabs

The tab context menu also provides two group-local actions:

- **Close Other Tabs** closes every other tab in the same tab group.
- **Close Tabs to Right** closes only the tabs after the chosen tab in that group.

Phials checks each tab as it closes. If a tab cannot finish closing or you cancel its prompt, the bulk action stops and leaves that tab and the remaining tabs open.

If you close the final tab in a group while other groups remain, Phials removes the empty group. If you close the final tab in the entire center, Phials leaves an empty center with a **New Tab** action instead of immediately creating another Explorer tab.

## Restore your open session

After restart, Phials restores all tabs that were still open, their group-local order and active tab, Explorer locations and history, file-view state, split sizes, and intentional empty groups. Pinned and unpinned tabs restore in the same way. Closing a tab removes it from the saved session; session restore is not a history of closed tabs.

If a restored Explorer location is unavailable, the tab remains open and shows **Could not load this folder** with the underlying error. Reconnect or make the location available, then navigate to it again; or close the preserved tab if you no longer need it. For access problems, see [Fix file and folder access problems](../../reference/troubleshoot-phials/fix-file-and-folder-access-problems.md).

Automatic session restore represents your live working state. A **Layout** is a separately named snapshot of the complete center that changes only when you update it. See [Save and reuse Layouts](../../arrange-and-customize-phials/arrange-your-window/save-and-reuse-layouts.md) when you want to return to a named arrangement rather than the last open session.
