---
title: "Build nested and custom command controls"
description: "Covers child commands, menu grouping, sub-toolbars, and custom context-menu rendering."
ai_disclosure: true
order: 5
---

# Build nested and custom command controls

Start with ordinary commands. Add nesting or custom controls only when several closely related actions need one entry point or when a standard action row cannot represent the interaction.

The command remains the canonical unit of discovery, availability, shortcuts, and execution. A custom surface should call the same underlying operation rather than creating a second behavior.

## Build a parent with child commands

Use `children` to make one parent appear as a Command Bar subgroup or Path Bar dropdown:

```ts
const sortAscending: Command = {
	id: "acme.catalog.sort.ascending",
	label: "Sort ascending",
	icon: "mdi:sort-ascending",
	contextKeys: ["always"],
	action: (ctx) => setCatalogSort(ctx.pane.id, "ascending"),
};

const sortDescending: Command = {
	id: "acme.catalog.sort.descending",
	label: "Sort descending",
	icon: "mdi:sort-descending",
	contextKeys: ["always"],
	action: (ctx) => setCatalogSort(ctx.pane.id, "descending"),
};

const sortCatalog: Command = {
	id: "acme.catalog.sort",
	label: "Catalog sort",
	description: "Changes the catalog sort direction",
	icon: "mdi:sort",
	category: "Catalog",
	contextKeys: ["always"],
	action: () => {},
	children: [sortAscending, sortDescending],
	defaultPlacements: [
		{
			area: "toolbar",
			priority: 30,
			showArrow: true,
		},
	],
};
```

The parent supplies the group identity and presentation. Its direct action is normally empty because choosing it opens the children. Each child needs its own globally unique stable ID, label, availability, disabled state, and action.

Phials evaluates child availability independently. If every child is unavailable, the group is omitted. A child shortcut invokes that child action directly and remains associated with the child ID.

Do not build deep command trees. One parent and a focused set of children is easier to scan in the Command Bar, Path Bar, and context menus. Split unrelated actions into separate commands.

## Separate child groups in a dropdown

Set `menuGroup` on adjacent child commands when a Path Bar dropdown benefits from separators:

```ts
const children: Command[] = [
	{ ...byName, menuGroup: "fields" },
	{ ...byDate, menuGroup: "fields" },
	{ ...ascending, menuGroup: "direction" },
	{ ...descending, menuGroup: "direction" },
];
```

The value is a stable grouping key within that child list. It is not a user-visible label and does not create another command identity. Keep commands with the same group adjacent.

## Add a sub-toolbar

A Path Bar command can reveal a compact control surface instead of completing all work in one click. Supply a Svelte component through `ToolbarPlacementConfig.subToolbar`:

```ts
import CatalogFilterToolbar from "./CatalogFilterToolbar.svelte";

const filterCatalog: Command = {
	id: "acme.catalog.filter",
	label: "Filter catalog",
	icon: "mdi:filter-outline",
	contextKeys: ["always"],
	action: () => {},
	defaultPlacements: [
		{
			area: "toolbar",
			priority: 35,
			subToolbar: CatalogFilterToolbar,
		},
	],
};
```

The component receives `{ ctx: ToolbarContext }`. Use its typed `ctx.pane` to scope the controls to the active Explorer pane. Keep the component container-responsive, keyboard operable, and built from Phoundry UI controls so it follows Phials focus and theme behavior.

The parent command owns discovery and placement. The sub-toolbar owns the temporary interface state and should release observers or other retained resources when it unmounts. Put durable user choices in plugin settings or storage rather than in the component instance.

## Render a custom context-menu control

Use `renderSnippet(ctx)` only when a standard action, boolean row, or submenu cannot represent the interaction. It returns a Svelte `Snippet` that Phials mounts as a custom context-menu row.

Typical examples are an inline rating scale or another compact value control. Keep the shared operation separate:

```ts
async function setRating(ctx: CommandContext, rating: number) {
	await saveRating(ctx.selectedFiles, rating);
}

const rateSelection: Command = {
	id: "acme.catalog.rate-selection",
	label: "Rate selection",
	contextKeys: ["hasSelection", "selectionIsFile"],
	action: (ctx) => openRatingDialog(ctx, setRating),
	renderSnippet: (ctx) => createRatingSnippet({
		label: "Rate selection",
		value: currentRating(ctx.selectedFiles),
		onchange: (rating) => setRating(ctx, rating),
	}),
	defaultPlacements: [
		{
			area: "contextMenu",
			selectionMode: "both",
			order: 30,
		},
	],
};
```

`createRatingSnippet` is plugin-owned Svelte code returning a zero-argument `Snippet`. Arrow, Home, and End move through menu rows while focus remains on the custom-row wrapper. Enter or Space transfers focus into the first enabled control; once inside, the custom control owns its directional keys. `action` remains the standard fallback used by the Command Bar and shortcuts.

A custom control must provide:

- an accessible name and visible state;
- complete keyboard and focus behavior;
- a disabled presentation consistent with `command.disabled(ctx)`;
- safe handling when the selection changes or files disappear;
- success or error feedback for asynchronous work;
- cleanup for every listener or resource it creates.

Custom rows have more accessibility and lifecycle responsibility than standard commands. Prefer a normal command that opens a Phoundry UI dialog when the interaction needs substantial space, validation, or confirmation.

For Svelte and Phoundry UI foundations, see [Use Svelte and Phoundry UI](../../get-started/use-svelte-and-phoundry-ui/index.md).
