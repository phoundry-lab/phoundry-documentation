---
title: "Choose how files open"
description: "Set the persistent primary-open action for each supported file extension in Phials."
icon: phoundry-mono:settings
order: 3
ai_disclosure: true
---

# Choose how files open

Choose what Phials should do by default when you open a file of a particular type. This preference applies to the **primary open** action: double-clicking a file, selecting it and pressing `Enter`, or choosing **Open**.

## Set a preference for an extension

1. Open **Settings → Files → Open Behavior**.
2. Find the extension you want. You can filter the list by extension or by the name of a compatible Phials representation.
3. Open the extension's selector and choose:
   - A compatible Phials viewer or editor to open the file in Phials
   - **System Default** to use the app chosen by your operating system
   - A specific installed app, when Phials can retrieve that list from your operating system

The list contains file extensions claimed by currently active Phials representations. A file without a listed extension cannot receive a preference on this page.

Phials stores one choice per extension, without changing the operating system's file associations. For example, a choice for `.md` affects Markdown files opened from Phials but does not change what Finder, File Explorer, or another file manager does.

## Understand automatic behavior

With no saved preference, Phials uses the effective default for the extension. This is normally a compatible Phials representation when the file type is intended to open in Phials; otherwise it is **System Default**. Audio uses the global player, and some specialized file types have their own primary action.

The selector shows that effective default even when no override is stored. Choosing the effective-default handler again clears a redundant override. There is not currently a separate **Automatic** or reset option in the selector.

## Know when a change takes effect

A new choice applies the next time you use the primary open action for a matching file. It does not swap the representation inside every matching file tab as soon as you change Settings. If a matching file tab is already open, use the primary open action again; Phials can reuse the tab and change its File-mode representation after any unfinished edit has been handled.

If a preferred Phials representation is disabled or unavailable, Phials falls back to the next eligible representation or the system default without erasing your saved preference. If it becomes available again, the preference can take effect on a later primary open. If a specific external app has been moved or removed, choose another handler; Phials cannot launch an app that is no longer at its saved location.

Specific installed-app choices are available on macOS and Windows. On Linux, Open Behavior currently offers **System Default** rather than a discovered list of individual apps.

## Choose another app once

Use **Open in…** when you want an external app for one file on one occasion. That action does not change the per-extension preference and does not choose a Phials viewer or editor. See [Open files in Phials or another app](../../browse-and-manage-files/manage-files-and-folders/open-files-in-phials-or-another-app.md) for the complete one-time workflow.
