---
title: "ThumbnailProviderProps"
description: "TypeScript signature and members for the ThumbnailProviderProps public SDK declaration."
ai_disclosure: true
order: 129
aliases:
  - references/ThumbnailProviderProps
---

# ThumbnailProviderProps

**Since Plugin API:** `1.0.0`

Props passed to thumbnail components

## Signature

```typescript
interface ThumbnailProviderProps {
    file: FileEntry;
    api: PreviewAPI;
    size: number;
    generatedSize?: number;
    quality?: number;
}
```

## Members

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `file` | [`FileEntry`](FileEntry.md) | yes | - |
| `api` | [`PreviewAPI`](PreviewAPI.md) | yes | - |
| `size` | `number` | yes | - |
| `generatedSize` | `number` | no | - |
| `quality` | `number` | no | - |
