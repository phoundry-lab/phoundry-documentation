---
title: "Caches and temporary data"
description: "Identify regenerable thumbnails, metadata and media proxies, and clear only the affected cache."
icon: phoundry-mono:sliders
order: 3
aliases:
  - advanced/caches
ai_disclosure: true
---

# Caches and temporary data

Phials caches expensive thumbnail, metadata, and media work so repeated browsing is faster. These stores do not contain ordinary file contents or Workspace Folder data and do not need to be included in a normal backup.

The main cache root is the operating system's application-cache location for `com.phials`, not Phials Home. Its exact path differs by platform. In Settings, enable Developer mode, open **Developer**, then use **Debug Info** to read the resolved `app_cache_dir` when you need the physical location.

## Cache map

| Cache | Storage | Contents | Clear behavior |
| --- | --- | --- | --- |
| Thumbnail cache | OS app cache under `thumbnails/` | Generated image, video, PDF, text, executable, disk-image, and composite-folder representations | **Clear Thumbnail Cache** removes it; items regenerate as you browse. |
| Raw metadata cache | OS app cache under `metadata/` | Raw facts read from files by Phials' metadata extractors | **Clear metadata cache** removes it; extractors run again on the next read. |
| Camera RAW proxy cache | OS app cache under `raw-proxies/` | Decoded JPEG proxies used for viewing and thumbnail generation | No dedicated clear button; safe to remove with Phials closed, then regenerated on demand. |
| Audio playback proxy cache | OS app cache under `audio-playback-proxies/` | WAV fallbacks created when the embedded player cannot decode an original audio file | No dedicated clear button; safe to remove with Phials closed, then regenerated if needed. |
| Folder-analysis and generative-image parse caches | Rows inside `data/plugins.db` | Cached folder counts and statistics, plus reusable parse results for supported generated-image metadata | Refreshed or invalidated by their features; no dedicated user clear action. |
| In-memory caches | Memory only | Loaded metadata, documents, thumbnails, indexes, and other current-session work | Disappear when Phials quits. |

`data/plugins.db` also contains durable feature and community-plugin data. Do not delete the database merely to remove its cache rows.

## Clear a supported cache

In Settings, choose **Files**, then **Media**:

- Choose **Clear Cache** under **Clear Thumbnail Cache** to remove only `thumbnails/`.
- Choose **Clear metadata cache** to remove only `metadata/`.

The thumbnail **Enable Cache** setting controls general generated thumbnail storage. It does not disable the raw metadata cache or every specialized, always-managed representation. Clearing a cache does not change that setting.

Use a targeted clear when results are stale. See [Refresh stale thumbnails and file information](../troubleshoot-phials/refresh-stale-thumbnails-and-file-information.md) for symptom-driven recovery, and [Configure thumbnails and media behavior](../../arrange-and-customize-phials/choose-default-behaviors/configure-thumbnails-and-media-behavior.md) for thumbnail size, quality, and cache settings.

## Other regenerable and temporary files

| Location | Purpose | Backup guidance |
| --- | --- | --- |
| `Phials Home/open-with-probes/` | Empty sample files used to ask the operating system which apps handle an extension | Exclude; Phials recreates them. |
| Plugin install staging and backup directories under `Phials Home/plugins/` | Temporary files used while installing or updating a community plugin | Do not remove while an install or update is running; omit abandoned staging data from a deliberate backup. |
| Operating-system temporary directory | Short-lived archive and atomic-write work files | Exclude; normal operations clean these up. |
| SQLite `-wal` and `-shm` files beside local databases | Live transaction journals, not independent data files | Quit Phials before copying data so journals and databases reach one consistent state. |

You can remove the complete OS app-cache directory while Phials is closed, but the next browse or view may be slower while Phials rebuilds what it needs. Use the two targeted Settings actions when only thumbnails or metadata are affected.
