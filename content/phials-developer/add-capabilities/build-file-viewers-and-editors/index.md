---
title: "Build file viewers and editors"
description: "Match files, render responsive surfaces, share preview state, and save edits safely."
ai_disclosure: true
aliases:
  - types/preview
---

# Build file viewers and editors

A file viewing and editing capability presents a file wherever Phials needs it: beside an Explorer selection, in a Page tab's File mode, in Gallery, or inside a Markdown file embed. You supply the file-specific experience through [PreviewProvider](../../reference/sdk-type-reference/PreviewProvider.md); Phials supplies the destination shell, error boundary, standard editor controls, and navigation chrome.

Build one reusable surface rather than separate compact and fullscreen components. Its layout responds to its rendered container, while destination-specific behavior is limited to real capability differences such as making a Markdown embed inspection-only.

This hub follows the complete provider path:

1. [Match files to a viewer or editor](./match-files-to-a-viewer-or-editor.md) with stable criteria and deliberate priority.
2. [Build a responsive file surface](./build-a-responsive-file-surface.md) that works at every supported container width.
3. [Add thumbnails and toolbar controls](./add-thumbnails-and-toolbar-controls.md) without duplicating host chrome.
4. [Share viewer state with a preview session](./share-viewer-state-with-a-preview-session.md) so presentations do not diverge.
5. [Support File mode and Markdown embeds](./support-file-mode-and-markdown-embeds.md) by opting into each destination and enforcing inspection-only embed behavior.
6. [Save edited files safely](./save-edited-files-safely.md) with revision checks, conflicts, retention, and finalization.

## The provider contract

A complete provider can contribute five related pieces:

| Provider field | Responsibility |
| --- | --- |
| `surface` | The responsive Svelte viewer or editor for one file. |
| `createSession` | Optional presentation-independent state for that provider and file. |
| `toolbar` | Optional provider-specific controls placed by the host. |
| `thumbnail` | Optional bounded representation for thumbnail-capable file views. |
| `destinations` | Explicit eligibility for Page-tab File mode and inspection-only Markdown embeds. |

The pieces remain independent. A read-only viewer may need only `surface`. An editor normally uses a session so dirty and saving state survive presentation changes. A thumbnail is not a small copy of the full viewer, and a toolbar contribution is not a second shell.

The examples use a small JSON-based diagram format and the typed text-file API. The same composition applies to media, documents, canvases, and other file-specific experiences; use the matching data API and release resources in the session or component that owns them.

For the generated signatures, see [PreviewProvider](../../reference/sdk-type-reference/PreviewProvider.md), [`PreviewSurfaceProps`](../../reference/sdk-type-reference/PreviewSurfaceProps.md), and [`PreviewSession`](../../reference/sdk-type-reference/PreviewSession.md).
