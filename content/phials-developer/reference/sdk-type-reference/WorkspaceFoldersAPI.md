---
title: "WorkspaceFoldersAPI"
description: "TypeScript signature and members for the WorkspaceFoldersAPI public SDK declaration."
ai_disclosure: true
order: 147
aliases:
  - references/WorkspaceFoldersAPI
---

# WorkspaceFoldersAPI

**Since Plugin API:** `1.0.0`

## Signature

```typescript
interface WorkspaceFoldersAPI {
    isWorkspaceFolder(path: string): Promise<boolean>;
    getSchema(workspaceFolderIdOrPath: string): Promise<WorkspaceFolderSchema>;
    getPropertyValue(file: WorkspaceFolderFileRef, propertyId: string): Promise<WorkspaceFolderPropertyValue | null>;
    setPropertyValue(file: WorkspaceFolderFileRef, propertyId: string, value: WorkspaceFolderPropertyValue | null): Promise<void>;
    setPropertyValues(file: WorkspaceFolderFileRef, values: readonly WorkspaceFolderPropertyWrite[]): Promise<void>;
    getTags(file: WorkspaceFolderFileRef): Promise<readonly string[]>;
    setTags(file: WorkspaceFolderFileRef, tags: readonly string[]): Promise<void>;
    getRating(file: WorkspaceFolderFileRef): Promise<number | null>;
    setRating(file: WorkspaceFolderFileRef, rating: number | null): Promise<void>;
    listKnown(): Promise<readonly KnownWorkspaceFolder[]>;
    openPage(file: WorkspaceFolderFileRef, options?: {
        focusEditor?: boolean;
        sourcePaneId?: string;
    }): Promise<void>;
}
```

## Members

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `isWorkspaceFolder` | `(path: string) => Promise<boolean>` | yes | - |
| `getSchema` | `(workspaceFolderIdOrPath: string) => Promise<`[`WorkspaceFolderSchema`](WorkspaceFolderSchema.md)`>` | yes | - |
| `getPropertyValue` | `(file: `[`WorkspaceFolderFileRef`](WorkspaceFolderFileRef.md)`, propertyId: string) => Promise<`[`WorkspaceFolderPropertyValue`](WorkspaceFolderPropertyValue.md)` &#124; null>` | yes | - |
| `setPropertyValue` | `(file: `[`WorkspaceFolderFileRef`](WorkspaceFolderFileRef.md)`, propertyId: string, value: `[`WorkspaceFolderPropertyValue`](WorkspaceFolderPropertyValue.md)` &#124; null) => Promise<void>` | yes | - |
| `setPropertyValues` | `(file: `[`WorkspaceFolderFileRef`](WorkspaceFolderFileRef.md)`, values: readonly `[`WorkspaceFolderPropertyWrite`](WorkspaceFolderPropertyWrite.md)`[]) => Promise<void>` | yes | - |
| `getTags` | `(file: `[`WorkspaceFolderFileRef`](WorkspaceFolderFileRef.md)`) => Promise<readonly string[]>` | yes | - |
| `setTags` | `(file: `[`WorkspaceFolderFileRef`](WorkspaceFolderFileRef.md)`, tags: readonly string[]) => Promise<void>` | yes | - |
| `getRating` | `(file: `[`WorkspaceFolderFileRef`](WorkspaceFolderFileRef.md)`) => Promise<number &#124; null>` | yes | - |
| `setRating` | `(file: `[`WorkspaceFolderFileRef`](WorkspaceFolderFileRef.md)`, rating: number &#124; null) => Promise<void>` | yes | - |
| `listKnown` | `() => Promise<readonly `[`KnownWorkspaceFolder`](KnownWorkspaceFolder.md)`[]>` | yes | - |
| `openPage` | `(file: `[`WorkspaceFolderFileRef`](WorkspaceFolderFileRef.md)`, options?: { … }) => Promise<void>` | yes | - |
