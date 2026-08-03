---
title: "Define and emit plugin events"
description: "Namespaces and registers plugin events, types payloads through declaration merging, and emits them for cooperating plugin code."
ai_disclosure: true
order: 2
---

# Define and emit plugin events

Define a plugin event when independently owned plugin features need to observe the same completed fact. Namespace the event to the owning plugin, add its payload to [PluginEvents](../../reference/sdk-type-reference/PluginEvents.md), register it during activation, and emit the full ID.

Do not emit a `core.*` event. Phials owns core event meaning and delivery.

## Name the event

Start with the complete plugin ID and add a short past-tense fact:

```text
acme.review-tools.review.completed
```

The plugin ID prevents collisions. The fact-oriented suffix communicates that the work already happened.

Prefer:

- `acme.review-tools.review.completed`
- `acme.review-tools.queue.changed`
- `acme.review-tools.export.failed`

Avoid:

- `review-done` — no owner namespace
- `core.review.completed` — `core.` belongs to Phials
- `acme.review-tools.run-review` — sounds like a command
- `acme.review-tools.get-review` — sounds like request-response

See [Plugin event naming and payload reference](../../reference/events-reference/plugin-event-naming-and-payload-reference.md).

## Merge the payload into `PluginEvents`

Create an ambient declaration in your plugin source:

```ts
// src/plugin-events.d.ts
interface PluginEvents {
  "acme.review-tools.review.completed": {
    path: string;
    reviewId: string;
    completedAt: number;
  };
}
```

The synchronized SDK declares an empty [PluginEvents](../../reference/sdk-type-reference/PluginEvents.md) interface specifically for declaration merging. [EventMap](../../reference/sdk-type-reference/EventMap.md) combines it with the supported Phials events, so the new ID becomes available to `on`, `once`, and `emit`.

Keep the declaration in the shared package or source folder used by every producer and consumer. Do not repeat slightly different payload definitions in separate components.

Use plain data in payloads:

```ts
{
  path: "/path/to/file.md",
  reviewId: "review-018",
  completedAt: Date.now(),
}
```

Do not publish a Svelte component, function, class instance, open database handle, or mutable manager.

## Register the event

Register the local event ID during activation:

```ts
export default function createPlugin(): PhialsPlugin {
  return {
    id: "acme.review-tools",
    name: "Review tools",
    version: "1.0.0",
    providers: [],

    onActivate(api) {
      api.events.register(
        "review.completed",
        "A review was completed for one file.",
      );
    },
  };
}
```

Pass only the local suffix to `register`. Phials prefixes the active plugin ID, producing `acme.review-tools.review.completed`.

Registration establishes ownership and makes the event available for validation and diagnostics. Register once during activation, before a feature can emit it.

## Emit the completed fact

Emit the full namespaced ID after the owning operation succeeds:

```ts
function publishReviewCompleted(
  api: PluginAPI,
  review: {
    path: string;
    reviewId: string;
  },
) {
  api.events.emit(
    "acme.review-tools.review.completed",
    {
      path: review.path,
      reviewId: review.reviewId,
      completedAt: Date.now(),
    },
  );
}
```

TypeScript rejects missing, extra, or incorrectly typed payload fields.

Publish after durable state changes:

```ts
await saveReview(review);
publishReviewCompleted(api, review);
```

Do not publish first and hope the save succeeds. Listeners should be able to treat the event as a true completed fact.

## Subscribe from cooperating code

Any cooperating code that includes the declaration can subscribe with the same type:

```ts
const subscription = api.events.on(
  "acme.review-tools.review.completed",
  ({ path, reviewId, completedAt }) => {
    updateRecentReviews({
      path,
      reviewId,
      completedAt,
    });
  },
);
```

Another plugin must intentionally depend on this public event contract and include a compatible declaration. The runtime bus does not install TypeScript declarations on its behalf.

## Evolve payloads compatibly

Treat an emitted payload as a public contract:

- keep the event ID stable
- keep existing fields and meanings stable
- add new fields as optional when older producers or consumers can coexist
- introduce a new event ID for a meaningfully different fact
- document the first plugin version that emits a new field or event

Compatible addition:

```ts
interface PluginEvents {
  "acme.review-tools.review.completed": {
    path: string;
    reviewId: string;
    completedAt: number;
    summary?: string;
  };
}
```

Renaming `reviewId` or changing `completedAt` from a number to a formatted string is breaking.

## Do not use events as commands

`emit` returns `void`. It does not tell you whether any listener exists, whether an asynchronous listener finished, or what a listener decided.

If the emitter needs a result:

- call a direct plugin-owned function
- read or update plugin-owned storage
- expose a purpose-built typed API

Do not invent request IDs, response events, timeouts, and a hidden RPC protocol on top of the event bus.

## Reference

- [Plugin event naming and payload reference](../../reference/events-reference/plugin-event-naming-and-payload-reference.md)
- [PluginEvents](../../reference/sdk-type-reference/PluginEvents.md)
- [EventMap](../../reference/sdk-type-reference/EventMap.md)
- [EventsAPI](../../reference/sdk-type-reference/EventsAPI.md)
