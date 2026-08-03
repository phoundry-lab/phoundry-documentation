---
title: "Inspect and share diagnostic information"
description: "Capture a read-only runtime snapshot and remove private paths before sharing relevant details."
icon: phoundry-mono:sliders
order: 4
ai_disclosure: true
---

# Inspect and share diagnostic information

**Debug Info** is a read-only snapshot of Phials' runtime, databases, caches, and registered Workspace Folders. It helps identify the affected storage boundary without changing or repairing anything.

## Refresh the snapshot

1. Open Settings.
2. Under **Developer**, choose **Debug**.
3. Find **Debug Info**. Phials loads a snapshot when the page opens.
4. Reproduce the problem when possible, then choose **Refresh** to capture the current state.

The timestamp shows when the visible snapshot was refreshed. Expanding a database or Workspace Folder reveals its detailed rows; it does not modify that data.

## Read the sections

| Section | Useful details |
| --- | --- |
| Runtime | Phials and Tauri versions, operating system, architecture, and resolved Phials Home, configuration, state, data, plugin, theme, cache, and legacy app-data paths |
| App databases | Whether `app.db`, `plugins.db`, or a legacy database exists; its size; table row counts; and inspection errors |
| Disk caches | Thumbnail-cache and complete OS app-cache locations, sizes, and file counts |
| Frontend memory | In-process thumbnail memo, active requests, workers, and known Workspace Folder count |
| Workspace Folder databases | Root and storage paths, stable identity, local or portable mode, registry and bundle health, schema presence, database size, table row counts, and errors |

A missing marker or visible error can narrow the next action. Use the snapshot to identify the boundary, then follow the relevant access, cache, Workspace Folder, or settings article. **Refresh** itself is not a repair control.

## Share only what is needed

Debug Info does not provide a **Copy all** or automatic support-upload action. Capture a screenshot or copy the few relevant values into your report, together with:

- what you were doing;
- the exact visible error;
- whether the problem survives **Refresh** and restart; and
- the smallest steps that reproduce it.

For an access problem, the app version, platform, affected path, and exact error are usually enough. For a cache problem, add the cache path and size plus relevant frontend-memory counts. For a Workspace Folder problem, add its storage mode, registry status, bundle health, and visible inspection error.

> **Privacy check:** Review every value before sending it. Absolute paths can reveal your account name, project and folder names, mounted servers, and cloud-storage organization. Workspace Folder IDs and storage paths identify persistent local records. Database table names, row counts, and error text can reveal installed features or additional paths. Crop or redact anything the recipient does not need.

The visible snapshot does not intentionally show file contents, notes, property values, passwords, or license keys. Do not attach `config.toml`, a database, `session.json`, a Workspace Folder bundle, or an entire Phials Home unless a trusted recipient explicitly needs that file and you have reviewed its contents.

Capture Debug Info before [resetting Phials](./reset-phials-safely.md), because reset removes the databases and paths that often explain the original problem.
