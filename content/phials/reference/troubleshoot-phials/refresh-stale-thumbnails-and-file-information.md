---
title: "Refresh stale thumbnails and file information"
description: "Refresh a folder, clear only stale thumbnail or metadata copies, and let Phials regenerate them."
icon: phoundry-mono:sliders
order: 2
ai_disclosure: true
---

# Refresh stale thumbnails and file information

When a file changed outside Phials but its thumbnail, size, date, duration, dimensions, or other file information still looks old, refresh the location first. Clear a disk cache only when the refreshed listing still shows an outdated generated value.

Workspace Folder properties such as ratings, tags, statuses, and notes are not file metadata caches. Clearing a thumbnail or metadata cache does not change or repair those values.

## Refresh before clearing a cache

1. Make the file and its containing location available.
2. In the affected Explorer tab, run **Refresh** from the Path Bar or Command Bar.
3. Reopen or reselect the file so the File and Page surfaces request current information.

**Refresh** reloads the directory and reconciles its Workspace Folder when applicable. If the value now matches the file, no cache removal is needed.

## Clear the affected cache

Choose the cache by symptom:

| Symptom after refresh | Targeted action |
| --- | --- |
| An image, video frame, PDF page, folder composite, app icon, or other generated thumbnail is old | Clear the thumbnail cache. |
| Read-only facts such as dimensions, duration, codec, dates, or embedded fields are old | Clear the metadata cache. |
| A Workspace Folder property or note is wrong | Do not clear either cache; return to the article for editing that property or note. |

Clearing either cache deletes only Phials' regenerable copies. It does not delete ordinary files or Workspace Folder data, but the next browse can be slower while Phials recreates the missing work.

1. Open Settings.
2. Under **Files**, choose **Media**.
3. For stale generated images, choose **Clear Cache** under **Clear Thumbnail Cache**.
4. For stale file facts, choose **Clear metadata cache**.
5. Return to the folder and run **Refresh** again.

The clearing actions remove the corresponding on-disk cache. Information already loaded in the current process can remain visible until it is requested again. If the stale value persists, quit and reopen Phials, then revisit the file.

## Understand what Phials rebuilds

- Cleared thumbnails regenerate as their files or folders become visible.
- Cleared metadata regenerates when a view, filter, File surface, or other feature requests it.
- Clearing a cache does not change **Enable Cache**, thumbnail size, or thumbnail quality.
- **Clear Thumbnail Cache** does not clear raw metadata, Camera RAW proxies, or audio playback proxies.
- **Clear metadata cache** does not clear thumbnails or Workspace Folder properties.

See [Caches and temporary data](../phials-data-and-storage/caches-and-temporary-data.md) for the complete storage map. To change generation and disk-caching behavior rather than recover a stale value, see [Configure thumbnails and media behavior](../../arrange-and-customize-phials/choose-default-behaviors/configure-thumbnails-and-media-behavior.md).

If clearing and restarting do not help, confirm the original file itself has the expected content and modification date. Then [inspect diagnostic information](./inspect-and-share-diagnostic-information.md), including the app version, cache totals, and any visible error, before considering a broader recovery.
