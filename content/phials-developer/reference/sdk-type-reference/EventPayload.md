---
title: "EventPayload"
description: "TypeScript signature and members for the EventPayload public SDK declaration."
ai_disclosure: true
order: 23
aliases:
  - references/EventPayload
---

# EventPayload

**Since Plugin API:** `1.0.0`

Helper type to get event payload for a given event ID

## Signature

```typescript
type EventPayload<K extends keyof EventMap> = EventMap[K];
```

## Related declarations

- [`EventMap`](EventMap.md)
