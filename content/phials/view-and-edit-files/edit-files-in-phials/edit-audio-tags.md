---
title: "Edit audio tags"
description: "Edit embedded audio descriptions, credits, identifiers, lyrics, and cover art with explicit Save and Revert."
icon: phoundry-mono:eye
order: 5
ai_disclosure: true
---

# Edit audio tags

Edit the tags embedded in an audio file without changing its audio stream. Audio tags are the exception to Phials' normally read-only file metadata: choosing **Save** writes the edited fields and embedded cover art back to the file.

## Open the tag editor

1. Select an audio file in an Explorer tab.
2. Choose the **File** panel.
3. Edit the fields you need, then choose **Save**.

Audio-tag editing stays in the selection-following File panel. Opening a playable audio file starts or focuses the audio player instead of creating a file tab.

The editor groups fields by purpose:

- **Track & album** covers title, artist, album, genre, track and disc numbers, and related labels.
- **Credits & publishing** covers contributors, label, publisher, copyright, and comments.
- **Dates & tempo** covers dates, BPM, key, mood, media type, and work or movement fields.
- **Identifiers** and **ReplayGain** hold their corresponding embedded tag values.
- **Lyrics** opens as a separate multiline section.
- **Technical** shows derived stream facts such as sample rate, channels, bit depth, and bitrate. These fields are read-only.

Support for writing individual fields depends on the audio container and its tag format. See [File viewing and editing support](../../reference/file-format-and-metadata-support/file-viewing-and-editing-support.md) for the exact file-format boundary.

## Replace or remove embedded cover art

Choose **Replace cover** and select a JPEG, PNG, GIF, or BMP image to stage new embedded artwork. Choose **Remove cover** to stage removal.

Neither action changes the audio file until you choose **Save**. Folder images such as `cover.jpg` may still be used for display, but this editor changes only artwork embedded in the audio file.

## Save, revert, or change selection

Choose **Save** to write every staged field and cover change. After saving, Phials refreshes extracted metadata and updates the audio player when it is showing the same track.

Choose **Revert** to discard the staged changes and restore the values loaded or last saved in this editor. Revert does not reread changes made by another app.

If you select another file with unsaved tag edits, Phials asks whether to **Discard** them. Discard is permanent. Choose the dialog's cancel action, save or revert the current audio file, then change selection again.

The tag editor does not detect external changes or merge tag revisions. Saving can replace tags written by another app after Phials loaded the file. When another tag editor has changed the file, choose **Revert**, select another file, then reselect the audio file to load its newer tags.

If saving fails, the staged values remain available and the editor shows the error. Correct the file-access or format problem, then choose **Save** again.

Use **Play** or **Pause** in the File panel toolbar for formats the audio player can decode. Tag editing may still be available when playback is not. For playback and queue controls, see [Play audio and video](../view-and-inspect-files/play-audio-and-video.md).
