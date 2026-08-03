---
title: "Finalize unsaved work before close or replacement"
description: "Accepts or refuses finalization when state is dirty, saving, conflicted, or otherwise unresolved."
ai_disclosure: true
order: 5
---

# Finalize unsaved work before close or replacement

A center module that can hold unresolved work must define `finalizeCenterTab`. The hook gets one chance to save, resolve, discard, or refuse before Phials closes the tab or replaces its content.

```ts
interface ProjectNotesController {
  readonly status: "clean" | "dirty" | "saving" | "conflicted";
  finalize(): Promise<boolean>;
}

const controllers = new Map<string, ProjectNotesController>();

const projectNotesProvider: ModuleProvider = {
  type: "module",
  id: MODULE_ID,
  name: "Project Notes",
  icon: "mdi:notebook-edit-outline",
  component: ProjectNotesModule,
  allowedPositions: ["center"],
  allowMultiple: true,

  async finalizeCenterTab(moduleInstance) {
    const controller = controllers.get(moduleInstance.id);
    if (!controller) {
      return readProjectNotesState(moduleInstance.state).saveStatus === "clean";
    }

    return controller.finalize();
  },
};
```

Return `true` only when it is safe for Phials to continue. Return `false` to keep the tab and its state intact. A rejected close presents the tab again so the user can resolve the problem.

Phials calls the hook for:

- A user-requested center-tab close, including `close()` from the module component.
- Same-provider center-tab replacement after `canReplaceCenterTab` accepts the candidate.
- Whole-center replacement, such as loading a saved Layout.

The hook is about the logical center-tab instance, not the current Svelte surface. It must work when the surface has recently remounted or when a controller is resolving asynchronous work.

## Model unresolved states explicitly

Do not reduce every condition to a `dirty` boolean. Editing capabilities usually need at least:

| State | Finalization behavior |
| --- | --- |
| Clean | Return `true` immediately. |
| Dirty | Save, ask the user, or return `false`. |
| Saving | Await the in-flight save, then evaluate the result. |
| Conflicted | Ask the user to resolve, save a copy, discard, or return `false`. |
| Save failed | Explain the failure and let the user retry or cancel. |

A controller can centralize that policy:

```ts
class NotesController implements ProjectNotesController {
  status: "clean" | "dirty" | "saving" | "conflicted" = "clean";
  #savePromise: Promise<boolean> | null = null;

  constructor(
    private readonly api: PluginAPI,
    private readonly state: () => ProjectNotesState,
    private readonly save: () => Promise<boolean>,
  ) {}

  async finalize(): Promise<boolean> {
    if (this.status === "clean") {
      return true;
    }

    if (this.status === "saving" && this.#savePromise) {
      return this.#savePromise;
    }

    if (this.status === "conflicted") {
      await this.api.modal.alert({
        title: "Project notes changed elsewhere",
        message:
          "Resolve the conflict or discard the local draft before closing.",
      });
      return false;
    }

    const saveBeforeClosing = await this.api.modal.confirm({
      title: "Save project notes?",
      message: "The current project has unsaved notes.",
      confirmLabel: "Save",
      cancelLabel: "Keep Editing",
    });

    if (!saveBeforeClosing) {
      return false;
    }

    this.status = "saving";
    this.#savePromise = this.save();

    try {
      const saved = await this.#savePromise;
      this.status = saved ? "clean" : "dirty";
      return saved;
    } catch {
      this.status = "dirty";
      this.api.notify.error("Project notes could not be saved");
      return false;
    } finally {
      this.#savePromise = null;
    }
  }
}
```

Adapt the prompt to your data-loss policy. If the product offers an explicit **Discard** action, make it distinct from **Keep Editing**; a canceled prompt should not silently discard work.

## Keep finalization idempotent

Close and replacement requests can arrive while a save is already running. Reuse the in-flight promise rather than starting a second write. After any error, leave the controller and persisted instance state in an unresolved status and return `false`.

Do not destroy the controller, unsubscribe watchers, or clear instance state until finalization succeeds and the logical instance is actually released. Returning `true` authorizes the host transition; it should not itself mutate host tab or panel structures.

Phials applies the same finalizer before tab close, dock close, same-type replacement, Layout replacement, application close, and uninstall. Finalizers for a multi-instance transition are isolated and all run; one throw or `false` result preserves every affected instance.

Disable, reload, failed activation recovery, and temporary provider absence keep dock and center instances behind unavailable placeholders. When the provider returns, Phials restores the same instance IDs and state. Successful uninstall is the deliberate boundary that removes those retained instances.

Next, [add dynamic chrome, shortcuts, and panel tab menus](./add-titles-icons-shortcuts-and-tab-menus.md).
