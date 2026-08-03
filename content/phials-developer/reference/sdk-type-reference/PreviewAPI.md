---
title: "PreviewAPI"
description: "TypeScript signature and members for the PreviewAPI public SDK declaration."
ai_disclosure: true
order: 108
aliases:
  - references/PreviewAPI
---

# PreviewAPI

**Since Plugin API:** `1.0.0`

Preview API - extended API for preview providers

**extends** [`PluginAPI`](PluginAPI.md)

## Signature

```typescript
interface PreviewAPI extends PluginAPI {
    getMetadata(file: FileEntry): Promise<FileMetadata>;
    openFullscreen(file: FileEntry): void;
    navigateTo(path: string): void;
}
```

## Members

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `getMetadata` | `(file: `[`FileEntry`](FileEntry.md)`) => Promise<`[`FileMetadata`](FileMetadata.md)`>` | yes | Get metadata for a file |
| `openFullscreen` | `(file: `[`FileEntry`](FileEntry.md)`) => void` | yes | Open fullscreen preview for a file |
| `navigateTo` | `(path: string) => void` | yes | Navigate to a path |
