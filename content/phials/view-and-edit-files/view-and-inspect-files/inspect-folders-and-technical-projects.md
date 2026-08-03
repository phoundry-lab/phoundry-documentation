---
title: "Inspect folders and technical projects"
description: "Inspect folder composition, Workspace Folder structure, Git status, package details, and local Steam game information."
icon: phoundry-mono:eye
order: 5
aliases:
  - previews/folder
  - previews/git-folder
ai_disclosure: true
---

# Inspect folders and technical projects

When you select a folder, the **File panel** can summarize the folder itself rather than merely listing its children. Phials chooses a more specific summary for a **Workspace Folder**, Git repository, or recognized Steam game installation.

Folder representations are inspection surfaces in the File panel. Folders open by navigating into them; they do not open as file tabs.

## Inspect an ordinary folder

Select a folder and choose **File** in the panel dock if another panel is in front. Phials scans the folder and shows:

- Total files, folders, and size
- A **Composition** section with file categories and proportions
- A **Details** section with oldest and newest file dates plus hidden-file count

Phials can show cached results immediately and refresh them in the background. Counts cover the folder tree being scanned, so a large or remote folder can take longer to settle. Leaving the selection cancels work that is no longer needed.

If the scan cannot read part of the folder, some values may be unavailable or remain at their fallback rather than blocking the rest of the Explorer.

## Inspect a Workspace Folder

A Workspace Folder summary takes precedence when a folder is both a Workspace Folder and a Git repository. The header uses the Workspace Folder's saved display name and icon when configured.

Expand **Workspace Folder** to check:

- Number of configured properties
- Number of saved views
- The filesystem folder name when it differs from the saved display name

The ordinary folder counts, size, composition, and date details remain available below that summary. This view describes the Workspace Folder's structure; use the Workspace Folder articles under [Organize files with Phials](../../organize-files-with-phials/index.md) for configuration and lifecycle procedures.

## Inspect a Git repository

At a Git repository root, Phials can show:

- Current branch or a detached state
- Remote repository link when the remote can be recognized
- Package name, version, description, dependency counts, and script names when package information is present
- A language breakdown by detected source bytes
- Staged, modified, and untracked file counts, or **Clean working tree**

This is a project summary, not a Git client. It does not stage files, create commits, switch branches, or run package scripts. The information is read from the local repository and package files; a remote owner image may be loaded from a recognized public host when available.

If a selected folder is not actually a Git repository, Phials falls back to the ordinary folder summary.

## Inspect a local Steam game folder

Phials recognizes installed game folders under a Steam library's `steamapps/common` directory. When local Steam data is available, the summary can show cover art, playtime, size on disk, supported platforms, developer and publisher, App ID, build and update information, and last-played time.

Choose the playtime value to change its display format. Choose the install-folder path to navigate there in the Explorer. **Play in Steam** hands the launch request to Steam, and **View on Steam Store** opens the matching store destination when an App ID is available.

Steam information comes from local manifests, user data, and library cache files. A partial Steam installation or restricted file access can leave some fields or artwork unavailable without preventing you from browsing the folder itself.
