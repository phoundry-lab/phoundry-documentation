---
title: KanbanBoard
layout: ui
order: 7
---

<script lang="ts">
	import UiDocHeader from '$lib/docs/ui/UiDocHeader.svelte';
	import PropTable from '$lib/docs/ui/PropTable.svelte';
	import type { PropDef } from '$lib/docs/ui/PropTable.svelte';
	import Separator from '$phoundry/components/display/Separator.svelte';
	import KanbanBoardDemos from '$lib/docs/ui/demos/KanbanBoardDemos.svelte';

	const props: PropDef[] = [
		{
			name: 'columns',
			type: 'KanbanColumn[]',
			description: 'Array of columns with their cards.',
			required: true
		},
		{
			name: 'onmove',
			type: '(event: KanbanMoveEvent) => void',
			description: 'Called after a reorder or cross-column drop. Omit only for read-only previews.'
		},
		{
			name: 'onadd',
			type: '(columnId: string) => void',
			description: 'When set, each column shows an “Add card” footer that passes its column id.'
		},
		{
			name: 'columnHeader',
			type: 'Snippet<[KanbanColumn]>',
			description: 'Replace the default header row (dot, title, count).'
		},
		{ name: 'class', type: 'string', description: 'Additional CSS classes on the horizontal scroller.' },
		{
			name: 'card',
			type: 'Snippet<[KanbanCard, columnId: string]>',
			description: 'Custom card body; you still get drag handles via the outer `dndItem` wrapper.'
		}
	];

	const columnProps: PropDef[] = [
		{ name: 'id', type: 'string', description: 'Unique column identifier.', required: true },
		{ name: 'title', type: 'string', description: 'Column header text.', required: true },
		{ name: 'cards', type: 'KanbanCard[]', description: 'Cards in this column.', required: true },
		{ name: 'color', type: 'string', description: 'Accent color for the column header.' }
	];

	const cardProps: PropDef[] = [
		{ name: 'id', type: 'string', description: 'Unique card identifier.', required: true },
		{ name: 'title', type: 'string', description: 'Card title text.', required: true },
		{ name: 'description', type: 'string', description: 'Optional card description.' },
		{
			name: 'labels',
			type: '{ text: string; color: string }[]',
			description: 'Optional label tags with text and color.'
		}
	];

	const moveEventProps: PropDef[] = [
		{ name: 'card', type: 'KanbanCard', description: 'The card being moved.', required: true },
		{ name: 'fromColumnId', type: 'string', description: 'Source column ID.', required: true },
		{
			name: 'fromIndex',
			type: 'number',
			description: 'Original index in source column.',
			required: true
		},
		{ name: 'toColumnId', type: 'string', description: 'Target column ID.', required: true },
		{
			name: 'toIndex',
			type: 'number',
			description: 'Target index in destination column.',
			required: true
		}
	];
</script>

<UiDocHeader
	title="KanbanBoard"
	description="Drag-and-drop kanban board with columns, cards, labels, and custom card rendering."
	importCode={"import { KanbanBoard } from 'phoundry-ui';"}
/>

<KanbanBoardDemos />

<Separator />

<PropTable {props} />

<PropTable props={columnProps} title="KanbanColumn" />

<PropTable props={cardProps} title="KanbanCard" />

<PropTable props={moveEventProps} title="KanbanMoveEvent" />

## Usage tips

- The `onmove` handler receives the full move event - you're responsible for updating column state immutably.
- Use the `card` snippet prop for custom card rendering (e.g. avatars, due dates, priority indicators).
- Column `color` is rendered as a header accent - use brand or status colors to differentiate lanes.
- Cards support `labels` for lightweight categorization displayed as tags.
- `DndGhost` and `DndIndicator` ship inside the component - import bundled styles so drag visuals match other DnD surfaces.
