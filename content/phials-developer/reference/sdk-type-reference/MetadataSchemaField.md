---
title: "MetadataSchemaField"
description: "TypeScript signature and members for the MetadataSchemaField public SDK declaration."
ai_disclosure: true
order: 50
aliases:
  - references/MetadataSchemaField
---

# MetadataSchemaField

**Since Plugin API:** `1.0.0`

Schema field for metadata display

## Signature

```typescript
interface MetadataSchemaField {
    key: string;
    label: string;
    type: "string" | "number" | "date" | "boolean" | "array" | "dynamic-enum";
    format?: "html";
    rawKey?: string;
    icon?: string;
}
```

## Members

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `key` | `string` | yes | - |
| `label` | `string` | yes | - |
| `type` | `"string" &#124; "number" &#124; "date" &#124; "boolean" &#124; "array" &#124; "dynamic-enum"` | yes | - |
| `format` | `"html"` | no | Optional hint for how extracted values should be presented in schema-driven UI (Details columns, preview Metadata, thumbnail captions), paired with `type`. v1 implements `"html"` only (sanitized render from `key`); requires `rawKey`. On formatted fields, `type` describes the raw value semantics for sort/filter. |
| `rawKey` | `string` | no | Extracted key for sort, filter, and logic (not a separate schema row). Required when `format: "html"`. |
| `icon` | `string` | no | Optional Iconify id for column header / property list chrome |
