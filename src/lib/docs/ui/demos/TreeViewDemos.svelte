<script lang="ts">
	import Example from '$lib/docs/ui/Example.svelte';
	import { TreeView } from '$phoundry/data/tree-view/index.js';
	import type { TreeNode } from '$phoundry/data/tree-view/index.js';

	interface Props {
		basicCode: string;
		multiCode: string;
		expandedCode: string;
		virtualCode: string;
	}

	let { basicCode, multiCode, expandedCode, virtualCode }: Props = $props();

	const fileTree: TreeNode[] = [
		{
			id: 'src',
			label: 'src',
			icon: 'carbon:folder',
			children: [
				{
					id: 'src/lib',
					label: 'lib',
					icon: 'carbon:folder',
					children: [
						{ id: 'src/lib/index.ts', label: 'index.ts', icon: 'carbon:document' },
						{ id: 'src/lib/utils.ts', label: 'utils.ts', icon: 'carbon:document' }
					]
				},
				{
					id: 'src/routes',
					label: 'routes',
					icon: 'carbon:folder',
					children: [
						{ id: 'src/routes/+page.svelte', label: '+page.svelte', icon: 'carbon:document' },
						{ id: 'src/routes/+layout.svelte', label: '+layout.svelte', icon: 'carbon:document' }
					]
				}
			]
		},
		{ id: 'package.json', label: 'package.json', icon: 'carbon:document' },
		{ id: 'README.md', label: 'README.md', icon: 'carbon:document' }
	];

	const flatChildren: TreeNode[] = Array.from({ length: 60 }, (_, i) => ({
		id: `big-${i}`,
		label: `item-${i}.ts`,
		icon: 'carbon:document'
	}));

	const bigTree: TreeNode[] = [
		{ id: 'big-root', label: 'large-folder', icon: 'carbon:folder', children: flatChildren }
	];

	let basicSelected = $state<string[]>([]);
	let multiSelected = $state<string[]>([]);
	let expandedControlled = $state<string[]>(['src']);
	let vsExpanded = $state<string[]>(['big-root']);
	let vsSelected = $state<string[]>([]);
</script>

<div class="max-w-3xl space-y-8">
	<p class="-mt-4 text-xs text-txt-secondary">
		<strong class="text-txt-primary">Usage:</strong>
		Focus the tree and use arrow keys to move;
		<code>→</code>/<code>←</code>
		expand or collapse branches;
		<code>*</code>
		expands all siblings at the current depth. There are no built-in checkboxes,- selection is highlight-based; pair with your own UI if you need explicit checkbox affordances.
	</p>
	<Example title="Basic (single select)" code={basicCode}>
		<div class="max-w-xs">
			<TreeView
				nodes={fileTree}
				selected={basicSelected}
				onselect={(ids: string[]) => {
					basicSelected = ids;
				}}
			/>
		</div>
		<p class="mt-2 text-xs text-txt-tertiary">
			Selected: {basicSelected.length ? basicSelected.join(', ') : 'none'}
		</p>
	</Example>
	<Example title="Multi-select" code={multiCode}>
		<p class="mb-2 text-xs text-txt-secondary">Cmd/Ctrl-click toggles; Shift-click extends the range from the last selection.</p>
		<div class="max-w-xs">
			<TreeView
				nodes={fileTree}
				selected={multiSelected}
				onselect={(ids: string[]) => {
					multiSelected = ids;
				}}
				multiSelect
			/>
		</div>
		<p class="mt-2 text-xs text-txt-tertiary">
			Selected: {multiSelected.length ? multiSelected.join(', ') : 'none'}
		</p>
	</Example>
	<Example title="Controlled expanded state" code={expandedCode}>
		<p class="mb-2 text-xs text-txt-secondary">Keep <code>expanded</code> in your store so folders stay open across navigations.</p>
		<div class="max-w-xs">
			<TreeView
				nodes={fileTree}
				selected={basicSelected}
				bind:expanded={expandedControlled}
				onselect={(ids: string[]) => {
					basicSelected = ids;
				}}
			/>
		</div>
		<p class="mt-2 text-[11px] text-txt-tertiary">Expanded IDs: {expandedControlled.join(', ') || '(none)'}</p>
	</Example>
	<Example title="Virtual scroll" code={virtualCode}>
		<p class="mb-2 text-xs text-txt-secondary">
			Enable <code>virtualScroll</code> when an expanded branch can contain hundreds of rows. Set <code>maxHeight</code> so the tree gets a scrollable viewport.
		</p>
		<TreeView
			nodes={bigTree}
			selected={vsSelected}
			bind:expanded={vsExpanded}
			onselect={(ids: string[]) => {
				vsSelected = ids;
			}}
			virtualScroll
			maxHeight={220}
			itemHeight={28}
			class="rounded-lg border border-border-muted"
		/>
	</Example>
</div>
