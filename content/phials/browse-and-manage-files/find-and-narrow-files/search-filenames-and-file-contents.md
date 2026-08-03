---
title: "Search filenames and file contents"
description: "Search names or readable file contents in one folder or throughout your home folder."
icon: phoundry-mono:folder
order: 4
aliases:
  - basic-use/search
ai_disclosure: true
---

# Search filenames and file contents

Search replaces the active Explorer tab's ordinary folder listing with matching files. Each Explorer tab owns its own search, so switching tabs does not overwrite another tab's query.

## Run a search

1. Open the folder you want to search, then choose **Search** above the File view. You can also press `Command-F` on macOS or `Ctrl-F` on Windows and Linux.
2. Enter a non-empty query in **Search files…**. Phials runs it automatically as you edit; press `Enter` to run immediately.
3. Choose **This folder** or **All files**.
4. Choose **Filenames** or **File content**.
5. Choose **Simple**, **Glob**, or **Regex** when the selected target supports it.

**This folder** searches only the folder you are browsing by default. Enable **Recursive search** to include its subfolders. **All files** searches your home folder and its descendants; it does not include mounted locations outside your home folder.

**Simple** finds a substring. **Glob** uses shell-style filename patterns such as `*.pdf`. **Regex** uses a regular expression. Filename searches support all three modes. File-content searches support Simple and Regex; Glob is unavailable for file contents. Content search skips folders and binary files.

See [Search pattern syntax](../../reference/search-and-filter-syntax/search-pattern-syntax.md) for escaping, case behavior, and pattern examples.

## Adjust search options

Use the option buttons when the defaults would exclude a result:

- **Case sensitivity** switches between case-insensitive and case-sensitive matching.
- **Include hidden files** includes hidden files and dotfiles.
- **Respect gitignore** excludes paths ignored by applicable `.gitignore` files when active.
- **Include system folders** includes system-style folders under your home folder and appears only for **All files**.

The **Recursive search** option appears only for **This folder** because **All files** is already recursive.

## Add search-specific filters

Choose **Add filter** in the Search row to narrow the matches by file facts, metadata, or Workspace Folder properties. You can add conditions, AND/OR logic, and nested groups in the same way as [Filter files](./filter-files.md).

Search filters are separate from the browse filters configured with the main **Filter** control. They run only after the name or content query finds candidates, and a non-empty text query is still required.

## Read and clear results

Results appear in the same File view. The end of the Search row shows **Searching…**, then the match count. Phials returns at most 1,000 results and identifies when that cap was reached.

Clear the query field to return to the ordinary folder listing while leaving the Search row open. To clear the query, its search filters, and all search options together, press `Escape` while the query field is focused or close the Search row with **Search**.

Opening search with `Command-F` or `Ctrl-F` always starts from the default search configuration, even when a draft is already open.
