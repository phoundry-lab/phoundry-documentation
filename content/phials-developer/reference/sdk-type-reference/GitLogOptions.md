---
title: "GitLogOptions"
description: "TypeScript signature and members for the GitLogOptions public SDK declaration."
ai_disclosure: true
order: 43
aliases:
  - references/GitLogOptions
---

# GitLogOptions

**Since Plugin API:** `1.0.0`

## Signature

```typescript
interface GitLogOptions {
    readonly limit?: number;
    readonly skip?: number;
}
```

## Members

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `limit` | `number` | no | Defaults to 50; maximum 500. |
| `skip` | `number` | no | Defaults to 0; maximum 1,000,000. |
