---
title: "Listen for Phials events"
description: "Subscribes to supported core events with typed payloads and chooses between persistent and one-shot handling."
ai_disclosure: true
order: 1
---

# Listen for Phials events

Use `api.events.on()` for changes your feature must observe throughout its lifetime. Use `api.events.once()` when the first matching publication completes a one-time wait or transition.

Only events listed in the [Phials event catalog](../../reference/events-reference/phials-event-catalog.md) are supported. The catalog owns the exact payload, delivery condition, ordering guarantee, and version boundary.

## Subscribe with `on`

This plugin remembers the most recently saved path while it is active:

```ts
export default function createPlugin(): PhialsPlugin {
  let savedSubscription: EventSubscription | null = null;
  let lastSavedPath: string | null = null;

  return {
    id: "acme.save-observer",
    name: "Save observer",
    version: "1.0.0",
    providers: [],

    onActivate(api) {
      savedSubscription = api.events.on(
        "core.file.saved",
        ({ path }) => {
          lastSavedPath = path;
        },
      );
    },

    onDeactivate() {
      savedSubscription?.unsubscribe();
      savedSubscription = null;
      lastSavedPath = null;
    },
  };
}
```

The string literal selects the payload type. In the example, TypeScript knows the payload has `path: string`.

Use the payload as the event's source of truth. Do not reread whichever tab or pane happens to be active and assume it caused the event.

## Filter by identity

Many events describe one pane, tab, file, or folder. Filter before performing expensive work:

```ts
function observePane(
  api: PluginAPI,
  paneId: string,
  onPathChanged: (path: string) => void,
): EventSubscription {
  return api.events.on(
    "core.navigation.changed",
    ({ path, paneId: changedPaneId }) => {
      if (changedPaneId !== paneId) return;
      onPathChanged(path);
    },
  );
}
```

Pane identity is especially important with split panes and background tabs. “Current” is not a safe substitute for the `paneId` in the payload.

## Subscribe once

`once` removes the handler after the first matching emission:

```ts
function notifyAfterNextSave(
  api: PluginAPI,
  expectedPath: string,
): EventSubscription {
  return api.events.once("core.file.saved", ({ path }) => {
    if (path === expectedPath) {
      api.notify.success("The file was saved.");
    }
  });
}
```

`once` means the first emission of that event ID, not the first payload that passes a condition inside the handler. In the example, an unrelated save consumes the subscription without showing a notification.

When the first *matching* payload matters, use `on` and unsubscribe after the condition succeeds:

```ts
function notifyWhenPathIsSaved(
  api: PluginAPI,
  expectedPath: string,
): EventSubscription {
  let subscription: EventSubscription;

  subscription = api.events.on("core.file.saved", ({ path }) => {
    if (path !== expectedPath) return;

    subscription.unsubscribe();
    api.notify.success("The expected file was saved.");
  });

  return subscription;
}
```

Retain the returned handle so cancellation can unsubscribe before the event occurs.

## Do not infer missing guarantees

An event describes only what its catalog entry promises. For example:

- a file event is not automatically a recursive folder event
- a save publication does not prove another plugin's asynchronous handler finished
- two different event IDs do not have an ordering relationship unless the catalog states one
- an event is not replayed to a listener that subscribes later

If a feature needs the current state at activation, read that state through its typed API first and use events for later invalidation:

```ts
async function activateIndex(api: PluginAPI, folder: string) {
  let entries = (await api.files.readDirectory(folder)).entries;

  const subscription = api.events.on(
    "core.directory.changed",
    async ({ path }) => {
      if (path !== folder) return;
      entries = (await api.files.readDirectory(folder)).entries;
    },
  );

  return {
    getEntries: () => entries,
    dispose: () => subscription.unsubscribe(),
  };
}
```

For overlapping asynchronous events, use the serialization patterns in [Manage subscriptions and asynchronous handlers](manage-subscriptions-and-asynchronous-handlers.md).

## Test the visible contract

When testing a listener:

1. Trigger the user-visible Phials action that owns the event.
2. Confirm the payload identity matches the affected item.
3. Confirm an unrelated pane or path is ignored.
4. Confirm explicit unsubscribe stops updates.
5. Deactivate and reactivate the plugin to rule out duplicate listeners.

Do not test by calling undocumented host internals to emit an event.

## Reference

- [Phials event catalog](../../reference/events-reference/phials-event-catalog.md)
- [Event delivery and cleanup reference](../../reference/events-reference/event-delivery-and-cleanup-reference.md)
- [CoreEvents](../../reference/sdk-type-reference/CoreEvents.md)
- [EventsAPI](../../reference/sdk-type-reference/EventsAPI.md)
