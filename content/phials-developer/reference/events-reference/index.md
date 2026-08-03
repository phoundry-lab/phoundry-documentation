---
title: "Events reference"
description: "Look up supported Phials events and the naming, payload, delivery, and cleanup contracts."
ai_disclosure: true
---

# Events reference

Use this hub for the exact contract of `api.events`. Events publish facts to
zero or more listeners in the current Phials renderer. They do not return a
result, wait for asynchronous listeners, or persist a history.

| Reference | Canonical subject |
| --- | --- |
| [Phials event catalog](./phials-event-catalog.md) | Every supported `core.*` event, payload, delivery condition, ordering guarantee, and version boundary |
| [Plugin event naming and payload reference](./plugin-event-naming-and-payload-reference.md) | Plugin-owned event IDs, registration, declaration merging, payload evolution, and collision rules |
| [Event delivery and cleanup reference](./event-delivery-and-cleanup-reference.md) | Subscription lifetime, one-shot delivery, dispatch ordering, asynchronous handlers, errors, and deactivation cleanup |

The [SDK type reference](../sdk-type-reference/index.md) owns the generated
TypeScript signatures for [EventsAPI](../../reference/sdk-type-reference/EventsAPI.md), [EventMap](../../reference/sdk-type-reference/EventMap.md), [CoreEvents](../../reference/sdk-type-reference/CoreEvents.md), [PluginEvents](../../reference/sdk-type-reference/PluginEvents.md),
[EventHandler](../../reference/sdk-type-reference/EventHandler.md), and [EventSubscription](../../reference/sdk-type-reference/EventSubscription.md).

The [Respond to events](../../work-with-phials/respond-to-events/index.md) task
hub shows subscription and emission patterns without redefining these
contracts.
