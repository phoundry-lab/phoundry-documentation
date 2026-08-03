---
title: "Play audio and video"
description: "Play audio in the global player and inspect video with transport, fit, caption, loop, and fullscreen controls."
icon: phoundry-mono:eye
order: 2
aliases:
  - previews/audio
  - previews/video
ai_disclosure: true
---

# Play audio and video

Audio and video use different surfaces in Phials. Audio plays in a floating player that stays available while you browse. Video appears in the **File panel** and can open in a **file tab**.

## Play an audio file

Double-click a playable audio file, press `Enter`, or choose **Play** in the File panel toolbar. Phials starts the file in the floating audio player near the bottom-right of the window.

The compact player provides:

- Previous, play or pause, and next controls
- A seek bar and elapsed/total time
- Volume and mute controls
- Cover art plus title and artist or album information when available

Choose the expand control to see the larger player. The expanded view adds a visible queue, lets you move tracks up or down, remove individual tracks, or choose **Clear queue**. Closing the player also clears the queue.

Playback remains available while you change folders, Explorer tabs, or center tabs. Supported operating systems can also receive the current track information and media-key actions through the system media session.

Selecting an audio file shows its cover art and tag fields in the File panel. That surface is separate from playback. To change those fields, see [Edit audio tags](../edit-files-in-phials/edit-audio-tags.md).

> **Note:** Audio does not open in a file tab. Its primary open action is the global audio player.

If an audio format has metadata support but cannot be decoded for playback, **Play** is unavailable or the player reports **Playback failed**. On Windows, Phials can prepare a compatible proxy for some M4A/ALAC files; the original audio file is not changed.

## Play a video

Select a video to show it in the File panel. Depending on **Settings → Media**, it may start automatically and may begin muted. Choose the file panel's open control, double-click the video, or choose **Open in Tab** to keep it in a file tab.

Move the pointer over the video or focus it to reveal the transport. The controls include:

- Back 10 seconds, play or pause, and forward 10 seconds
- A scrubber with elapsed and total time
- Volume and mute
- **Loop**
- **Fill screen** or **Fit to screen**
- **Open in Tab** from the File panel, then **Fullscreen** from a file tab

Click the video once to play or pause it. Double-click it to open the larger destination or enter fullscreen, depending on where it is already shown. The transport stays visible while playback is paused and hides after a short idle period while playback continues.

Phials does not automatically advance from one video to another. Enable **Loop** when you want the current video to restart after it ends.

## Use captions and keyboard controls

Place a WebVTT caption file beside the video with the same base name and a `.vtt` extension. When Phials finds the sidecar, a captions button appears in the transport.

With the video focused, use:

- `Space` to play or pause
- `Left Arrow` and `Right Arrow` to move 10 seconds
- `F` to open the larger destination or toggle fullscreen
- `M` to mute or unmute
- `Esc` to exit video fullscreen

Loop, volume, captions, and fit preferences carry across videos. Autoplay and initial mute behavior can be adjusted in [Configure thumbnails and media behavior](../../arrange-and-customize-phials/choose-default-behaviors/configure-thumbnails-and-media-behavior.md). For the exact supported containers and codecs, see [File viewing and editing support](../../reference/file-format-and-metadata-support/file-viewing-and-editing-support.md).
