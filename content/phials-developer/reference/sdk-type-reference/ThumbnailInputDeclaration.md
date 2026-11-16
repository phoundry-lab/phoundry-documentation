---
title: "ThumbnailInputDeclaration"
description: "TypeScript signature and members for the ThumbnailInputDeclaration public SDK declaration."
ai_disclosure: true
order: 135
aliases:
  - references/ThumbnailInputDeclaration
---

# ThumbnailInputDeclaration

**Since Plugin API:** `2.0.0`

## Signature

```typescript
type ThumbnailInputDeclaration = {
    readonly type: "file";
    readonly path: string;
    readonly revision?: string;
} | {
    readonly type: "directory";
    readonly path: string;
    readonly selection?: ThumbnailDirectorySelection;
};
```

## Related declarations

- [`ThumbnailDirectorySelection`](ThumbnailDirectorySelection.md)
