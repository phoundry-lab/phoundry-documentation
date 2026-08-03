---
title: "Read PDFs and text-based files"
description: "Read PDFs, plain text, code, Markdown, and HTML with the controls and modes appropriate to each file."
icon: phoundry-mono:eye
order: 3
aliases:
  - previews/text
ai_disclosure: true
---

# Read PDFs and text-based files

Phials provides dedicated reading surfaces for PDFs, plain text and code, Markdown, and HTML. Select a file to inspect it in the **File panel**, or open it in a **file tab** when you want a persistent reading surface.

## Read a PDF

PDFs open as a continuous stack of pages. The viewer starts in **Fit page** mode and updates the page indicator as you scroll.

Use the file toolbar to:

- Move to the previous or next page
- Check the current page and total page count
- Zoom in or out
- Choose **Fit width** or **Fit page**
- Choose **Open in default app**

When the PDF viewer has focus, `Page Up` and `Page Down` move one page, while `+` and `-` change the zoom. Phials renders the document for reading but does not provide in-app search, annotations, form filling, signing, or printing. Use **Open in default app** for those tasks.

A password-protected PDF cannot be unlocked inside Phials. The viewer explains that the file is protected and offers **Open in default app**. A corrupt or incomplete PDF receives a separate read error so it is not mistaken for a password prompt.

## Read plain text and code

Plain text and supported source files open in a syntax-aware code surface. Line breaks, indentation, and source formatting are preserved. The language is inferred from the file extension when Phials has a matching language definition.

The in-app text surface has a 1 MB file-size limit. Larger files show **File too large to edit** instead of loading the entire source into the editor. Open a large log, data dump, or source file in another application when you need to inspect it.

Some text-like formats have a more specific representation. For example, CSV and TSV files use the spreadsheet surface, SVG can switch between a rendered graphic and its XML source, and HTML has a rendered mode. Phials chooses the most specific available representation before falling back to plain text.

## Read Markdown

Markdown opens in **Editor** mode, which presents the document as structured content. Use the toolbar mode control to switch to **Raw** when you need to inspect the Markdown source directly. Inline raw HTML is shown as source in Raw mode rather than executed as part of the rich document.

Markdown files larger than 1 MB are not loaded into the in-app editor. Editing behavior, autosave, wiki links, and file embeds are covered in [Edit Markdown files](../edit-files-in-phials/edit-markdown-files.md).

## Inspect HTML safely

HTML opens in **Rendered** mode. Switch to **Raw** to inspect the source. The rendered document runs in an isolated, sandboxed frame: it can render its own markup and attempt to load referenced resources, but it cannot gain same-origin access to Phials or open popups and forms as though it were the host application.

Treat unfamiliar HTML as active content and use Raw mode when you only need to inspect the source. The HTML source surface has the same 1 MB limit as other in-app text editors. For editing, continue with [Edit text, code, HTML, and SVG](../edit-files-in-phials/edit-text-code-html-and-svg.md).

## Check metadata and format coverage

PDFs can provide document fields such as page count, title, author, and PDF version. Text-based formats generally rely on base filesystem metadata unless a specialized representation contributes more. Use [Metadata support by file type](../../reference/file-format-and-metadata-support/metadata-support-by-file-type.md) for the complete field matrix and [File viewing and editing support](../../reference/file-format-and-metadata-support/file-viewing-and-editing-support.md) for supported extensions.
