---
title: "PluginDatabaseTransaction"
description: "TypeScript signature and members for the PluginDatabaseTransaction public SDK declaration."
ai_disclosure: true
order: 77
aliases:
  - references/PluginDatabaseTransaction
---

# PluginDatabaseTransaction

**Since Plugin API:** `1.0.0`

## Signature

```typescript
interface PluginDatabaseTransaction {
    readonly schema: PluginDatabaseSchemaOperations;
    query<T = Record<string, PluginDatabaseValue>>(table: string, sql: string, params?: readonly PluginDatabaseValue[]): Promise<readonly T[]>;
    execute(table: string, sql: string, params?: readonly PluginDatabaseValue[]): Promise<DatabaseExecuteResult>;
}
```

## Members

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `schema` | [`PluginDatabaseSchemaOperations`](PluginDatabaseSchemaOperations.md) | yes | - |
| `query` | `(table: string, sql: string, params?: readonly PluginDatabaseValue[]) => Promise<readonly T[]>` | yes | - |
| `execute` | `(table: string, sql: string, params?: readonly PluginDatabaseValue[]) => Promise<`[`DatabaseExecuteResult`](DatabaseExecuteResult.md)`>` | yes | - |
