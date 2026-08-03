---
title: "Manage subscriptions and asynchronous handlers"
description: "Unsubscribes explicitly when needed, relies on documented deactivation cleanup, handles concurrency and errors, and avoids using events as hidden request-response calls."
ai_disclosure: true
order: 3
---

# Manage subscriptions and asynchronous handlers

Every call to `on` or `once` returns an [EventSubscription](../../reference/sdk-type-reference/EventSubscription.md). Retain it when the listener has a lifetime shorter than the plugin. Phials removes the plugin's remaining subscriptions during deactivation, but it cannot decide when a closed panel, changed path, or cancelled workflow no longer needs one.

## Unsubscribe at the owning boundary

```ts
class SaveObserver {
  #subscription: EventSubscription | null = null;

  start(api: PluginAPI, path: string) {
    this.stop();
    this.#subscription = api.events.on(
      "core.file.saved",
      (payload) => {
        if (payload.path === path) {
          this.refresh();
        }
      },
    );
  }

  stop() {
    this.#subscription?.unsubscribe();
    this.#subscription = null;
  }

  refresh() {
    // Refresh observer-owned state.
  }
}
```

Calling `unsubscribe()` more than once is safe. Unsubscribe before replacing a listener so the old identity cannot update the new feature state.

At plugin deactivation, Phials removes every listener created through that plugin's `api.events`. Explicit lifecycle cleanup remains useful for releasing other resources and documenting ownership:

```ts
let observer: SaveObserver | null = null;

export default function createPlugin(): PhialsPlugin {
  return {
    id: "acme.save-observer",
    name: "Save observer",
    version: "1.0.0",
    providers: [],

    onActivate(api) {
      observer = new SaveObserver();
      observer.start(api, "/chosen/path.md");
    },

    onDeactivate() {
      observer?.stop();
      observer = null;
    },
  };
}
```

See the exact lifetime contract in [Event delivery and cleanup reference](../../reference/events-reference/event-delivery-and-cleanup-reference.md).

## Understand asynchronous delivery

An event handler may return `Promise<void>`, but `emit` does not await it. Each subscriber begins independently, and a later emission can arrive while earlier asynchronous work is still running.

This simple handler permits overlap:

```ts
api.events.on(
  "core.directory.changed",
  async ({ path }) => {
    const result = await api.files.readDirectory(path);
    updateIndex(path, result.entries);
  },
);
```

Overlap may be correct for independent work. If only the newest result matters, guard against stale completion.

## Coalesce repeated invalidations

This queue performs at most one refresh at a time and repeats once after a burst:

```ts
function subscribeToFolderRefresh(
  api: PluginAPI,
  folder: string,
  publish: (entries: readonly FileEntry[]) => void,
): EventSubscription {
  let running = false;
  let refreshAgain = false;

  const refresh = async () => {
    if (running) {
      refreshAgain = true;
      return;
    }

    running = true;
    try {
      do {
        refreshAgain = false;
        const result = await api.files.readDirectory(folder);
        publish(result.entries);
      } while (refreshAgain);
    } catch {
      api.notify.warning("The folder index could not be refreshed.");
    } finally {
      running = false;
    }
  };

  return api.events.on(
    "core.directory.changed",
    ({ path }) => {
      if (path === folder) {
        void refresh();
      }
    },
  );
}
```

Use this for invalidation events where the final current state matters more than processing every intermediate emission.

If every event represents durable work that must be processed, use an explicit FIFO queue instead. Do not pretend coalescing preserves each intermediate payload.

## Prevent stale async completion

When the observed identity can change, use a generation token:

```ts
let generation = 0;

async function refreshSelection(
  api: PluginAPI,
  paths: string[],
  publish: (summary: string) => void,
) {
  const currentGeneration = ++generation;
  const summary = await buildSelectionSummary(api, paths);

  if (currentGeneration !== generation) return;
  publish(summary);
}
```

Increment `generation` again when the feature closes. Unsubscribing prevents future handler starts; it does not cancel a handler already awaiting work.

Use `AbortController` as well when the underlying API accepts an abort signal.

## Own handler errors

Phials isolates handler failures so one plugin does not stop other listeners. That isolation is not user-facing recovery. Catch expected failures inside the handler and decide what state remains valid:

```ts
const subscription = api.events.on(
  "acme.review-tools.review.completed",
  async ({ reviewId }) => {
    try {
      await refreshReview(reviewId);
    } catch (error) {
      markReviewStale(reviewId);
      api.notify.warning("The completed review could not be refreshed.");
    }
  },
);
```

Do not rely on throwing from a handler to notify the emitter. The emitter has already returned and does not receive handler errors.

For unexpected failures, record enough private diagnostic context to reproduce the problem without putting sensitive paths or payload data into a toast.

## Use `once` carefully with async work

A `once` handler is removed after its first invocation, not after its returned promise succeeds:

```ts
api.events.once("core.file.saved", async ({ path }) => {
  await refreshSavedFile(path);
});
```

If `refreshSavedFile` fails, the subscription is still consumed. Implement retry inside the handler or use `on` and unsubscribe only after a successful result when retry is part of the contract.

## Avoid request-response over events

Do not make correctness depend on:

- a particular listener existing
- listener order
- an asynchronous listener finishing before the next statement
- a response event arriving before a timeout
- the emitter reading a value mutated by a listener

This is unsafe:

```ts
api.events.emit("acme.review-tools.review.requested", {
  reviewId,
});
// No result is available here.
```

Use a direct typed operation when the caller requires success, failure, or a return value. Reserve events for facts that remain true even when nobody is listening.

## Verify lifecycle behavior

Test:

1. subscribe, emit, and observe one delivery
2. unsubscribe and confirm no further delivery
3. repeat activation without accumulating duplicate handlers
4. deactivate while asynchronous work is in flight
5. emit a burst and verify the chosen overlap, coalescing, or queue policy
6. force one handler to fail and verify other listeners still run

## Reference

- [Event delivery and cleanup reference](../../reference/events-reference/event-delivery-and-cleanup-reference.md)
- [EventSubscription](../../reference/sdk-type-reference/EventSubscription.md)
- [EventHandler](../../reference/sdk-type-reference/EventHandler.md)
- [EventsAPI](../../reference/sdk-type-reference/EventsAPI.md)
