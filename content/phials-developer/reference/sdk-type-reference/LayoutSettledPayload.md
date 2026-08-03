---
title: "LayoutSettledPayload"
description: "TypeScript signature and members for the LayoutSettledPayload public SDK declaration."
ai_disclosure: true
order: 42
aliases:
  - references/LayoutSettledPayload
---

# LayoutSettledPayload

**Since Plugin API:** `1.0.0`

Semantic notification emitted after shell-owned geometry reaches the DOM.

## Signature

```typescript
interface LayoutSettledPayload {
    reasons: LayoutSettledReason[];
    affectedIds: string[];
    timestamp: number;
}
```

## Members

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `reasons` | [`LayoutSettledReason`](LayoutSettledReason.md)`[]` | yes | - |
| `affectedIds` | `string[]` | yes | - |
| `timestamp` | `number` | yes | - |
