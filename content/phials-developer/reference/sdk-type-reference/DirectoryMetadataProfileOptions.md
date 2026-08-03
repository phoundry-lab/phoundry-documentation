---
title: "DirectoryMetadataProfileOptions"
description: "TypeScript signature and members for the DirectoryMetadataProfileOptions public SDK declaration."
ai_disclosure: true
order: 19
aliases:
  - references/DirectoryMetadataProfileOptions
---

# DirectoryMetadataProfileOptions

**Since Plugin API:** `1.0.0`

Options for computing a directory metadata profile (cheap matching only).

## Signature

```typescript
interface DirectoryMetadataProfileOptions {
    path?: string;
    maxSample?: number;
    dominanceThreshold?: number;
    minFilesForDominance?: number;
}
```

## Members

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `path` | `string` | no | Directory path this profile describes (for diagnostics / persistence). |
| `maxSample` | `number` | no | Cap files scanned; default 1000. Uses the first N files after filtering. |
| `dominanceThreshold` | `number` | no | Minimum share of sampled files that must match a provider for `dominant`; default 0.9. |
| `minFilesForDominance` | `number` | no | Minimum total file count in the directory before any provider can be `dominant`; default 5. |
