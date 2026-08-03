---
title: "Browse spreadsheets and databases"
description: "Browse delimited files, workbook sheets, and SQLite tables without losing sight of each format's limits."
icon: phoundry-mono:eye
order: 4
aliases:
  - previews/database
  - previews/spreadsheet
ai_disclosure: true
---

# Browse spreadsheets and databases

Phials presents tabular files as data rather than plain source text. Spreadsheet files use a grid, while SQLite databases use a read-only table browser.

## Browse a spreadsheet

Select the file for a quick view in the **File panel**, or open it in a **file tab** when you need more room.

CSV and TSV files are flat tables, so they do not have sheet tabs. Workbook formats can contain multiple sheets. When a workbook has more than one sheet, choose a sheet name along the bottom of the grid to switch between them.

Phials loads the first 100 rows into the grid. Choose **Load 100 More** to extend the visible data. This keeps the table responsive while you inspect a larger sheet. Long cell values may be clipped by the grid; select or edit the cell in a supported editing surface when you need its complete value.

If Phials cannot parse the file, the surface shows **Failed to load file**. Common causes include a corrupt workbook, a misleading extension, an unsupported workbook feature, or a file that is still being written by another application.

The spreadsheet surface can edit supported formats, but those procedures and save behavior belong in [Edit spreadsheets](../edit-files-in-phials/edit-spreadsheets.md).

## Browse a SQLite database

SQLite database files open in a read-only browser. Use the table selector to choose a user table. Phials reads 100 rows at a time; use **Previous** and **Next** to move between result pages.

The grid presents ordinary values directly. SQL `NULL` values remain visibly distinct, and binary fields appear as a BLOB summary with their byte count rather than being decoded as text.

This surface is for inspection. It does not edit records, change the schema, or provide an arbitrary SQL query console. Open the database in a dedicated SQLite tool if you need those operations.

If no user tables are available, the browser reports that state instead of showing an empty, unlabeled grid. **Failed to open database** usually means the file is not a valid SQLite database, is damaged, or cannot be read. **Failed to query table** means the file opened but the selected table could not be read.

## Understand large-file behavior

The 100-row controls limit how much data Phials renders at once; they do not necessarily mean that only 100 rows were read or parsed from the source. Very large workbooks can still take time to load because workbook decoding happens before individual sheets and rows are presented.

For the complete list of spreadsheet and database formats, see [File viewing and editing support](../../reference/file-format-and-metadata-support/file-viewing-and-editing-support.md). Format-specific metadata coverage is listed in [Metadata support by file type](../../reference/file-format-and-metadata-support/metadata-support-by-file-type.md).
