---
title: "PluginDatabaseSchemaOperations"
description: "TypeScript signature and members for the PluginDatabaseSchemaOperations public SDK declaration."
ai_disclosure: true
order: 76
aliases:
  - references/PluginDatabaseSchemaOperations
---

# PluginDatabaseSchemaOperations

**Since Plugin API:** `1.0.0`

## Signature

```typescript
interface PluginDatabaseSchemaOperations {
    createTable(table: PluginTableDefinition): Promise<void>;
    addColumn(table: string, column: PluginColumnDefinition): Promise<void>;
    renameColumn(table: string, from: string, to: string): Promise<void>;
    dropColumn(table: string, column: string): Promise<void>;
    createIndex(table: string, index: PluginIndexDefinition): Promise<void>;
    dropIndex(table: string, index: string): Promise<void>;
}
```

## Members

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `createTable` | `(table: `[`PluginTableDefinition`](PluginTableDefinition.md)`) => Promise<void>` | yes | - |
| `addColumn` | `(table: string, column: `[`PluginColumnDefinition`](PluginColumnDefinition.md)`) => Promise<void>` | yes | - |
| `renameColumn` | `(table: string, from: string, to: string) => Promise<void>` | yes | - |
| `dropColumn` | `(table: string, column: string) => Promise<void>` | yes | - |
| `createIndex` | `(table: string, index: `[`PluginIndexDefinition`](PluginIndexDefinition.md)`) => Promise<void>` | yes | - |
| `dropIndex` | `(table: string, index: string) => Promise<void>` | yes | - |
