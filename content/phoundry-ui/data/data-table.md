---
title: DataTable
layout: ui
order: 1
status: experimental
---

<script lang="ts">
	import UiDocHeader from '$lib/docs/ui/UiDocHeader.svelte';
	import PropTable from '$lib/docs/ui/PropTable.svelte';
	import type { PropDef } from '$lib/docs/ui/PropTable.svelte';
	import Separator from '$phoundry/components/display/Separator.svelte';
	import DataTableDemos from '$lib/docs/ui/demos/DataTableDemos.svelte';

	const basicCode = `const people = [
  { name: 'Alice Chen', email: 'alice@example.com', role: 'Engineer', status: 'Active' },
  { name: 'Bob Rivera', email: 'bob@example.com', role: 'Designer', status: 'Away' },
  { name: 'Carol Kim', email: 'carol@example.com', role: 'Manager', status: 'Active' },
];

const columns = [
  { id: 'name', header: 'Name', accessorKey: 'name' },
  { id: 'email', header: 'Email', accessorKey: 'email' },
  { id: 'role', header: 'Role', accessorKey: 'role' },
  { id: 'status', header: 'Status', accessorKey: 'status' },
];

<DataTable data={people} columns={columns} striped />`;

	const sortableCode = `const columns = [
  { id: 'name', header: 'Name', accessorKey: 'name', sortable: true },
  { id: 'email', header: 'Email', accessorKey: 'email', sortable: true },
  { id: 'role', header: 'Role', accessorKey: 'role', sortable: true },
  { id: 'status', header: 'Status', accessorKey: 'status' },
];

<DataTable data={people} columns={columns} />`;

	const selectableCode = `let selected = $state<string[]>([]);

<DataTable
  data={people}
  columns={columns}
  selectable
  onSelectionChange={(ids) => selected = ids}
/>`;

	const cellEditorCode = `const statusOptions = [
  { id: 'todo', label: 'Todo', color: '#737373' },
  { id: 'in-progress', label: 'In Progress', color: '#3b82f6' },
];
const tagOptions = [
  { id: 'frontend', label: 'Frontend', color: '#3b82f6' },
  { id: 'backend', label: 'Backend', color: '#22c55e' },
];

const columns = [
  { id: 'title', header: 'Title', accessorKey: 'title',
    cellType: 'text', cellConfig: { placeholder: 'Task title...' } },
  { id: 'status', header: 'Status', accessorKey: 'status',
    cellType: 'status', cellConfig: { options: statusOptions } },
  { id: 'tags', header: 'Tags', accessorKey: 'tags',
    cellType: 'multi-select', cellConfig: { options: tagOptions } },
  { id: 'rating', header: 'Rating', accessorKey: 'rating',
    cellType: 'rating' },
  { id: 'done', header: 'Done', accessorKey: 'done',
    cellType: 'boolean' },
  { id: 'dueDate', header: 'Due', accessorKey: 'dueDate',
    cellType: 'date' },
  { id: 'website', header: 'Link', accessorKey: 'website',
    cellType: 'url' },
];

<DataTable
  data={items}
  columns={columns}
  onCellChange={handleCellChange}
/>`;

	const groupByCode = `<DataTable
  data={taskData}
  columns={taskColumns}
  getRowId={(row) => row.id}
  groupBy="status"
  onCellChange={handleCellChange}
  striped
/>`;

	const relationCode = `const columns = [
  { id: 'name', header: 'Project', accessorKey: 'name',
    cellType: 'text' },
  { id: 'owner', header: 'Owner', accessorKey: 'owner',
    cellType: 'relation',
    cellConfig: { onSearch: searchPeople } },
  { id: 'contributors', header: 'Contributors',
    accessorKey: 'contributors', cellType: 'relation',
    cellConfig: { onSearch: searchPeople } },
];

<DataTable
  data={projects}
  columns={columns}
  onCellChange={handleChange}
/>`;

	const props: PropDef[] = [
		{ name: 'data', type: 'T[]', description: 'Array of row objects.', required: true },
		{
			name: 'columns',
			type: 'ColumnDef<T>[]',
			description: 'Column definitions controlling headers, accessors, and behavior.',
			required: true
		},
		{
			name: 'getRowId',
			type: '(row: T, index: number) => string',
			description: 'Custom row identity function. Defaults to index.'
		},
		{
			name: 'onSortChange',
			type: '(sort) => void',
			description: 'Called when a sortable column header is clicked.'
		},
		{
			name: 'onSelectionChange',
			type: '(ids: Set<string>) => void',
			description: 'Called when row selection changes.'
		},
		{
			name: 'onRowClick',
			type: '(row: T, index: number) => void',
			description: 'Single-click handler for a row.'
		},
		{
			name: 'onRowDblClick',
			type: '(row: T, index: number) => void',
			description: 'Double-click handler for a row.'
		},
		{
			name: 'onCellChange',
			type: '(row: T, column, value) => void',
			description: 'Called when a built-in cell editor changes a value.'
		},
		{
			name: 'selectable',
			type: 'boolean',
			default: 'false',
			description: 'Show selection checkboxes.'
		},
		{ name: 'rowHeight', type: 'number', default: '36', description: 'Row height in pixels.' },
		{ name: 'maxHeight', type: 'number', description: 'Max table height before scrolling.' },
		{
			name: 'virtualScroll',
			type: 'boolean',
			default: 'false',
			description: 'Enable virtual scrolling for large datasets.'
		},
		{
			name: 'striped',
			type: 'boolean',
			default: 'false',
			description: 'Alternate row background colors.'
		},
		{ name: 'bordered', type: 'boolean', default: 'false', description: 'Add cell borders.' },
		{ name: 'compact', type: 'boolean', default: 'false', description: 'Reduce cell padding.' },
		{ name: 'class', type: 'string', description: 'Additional CSS classes.' },
		{
			name: 'groupBy',
			type: 'string',
			description: 'Column id to group rows by. Inserts a header row per group using the same cell visuals in read-only mode. Unknown ids are ignored.'
		},
		{
			name: 'groupHeaderHeight',
			type: 'number',
			description: 'Height in pixels for group header rows when using groupBy (defaults to rowHeight).'
		},
		{
			name: 'groupCell',
			type: 'Snippet',
			description: 'Optional custom renderer for group headers when both groupBy and the cell snippet are set; otherwise a text fallback is used.'
		},
		{
			name: 'cell',
			type: 'Snippet<[value, row, column, rowIndex]>',
			description: 'Overrides built-in cell rendering for every column.'
		},
		{
			name: 'headerCell',
			type: 'Snippet<[ResolvedColumn<T>]>',
			description: 'Custom header cell content per column definition.'
		},
		{
			name: 'empty',
			type: 'Snippet',
			description: 'Shown when `data` is empty.'
		}
	];

	const columnProps: PropDef[] = [
		{ name: 'id', type: 'string', description: 'Unique column identifier.', required: true },
		{ name: 'header', type: 'string', description: 'Column header text.', required: true },
		{ name: 'accessorKey', type: 'keyof T', description: 'Property key to read from each row.' },
		{ name: 'accessorFn', type: '(row: T) => any', description: 'Custom accessor function.' },
		{ name: 'sortFn', type: '(a, b) => number', description: 'Custom sort comparator.' },
		{ name: 'width', type: 'number', description: 'Fixed column width in pixels.' },
		{ name: 'minWidth', type: 'number', description: 'Minimum resize width.' },
		{ name: 'maxWidth', type: 'number', description: 'Maximum resize width.' },
		{ name: 'sortable', type: 'boolean', description: 'Enable sorting for this column.' },
		{ name: 'resizable', type: 'boolean', description: 'Enable column resizing.' },
		{ name: 'align', type: "'left' | 'center' | 'right'", description: 'Cell text alignment.' },
		{
			name: 'cellType',
			type: 'CellType',
			description: 'Built-in cell editor type. Auto-renders matching cell component when no cell snippet is provided.'
		},
		{
			name: 'cellConfig',
			type: 'CellConfig',
			description: 'Configuration object passed to the auto-rendered cell editor (options, placeholder, callbacks, etc.).'
		}
	];
</script>

<UiDocHeader
	title="DataTable"
	description="Rendered table with sorting, row selection, column resizing, and optional virtual scrolling for large datasets."
	importCode={"import { DataTable } from 'phoundry-ui';"}
/>

<DataTableDemos {basicCode} {sortableCode} {selectableCode} {cellEditorCode} {groupByCode} {relationCode} />

<Separator />

<PropTable {props} />

<PropTable props={columnProps} title="ColumnDef" />

<Separator />

## Cell Types

Available `cellType` values:

- `text` - Click-to-edit text input
- `number` - Click-to-edit number (supports decimals)
- `boolean` - Always-interactive checkbox
- `rating` - Always-interactive star rating
- `select` / `status` - Single-select dropdown with colored option pills
- `multi-select` - Multi-select dropdown with colored tags
- `date` - Date/datetime picker with optional end date and time
- `url` - URL display with click-to-edit and external link
- `relation` - Generic link picker with async search

<Separator />

## Usage tips

- For headless usage without the rendered table, use `createTable` from `import { createTable } from 'phoundry-ui'`.
- Enable `virtualScroll` with a `maxHeight` for datasets over a few hundred rows.
- Provide `getRowId` when rows have a natural unique key - it improves selection and reconciliation.
- Combine `striped` and `compact` for dense data displays like logs or analytics.
- Cell editors can also be used standalone via the `cell` snippet: import `CellText`, `CellSelect`, etc. from `'phoundry-ui'`.
