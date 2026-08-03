---
title: "PluginDatabaseMigration"
description: "TypeScript signature and members for the PluginDatabaseMigration public SDK declaration."
ai_disclosure: true
order: 74
aliases:
  - references/PluginDatabaseMigration
---

# PluginDatabaseMigration

**Since Plugin API:** `1.0.0`

## Signature

```typescript
interface PluginDatabaseMigration {
    readonly from: number;
    readonly to: number;
    up(transaction: PluginDatabaseTransaction): Promise<void>;
}
```

## Members

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `from` | `number` | yes | - |
| `to` | `number` | yes | - |
| `up` | `(transaction: `[`PluginDatabaseTransaction`](PluginDatabaseTransaction.md)`) => Promise<void>` | yes | - |
