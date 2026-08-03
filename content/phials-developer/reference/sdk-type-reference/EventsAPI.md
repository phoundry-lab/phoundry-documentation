---
title: "EventsAPI"
description: "TypeScript signature and members for the EventsAPI public SDK declaration."
ai_disclosure: true
order: 24
aliases:
  - references/EventsAPI
---

# EventsAPI

**Since Plugin API:** `1.0.0`

Events API for pub/sub cross-plugin communication

## Signature

```typescript
interface EventsAPI {
    on<K extends keyof EventMap>(eventId: K, handler: EventHandler<EventMap[K]>): EventSubscription;
    once<K extends keyof EventMap>(eventId: K, handler: EventHandler<EventMap[K]>): EventSubscription;
    emit<K extends keyof EventMap>(eventId: K, payload: EventMap[K]): void;
    register(localId: string, description?: string): void;
}
```

## Members

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `on` | `(eventId: K, handler: `[`EventHandler`](EventHandler.md)`<`[`EventMap`](EventMap.md)`[K]>) => `[`EventSubscription`](EventSubscription.md) | yes | Subscribe to an event. |
| `once` | `(eventId: K, handler: `[`EventHandler`](EventHandler.md)`<`[`EventMap`](EventMap.md)`[K]>) => `[`EventSubscription`](EventSubscription.md) | yes | Subscribe to an event once (auto-unsubscribes after first trigger). |
| `emit` | `(eventId: K, payload: `[`EventMap`](EventMap.md)`[K]) => void` | yes | Emit an event to all subscribers. |
| `register` | `(localId: string, description?: string) => void` | yes | Register a new event type (namespaced to plugin). The full event ID will be ``{pluginId}`.`{localId}``. |
