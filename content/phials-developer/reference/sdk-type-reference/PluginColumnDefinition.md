---
title: "PluginColumnDefinition"
description: "TypeScript signature and members for the PluginColumnDefinition public SDK declaration."
ai_disclosure: true
order: 71
aliases:
  - references/PluginColumnDefinition
---

# PluginColumnDefinition

**Since Plugin API:** `1.0.0`

Column definition for a plugin database table

## Signature

```typescript
interface PluginColumnDefinition {
    name: string;
    type: PluginColumnType;
    primaryKey?: boolean;
    autoIncrement?: boolean;
    notNull?: boolean;
    unique?: boolean;
    default?: unknown;
}
```

## Members

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `name` | `string` | yes | Column name |
| `type` | [`PluginColumnType`](PluginColumnType.md) | yes | SQLite data type |
| `primaryKey` | `boolean` | no | Whether this column is the primary key |
| `autoIncrement` | `boolean` | no | Whether this column auto-increments (only for INTEGER PRIMARY KEY) |
| `notNull` | `boolean` | no | Whether NULL values are disallowed |
| `unique` | `boolean` | no | Whether values must be unique |
| `default` | `unknown` | no | Default value for the column |
