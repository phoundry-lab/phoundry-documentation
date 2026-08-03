---
title: "Protect an Explorer tab with pinning"
description: "Pin an Explorer tab so Navigator actions cannot replace it, while keeping normal in-tab navigation available."
icon: phoundry-mono:folder
order: 2
ai_disclosure: true
---

# Protect an Explorer tab with pinning

Pin an **Explorer tab** when you want to keep that tab available for a particular location. Pinning protects the tab from replacement by actions outside the Explorer; it does not freeze the tab or control whether it returns after restart.

## Pin the tab

Open the tab's context menu and choose **Pin Tab**. Phials records the tab's current location as its pinned location.

When you choose a favorite, drive, saved search, or another location in the Navigator panel, Phials normally reuses the most recently active unpinned Explorer tab in the active tab group. A pinned Explorer tab is not eligible for that replacement. If the group has no unpinned Explorer tab, Phials creates one for the requested location.

Middle-clicking a Navigator location or using another explicit new-tab action also creates a new Explorer tab, whether the current tab is pinned or not.

## Navigate while the tab is pinned

Back, Forward, Up, breadcrumbs, folder opening, and typed paths continue to navigate inside a pinned Explorer tab. When you move away from the recorded location, the tab action becomes **Revert to pinned location**. Choose it to navigate back without restoring an older selection, history, or file-view snapshot.

To remove replacement protection, open the tab's context menu and choose **Unpin Tab**. If you unpin while away from the recorded location, Phials discards that pinned location. Pinning the tab again records its then-current location.

Pinning does not decide which tabs restore after restart. Phials restores every tab that was still open, including unpinned Explorer tabs. You can also close a pinned tab through **Close Tab**, the standard close shortcut, or middle-click.

For the difference between Navigator replacement and navigation inside an Explorer tab, see [Navigate folders and paths](../navigate-locations/navigate-folders-and-paths.md).
