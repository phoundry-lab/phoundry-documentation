---
title: "Identify and replace center tabs"
description: "Supplies stable content identity and opts into safe same-type replacement without exposing host routing internals."
ai_disclosure: true
order: 4
---

# Identify and replace center tabs

Center-tab identity answers one question: “Does a tab already represent this content?” Replacement answers another: “May this active tab safely switch to different content?” Define them separately.

## Return a stable content identity

Use `getCenterTabIdentity` when multiple calls may request the same logical content:

```ts
function projectNotesState(value: unknown): ProjectNotesState {
  return value as ProjectNotesState;
}

const projectNotesProvider: ModuleProvider = {
  type: "module",
  id: MODULE_ID,
  name: "Project Notes",
  icon: "mdi:notebook-edit-outline",
  component: ProjectNotesModule,
  allowedPositions: ["center", "right", "bottom"],
  defaultPosition: "right",
  allowMultiple: true,
  getCenterTabIdentity(state) {
    return projectNotesState(state).projectId ?? undefined;
  },
};
```

The identity should be:

- Stable across display-name, selection, cursor, filter, and presentation changes.
- Canonical, so equivalent inputs produce the same value.
- Scoped to the provider; it does not need to be globally unique across plugins.
- Undefined for a launcher or empty state that does not yet represent content.

A project database ID is preferable to its editable title. For path-backed content, normalize the path consistently for the target platform. Do not use the dynamic tab title, module instance ID, or a serialization of the entire state.

When a request has an identity, Phials searches all center-tab groups before it considers replacement. An existing equivalent tab wins even when it is in another group.

If `allowMultiple` is `false` and no identity hook is defined, Phials treats the provider as one singleton center identity.

## Opt in to same-provider replacement

Define `canReplaceCenterTab` only when contextual opens may reuse the active unpinned center tab of this provider:

```ts
const projectNotesProvider: ModuleProvider = {
  // Provider fields omitted for focus.
  type: "module",
  id: MODULE_ID,
  name: "Project Notes",
  icon: "mdi:notebook-edit-outline",
  component: ProjectNotesModule,
  allowedPositions: ["center"],
  allowMultiple: true,

  getCenterTabIdentity(state) {
    return projectNotesState(state).projectId ?? undefined;
  },

  canReplaceCenterTab(currentState, requestedState) {
    const current = projectNotesState(currentState);
    const requested = projectNotesState(requestedState);

    return (
      current.projectId !== requested.projectId &&
      current.saveStatus === "clean" &&
      current.draft === current.savedText
    );
  },
};
```

The hook receives the active tab's current state and the requested state. Return `true` only when abandoning the current content is safe. Dirty, saving, conflicted, failed, or otherwise unresolved state must return `false`.

Phials adds replacement constraints around the provider decision:

- Only the active tab in the source-aware target group is considered.
- The tab must be unpinned.
- The existing and requested provider IDs must match.
- A matching identity anywhere in the tree is focused first.
- If replacement is refused, Phials creates a new tab.

Different provider types never replace one another. Background tabs are never opportunistically reused.

Defining `canReplaceCenterTab` also makes pinning meaningful for the provider. A pinned center tab remains restorable and movable, but contextual opens cannot replace its identity. Providers that do not opt into replacement do not need a pin affordance.

## Remount lifecycle-heavy surfaces

Replacement preserves `moduleInstance.id` and updates its state. A reactive component can respond in place. If the component acquires content-specific resources during mount, opt into an identity-keyed remount:

```ts
const remountContract = {
  // Other provider fields...
  requiresRemount: true,
  getCenterTabIdentity(state) {
    return projectNotesState(state).projectId ?? undefined;
  },
} satisfies Pick<
  ModuleProvider,
  "requiresRemount" | "getCenterTabIdentity"
>;
```

When replacement changes `projectId`, Phials destroys the old surface and mounts a new one while preserving the logical instance. Cleanup must release the old project's surface resources. Long-lived instance resources should remain in a service keyed by `moduleInstance.id`.

Do not use `requiresRemount` to compensate for incomplete reactive code. Use it when switching content is itself a lifecycle boundary.

Replacement also runs the provider's finalization hook before state changes. The next article shows how to [finalize unsaved work before close or replacement](./finalize-unsaved-work-before-close-or-replacement.md).
