---
title: "Place commands in context menus"
description: "Recommends context-menu placements, selection modes, submenus, and initial ordering for plugin commands."
ai_disclosure: true
order: 4
---

# Place commands in context menus

Use `defaultPlacements` to recommend a context-menu location for a command. The placement invokes the same command ID, availability rules, disabled state, and `action(ctx)` as the Command Bar or a shortcut.

The public [CommandPlacement](../../reference/sdk-type-reference/CommandPlacement.md) contract supports `contextMenu`. It does not provide a `toolbar` placement for adding plugin buttons to the Path Bar. Use a capability's documented component contribution when your plugin needs its own controls.

## Add a context-menu placement

```ts
const addToCatalog: Command = {
  id: "acme.catalog.add-selection",
  label: "Add to catalog",
  description: "Adds the selected files to the catalog",
  icon: "mdi:book-plus-outline",
  category: "Catalog",
  contextKeys: ["hasSelection", "selectionIsFile"],
  action: (ctx) => addFiles(ctx.selectedFiles),
  defaultPlacements: [
    {
      area: "contextMenu",
      selectionMode: "both",
      submenu: {
        id: "acme.catalog.menu",
        label: "Catalog",
        icon: "mdi:bookshelf",
      },
      order: 20,
    },
  ],
};
```

`addFiles` is your plugin's operation. The [ContextMenuPlacementConfig](../../reference/sdk-type-reference/ContextMenuPlacementConfig.md) fields describe how its command is initially presented:

- `selectionMode`: `"single"`, `"multi"`, or `"both"`. Omitting it allows both selection shapes.
- `submenu`: a stable submenu ID, label, and optional icon. Omit it or use `null` for a root row.
- `order`: initial relative order; lower values appear earlier.
- `danger`: marks a destructive or difficult-to-reverse action. It does not ask for confirmation.

The placement filter does not replace availability checks. Use `contextKeys` and `when` for file types, folders, and other requirements. Reuse one submenu ID and consistent metadata for commands that belong together.

Confirm consequential actions immediately before executing them. See [Confirm consequential actions](../../work-with-phials/show-dialogs-and-notifications/confirm-consequential-actions.md).

## Respect the user's layout

Phials has a user-controlled file-explorer context-menu layout. Users can move or hide default rows and submenus. Availability filters that layout without changing command identity or saved ordering.

Keep the command discoverable through the Command Bar, and do not rely on exact neighboring commands or an absolute menu position to explain it. Separators belong to the user's layout rather than a command provider.

## Test each invocation

A context-menu action receives the clicked target and effective selection. The same command invoked elsewhere receives that surface's context. Test the relevant paths rather than assuming they always produce the same target.

Use [CommandContext](../../reference/sdk-type-reference/CommandContext.md) and [Use command context and availability](./use-command-context-and-availability.md) to choose the correct files and pane for an operation.
