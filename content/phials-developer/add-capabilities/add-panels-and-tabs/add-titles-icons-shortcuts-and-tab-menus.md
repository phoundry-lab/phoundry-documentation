---
title: "Add titles, icons, shortcuts, and tab menus"
description: "Supplies dynamic tab chrome, a default shortcut, and Phoundry UI tab-bar menu items."
ai_disclosure: true
order: 6
---

# Add titles, icons, shortcuts, and tab menus

The provider's `name` and `icon` are stable defaults. Center tabs can derive more specific chrome from instance state, while a module shortcut and panel tab menu expose frequent actions without adding host-like controls inside the component.

## Derive center-tab titles and icons

Use `getTabTitle` and `getTabIcon` for concise content-specific labels:

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

  getTabTitle(state) {
    const notes = readProjectNotesState(state);
    return notes.projectId ? notes.projectName : "Project Notes";
  },

  getTabIcon(state) {
    const notes = readProjectNotesState(state);
    return notes.saveStatus === "conflicted"
      ? "mdi:alert-circle-outline"
      : "mdi:notebook-edit-outline";
  },
};
```

Phials reevaluates these functions after `updateState()`. Keep them synchronous, deterministic, and inexpensive. Return a short label suitable for a tab; put longer context inside the module surface. Register every icon your provider can return in the typed source manifest:

```ts
export const pluginManifest = definePluginManifest({
  // ...
  icons: ["mdi:notebook-edit-outline", "mdi:alert-circle-outline"],
});
```

Dynamic title and icon hooks apply to center-tab chrome. Docked panel tabs remain compact and use the provider's stable name and icon.

Do not use a title as content identity. Titles are presentation and may change; `getCenterTabIdentity` must return a stable key.

## Add a module shortcut

`shortcut` declares a user-customizable shortcut that focuses an existing instance or reveals the module at its default position:

```ts
shortcut: {
  defaults: ["CmdOrCtrl+Shift+J"],
  description: "Focus Project Notes",
  priority: 10,
},
```

Use `CmdOrCtrl` for the normal macOS and Windows/Linux mapping. Provide platform-specific values only when the operating systems use meaningfully different conventions:

```ts
shortcut: {
  defaults: [
    {
      mac: "Cmd+Shift+J",
      windows: "Ctrl+Shift+J",
      linux: "Ctrl+Shift+J",
    },
  ],
  description: "Focus Project Notes",
},
```

Choose a default that does not collide with common editing or navigation shortcuts. Users can inspect, change, or disable plugin shortcuts in Phials settings. A shortcut is appropriate for toggling or focusing the module capability; use a [CommandProvider](../../reference/sdk-type-reference/CommandProvider.md) when you need several named actions with independent eligibility.

## Contribute panel tab menu items

`getTabBarMenuItems` returns Phoundry UI `MenuItem[]` for the active docked module. Phials places them in both the panel's options menu and that panel tab's context menu, alongside host-owned move and close actions.

The following per-instance option goes through the live controller, which in turn calls the component's `updateState` boundary:

```ts
import type { MenuItem } from "phoundry-ui";

interface ProjectNotesController {
  setCompact(compact: boolean): Promise<void>;
  export(): Promise<void>;
}

const controllers = new Map<string, ProjectNotesController>();

const projectNotesProvider: ModuleProvider = {
  // Other provider fields...
  type: "module",
  id: MODULE_ID,
  name: "Project Notes",
  icon: "mdi:notebook-edit-outline",
  component: ProjectNotesModule,

  getTabBarMenuItems(moduleInstance, api): MenuItem[] {
    const state = readProjectNotesState(moduleInstance.state);
    const controller = controllers.get(moduleInstance.id);

    return [
      {
        type: "boolean",
        id: "compact-project-notes",
        label: "Compact Editor",
        icon: "mdi:format-line-spacing",
        value: state.compact,
        preventClose: true,
        async onchange(compact) {
          await controller?.setCompact(compact);
        },
      },
      {
        type: "action",
        id: "export-project-notes",
        label: "Export Notes…",
        icon: "mdi:export-variant",
        disabled: !state.projectId,
        async action() {
          if (!controller) {
            api.notify.warning("Open Project Notes before exporting");
            return;
          }
          await controller.export();
        },
      },
    ];
  },
};
```

Use:

- An `action` row for a one-time operation.
- A `boolean` row for a current on/off value; set `preventClose: true` when users may adjust several options.
- A `submenu` for a short related choice set.
- A `separator` only between meaningful groups.

The `api` argument is scoped to the plugin that registered the provider. Use it for supported plugin operations such as notifications, files, settings, and modals. The host appends its own **Move to**, **Close**, and **Add module** actions; do not duplicate them.

Build menu values from current state each time the menu opens. Keep actions valid if the surface unmounts while asynchronous work is running, and route instance-specific changes through your controller and `updateState` rather than mutating `moduleInstance.state`.

`getTabBarMenuItems` customizes docked panel-tab menus. Center-tab context menus retain host-owned tab actions so pinning, moving, splitting, and closing stay consistent across providers.

You now have the complete panels-and-tabs contract: placement, instances, typed opening, identity-first routing, safe replacement, finalization, and responsive tab chrome. Return to [Add panels and tabs](./index.md) for the workflow map.
