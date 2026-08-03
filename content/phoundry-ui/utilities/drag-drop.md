---
title: Drag & Drop
layout: ui
order: 5
---

<script lang="ts">
	import UiDocHeader from '$lib/docs/ui/UiDocHeader.svelte';
	import PropTable from '$lib/docs/ui/PropTable.svelte';
	import type { PropDef } from '$lib/docs/ui/PropTable.svelte';
	import Separator from '$phoundry/components/display/Separator.svelte';
	import DragDropDemos from '$lib/docs/ui/demos/DragDropDemos.svelte';

	const listProps: PropDef[] = [
		{ name: 'id', type: 'string', required: true, description: 'Unique list id (also `data-dnd-list`).' },
		{
			name: 'axis',
			type: "'x' | 'y'",
			default: "'y'",
			description: 'Primary axis for insertion hints (horizontal tabs vs vertical lists).'
		},
		{
			name: 'acceptFrom',
			type: 'string[]',
			description: 'Source list ids allowed to drop here. Omit for unrestricted cross-list drops.'
		},
		{
			name: 'sourceOnly',
			type: 'boolean',
			description: 'If true, items can be dragged out but this list does not accept reorder/drops.'
		},
		{
			name: 'showZoneIndicator',
			type: 'boolean',
			default: 'true',
			description: 'Dashed outline on list hover during drag; set false for compact chrome (tabs, sidebars).'
		},
		{
			name: 'onReorder',
			type: '(fromIndex, toIndex) => void',
			description: 'Same-list reorder after drop.'
		},
		{
			name: 'onReceive',
			type: '(item, fromListId, toIndex) => void',
			description: 'Cross-list: item landed in this list (pair with source `onRemove`).'
		},
		{
			name: 'onRemove',
			type: '(item) => void',
			description: 'Cross-list: item left this list toward another registered list.'
		}
	];

	const itemProps: PropDef[] = [
		{ name: 'id', type: 'string | number', required: true, description: 'Stable item id (`data-dnd-item`).' },
		{
			name: 'data',
			type: 'DndItemData',
			description: 'Payload passed to receivers (defaults to `{ id }`).'
		},
		{ name: 'disabled', type: 'boolean', description: 'If true, item does not start a drag.' },
		{
			name: 'dragHandle',
			type: 'string',
			description: 'CSS selector for the drag handle within the item. Omit to drag from the whole item.'
		},
		{
			name: 'dragThreshold',
			type: 'number',
			default: '5',
			description: 'Pointer movement (px) before a drag starts.'
		},
		{
			name: 'onClickWithoutDrag',
			type: '() => void',
			description: 'Called on pointer up when movement stayed below dragThreshold (also when disabled).'
		},
		{
			name: 'onDragStart',
			type: '() => void',
			description: 'Called once when dragThreshold is crossed and a drag begins.'
		}
	];
</script>

<UiDocHeader
	title="Drag & Drop"
	description="Svelte 5 attachment-based sortable lists with a shared ghost and drop indicator. Cross-list moves use onRemove / onReceive. OS file drops use the DropZone component."
	importCode={"import { dndList, dndItem, DndGhost, DndIndicator } from 'phoundry-ui';"}
/>

<DragDropDemos />

<section class="space-y-2 rounded border border-border-muted bg-surface-sunken/50 p-4">
	<h3 class="text-sm font-medium text-txt-primary">OS file drops</h3>
	<p class="text-xs text-txt-secondary">
		Use <code>DropZone</code> from phoundry-ui for file pick / drag-in uploads - it is separate from list reordering DnD.
	</p>
</section>

<Separator />
<PropTable props={listProps} title="DndListOptions" />

<Separator />
<PropTable props={itemProps} title="DndItemOptions" />

## Usage notes

- Mount `DndGhost` and `DndIndicator` once per layout surface that uses this kit (the docs page mounts them below the examples).
- Attach `dndList` on the scroll/container that wraps draggable rows; attach `dndItem` on each row (up to three levels of wrapper depth are considered when resolving drop slots).
- Interactive controls inside a row (buttons, inputs, links) block drag initiation unless wrapped outside the hit-tested subtree per `dndItem` rules.
- `KanbanBoard` composes these attachments for multi-column cards.
