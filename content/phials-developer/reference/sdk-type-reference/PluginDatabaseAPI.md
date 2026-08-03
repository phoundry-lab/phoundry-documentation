---
title: "PluginDatabaseAPI"
description: "TypeScript signature and members for the PluginDatabaseAPI public SDK declaration."
ai_disclosure: true
order: 73
aliases:
  - references/PluginDatabaseAPI
---

# PluginDatabaseAPI

**Since Plugin API:** `1.0.0`

SQL database API for plugin-owned tables

## Signature

```typescript
interface PluginDatabaseAPI {
    query<T = Record<string, unknown>>(sql: string, params?: unknown[]): Promise<T[]>;
    execute(sql: string, params?: unknown[]): Promise<DatabaseExecuteResult>;
    insert(table: string, data: Record<string, unknown>): Promise<number>;
    update(table: string, data: Record<string, unknown>, where: string, params?: unknown[]): Promise<number>;
    deleteFrom(table: string, where: string, params?: unknown[]): Promise<number>;
    selectAll<T = Record<string, unknown>>(table: string, where?: string, params?: unknown[]): Promise<T[]>;
    transaction<T>(callback: (transaction: PluginDatabaseTransaction) => Promise<T>): Promise<T>;
}
```

## Members

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `query` | `(sql: string, params?: unknown[]) => Promise<T[]>` | yes | Execute a raw SQL query and return results. Table names in the query should use the short name (without prefix). |
| `execute` | `(sql: string, params?: unknown[]) => Promise<`[`DatabaseExecuteResult`](DatabaseExecuteResult.md)`>` | yes | Execute a SQL statement (INSERT, UPDATE, DELETE, etc.) |
| `insert` | `(table: string, data: Record<string, unknown>) => Promise<number>` | yes | Insert a row into a table |
| `update` | `(table: string, data: Record<string, unknown>, where: string, params?: unknown[]) => Promise<number>` | yes | Update rows in a table |
| `deleteFrom` | `(table: string, where: string, params?: unknown[]) => Promise<number>` | yes | Delete rows from a table |
| `selectAll` | `(table: string, where?: string, params?: unknown[]) => Promise<T[]>` | yes | Select all rows from a table |
| `transaction` | `(callback: (transaction: `[`PluginDatabaseTransaction`](PluginDatabaseTransaction.md)`) => Promise<T>) => Promise<T>` | yes | Run dependent operations in one plugin-scoped transaction. |
