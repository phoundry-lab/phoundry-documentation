---
title: "Manage instances and persisted state"
description: "Controls multiplicity, creates default state, updates opaque instance state, and chooses remount behavior."
ai_disclosure: true
order: 2
---

# Manage instances and persisted state

A module surface can mount and unmount many times while its [ModuleInstance](../../reference/sdk-type-reference/ModuleInstance.md) remains the same. Store durable, serializable presentation state through `updateState`; keep long-lived resources in a module-owned service keyed by `moduleInstance.id`.

## Choose whether instances may multiply

Set `allowMultiple` according to the capability's meaning:

```ts
const projectNotesProvider: ModuleProvider = {
  type: "module",
  id: MODULE_ID,
  name: "Project Notes",
  icon: "mdi:notebook-edit-outline",
  component: ProjectNotesModule,
  allowedPositions: ["right", "bottom", "center"],
  defaultPosition: "right",
  allowMultiple: true,
};
```

Use `true` when two instances can represent different content or independent working state, such as notes for two projects. Use `false` for a singleton capability such as one task inbox. When `allowMultiple` is false, opening the provider in the center focuses its existing center instance instead of creating a duplicate.

Multiplicity is not placement. Moving one instance from the Right Dock to a center tab preserves its ID and state; it does not consume or create another instance.

## Create a complete default state

`getDefaultState` runs when Phials creates an instance without caller-supplied state, such as through a module picker:

```ts
getDefaultState: (): ProjectNotesState => ({
  projectId: null,
  projectName: "Project Notes",
  draft: "",
  savedText: "",
  compact: false,
  saveStatus: "clean",
}),
```

Return a fresh value on every call. State must be JSON-serializable because Phials includes it in panel layout, center-session, and saved Layout data. Store IDs, paths, scalar preferences, and reconstructible view state. Do not store Svelte state objects, DOM nodes, open file handles, subscriptions, class instances, or functions.

Treat restored state as untrusted versioned input. Plugins evolve independently from saved sessions, so normalize before using it:

```ts
function readProjectNotesState(value: unknown): ProjectNotesState {
  const saved = (value ?? {}) as Partial<ProjectNotesState>;

  return {
    projectId: typeof saved.projectId === "string" ? saved.projectId : null,
    projectName:
      typeof saved.projectName === "string"
        ? saved.projectName
        : "Project Notes",
    draft: typeof saved.draft === "string" ? saved.draft : "",
    savedText:
      typeof saved.savedText === "string" ? saved.savedText : "",
    compact: saved.compact === true,
    saveStatus:
      saved.saveStatus === "dirty" ||
      saved.saveStatus === "saving" ||
      saved.saveStatus === "conflicted"
        ? saved.saveStatus
        : "clean",
  };
}
```

## Replace state through the provider props

Read `moduleInstance.id`, `moduleInstance.type`, and `moduleInstance.state`. Replace state through `updateState()`:

```svelte
<script lang="ts">
  import type { ProjectNotesState } from "./project-notes.types";

  let { moduleInstance, updateState }: ModuleProviderProps = $props();
  let state = $derived(
    readProjectNotesState(moduleInstance.state),
  );

  function setCompact(compact: boolean): void {
    updateState({ ...state, compact } satisfies ProjectNotesState);
  }
</script>
```

Do not assign to `moduleInstance.state`. `updateState` is the supported state boundary: it updates the live instance and schedules the appropriate panel or center-session persistence.

Replace the whole state value rather than mutating nested fields. This keeps dynamic titles, icons, remount keys, and session serialization synchronized.

## Separate instance state from live resources

Center module surfaces mount only while their tab is presented. Docked surfaces can also unmount when another panel tab becomes active or a dock collapses. If your capability owns a watcher, worker, editing controller, or connection that must outlive the surface, keep it in a service:

```ts
const controllers = new Map<string, ProjectNotesController>();

export function acquireProjectNotesController(
  instance: ModuleInstance,
): ProjectNotesController {
  let controller = controllers.get(instance.id);
  if (!controller) {
    controller = new ProjectNotesController(
      instance.id,
      readProjectNotesState(instance.state),
    );
    controllers.set(instance.id, controller);
  }
  return controller;
}

export function releaseProjectNotesController(instanceId: string): void {
  controllers.get(instanceId)?.dispose();
  controllers.delete(instanceId);
}
```

The service uses the stable instance ID as its ownership key. The Svelte component acquires the controller on mount, subscribes to it, and releases only its surface reference on unmount. The provider's finalizer or explicit close path can perform the logical release after work is resolved.

## Remount when content identity changes

Most components should react to state updates in place. Set `requiresRemount: true` only when switching the represented content must run mount and cleanup from the beginning:

```ts
requiresRemount: true,
getCenterTabIdentity: (state) =>
  readProjectNotesState(state).projectId ?? undefined,
```

For a provider with center-tab identity, Phials remounts when that identity changes. Otherwise, it keys the surface by instance ID. Persisted state and the instance ID survive the remount.

Remounting is useful for lifecycle-heavy editors, terminals, and viewers that acquire one content-specific controller during mount. It is not a substitute for reactive rendering or for releasing resources correctly.

Next, [open or focus a center tab](./open-or-focus-center-tabs.md) with caller-supplied state.
