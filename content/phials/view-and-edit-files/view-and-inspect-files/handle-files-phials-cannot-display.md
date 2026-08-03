---
title: "Handle files Phials cannot display"
description: "Distinguish unsupported files from viewer failures, then open the file elsewhere or restore a missing representation."
icon: phoundry-mono:eye
order: 8
aliases:
  - previews/default
ai_disclosure: true
---

# Handle files Phials cannot display

Phials can browse files even when it cannot display their contents. What you do next depends on whether the file type is unsupported, its normal representation failed, or the representation is temporarily unavailable.

## Recognize an unsupported file

For a file with no compatible built-in or community representation, the File panel shows a generic icon and **Preview not available for this file type** or **No preview available**. Base filesystem information and any compatible metadata can still appear above that message.

An unsupported representation does not mean the file is corrupt. It means no active viewer in Phials claims that file type.

Use [File viewing and editing support](../../reference/file-format-and-metadata-support/file-viewing-and-editing-support.md) to check whether the extension is supported. The list is format-specific: a file can look similar to a supported format while using a different container or extension.

## Open the file in another application

Use the file's **Open** command when its configured primary action is the system application. To choose a specific installed application for this one opening, use **Open in…** from the context menu or command bar.

If you regularly want an extension to leave Phials, set its handler under **Settings → Files → Open Behavior**. That preference affects future primary opens; it does not prevent the File panel from showing any compatible metadata or representation when you select the file.

For step-by-step handler configuration, see [Open files in Phials or another app](../../browse-and-manage-files/manage-files-and-folders/open-files-in-phials-or-another-app.md).

## Recover from a viewer failure

A message ending in **failed to load** with a **Try again** button means Phials found a compatible representation, but that representation raised an unexpected error. Choose **Try again** once. If it fails again:

1. Confirm that the file still exists and that Phials can read it.
2. Open the file in its system application to check whether the file itself is valid.
3. If the file is on removable, network, or cloud storage, wait for it to become fully available and retry.
4. Restart Phials if the failure began after a plugin or settings change.

Some viewers provide a more precise message instead. Examples include a password-protected or corrupt PDF, an unreadable database, a model loader error, or **No preview available** for a Camera RAW file whose proxy could not be created. Follow that message before treating the entire viewer system as unavailable.

## Check active community plugins

A community plugin can add another representation for a file type. If a file stopped displaying after a plugin was disabled, removed, or updated, review it under **Settings → Plugins**. Re-enable only a plugin you trust and whose compatibility you have checked.

See [Find and install community plugins](../../arrange-and-customize-phials/use-tools-and-community-plugins/find-and-install-community-plugins.md) and [Manage community plugins safely](../../arrange-and-customize-phials/use-tools-and-community-plugins/manage-community-plugins-safely.md). Phials falls back to another compatible representation when one exists; it does not need the missing plugin merely because an older file tab used it.

## Fix stale or inaccessible information

When the representation is correct but its thumbnail or metadata is stale, use [Refresh stale thumbnails and file information](../../reference/troubleshoot-phials/refresh-stale-thumbnails-and-file-information.md). For permission errors, unavailable volumes, or protected locations, use [Fix file and folder access problems](../../reference/troubleshoot-phials/fix-file-and-folder-access-problems.md).

If a valid file still fails in both Phials and its system application, restore another copy or use the format's repair tools. Phials does not modify an unsupported file merely by selecting or attempting to display it.
