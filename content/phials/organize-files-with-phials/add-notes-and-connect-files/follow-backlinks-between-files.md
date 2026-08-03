---
title: "Follow backlinks between files"
description: "Understand incoming Relation connections and why they have no user-facing Backlinks list in this release."
icon: phoundry-mono:vial
order: 3
ai_disclosure: true
---

# Follow backlinks between files

A **backlink** is an incoming Relation: it identifies a source file whose Relation property points to the file you are viewing. Backlinks reverse the perspective of the Relation without creating another connection.

Phials does not provide a Backlinks panel or another user-facing incoming-connection list in this release. You cannot open a target file and browse the files that relate to it, whether the sources are in the same Workspace Folder or another one.

Work from the source side instead:

1. Open the Workspace Folder that owns the Relation property.
2. Open a likely source file's Page or show the Relation in Details view.
3. Read or edit its selected target files.

This is not a complete reverse lookup when you do not already know the likely source. Phials has no user-facing procedure for that case in this release.

For creating and inspecting source-side connections, see [Connect files with Relations](./connect-files-with-relations.md).
