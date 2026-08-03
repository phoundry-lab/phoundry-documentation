---
title: "Configure thumbnails and media behavior"
description: "Control generated thumbnail caching, size, and quality, clear media caches, and find video playback defaults."
icon: phoundry-mono:settings
order: 4
ai_disclosure: true
---

# Configure thumbnails and media behavior

Balance thumbnail detail, disk use, and generation work, then use the format-owned controls for playback behavior. Thumbnail settings affect generated file previews; they do not change the source files or the size of items in a file view.

## Configure generated thumbnails

Open **Settings → Files → Media**, then use the **Thumbnails** section:

- **Enable Cache** lets Phials generate and store reusable thumbnails on disk. When it is off, images may use their original files while videos, folders, PDFs, and other generated-preview formats can fall back to file-type icons.
- **Size** sets the requested dimensions for newly generated thumbnails, from 64 to 512 pixels. Larger thumbnails can preserve more detail but take more work and disk space.
- **Quality** sets the compression quality for newly generated thumbnails, from 40% to 95%. Higher quality can increase generation time and cache size.

The generated **Size** is different from Grid **Item size**. Item size controls how large a card appears in the file view; generated size controls the preview asset Phials prepares for that card. Change Grid presentation under [Configure a file view](../../browse-and-manage-files/choose-and-configure-file-views/configure-a-file-view.md).

Size and quality are part of a generated thumbnail's cache identity, so new requests can use the new settings without overwriting the source file. A thumbnail already visible in an open view may remain until the view requests it again.

Exact support depends on the file type. See [Thumbnail support by file type](../../reference/file-format-and-metadata-support/thumbnail-support-by-file-type.md) for the format matrix.

## Clear thumbnail or metadata caches

Choose **Clear Cache** beside **Clear Thumbnail Cache** to remove generated thumbnails stored on disk. Phials regenerates supported thumbnails when they are needed again. A thumbnail already held by the current view may remain visible until you revisit or refresh it.

Choose **Clear metadata cache** separately when extracted file information appears stale. This removes cached raw metadata, not thumbnails, and causes the relevant extractors to run on the next read. **Enable Cache** does not control the metadata cache.

Some format-specific proxies and caches are separate from the general thumbnail cache. For the storage boundaries, see [Caches and temporary data](../../reference/phials-data-and-storage/caches-and-temporary-data.md). For recovery steps rather than ordinary configuration, see [Refresh stale thumbnails and file information](../../reference/troubleshoot-phials/refresh-stale-thumbnails-and-file-information.md).

## Configure video playback behavior

The **Media** page does not control autoplay, initial mute, loop, volume, captions, or fit. In Settings, open **Previews**, select **Videos**, and use the **Video playback** controls:

- The controls whose labels end in **(File panel)** apply to videos in the File panel and Gallery stage.
- The controls whose labels end in **(file tab)** apply to File mode in a file tab.

Loop, volume, captions, and fit are persistent choices made in the video player itself. Audio uses its own global player and has no playback defaults on the Media page. See [Play audio and video](../../view-and-edit-files/view-and-inspect-files/play-audio-and-video.md) for the player controls and format-specific limitations.
