---
title: "DirectoryMetadataProfile"
description: "TypeScript signature and members for the DirectoryMetadataProfile public SDK declaration."
ai_disclosure: true
order: 18
aliases:
  - references/DirectoryMetadataProfile
---

# DirectoryMetadataProfile

**Since Plugin API:** `1.0.0`

Aggregated column-relevant metadata coverage for a directory listing.

## Signature

```typescript
interface DirectoryMetadataProfile {
    path: string;
    fileCount: number;
    sampledCount: number;
    providers: MetadataProviderDirectoryStats[];
}
```

## Members

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `path` | `string` | yes | - |
| `fileCount` | `number` | yes | - |
| `sampledCount` | `number` | yes | - |
| `providers` | [`MetadataProviderDirectoryStats`](MetadataProviderDirectoryStats.md)`[]` | yes | - |
