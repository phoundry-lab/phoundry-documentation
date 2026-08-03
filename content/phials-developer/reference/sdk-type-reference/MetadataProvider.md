---
title: "MetadataProvider"
description: "TypeScript signature and members for the MetadataProvider public SDK declaration."
ai_disclosure: true
order: 47
aliases:
  - references/MetadataProvider
---

# MetadataProvider

**Since Plugin API:** `1.0.0`

Metadata provider - extracts structured metadata from files

## Signature

```typescript
interface MetadataProvider {
    type: "metadata";
    id: string;
    name: string;
    priority?: number;
    extensions?: string[];
    mimeTypes?: string[];
    categories?: FileCategory[];
    canHandle?: (file: FileEntry) => boolean;
    extract: (file: FileEntry, rawMeta: RawMetadata, api: MetadataAPI) => Promise<ExtractedMetadata> | ExtractedMetadata;
    schema?: MetadataSchema;
    columnPolicy?: MetadataColumnPolicy;
    getFilterValueOptions?: (fieldKey: string, api: MetadataAPI) => FilterValueOption[] | Promise<FilterValueOption[]>;
}
```

## Members

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `type` | `"metadata"` | yes | - |
| `id` | `string` | yes | - |
| `name` | `string` | yes | - |
| `priority` | `number` | no | Precedence when multiple providers match the same file (default 0). Higher values sort first in registry lookups and extraction order; also breaks ties for directory metadata profiles and auto-visible Details columns. |
| `extensions` | `string[]` | no | File matching criteria |
| `mimeTypes` | `string[]` | no | - |
| `categories` | [`FileCategory`](FileCategory.md)`[]` | no | - |
| `canHandle` | `(file: `[`FileEntry`](FileEntry.md)`) => boolean` | no | - |
| `extract` | `(file: `[`FileEntry`](FileEntry.md)`, rawMeta: `[`RawMetadata`](RawMetadata.md)`, api: `[`MetadataAPI`](MetadataAPI.md)`) => Promise<`[`ExtractedMetadata`](ExtractedMetadata.md)`> &#124; `[`ExtractedMetadata`](ExtractedMetadata.md) | yes | Extract metadata from file |
| `schema` | [`MetadataSchema`](MetadataSchema.md) | no | Schema for extracted metadata (for UI rendering) |
| `columnPolicy` | [`MetadataColumnPolicy`](MetadataColumnPolicy.md) | no | How this provider appears in Details column picker and auto-visible heuristics |
| `getFilterValueOptions` | `(fieldKey: string, api: `[`MetadataAPI`](MetadataAPI.md)`) => `[`FilterValueOption`](FilterValueOption.md)`[] &#124; Promise<`[`FilterValueOption`](FilterValueOption.md)`[]>` | no | Optional override for filter dropdown options on `dynamic-enum` schema fields. When absent or empty, Phials falls back to distinct-value scan over the listing. |
