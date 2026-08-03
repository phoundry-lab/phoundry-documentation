---
title: "FileMetadata"
description: "TypeScript signature and members for the FileMetadata public SDK declaration."
ai_disclosure: true
order: 33
aliases:
  - references/FileMetadata
---

# FileMetadata

**Since Plugin API:** `1.0.0`

File metadata combining raw and extracted data

## Signature

```typescript
interface FileMetadata {
    raw: RawMetadata;
    extracted: ExtractedMetadata;
}
```

## Members

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `raw` | [`RawMetadata`](RawMetadata.md) | yes | - |
| `extracted` | [`ExtractedMetadata`](ExtractedMetadata.md) | yes | - |
