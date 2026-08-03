---
title: "Respond to events"
description: "Listen for Phials events, define plugin events, and manage handler lifetimes safely."
ai_disclosure: true
---

# Respond to events

Use `api.events` to react after Phials or another plugin publishes a supported fact. Events are useful for loose coordination: a file was saved, a pane navigated, a plugin-owned review completed, or another observable state changed.

Events are not commands. Emitting one does not ask another listener to do work, return a result, or confirm success.

## What the Events API provides

```ts
api.events.on(eventId, handler);
api.events.once(eventId, handler);
api.events.emit(eventId, payload);
api.events.register(localId, description);
```

[EventMap](../../reference/sdk-type-reference/EventMap.md) connects each event ID to its payload type. TypeScript checks the ID, handler payload, and emitted payload against the synchronized Public SDK.

No plugin permission is required for the Events API. Event availability can still depend on the Phials and Plugin API versions declared by the plugin.

## Choose the event owner

Phials owns event IDs beginning with `core.`. Subscribe only to entries in the [Phials event catalog](../../reference/events-reference/phials-event-catalog.md); an internal event name observed in source or logs is not a public contract.

A plugin event begins with the emitting plugin's complete ID:

```text
acme.review-tools.review.completed
```

The owner defines the payload, registers the local part, emits the full ID, and maintains its compatibility. Other plugin code can subscribe after including the same public type declaration.

## Work through the tasks

1. [Listen for Phials events](listen-for-phials-events.md)
2. [Define and emit plugin events](define-and-emit-plugin-events.md)
3. [Manage subscriptions and asynchronous handlers](manage-subscriptions-and-asynchronous-handlers.md)

## Use events for notifications, not hidden coupling

Good event:

```text
acme.review-tools.review.completed
```

It reports a completed fact. Zero, one, or several listeners can react independently.

Poor event:

```text
acme.review-tools.request-current-review
```

It implies that one listener must receive a request and send a response. Use a typed API, plugin-owned state, or a direct function for that workflow.

## Delivery model

When an event is emitted:

- matching handlers are invoked in the current renderer session
- one handler does not receive another handler's return value
- `emit` returns immediately and does not await asynchronous handlers
- a failing handler does not stop other listeners
- repeated emissions can overlap asynchronous work
- plugin-scoped subscriptions are removed during deactivation

Your handler still owns its error recovery, concurrency policy, and cancellation of in-flight work.

## Keep payloads durable

Prefer payloads made from strings, numbers, booleans, `null`, and plain arrays or objects. Include stable identity such as a path, pane ID, or plugin-owned record ID rather than a component, callback, or mutable service object.

The task guides explain the usage patterns. Use the [Events reference](../../reference/events-reference/index.md) for the exhaustive event catalog, naming rules, and delivery guarantees.

## SDK reference

- [EventsAPI](../../reference/sdk-type-reference/EventsAPI.md)
- [EventMap](../../reference/sdk-type-reference/EventMap.md)
- [EventSubscription](../../reference/sdk-type-reference/EventSubscription.md)
- [EventHandler](../../reference/sdk-type-reference/EventHandler.md)
