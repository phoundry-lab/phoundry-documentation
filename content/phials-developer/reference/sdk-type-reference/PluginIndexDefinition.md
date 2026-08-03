---
title: "PluginIndexDefinition"
description: "TypeScript signature and members for the PluginIndexDefinition public SDK declaration."
ai_disclosure: true
order: 86
aliases:
  - references/PluginIndexDefinition
---

# PluginIndexDefinition

**Since Plugin API:** `1.0.0`

Index definition for a plugin database table

## Signature

```typescript
interface PluginIndexDefinition {
    name: string;
    columns: string[];
    unique?: boolean;
}
```

## Members

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `name` | `string` | yes | Index name (will be prefixed with table name) |
| `columns` | `string[]` | yes | Columns to index |
| `unique` | `boolean` | no | Whether this is a unique index |
