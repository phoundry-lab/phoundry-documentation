---
title: "PluginTableDefinition"
description: "TypeScript signature and members for the PluginTableDefinition public SDK declaration."
ai_disclosure: true
order: 105
aliases:
  - references/PluginTableDefinition
---

# PluginTableDefinition

**Since Plugin API:** `1.0.0`

Table definition for a plugin database

## Signature

```typescript
interface PluginTableDefinition {
    name: string;
    columns: PluginColumnDefinition[];
    indexes?: PluginIndexDefinition[];
}
```

## Members

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `name` | `string` | yes | Table name (will be prefixed with plugin ID) |
| `columns` | [`PluginColumnDefinition`](PluginColumnDefinition.md)`[]` | yes | Column definitions |
| `indexes` | [`PluginIndexDefinition`](PluginIndexDefinition.md)`[]` | no | Optional index definitions |
