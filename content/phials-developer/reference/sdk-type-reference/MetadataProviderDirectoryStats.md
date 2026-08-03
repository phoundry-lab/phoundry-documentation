---
title: "MetadataProviderDirectoryStats"
description: "TypeScript signature and members for the MetadataProviderDirectoryStats public SDK declaration."
ai_disclosure: true
order: 48
aliases:
  - references/MetadataProviderDirectoryStats
---

# MetadataProviderDirectoryStats

**Since Plugin API:** `1.0.0`

Per-provider stats from scanning directory file entries (no metadata extraction).

## Signature

```typescript
interface MetadataProviderDirectoryStats {
    providerId: string;
    matchedFiles: number;
    ratio: number;
    fields: MetadataSchemaField[];
    dominant: boolean;
    valueSampledFiles?: number;
    valueMatchedFiles?: number;
}
```

## Members

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `providerId` | `string` | yes | - |
| `matchedFiles` | `number` | yes | - |
| `ratio` | `number` | yes | - |
| `fields` | [`MetadataSchemaField`](MetadataSchemaField.md)`[]` | yes | - |
| `dominant` | `boolean` | yes | - |
| `valueSampledFiles` | `number` | no | Number of matched files inspected for sparse extracted values. |
| `valueMatchedFiles` | `number` | no | Number of inspected files containing at least one eligible value. |
