---
title: TreeView
layout: ui
order: 2
---

<script lang="ts">
	import UiDocHeader from '$lib/docs/ui/UiDocHeader.svelte';
	import PropTable from '$lib/docs/ui/PropTable.svelte';
	import type { PropDef } from '$lib/docs/ui/PropTable.svelte';
	import Separator from '$phoundry/components/display/Separator.svelte';
	import TreeViewDemos from '$lib/docs/ui/demos/TreeViewDemos.svelte';

	const basicCode = `<TreeView
  nodes={fileTree}
  bind:selected={selectedIds}
  onselect={(ids) => (selectedIds = ids)}
/>`;

	const multiCode = `<TreeView
  nodes={fileTree}
  bind:selected={selectedIds}
  multiSelect
/>`;

	const expandedCode = `<TreeView
  nodes={fileTree}
  bind:expanded={openFolders}
  bind:selected={selectedIds}
/>`;

	const virtualCode = `<TreeView
  nodes={manyChildrenUnderOneFolder}
  bind:expanded={expanded}
  bind:selected={selected}
  virtualScroll
  maxHeight={220}
  itemHeight={28}
/>`;

	const props: PropDef[] = [
		{
			name: 'nodes',
			type: 'TreeNode<T>[]',
			description: 'Root nodes of the tree.',
			required: true
		},
		{
			name: 'selected',
			type: 'string[]',
			description: 'Selected node IDs. Bindable when you need two-way updates.'
		},
		{
			name: 'expanded',
			type: 'string[]',
			description: 'Expanded branch node IDs. Bindable for controlled expand/collapse.'
		},
		{
			name: 'onselect',
			type: '(ids: string[]) => void',
			description: 'Called when selection changes (click or keyboard).'
		},
		{
			name: 'onexpand',
			type: '(ids: string[]) => void',
			description: 'Called when expanded set changes.'
		},
		{
			name: 'onactivate',
			type: '(node: TreeNode<T>) => void',
			description: 'Called on double-click on a node, or Enter on a leaf/focused row (see implementation).'
		},
		{
			name: 'multiSelect',
			type: 'boolean',
			default: 'false',
			description: 'Cmd/Ctrl-click toggles selection; Shift-click selects ranges.'
		},
		{
			name: 'showIndentGuides',
			type: 'boolean',
			default: 'true',
			description: 'Vertical guide lines for depth.'
		},
		{
			name: 'indentWidth',
			type: 'number',
			default: '20',
			description: 'Pixels per depth level for indentation.'
		},
		{
			name: 'itemHeight',
			type: 'number',
			default: '28',
			description: 'Row height in px (also used with virtual scrolling).'
		},
		{
			name: 'virtualScroll',
			type: 'boolean',
			default: 'false',
			description: 'Window rendering for large flat lists under expanded branches.'
		},
		{
			name: 'maxHeight',
			type: 'number',
			description: 'Optional max height in px; inner area scrolls.'
		},
		{ name: 'class', type: 'string', description: 'Classes on the scroll container.' },
		{
			name: 'nodeContent',
			type: 'Snippet<[TreeNode<T>, depth, isExpanded, isSelected]>',
			description: 'Replace default label/icon row for a node.'
		}
	];

	const nodeProps: PropDef[] = [
		{ name: 'id', type: 'string', description: 'Unique node identifier.', required: true },
		{ name: 'label', type: 'string', description: 'Display text.', required: true },
		{ name: 'icon', type: 'string', description: 'Iconify icon string.' },
		{ name: 'children', type: 'TreeNode<T>[]', description: 'Child nodes.' },
		{ name: 'data', type: 'T', description: 'Opaque payload on the node.' },
		{ name: 'disabled', type: 'boolean', description: 'Exclude from selection and gray out.' }
	];
</script>

<UiDocHeader
	title="TreeView"
	description="Hierarchical tree with expand/collapse, single or multi-selection, keyboard navigation, optional virtual scrolling for large lists, and custom row rendering."
	importCode={"import { TreeView } from 'phoundry-ui';\nimport type { TreeNode } from 'phoundry-ui';"}
/>

<TreeViewDemos {basicCode} {multiCode} {expandedCode} {virtualCode} />

<Separator />

<PropTable {props} />

<PropTable props={nodeProps} title="TreeNode" />

<Separator />

## Usage tips

- Use `nodeContent` when you need badges, secondary lines, or actions inside each row while keeping expand/collapse behavior.
- Set `showIndentGuides={false}` for a flatter explorer-style list.
- `disabled` on a node prevents selection and dims the row; expand chevrons remain for folders unless you hide them via custom content.
- Icons use Iconify strings (same as elsewhere in the library).
