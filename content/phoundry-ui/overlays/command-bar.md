---
title: Command Bar
layout: ui
order: 4
---

<script lang="ts">
	import UiDocHeader from '$lib/docs/ui/UiDocHeader.svelte';
	import PropTable from '$lib/docs/ui/PropTable.svelte';
	import type { PropDef } from '$lib/docs/ui/PropTable.svelte';
	import Separator from '$phoundry/components/display/Separator.svelte';
	import CommandBarDemos from '$lib/docs/ui/demos/CommandBarDemos.svelte';

	const componentProps: PropDef[] = [
		{
			name: 'commands',
			type: 'CommandBarCommand[]',
			description: 'Commands shown, filtered, and grouped by `category`.',
			required: true
		},
		{
			name: 'config',
			type: 'CommandBarConfig',
			description: '`onExecute` runs after a command is chosen; optional `onTrackRecent` persists usage for `recentCommandIds`.',
			required: true
		},
		{
			name: 'subgroups',
			type: 'CommandBarSubgroup[]',
			default: '[]',
			description: 'Subgroup rows in the root list; each opens a nested list (`items`) or a custom snippet (`content`).'
		},
		{
			name: 'recentCommandIds',
			type: 'string[]',
			default: '[]',
			description: 'Ordered ids surfaced under the **Recent** heading when the query is empty (commands only).'
		},
		{
			name: 'placeholder',
			type: 'string',
			default: "'Search commands...'",
			description: 'Placeholder on the filter input.'
		}
	];

	const configProps: PropDef[] = [
		{
			name: 'onExecute',
			type: '(command: CommandBarCommand) => void | Promise<void>',
			description: 'Runs after the user confirms a command.',
			required: true
		},
		{
			name: 'onTrackRecent',
			type: '(commandId: string) => void | Promise<void>',
			description: 'Optional hook to persist recency - wire into storage, then feed ids back via `recentCommandIds`.'
		}
	];

	const commandProps: PropDef[] = [
		{ name: 'id', type: 'string', description: 'Unique identifier.', required: true },
		{ name: 'label', type: 'string', description: 'Display label.', required: true },
		{
			name: 'description',
			type: 'string',
			description: 'Optional description shown below the label.'
		},
		{ name: 'icon', type: 'string', description: 'Iconify icon string.' },
		{ name: 'category', type: 'string', description: 'Category for grouping.' },
		{ name: 'shortcut', type: 'string', description: 'Keyboard shortcut hint.' }
	];

	const subgroupProps: PropDef[] = [
		{ name: 'id', type: 'string', description: 'Stable key for the subgroup row.', required: true },
		{ name: 'label', type: 'string', description: 'Root list label.', required: true },
		{ name: 'description', type: 'string', description: 'Optional muted line in the root list.' },
		{ name: 'icon', type: 'string', description: 'Iconify icon string.' },
		{ name: 'category', type: 'string', description: 'Category for grouping in the root list.' },
		{
			name: 'items',
			type: 'CommandBarCommand[]',
			description: 'Commands shown inside the subgroup (exclusive with `content`).'
		},
		{
			name: 'content',
			type: 'Snippet<[CommandBarSubgroupContentContext]>',
			description: 'Custom panel inside the subgroup (exclusive with `items`); use `{@render content(ctx)}` pattern from a snippet prop.'
		}
	];

	const subgroupContextProps: PropDef[] = [
		{ name: 'query', type: 'string', description: 'Current search string (same as the palette input).', required: true },
		{ name: 'subgroupId', type: 'string', description: 'Opened subgroup id.', required: true },
		{ name: 'back', type: '() => void', description: 'Return to the root list without closing.', required: true },
		{ name: 'close', type: '() => void', description: 'Close the command bar.', required: true }
	];
</script>

<UiDocHeader
	title="Command Bar"
	description="Searchable command palette with categories, icons, shortcuts, recent commands, and optional subgroups (nested lists or custom snippet panels)."
	importCode={"import { CommandBar, getCommandBarState } from 'phoundry-ui';"}
/>

<CommandBarDemos />

<Separator />

<PropTable props={componentProps} title="CommandBar Props" />

<PropTable props={configProps} title="CommandBarConfig" />

<PropTable props={commandProps} title="CommandBarCommand" />

<PropTable props={subgroupProps} title="CommandBarSubgroup" />

<PropTable props={subgroupContextProps} title="CommandBarSubgroupContentContext" />

## Usage tips

- Call `getCommandBarState()` to get the singleton - it works from any component.
- The mounted `CommandBar` registers `config` on the shared state - avoid mounting multiple instances with different configs at once.
- Pass `recentCommandIds` plus `config.onTrackRecent` to populate the Recent section (top-level commands only).
- **Root list:** ↑↓ navigate, ↵ runs a command or opens a subgroup.
- **Inside a subgroup with commands:** same navigation; ↵ executes the selected command.
- **Custom subgroup:** arrow navigation is disabled; esc or the back button returns to the root list.
- **Esc** from the root list closes the palette; from a subgroup it goes back first.
