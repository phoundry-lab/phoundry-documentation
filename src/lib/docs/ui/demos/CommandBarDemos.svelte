<script lang="ts">
	import Example from '$lib/docs/ui/Example.svelte';
	import Button from '$phoundry/components/buttons/Button.svelte';
	import { PhiIcons } from '$phoundry/icons.js';
	import { CommandBar, getCommandBarState } from '$phoundry/overlay/command-bar/index.js';
	import type { CommandBarCommand, CommandBarConfig, CommandBarSubgroup, CommandBarSubgroupContentContext } from '$phoundry/overlay/command-bar/index.js';

	const barState = getCommandBarState();

	let lastExecuted = $state('');

	const commands: CommandBarCommand[] = [
		{
			id: 'new-file',
			label: 'New File',
			description: 'Create a new file',
			icon: PhiIcons.document,
			category: 'File',
			shortcut: '⌘N'
		},
		{
			id: 'open-file',
			label: 'Open File',
			description: 'Open an existing file',
			icon: PhiIcons.folder,
			category: 'File',
			shortcut: '⌘O'
		},
		{
			id: 'save',
			label: 'Save',
			description: 'Save current file',
			icon: PhiIcons.edit,
			category: 'File',
			shortcut: '⌘S'
		},
		{
			id: 'search',
			label: 'Search',
			description: 'Search across files',
			icon: PhiIcons.search,
			category: 'Edit',
			shortcut: '⌘⇧F'
		},
		{
			id: 'settings',
			label: 'Settings',
			description: 'Open application settings',
			icon: PhiIcons.info,
			category: 'App'
		},
		{
			id: 'theme',
			label: 'Toggle Theme',
			description: 'Switch between light and dark',
			icon: PhiIcons.refresh,
			category: 'App'
		}
	];

	const itemSubgroups: CommandBarSubgroup[] = [
		{
			id: 'file-more',
			label: 'More file actions',
			description: 'Open nested file commands',
			icon: PhiIcons.folder,
			category: 'File',
			items: [
				{
					id: 'revert',
					label: 'Revert file',
					description: 'Discard unsaved changes',
					icon: PhiIcons.refresh,
					category: 'File'
				},
				{
					id: 'rename',
					label: 'Rename…',
					icon: PhiIcons.edit,
					category: 'File'
				}
			]
		}
	];

	let recentIds = $state<string[]>(['save', 'search']);

	const barConfig: CommandBarConfig = {
		onExecute: (cmd) => {
			lastExecuted = cmd.label;
		},
		onTrackRecent: async (id) => {
			recentIds = [id, ...recentIds.filter((x) => x !== id)].slice(0, 5);
		}
	};

	const basicCode = `const barState = getCommandBarState();

const commands: CommandBarCommand[] = [
  { id: 'new', label: 'New File', icon: PhiIcons.document, category: 'File', shortcut: '⌘N' },
  { id: 'search', label: 'Search', icon: PhiIcons.search, category: 'Edit', shortcut: '⌘⇧F' },
];

const config = {
  onExecute: (cmd) => run(cmd),
  onTrackRecent: async (id) => persistRecent(id),
};

// Root layout:
<CommandBar {commands} {config} recentCommandIds={recentIds} />

// Anywhere:
barState.open();`;

	const recentCode = `const barConfig = {
  onExecute: (cmd) => run(cmd),
  onTrackRecent: async (id) => saveRecent(id),
};

<CommandBar commands={commands} config={barConfig} recentCommandIds={recentIds} />`;

	const subgroupCode = `const itemSubgroups: CommandBarSubgroup[] = [
  {
    id: 'file-more',
    label: 'More file actions',
    icon: PhiIcons.folder,
    category: 'File',
    items: [
      { id: 'revert', label: 'Revert file', icon: PhiIcons.refresh, category: 'File' },
    ],
  },
];

{#snippet toolsPanel(ctx)}
  <div class="p-2 text-xs">
    <p>Query: {ctx.query}</p>
    <button type="button" onclick={() => ctx.back()}>Back</button>
  </div>
{/snippet}

<CommandBar
  {commands}
  {config}
  subgroups={[
    ...itemSubgroups,
    { id: 'tools', label: 'Custom panel', category: 'App', content: toolsPanel },
  ]}
/>`;
</script>

{#snippet customToolsPanel(ctx: CommandBarSubgroupContentContext)}
	<div class="flex flex-col gap-2 p-2 text-xs text-txt-secondary">
		<p>
			Subgroup <code class="text-txt-primary">{ctx.subgroupId}</code> - filter:
			<code class="text-txt-primary">{ctx.query || '(empty)'}</code>
		</p>
		<div class="flex flex-wrap gap-2">
			<Button size="sm" onclick={() => ctx.back()}>ctx.back()</Button>
			<Button size="sm" onclick={() => ctx.close()}>ctx.close()</Button>
		</div>
	</div>
{/snippet}

<div class="space-y-8">
	<Example title="Basic Usage" code={basicCode}>
		<div class="flex items-center gap-3">
			<Button onclick={() => barState.open()}>Open Command Bar</Button>
			{#if lastExecuted}
				<span class="text-xs text-txt-secondary">Executed: {lastExecuted}</span>
			{/if}
		</div>
	</Example>

	<Example title="Recent commands" code={recentCode}>
		<p class="mb-2 text-xs text-txt-secondary">
			Open the palette and run a command - executed ids bubble to the Recent group via <code>onTrackRecent</code>.
		</p>
		<div class="flex items-center gap-2">
			<Button onclick={() => barState.open()}>Open palette</Button>
			<span class="text-[11px] text-txt-tertiary">recent: {recentIds.join(', ')}</span>
		</div>
	</Example>

	<Example title="Subgroups" code={subgroupCode}>
		<p class="mb-2 text-xs text-txt-secondary">
			Subgroups appear in the root list with a chevron. Choose one to drill in; <strong>Esc</strong> or the back control returns to the root. Use a
			<code>content</code> snippet for a fully custom panel instead of command rows.
		</p>
		<div class="flex items-center gap-2">
			<Button onclick={() => barState.open()}>Open palette (with subgroups)</Button>
		</div>
	</Example>

	<CommandBar
		{commands}
		config={barConfig}
		recentCommandIds={recentIds}
		subgroups={[
			...itemSubgroups,
			{
				id: 'tools-custom',
				label: 'Custom tools panel',
				description: 'Snippet instead of commands',
				icon: PhiIcons.info,
				category: 'App',
				content: customToolsPanel
			}
		]}
	/>
</div>
