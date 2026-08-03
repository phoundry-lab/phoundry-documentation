---
title: "MetadataColumnPolicy"
description: "TypeScript signature and members for the MetadataColumnPolicy public SDK declaration."
ai_disclosure: true
order: 46
aliases:
  - references/MetadataColumnPolicy
---

# MetadataColumnPolicy

**Since Plugin API:** `1.0.0`

Policy for how a metadata provider contributes Details view columns.

## Signature

```typescript
interface MetadataColumnPolicy {
    showInColumnMenu?: boolean;
    columnWhitelist?: string[];
    autoVisible?: "never" | "when-any" | "when-dominant";
    defaultVisibleFields?: string[];
    excludeFromDominance?: boolean;
    requiresValueSampling?: boolean;
}
```

## Members

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `showInColumnMenu` | `boolean` | no | Whether this provider contributes fields to the Details column menu. Default true when schema exists. |
| `columnWhitelist` | `string[]` | no | If set, only these schema keys appear in the Details column menu (and auto-visible picks from this set). Omit for all schema fields. An empty array excludes the provider from column contributions. Does not override `showInColumnMenu` when that is false. |
| `autoVisible` | `"never" &#124; "when-any" &#124; "when-dominant"` | no | Whether columns can be auto-shown from file matching alone. Default "when-dominant". |
| `defaultVisibleFields` | `string[]` | no | Fields to show automatically when the provider qualifies. Defaults to the first few schema fields. |
| `excludeFromDominance` | `boolean` | no | Exclude this provider from dominance ratios. Useful for global/base providers. |
| `requiresValueSampling` | `boolean` | no | Matching by extension/category is not enough; values may require sampling. |
