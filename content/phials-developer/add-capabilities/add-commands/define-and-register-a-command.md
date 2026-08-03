---
title: "Define and register a command"
description: "Creates a stable command identity, action, and CommandProvider, then verifies execution."
ai_disclosure: true
order: 1
---

# Define and register a command

Define a command when the same user action should be available by search, shortcut, or a visible Phials control. Give it one stable identity and one action, then register it through a [CommandProvider](../../reference/sdk-type-reference/CommandProvider.md).

## Add a minimum command

The following `src/main.ts` works with the plugin starter. It adds **Count selected files** to the Command Bar and reports the active Explorer selection.

```ts
import { mount, unmount } from "svelte";

const PLUGIN_ID = "acme.selection-tools";

export default function createPlugin(): PhialsPlugin {
	let api: PluginAPI | undefined;

	const countSelection: Command = {
		id: `${PLUGIN_ID}.count-selection`,
		label: "Count selected files",
		description: "Shows how many files are selected in Explorer",
		icon: "mdi:counter",
		category: "Selection",
		searchAliases: ["selection total", "number of files"],
		contextKeys: ["hasSelection"],
		action(ctx) {
			const count = ctx.selectedFiles.length;
			api?.notify.info(
				`${count} ${count === 1 ? "item" : "items"} selected`,
			);
		},
	};

	const commands: CommandProvider = {
		type: "command",
		id: `${PLUGIN_ID}.commands`,
		name: "Selection Tools commands",
		commands: [countSelection],
	};

	return {
		id: PLUGIN_ID,
		name: "Selection Tools",
		version: "1.0.0",
		onActivate(pluginApi) {
			api = pluginApi;
		},
		onDeactivate() {
			api = undefined;
		},
		providers: [commands],
	};
}

export { mount, unmount };
```

Keep the plugin ID synchronized with `manifest.json`. The provider and command use their own namespaced IDs:

```text
acme.selection-tools
acme.selection-tools.commands
acme.selection-tools.count-selection
```

These IDs are durable state. Phials uses a command ID to associate shortcuts and user surface choices with the same action across releases. Do not generate IDs at startup, reuse an ID for a different action, or change one merely to revise its label.

## Understand the command fields

The minimum useful [Command](../../reference/sdk-type-reference/Command.md) has:

- `id`, a globally unique stable identity;
- `label`, an action-oriented name shown in Phials;
- `action(ctx)`, the function that performs the work.

Add `description`, `icon`, `category`, and `searchAliases` so the command is understandable and searchable. Add `contextKeys`, `when`, and `disabled` when it cannot operate everywhere. Shortcuts and visible placements are optional; a registered, available command is discoverable through the Command Bar without them.

The `action` can be synchronous or return a promise. Await the actual work before returning so Phials knows when execution has completed. Throw when the action fails; do not show a success result after partial or failed work. Use a notification for useful completion feedback and a dialog immediately before consequential work.

The exact fields are listed in the [[Command](../../reference/sdk-type-reference/Command.md) type reference](../../reference/sdk-type-reference/Command.md).

## Register related commands together

A [CommandProvider](../../reference/sdk-type-reference/CommandProvider.md) supplies a named group of commands from one plugin:

```ts
const commands: CommandProvider = {
	type: "command",
	id: "acme.selection-tools.commands",
	name: "Selection Tools commands",
	commands: [countSelection, clearSelection, exportSelection],
};
```

Group commands that share a feature or lifecycle. More than one command provider is useful when a large plugin has independently understandable command families. Provider names help identify provenance in command customization, while each command retains its own identity and behavior.

Phials registers the provider during plugin activation and removes all of its commands during deactivation. Shortcut and placement preferences remain associated with their stable command IDs so they can return when the plugin activates again.

## Build and verify the result

1. Build the plugin and copy its matching release artifacts into the development plugin directory.
2. Enable or reload the plugin.
3. Select one or more files in an Explorer tab.
4. Open the Command Bar and search for **Count selected files**.
5. Run the command.

The command appears only when an item is selected and reports the current count. If it does not appear, confirm that the plugin activated, the command and provider IDs are unique, and the `hasSelection` context is true. Continue with [Use command context and availability](./use-command-context-and-availability.md) before adding more surface placements.
