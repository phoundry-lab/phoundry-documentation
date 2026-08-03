---
title: "Make commands discoverable and add shortcuts"
description: "Supplies labels, descriptions, categories, search aliases, icons, and default shortcuts for the Command Bar and shortcut settings."
ai_disclosure: true
order: 3
---

# Make commands discoverable and add shortcuts

Make every command understandable in the Command Bar before assigning it a shortcut or visible placement. Good discovery metadata lets users find an action by the words they already know and decide what it will do before running it.

## Write static discovery metadata

Start with the command's base presentation:

```ts
const copyNames: Command = {
	id: "acme.selection-tools.copy-names",
	label: "Copy file names",
	description: "Copies the selected file names to the clipboard",
	tooltip: "Copy selected file names",
	icon: "mdi:content-copy",
	category: "File",
	searchAliases: ["copy filenames", "path names", "selected names"],
	contextKeys: ["hasSelection"],
	action: (ctx) => copyNamesToClipboard(ctx.selectedFiles),
};
```

Use these fields consistently:

- `label`: a short verb-object action, such as **Copy file names**;
- `description`: the result or scope needed to distinguish similar actions;
- `tooltip`: concise hover help when the label alone is insufficient;
- `icon`: one Iconify identifier that represents the action rather than the plugin;
- `category`: a stable, recognizable Command Bar and shortcut-settings grouping;
- `searchAliases`: alternate vocabulary, abbreviations, and likely queries that are not already in the label or description.

Do not repeat the label as every alias. Avoid stuffing hidden technical names into search. Prefer the terms users see in Phials and the file format or workflow they are acting on.

Use `presentation(ctx)` for a runtime label, description, tooltip, icon, or aliases that genuinely depend on the current context. Keep the static fields as the clear context-neutral version used in settings and customization lists. See [Use command context and availability](./use-command-context-and-availability.md).

## Add a default shortcut

A command shortcut is a default that users can change. Add one only when the action is frequent, safe to invoke from the keyboard, and unlikely to conflict with familiar app or platform behavior.

```ts
const quickAdd: Command = {
	id: "acme.tasks.quick-add",
	label: "Quick add task",
	description: "Adds a task to the active list",
	category: "Tasks",
	searchAliases: ["new task", "capture task"],
	contextKeys: ["always"],
	shortcut: {
		defaults: ["CmdOrCtrl+Shift+A"],
	},
	action: () => openQuickAdd(),
};
```

`CmdOrCtrl` resolves to Command on macOS and Control on Windows and Linux. Use a platform map when established conventions differ:

```ts
shortcut: {
	defaults: [
		{
			mac: "Cmd+Shift+K",
			windows: "Ctrl+Shift+K",
			linux: "Ctrl+Shift+K",
		},
	],
}
```

A command can declare up to three default bindings. Keep the first binding the primary one and use additional bindings only for a real platform or workflow convention.

## Preserve user control and conflict safety

Defaults do not reserve keys. Users can change, remove, or restore a binding in shortcut settings, and Phials associates that choice with the stable command identity.

When two commands claim the same key, Phials resolves the active binding by shortcut priority and reports the conflict in customization. Leave `priority` at its default for ordinary plugin commands. Raise it only when two commands intentionally share a key and the more specific context must win:

```ts
shortcut: {
	defaults: ["CmdOrCtrl+Enter"],
	priority: 10,
}
```

Context keys and `when` determine whether the shortcut is active. `disabled` is checked again at execution, so a visible disabled command does not become executable through its shortcut.

By default, Phials prevents the browser or operating-system-style default after handling a shortcut. Set `allowDefault: true` only when the command is deliberately additive and the other behavior must also run. Most commands should omit it.

## Test discovery from several states

Verify the command with:

1. an empty Command Bar query;
2. its label, an alias, and a common misspecification of the task;
3. every selection or navigation state that changes availability or presentation;
4. its default shortcut on each supported platform;
5. a user override and a deliberate conflict;
6. plugin deactivation and reactivation.

The command should remain identifiable by the same base metadata in settings, even when runtime presentation changes. Its shortcut should run the same action with the same current [CommandContext](../../reference/sdk-type-reference/CommandContext.md) as any visible surface.
