---
title: "EventSubscription"
description: "TypeScript signature and members for the EventSubscription public SDK declaration."
ai_disclosure: true
order: 25
aliases:
  - references/EventSubscription
---

# EventSubscription

**Since Plugin API:** `1.0.0`

Subscription handle for cleanup

## Signature

```typescript
interface EventSubscription {
    unsubscribe(): void;
}
```

## Members

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `unsubscribe` | `() => void` | yes | Unsubscribe from the event |
