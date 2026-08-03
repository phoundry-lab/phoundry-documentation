---
title: "Event delivery and cleanup reference"
description: "Specifies listener lifetime, one-shot behavior, deactivation cleanup, asynchronous handler behavior, and error isolation."
ai_disclosure: true
order: 3
---

# Event delivery and cleanup reference

[EventsAPI](../../reference/sdk-type-reference/EventsAPI.md) provides in-process publication and subscription for the current
renderer:

```ts
interface EventsAPI {
  on<K extends keyof EventMap>(
    eventId: K,
    handler: EventHandler<EventMap[K]>,
  ): EventSubscription;

  once<K extends keyof EventMap>(
    eventId: K,
    handler: EventHandler<EventMap[K]>,
  ): EventSubscription;

  emit<K extends keyof EventMap>(
    eventId: K,
    payload: EventMap[K],
  ): void;

  register(localId: string, description?: string): void;
}
```

No plugin permission is required. Event access remains limited by the active
plugin lifecycle, public event catalog, namespace ownership, and the Plugin API
version containing the contract.

## Subscription lifetimes

| Operation | Lifetime |
| --- | --- |
| `on(eventId, handler)` | From successful subscription until explicit unsubscribe or plugin deactivation |
| `once(eventId, handler)` | Until explicit unsubscribe, plugin deactivation, or the first matching emission begins |
| `subscription.unsubscribe()` | Removes that exact subscription; repeated calls are safe |
| Plugin deactivation | Removes every remaining subscription created through that plugin's `api.events` |

Subscriptions receive only future emissions. There is no current-value
delivery, replay, persistence, or backlog.

The lifetime belongs to the plugin unless code explicitly shortens it. Closing
a panel, changing a watched path, or cancelling a workflow does not deactivate
the whole plugin, so the owning feature must unsubscribe at that narrower
boundary.

Deactivation prevents new handler starts and invalidates the deactivated
plugin's event API scope. It does not cancel asynchronous handler work that
already started. The handler must own cancellation or stale-result protection.

## One-shot behavior

A `once` subscription is consumed by the first emission of its event ID,
regardless of payload contents or handler result.

Phials removes the subscription before invoking the handler. Therefore:

- a nested emission from that handler cannot invoke it again;
- a synchronous throw does not restore it;
- an asynchronous rejection does not restore it;
- a condition inside the handler cannot defer consumption.

Use `on` and explicitly unsubscribe after a condition succeeds when the first
matching payload, rather than the first emission, matters.

## Dispatch algorithm

For one accepted emission, Phials performs this deterministic sequence:

1. Validate the emitter's ownership and event registration.
2. Capture the event's active subscriptions in subscription order.
3. Remove every captured `once` subscription.
4. Invoke each captured handler once with the event payload.
5. Isolate and report synchronous throws and asynchronous rejections.
6. Return from `emit` after all handlers have been invoked, without waiting for
   returned promises.

A listener added during step 4 does not receive the in-progress emission. A
listener removed during dispatch does not receive later emissions; the current
snapshot is already fixed. These rules keep subscription mutation from changing
which handlers the current emission represents.

Synchronous handler bodies begin in subscription order. An async handler runs
synchronously until its first suspension, then the next handler begins without
waiting. Promise completion order is unconstrained.

Subscription order is deterministic for one fixed active set, but it is not a
coordination contract between plugins. Activation order can differ across
sessions. Correctness must not depend on another listener running first.

A synchronous nested `emit` starts a complete nested dispatch immediately. The
nested dispatch finishes its synchronous handler starts before the outer
handler resumes after that call.

## Asynchronous handlers

`EventHandler<T>` can return `void` or `Promise<void>`. `emit` always returns
`void`.

Consequences:

- the emitter cannot observe handler completion or failure;
- later code in the emitter runs before async handlers necessarily finish;
- a later emission can start while work from an earlier emission is pending;
- Phials does not serialize, coalesce, retry, or apply backpressure to plugin
  handlers;
- unsubscribe and deactivation do not abort in-flight promises.

The handler owns any FIFO queue, latest-result guard, coalescing policy,
`AbortController`, or other concurrency mechanism its feature needs.

Events are unsuitable when the caller requires a return value, acknowledgement,
transaction, or failure result. Use a direct typed operation for that
relationship.

## Error isolation

One handler failure does not prevent the remaining handlers from starting.

Phials catches synchronous throws and observes returned promise rejections. It
reports the event ID and owning plugin identity through diagnostics without
including sensitive payload content by default. Errors do not propagate back
through `emit`.

Error isolation protects dispatch, not feature correctness. A handler must
catch expected operational failures, decide whether its own state is stale or
recoverable, and communicate a user-visible problem when appropriate.

## Payload delivery

Phials validates the payload as finite plain data, clones it once, recursively
freezes that clone, and passes the same immutable object to every captured
handler. Mutation attempts cannot alter another listener's view or app state.
Functions, live handles, class instances, cycles, `NaN`, and infinities are
rejected before delivery.

Delivery is local to one renderer session. No guarantee is made across:

- separate Phials windows;
- app restarts;
- a listener that subscribes after emission;
- plugin disable and re-enable;
- plugin update or reload boundaries.

Use plugin storage or a direct state read for durable or current state. Use an
event to invalidate that state after a completed change.

## Deactivation and reload

During deactivation, Phials removes plugin-scoped subscriptions even when the
plugin's `onDeactivate()` hook fails. Plugin-owned custom event registrations
are removed at the same boundary.

Reload follows the normal lifecycle:

1. old-code subscriptions remain active through `onBeforeReload()`;
2. deactivation removes them;
3. replacement activation registers new event definitions and subscriptions;
4. no old subscription receives events after deactivation commits.

An event emitted while no replacement listener exists is not buffered for
`onAfterReload()`. Transient state that must cross reload belongs in the
explicit reload-state contract, not the event bus.

For ownership patterns and async concurrency examples, see
[Manage subscriptions and asynchronous handlers](../../work-with-phials/respond-to-events/manage-subscriptions-and-asynchronous-handlers.md).
