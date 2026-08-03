---
title: "ViewColumnDefinition"
description: "TypeScript signature and members for the ViewColumnDefinition public SDK declaration."
ai_disclosure: true
order: 139
aliases:
  - references/ViewColumnDefinition
---

# ViewColumnDefinition

**Since Plugin API:** `1.0.0`

Column definition for views that support columns

## Signature

```typescript
interface ViewColumnDefinition {
    id: string;
    label: string;
    width: number;
    minWidth?: number;
    sortable?: boolean;
    getValue: (file: FileEntry) => string | number | null;
}
```

## Members

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `string` | yes | - |
| `label` | `string` | yes | - |
| `width` | `number` | yes | - |
| `minWidth` | `number` | no | - |
| `sortable` | `boolean` | no | - |
| `getValue` | `(file: `[`FileEntry`](FileEntry.md)`) => string &#124; number &#124; null` | yes | - |
