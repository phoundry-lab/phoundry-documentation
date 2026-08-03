---
title: "Choose which files appear"
description: "Control hidden entries, parent navigation, filename extensions, folder ordering, and always-hidden patterns."
icon: phoundry-mono:settings
order: 2
ai_disclosure: true
---

# Choose which files appear

Control which entries Phials presents and how their names are displayed. These app-wide choices change the Explorer presentation only; they do not hide, rename, or move anything on disk.

## Change the common visibility choices

Open **Settings → Files → Visibility**, then choose any of these options:

- **Show Hidden Files** includes files and folders whose names begin with a dot, unless an always-hidden pattern also matches them.
- **Show Parent Directory** adds the `..` entry for navigating to the current folder's parent. It is not shown at a filesystem root or in views where a parent entry does not apply.
- **Show File Extensions** includes the final extension in displayed filenames. Turning it off leaves folders and dotfiles unchanged and does not rename the file.
- **Folders First** keeps folders ahead of files while preserving the active sort inside each set. Turn it off to sort files and folders together.

You can also reach these four choices from **General options** in an Explorer tab. They still apply across Phials, not only to that tab or folder.

## Always hide matching names or paths

Use **Always hide (globs)** for entries you do not want Phials to show even when **Show Hidden Files** is on:

1. Enter one glob pattern per line.
2. Use a name-only pattern such as `.DS_Store`, `*.tmp`, or `node_modules` to match an entry's filename.
3. Include `/` or `\` when the pattern should match a complete path instead.

Standard glob wildcards apply: `*` matches within one path segment, `?` matches one character, and `**` can span folders. Matching is case-insensitive for Windows-style paths and case-sensitive for other paths. Phials trims blank lines, ignores duplicate entries, and skips invalid patterns.

Always-hidden patterns take precedence over **Show Hidden Files**. Choose **Reset to default** to restore the patterns shipped with Phials; this replaces your custom list.

If an expected item is missing, first turn on **Show Hidden Files**, then review **Always hide (globs)**. A matching always-hidden rule must be removed or narrowed before the item can appear.

For live view, sorting, and property-presentation choices, see [Configure a file view](../../browse-and-manage-files/choose-and-configure-file-views/configure-a-file-view.md).
