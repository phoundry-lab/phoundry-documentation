---
title: "DatabaseExecuteResult"
description: "TypeScript signature and members for the DatabaseExecuteResult public SDK declaration."
ai_disclosure: true
order: 15
aliases:
  - references/DatabaseExecuteResult
---

# DatabaseExecuteResult

**Since Plugin API:** `1.0.0`

Result from an execute operation

## Signature

```typescript
interface DatabaseExecuteResult {
    rowsAffected: number;
    lastInsertId?: number;
}
```

## Members

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `rowsAffected` | `number` | yes | Number of rows affected |
| `lastInsertId` | `number` | no | Last inserted row ID (if applicable) |
