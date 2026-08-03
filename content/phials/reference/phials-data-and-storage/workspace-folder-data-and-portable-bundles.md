---
title: "Workspace Folder data and portable bundles"
description: "Identify a complete Workspace Folder bundle and compare its local and portable placement."
icon: phoundry-mono:sliders
order: 2
ai_disclosure: true
---

# Workspace Folder data and portable bundles

A **Workspace Folder bundle** is the complete directory Phials owns for one Workspace Folder. It contains the folder's identity, properties, values, notes, Relations, Page configuration, and saved views. The bundle is separate from the ordinary content files those records describe.

## Local and portable placement

Both storage modes use the same bundle format and preserve the same Workspace Folder identity.

| Storage mode | Bundle location | What travels when you copy only the content folder |
| --- | --- | --- |
| Stored in Phials Home | `Phials Home/vials/<workspace-id>/` | Ordinary files only. The folder has no required Phials marker. |
| Portable | `<content-folder>/.phials/` | Ordinary files and Workspace Folder data, if the copy includes hidden items. |

`<workspace-id>` is an internal stable identifier, not the folder name. Use **Reveal Phials home folder** to find the actual Phials Home instead of constructing its platform path by hand.

For the procedure and storage tradeoffs, see [Store Workspace Folder data locally or portably](../../organize-files-with-phials/use-workspace-folders/store-workspace-folder-data-locally-or-portably.md).

## Bundle contents

| Bundle item | What it owns |
| --- | --- |
| `metadata.db` | Stable file identities and the Workspace Folder index; property definitions and options; property values; Relations; and other structured Workspace Folder records |
| `schema.json` | Workspace Folder identity and display settings; property schema; Page property order and visibility; default view settings; and saved-view definitions |
| `notes/` | Markdown sidecars for notes attached to non-Markdown files, named by stable file identity |

A Markdown file's own text supplies its Page body and remains an ordinary content file. It is not copied into `notes/`. Read-only metadata extracted from files is also not Workspace Folder data; its disk copy is a regenerable cache.

The bundle format can gain more Phials-owned artifacts over time. Copy the entire bundle directory, including any database sidecar files that are present, rather than backing up only the three paths listed above. Quit Phials first so all related writes and database journals are consistent.

## Registration and identity

A locally stored bundle is associated with its content folder through the Workspace Folder registry in `data/app.db`. The local bundle alone is not a complete restoration on a new or reset installation; restore the matching registry data too.

A portable bundle carries its identity inside `.phials`. Opening or rediscovering the complete folder can register that identity with Phials again.

> **Warning:** Do not merge two bundles or use two copied portable folders as independent active Workspace Folders. Copies retain the same stable identity. Divergent copies can make notes, values, and cross-folder Relations disagree about which version is authoritative.

## What the bundle does not contain

The bundle does not contain the ordinary files and subfolders in the Workspace Folder. A complete backup therefore protects both:

1. the content folder; and
2. its entire Workspace Folder bundle.

For exact backup scopes, see [Back up and restore Phials data](./back-up-and-restore-phials-data.md). For the task flow for one folder, see [Back up and restore Workspace Folder data](../../organize-files-with-phials/use-workspace-folders/back-up-and-restore-workspace-folder-data.md).
