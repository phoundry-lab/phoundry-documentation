---
title: "Edit spreadsheets"
description: "Edit spreadsheet cells, headers, rows, and columns while preserving unsaved work across workbook sheets."
icon: phoundry-mono:eye
order: 4
ai_disclosure: true
---

# Edit spreadsheets

Edit a flat spreadsheet or an existing workbook as a data grid. Changes remain in memory until you save the complete file.

## Edit grid data

1. Select the spreadsheet in the File panel, or open it in a file tab.
2. Choose a body cell and edit its value. Leave the cell to commit the edit to the in-memory grid.
3. Choose a column header to rename it.
4. Use **Add Column** in the header row or **Add New Row** at the end of the grid when you need more cells.
5. Choose **Save** to write the file.

The first row of each sheet is its header row. A CSV or TSV has one grid. A workbook can contain several named sheets.

## Work across workbook sheets

For a workbook with more than one sheet, choose a name in the sheet strip to change the active sheet. Switching sheets does not save or discard anything. Edits on every visited sheet contribute to one workbook-wide unsaved state.

**Save** writes the whole workbook, including edits retained on sheets that are not active. A workbook with one sheet omits the sheet strip.

Phials does not add, rename, delete, duplicate, reorder, hide, or unhide workbook sheets. Use a dedicated spreadsheet app for those operations.

## Save or revert the workbook

Choose **Save** when you are ready to write every in-memory sheet change to the file. A save failure leaves the workbook unsaved and shows the error, so correct the underlying problem and retry.

Before choosing **Revert**, make sure no unsaved sheet contains work you need. Revert reloads the file from disk and discards unsaved changes from the entire workbook, not only the active sheet.

Phials does not provide workbook undo and redo. Revert is the only whole-file rollback inside the spreadsheet editor.

## Protect workbook features and external changes

The spreadsheet editor is a data-grid editor. It does not provide formula, formatting, chart, macro, or other workbook-design controls. When you save, Phials rebuilds each visited sheet from its displayed headers and values, so use a dedicated spreadsheet app when those features must be preserved.

The open spreadsheet session does not detect external file changes. Saving can replace changes made in another app. If the disk version changed, copy any unsaved Phials values you need, choose **Revert** to reload the disk version, then reapply those values. Phials cannot merge the two versions.

For supported formats and read-only spreadsheet or database behavior, see [Browse spreadsheets and databases](../view-and-inspect-files/browse-spreadsheets-and-databases.md) and [File viewing and editing support](../../reference/file-format-and-metadata-support/file-viewing-and-editing-support.md).
