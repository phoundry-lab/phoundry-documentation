---
title: "FileEntry"
description: "TypeScript signature and members for the FileEntry public SDK declaration."
ai_disclosure: true
order: 31
aliases:
  - references/FileEntry
---

# FileEntry

**Since Plugin API:** `1.0.0`

Core file entry interface - file-type agnostic
Represents a file or directory in the filesystem

## Signature

```typescript
interface FileEntry {
    name: string;
    path: string;
    icon?: string;
    is_file: boolean;
    is_dir: boolean;
    is_vial: boolean;
    isChildVial?: boolean;
    is_symlink?: boolean;
    symlink_target?: string | null;
    symlink_broken?: boolean;
    size: number;
    created?: number | null;
    modified?: number | null;
    exif_data: Record<string, string> | null;
    mimeType?: string;
    category?: FileCategory;
}
```

## Members

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `name` | `string` | yes | - |
| `path` | `string` | yes | - |
| `icon` | `string` | no | Host-resolved Iconify glyph. Public directory-listing APIs populate this so plugins share Phials' canonical file and folder icon policy. |
| `is_file` | `boolean` | yes | - |
| `is_dir` | `boolean` | yes | - |
| `is_vial` | `boolean` | yes | - |
| `isChildVial` | `boolean` | no | Nested vial folder when listing inside a parent vial |
| `is_symlink` | `boolean` | no | Listing node is a symlink or Windows directory junction |
| `symlink_target` | `string &#124; null` | no | Resolved absolute target when healthy; stored link text when broken |
| `symlink_broken` | `boolean` | no | - |
| `size` | `number` | yes | - |
| `created` | `number &#124; null` | no | - |
| `modified` | `number &#124; null` | no | - |
| `exif_data` | `Record<string, string> &#124; null` | yes | Raw metadata from filesystem/EXIF - parsed lazily by plugins |
| `mimeType` | `string` | no | Computed lazily based on extension |
| `category` | [`FileCategory`](FileCategory.md) | no | Computed lazily based on extension |
