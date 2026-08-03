---
title: "Define and place a panel or tab"
description: "Registers a ModuleProvider, chooses supported dock and center placements, and defines the default position."
ai_disclosure: true
order: 1
---

# Define and place a panel or tab

Register a [ModuleProvider](../../reference/sdk-type-reference/ModuleProvider.md) when your plugin needs an interactive surface in a dock or center tab. The provider connects a stable ID and display metadata to one Svelte component, then declares the positions where users may place it.

The following provider creates project notes in the Right Dock by default and also allows the same module instance to move to the Bottom Dock or a center tab:

```ts
// src/main.ts
import "./app.css";
import ProjectNotesModule from "./project-notes/ProjectNotesModule.svelte";
import type { ProjectNotesState } from "./project-notes/project-notes.types";

const MODULE_ID = "com.example.project-notes.module";

const projectNotesProvider: ModuleProvider = {
  type: "module",
  id: MODULE_ID,
  name: "Project Notes",
  icon: "mdi:notebook-edit-outline",
  component: ProjectNotesModule,
  allowedPositions: ["right", "bottom", "center"],
  defaultPosition: "right",
  allowMultiple: true,
  getDefaultState: (): ProjectNotesState => ({
    projectId: null,
    projectName: "Project Notes",
    draft: "",
    savedText: "",
    compact: false,
    saveStatus: "clean",
  }),
};

export default function createPlugin(): PhialsPlugin {
  return {
    id: "com.example.project-notes",
    name: "Project Notes",
    version: "0.1.0",
    providers: [projectNotesProvider],
  };
}

export { mount, unmount } from "svelte";
```

Declare `projectNotesProvider.icon` in the typed source manifest's `icons`
list so Phials can preload it before importing this definition.

The state type can remain local to your plugin:

```ts
// src/project-notes/project-notes.types.ts
export interface ProjectNotesState {
  projectId: string | null;
  projectName: string;
  draft: string;
  savedText: string;
  compact: boolean;
  saveStatus: "clean" | "dirty" | "saving" | "conflicted";
}
```

The component receives [ModuleProviderProps](../../reference/sdk-type-reference/ModuleProviderProps.md). It should fill the space the host gives it rather than render its own dock, tab, close button, or drag handle.

```svelte
<!-- src/project-notes/ProjectNotesModule.svelte -->
<script lang="ts">
  import type { ProjectNotesState } from "./project-notes.types";

  let { moduleInstance, updateState }: ModuleProviderProps = $props();

  let state = $derived(moduleInstance.state as ProjectNotesState);

  function updateDraft(draft: string): void {
    updateState({
      ...state,
      draft,
      saveStatus: draft === state.savedText ? "clean" : "dirty",
    } satisfies ProjectNotesState);
  }
</script>

<section class="project-notes">
  <header>
    <h2>{state.projectName}</h2>
  </header>

  <textarea
    aria-label="Project notes"
    value={state.draft}
    oninput={(event) => updateDraft(event.currentTarget.value)}
  ></textarea>
</section>

<style>
  .project-notes {
    display: grid;
    grid-template-rows: auto minmax(0, 1fr);
    gap: 0.75rem;
    width: 100%;
    height: 100%;
    min-width: 0;
    min-height: 0;
    padding: 0.75rem;
  }

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
  }

  textarea {
    min-width: 0;
    min-height: 0;
    resize: none;
  }
</style>
```

The component can call the supplied `close()` prop when completing a self-contained workflow. For center tabs, that request passes through the provider's finalization guard when one is defined. A docked panel should save important state as it changes because center-tab finalization does not govern ordinary panel removal.

## Declare placements deliberately

`allowedPositions` is a `ModulePosition[]` containing `"left"`, `"right"`, `"bottom"`, and `"center"`. Phials uses it for every placement path, including module pickers, **Move to**, drag-and-drop, and session restoration.

If you omit `allowedPositions`, the provider is available in the three docks but not in center tabs. Set it explicitly in a public plugin so readers and maintainers can see the capability boundary.

`defaultPosition` chooses the initial destination when Phials opens the module without a more specific target. It must be one of the allowed positions. The default does not prevent users from moving the instance to another allowed position later.

Use one provider for one coherent capability. If the center experience is actually a different workflow with different state and lifecycle, define another provider rather than branching a single component on host placement.

Next, [manage the module's instances and persisted state](./manage-instances-and-persisted-state.md).
