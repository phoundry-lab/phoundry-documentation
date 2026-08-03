---
title: "Open a Page in a file tab"
description: "Open Page mode in a file tab and switch between File and Page without losing either session."
icon: phoundry-mono:eye
order: 2
ai_disclosure: true
---

# Open a Page in a file tab

Open **Page mode** when you want a file's Page to remain available while you browse elsewhere. File and Page are two modes of the same file tab, so opening the Page does not create a separate Page file or a second tab for the same subject.

## Open Page mode

Use any of these entry points:

- Select or open a regular file, then choose **Open Page** from its context menu.
- In the Page panel, choose **Open in Tab**.
- In an existing file tab, choose **Page** in the File/Page switcher.
- In Details or Grid view, use the file's **Page** action when it appears.

Phials creates a file tab or focuses the existing tab for that file, then shows **Page**. The tab keeps its own file identity, so the Page remains on that file if its originating Explorer tab navigates elsewhere or closes.

If the file's folder does not have Workspace Folder data, Phials explains what it will add. Approve the setup to continue with the original **Open Page** action; you do not need to create a Workspace Folder first.

## Switch between File and Page

Choose **File** to work with the underlying file through its available viewer or editor. Choose **Page** to return to its Workspace Folder properties and Page body.

Switching modes does not close either working session:

- File-mode edits and controls retain their state.
- Page mode retains its editor choice and scroll position, and its body continues to use autosave.
- Unsaved indicators remain visible for the mode that owns the pending work.

For a Markdown file, File and Page modes edit the same document. Phials keeps one shared document state while changing its presentation, so switching does not create competing drafts.

The matching Page panel yields to the open Page presentation and shows **Page open in tab**. When the file tab is in File mode, the Page panel can show the Page as complementary context.

## Recover when a Page is unavailable

A restored file tab shows **Page unavailable** when Phials cannot resolve its Workspace Folder or indexed file identity. The tab remains open instead of attaching itself to another file.

Choose **Close Tab** to remove the unresolved tab. If the Workspace Folder moved outside Phials, [reconnect the Workspace Folder](../../organize-files-with-phials/use-workspace-folders/move-or-reconnect-a-workspace-folder.md), then open the file's Page again.

Shared file-tab pinning, closing, and restoration behavior is covered in [Open files in file tabs](../use-the-file-panel-and-file-tabs/open-files-in-file-tabs.md).
