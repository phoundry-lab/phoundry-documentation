---
title: "Use command context and availability"
description: "Uses context keys, when, disabled, selection, target file, current path, and pane context without conflating hidden and disabled states."
ai_disclosure: true
order: 2
---

# Use command context and availability

Use [CommandContext](../../reference/sdk-type-reference/CommandContext.md) to make one command operate on the Explorer state that invoked it. Use availability to hide actions that do not apply, and disabled state to keep a relevant action visible when the user can correct the reason it cannot run yet.

## Read the invocation context

Phials passes the current [CommandContext](../../reference/sdk-type-reference/CommandContext.md) to availability, presentation, state, and action callbacks. Its author-facing fields are:

- `selectedFiles`: the effective Explorer selection, or an empty array;
- `targetFile`: the file the user invoked a context menu on, otherwise the first selected file, or `null`;
- `currentPath`: the current Explorer location;
- `isVial`: whether the current location is inside a Workspace Folder;
- `hasPropertySchema`: whether the current saved-view scope has Workspace Folder properties;
- `activeContextKeys`: the resolved fast-filter keys;
- `pane`: the typed Explorer pane context for the invocation.

Use `targetFile` for an action aimed at the context-menu subject. Use `selectedFiles` for a batch action. Do not assume those values are interchangeable: the target identifies where the gesture began, while the selection defines the complete batch.

Use only fields declared by the synchronized [PluginPaneContext](../../reference/sdk-type-reference/PluginPaneContext.md). Prefer the direct [CommandContext](../../reference/sdk-type-reference/CommandContext.md) fields when they already describe the action's need.

## Filter with context keys first

`contextKeys` is the inexpensive first availability check. Every listed key must be active. Common combinations include:

```ts
const inspectTextFiles: Command = {
	id: "acme.text-tools.inspect",
	label: "Inspect selected text files",
	contextKeys: ["hasSelection", "selectionIsFile"],
	action(ctx) {
		return inspectFiles(ctx.selectedFiles);
	},
};
```

Useful key groups cover:

- no, single, or multiple selected items;
- selections made entirely of files, entirely of folders, or a mixture;
- Workspace Folder context;
- clipboard state;
- back and forward navigation availability.

Use `["always"]`, an omitted field, or an empty array when the command has no fast precondition. Do not combine `"always"` with other keys; it bypasses the key check.

## Refine visibility with `when`

Use `when(ctx)` for a cheap rule that cannot be expressed by context keys:

```ts
const inspectMarkdown: Command = {
	id: "acme.text-tools.inspect-markdown",
	label: "Inspect selected Markdown files",
	contextKeys: ["hasSelection", "selectionIsFile"],
	when: (ctx) =>
		ctx.selectedFiles.every((file) =>
			["md", "markdown", "mdc"].includes(
				file.name.split(".").pop()?.toLowerCase() ?? "",
			),
		),
	action: (ctx) => inspectFiles(ctx.selectedFiles),
};
```

Phials evaluates `when` only after the context-key filter passes. Return `false` to omit the command from the current runtime surface.

Availability predicates must be synchronous, deterministic, and free of side effects. They can run often while selection, navigation, or menus change. Do not read a file, open a dialog, mutate state, or start asynchronous work inside `when`.

## Use `disabled` for a correctable condition

`disabled(ctx)` keeps an available command visible but prevents execution:

```ts
const exportSelection: Command = {
	id: "acme.selection-tools.export",
	label: "Export selection summary",
	contextKeys: ["hasSelection"],
	disabled: (ctx) => ctx.currentPath.length === 0,
	action: (ctx) => exportSummary(ctx.currentPath, ctx.selectedFiles),
};
```

Choose deliberately:

- Hide with `contextKeys` or `when` when the action is irrelevant to the context.
- Disable with `disabled` when the action is relevant and the surrounding interface makes the missing condition understandable.
- Validate again inside `action` when state can change between rendering and execution.

Disabled is not an error-reporting mechanism. If the reason is not visible or recoverable, hiding the action or handling the attempted action with a clear dialog is usually better.

## Adapt presentation without changing identity

Use `presentation(ctx)` when the action is the same but its wording should reflect context:

```ts
const copyNames: Command = {
	id: "acme.selection-tools.copy-names",
	label: "Copy file names",
	description: "Copies the selected file names",
	contextKeys: ["hasSelection"],
	presentation: (ctx) => ({
		label:
			ctx.selectedFiles.length === 1 ?
				"Copy file name"
			:	"Copy file names",
		searchAliases:
			ctx.selectedFiles.length === 1 ?
				["copy filename"]
			:	["copy filenames", "copy selected names"],
	}),
	action: (ctx) => copyNamesToClipboard(ctx.selectedFiles),
};
```

Presentation can supply context-derived `label`, `description`, `tooltip`, `icon`, and `searchAliases`. It cannot hide, disable, or change the command's action, shortcut identity, or stable ID.

Runtime presentation overrides the command's static display fields. An explicit placement value or a user surface customization takes precedence over presentation for that surface. Static settings and customization lists continue to use the command definition's base metadata so their rows do not change while the user edits them.

## Avoid stale context

Use the `ctx` passed to the callback that is currently running. Do not retain a previous [CommandContext](../../reference/sdk-type-reference/CommandContext.md) in plugin storage or use it for later execution. Selection and navigation may have changed.

For an asynchronous action, copy only the stable values it needs before awaiting, then handle paths that disappear or files that change as ordinary runtime failures. See [Work with paths and file entries](../../work-with-phials/work-with-files-and-folders/work-with-paths-and-file-entries.md) for path-safe file operations.
