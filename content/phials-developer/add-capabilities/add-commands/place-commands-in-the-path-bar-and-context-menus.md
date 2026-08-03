---
title: "Place commands in the Path Bar and context menus"
description: "Configures the surviving toolbar and contextMenu placements, including selection modes, submenus, order, active state, and badges."
ai_disclosure: true
order: 4
---

# Place commands in the Path Bar and context menus

Use `defaultPlacements` to put a command near the context where it is commonly needed. A placement is an initial recommendation, not a second action definition: every surface invokes the same command ID, availability rules, disabled state, and `action(ctx)`.

Users can reorder or hide supported placements. Keep the command discoverable through the Command Bar even when they remove its default button or menu row.

## Add a Path Bar placement

The public placement identifier for the Path Bar is `toolbar`:

```ts
const refreshIndex: Command = {
	id: "acme.catalog.refresh-index",
	label: "Refresh catalog index",
	description: "Scans the current folder for catalog changes",
	icon: "mdi:refresh",
	category: "Catalog",
	contextKeys: ["always"],
	disabled: (ctx) => ctx.currentPath.length === 0,
	action: (ctx) => refreshCatalog(ctx.currentPath),
	defaultPlacements: [
		{
			area: "toolbar",
			priority: 40,
			showLabel: false,
		},
	],
};
```

`priority` controls the initial order: higher values appear earlier toward the left. Treat it as a relative default because user-authored order takes precedence.

A [ToolbarPlacementConfig](../../reference/sdk-type-reference/ToolbarPlacementConfig.md) can also provide:

- `icon`, including a context-derived icon;
- `showLabel` and `showArrow` defaults;
- `active(ctx)` for pressed or toggled state;
- `badgeCount(ctx)` for a positive activity count;
- `group` for related buttons;
- `subToolbar` for a control surface described in [Build nested and custom command controls](./build-nested-and-custom-command-controls.md);
- `fixed` for an essential host-owned control that cannot overflow away.

Plugin commands should normally omit `fixed`. A plugin should not prevent users from simplifying their Path Bar.

Keep `active` and `badgeCount` synchronous and side-effect free. An active state communicates a mode that is already on; it does not execute the command. A badge is a compact count, not a substitute for an error or status message.

## Add a file context-menu placement

Use `contextMenu` to recommend a root row or named submenu:

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

`selectionMode` describes which selection shapes receive that placement:

- `"single"` for one effective item;
- `"multi"` for more than one;
- `"both"` or omission for both shapes.

This placement filter does not replace command availability. Continue to use `contextKeys` and `when` to distinguish files, folders, Workspace Folder context, extensions, or other action requirements.

Use a stable submenu `id` across every command that belongs in the same submenu. Keep its label and icon consistent. `order` controls initial relative order within the applicable root or submenu; lower values appear earlier.

Set `danger: true` only to identify a destructive or difficult-to-reverse action. Danger styling does not add confirmation. Confirm the action immediately before it runs and describe the actual consequence; see [Confirm consequential actions](../../work-with-phials/show-dialogs-and-notifications/confirm-consequential-actions.md).

## Respect the user's context-menu layout

Phials has one user-controlled file-explorer context-menu layout shared across Explorer file views. Availability filters that layout for the current file, folder, empty-space, or multi-selection context without rewriting the saved order.

That has several consequences for a plugin:

- A default root command or submenu is a movable layout entry.
- An unavailable command is omitted without closing up its durable identity.
- A command that returns after plugin reactivation resumes its prior user-authored position.
- A newly registered root identity is appended without shifting existing customized entries.
- Separators belong to the user's layout, not to a command provider.

Do not rely on a provider heading, exact neighboring command, or absolute menu position to explain your action. Make the command's label and submenu identity sufficient on their own.

## Use multiple placements for one action

A command can include both areas:

```ts
defaultPlacements: [
	{ area: "toolbar", priority: 40 },
	{
		area: "contextMenu",
		selectionMode: "both",
		order: 20,
	},
]
```

Phials resolves the current context independently for each invocation. A context-menu action receives the clicked target and effective selection; a Path Bar action receives the active Explorer context. Test both paths rather than assuming they always produce the same target.
