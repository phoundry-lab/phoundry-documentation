---
title: "PluginDatabaseSchema"
description: "TypeScript signature and members for the PluginDatabaseSchema public SDK declaration."
ai_disclosure: true
order: 75
aliases:
  - references/PluginDatabaseSchema
---

# PluginDatabaseSchema

**Since Plugin API:** `1.0.0`

Database schema for a plugin

## Signature

```typescript
interface PluginDatabaseSchema {
    version: number;
    migrations?: readonly PluginDatabaseMigration[];
    tables: PluginTableDefinition[];
}
```

## Members

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `version` | `number` | yes | Monotonic schema version. |
| `migrations` | `readonly `[`PluginDatabaseMigration`](PluginDatabaseMigration.md)`[]` | no | Contiguous `N → N+1` migrations. |
| `tables` | [`PluginTableDefinition`](PluginTableDefinition.md)`[]` | yes | Tables owned by this plugin |
