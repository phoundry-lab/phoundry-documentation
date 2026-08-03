---
title: "FileMatchAPI"
description: "TypeScript signature and members for the FileMatchAPI public SDK declaration."
ai_disclosure: true
order: 32
aliases:
  - references/FileMatchAPI
---

# FileMatchAPI

**Since Plugin API:** `1.0.0`

File matching API for canHandle callbacks

## Signature

```typescript
interface FileMatchAPI {
    matchesExtension(file: FileEntry, extensions: string[]): boolean;
    matchesMime(file: FileEntry, mimeTypes: string[]): boolean;
    matchesCategory(file: FileEntry, categories: FileCategory[]): boolean;
}
```

## Members

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `matchesExtension` | `(file: `[`FileEntry`](FileEntry.md)`, extensions: string[]) => boolean` | yes | - |
| `matchesMime` | `(file: `[`FileEntry`](FileEntry.md)`, mimeTypes: string[]) => boolean` | yes | - |
| `matchesCategory` | `(file: `[`FileEntry`](FileEntry.md)`, categories: `[`FileCategory`](FileCategory.md)`[]) => boolean` | yes | - |
