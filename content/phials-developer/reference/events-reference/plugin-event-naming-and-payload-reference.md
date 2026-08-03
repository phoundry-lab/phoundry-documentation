---
title: "Plugin event naming and payload reference"
description: "Defines namespacing, declaration merging, payload compatibility, and collision avoidance for plugin-owned events."
ai_disclosure: true
order: 2
---

# Plugin event naming and payload reference

A plugin event is a versioned fact owned by one plugin identity. Its complete ID
begins with the emitting plugin's exact manifest ID:

```text
acme.review-tools.review.completed
```

Phials owns `core.*`. A plugin can subscribe to core events, but it can register
and emit only events beneath its own plugin ID.

## Event ID grammar

`api.events.register(localId, description?)` accepts the local part and prefixes
the active plugin ID:

```text
plugin ID:  acme.review-tools
local ID:   review.completed
full ID:    acme.review-tools.review.completed
```

A local ID consists of one or more dot-separated segments. Each segment:

- starts with a lowercase ASCII letter;
- contains lowercase ASCII letters, digits, or hyphens;
- ends with a lowercase ASCII letter or digit.

The full ID is case-sensitive. The local ID must not begin with `core.`, repeat
the plugin ID, begin or end with a dot, contain empty segments, or contain
whitespace.

Use a noun followed by a completed fact:

| Purpose | ID |
| --- | --- |
| State changed | `acme.review-tools.queue.changed` |
| Work completed | `acme.review-tools.review.completed` |
| Work failed after an attempted operation | `acme.review-tools.export.failed` |

Imperative names such as `run-review`, `get-review`, and `request-status`
describe commands or request-response messages rather than published facts.

## Ownership and registration

The namespace beginning with a plugin ID belongs exclusively to that plugin.
The owner registers each local ID during activation before any feature can emit
it.

Registration is activation-scoped:

- registration associates the full ID and optional description with the active
  plugin identity;
- registering the same full ID more than once in one activation is rejected;
- deactivation removes the plugin's event definitions;
- reactivation registers a fresh definition under the same stable ID.

Another plugin can subscribe after the owner has registered the event. It
cannot register or emit the owner's event, and subscriptions to unknown IDs are
rejected rather than silently waiting for a future registration.

Emission of an unregistered custom ID, a `core.*` ID, or another plugin's
namespace is rejected before delivery.

## Declaration merging

The synchronized SDK declares an empty ambient [PluginEvents](../../reference/sdk-type-reference/PluginEvents.md) interface.
Producers and TypeScript consumers extend it with the full event ID:

```ts
interface PluginEvents {
  "acme.review-tools.review.completed": {
    path: string;
    reviewId: string;
    completedAt: number;
  };
}
```

[EventMap](../../reference/sdk-type-reference/EventMap.md) is the intersection of [CoreEvents](../../reference/sdk-type-reference/CoreEvents.md) and [PluginEvents](../../reference/sdk-type-reference/PluginEvents.md). The merged
entry makes all three operations type-safe:

```ts
api.events.on("acme.review-tools.review.completed", handler);
api.events.once("acme.review-tools.review.completed", handler);
api.events.emit("acme.review-tools.review.completed", payload);
```

Keep one canonical declaration in the producer's published source or type
package. Every consumer must compile against that same declaration. Runtime
registration does not distribute TypeScript types.

Two ambient declarations for the same event ID must have exactly compatible
property types. TypeScript rejects incompatible duplicate keys. Identical
declarations can merge, but copying a contract into several codebases increases
drift risk.

## Payload requirements

A supported plugin event payload is plain data:

- strings, numbers, booleans, and `null`;
- arrays and objects composed of supported payload values;
- stable identifiers such as paths, plugin-owned record IDs, and timestamps.

Do not include:

- functions or callbacks;
- Svelte components, snippets, or component instances;
- DOM nodes;
- [PluginAPI](../../reference/sdk-type-reference/PluginAPI.md) or provider API objects;
- subscriptions, database handles, streams, workers, or other live resources;
- mutable class instances whose meaning depends on a prototype.

The payload must describe a completed fact without requiring a listener to read
mutable shared state. Phials validates it, clones it once, and deep-freezes the
snapshot before the first listener runs.
Emit only after any durable operation named by the event succeeds.

Handlers must treat the payload as read-only. A handler cannot use payload
mutation to communicate with later handlers.

## Payload compatibility

The event owner versions an event contract with its plugin releases. Phials'
`pluginApiVersion` covers the event bus, not another plugin's custom event
schema.

| Change | Compatibility |
| --- | --- |
| Add an optional field that old producers may omit and old consumers may ignore | Backward-compatible |
| Expand documentation without changing field meaning | Backward-compatible |
| Add a required field | Breaking for older producers |
| Remove or rename a field | Breaking for existing consumers |
| Change a field's type, units, nullability, identity, or meaning | Breaking |
| Change the event from one fact to another | Breaking; use a new event ID |

Keep the existing event ID when its fact and existing fields retain their
meaning. Introduce a new ID when old and new consumers cannot safely coexist.

A consumer that requires a plugin-owned event must document and enforce the
minimum producer plugin version containing that event contract. It must also
remain correct when the producer is disabled, blocked, absent, or installed at
an older version.

## Collision rules

Phials prevents runtime collisions through namespace ownership:

1. `core.*` belongs to Phials.
2. `<pluginId>.*` belongs to that exact plugin identity.
3. Local IDs must be unique within the owner.
4. A full ID identifies one stable fact and one payload contract.

Changing a plugin ID creates a new event namespace. The old and new IDs are not
aliases and do not share registrations or consumers.

For emission and subscription examples, see
[Define and emit plugin events](../../work-with-phials/respond-to-events/define-and-emit-plugin-events.md).
