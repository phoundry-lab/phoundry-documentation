<script lang="ts">
	import Example from '$lib/docs/ui/Example.svelte';
	import Separator from '$phoundry/components/display/Separator.svelte';
	import { DataTable } from '$phoundry/data/data-table/index.js';
	import type { ColumnDef, CellOption, CellRelationItem } from '$phoundry/data/data-table/index.js';

	interface Props {
		basicCode: string;
		sortableCode: string;
		selectableCode: string;
		cellEditorCode: string;
		groupByCode: string;
		relationCode: string;
	}

	let { basicCode, sortableCode, selectableCode, cellEditorCode, groupByCode, relationCode }: Props = $props();

	type Person = { name: string; email: string; role: string; status: string };

	const people: Person[] = [
		{ name: 'Alice Chen', email: 'alice@example.com', role: 'Engineer', status: 'Active' },
		{ name: 'Bob Rivera', email: 'bob@example.com', role: 'Designer', status: 'Away' },
		{ name: 'Carol Kim', email: 'carol@example.com', role: 'Manager', status: 'Active' },
		{ name: 'Dan Okafor', email: 'dan@example.com', role: 'Engineer', status: 'Offline' }
	];

	const basicColumns = [
		{ id: 'name', header: 'Name', accessorKey: 'name' as const },
		{ id: 'email', header: 'Email', accessorKey: 'email' as const },
		{ id: 'role', header: 'Role', accessorKey: 'role' as const },
		{ id: 'status', header: 'Status', accessorKey: 'status' as const }
	];

	const sortableColumns = [
		{ id: 'name', header: 'Name', accessorKey: 'name' as const, sortable: true },
		{ id: 'email', header: 'Email', accessorKey: 'email' as const, sortable: true },
		{ id: 'role', header: 'Role', accessorKey: 'role' as const, sortable: true },
		{ id: 'status', header: 'Status', accessorKey: 'status' as const }
	];

	let selected = $state<Set<string>>(new Set());

	interface TaskRow {
		id: string;
		title: string;
		status: string;
		priority: string;
		tags: string[];
		rating: number;
		done: boolean;
		dueDate: number | undefined;
		website: string;
		estimate: number | undefined;
	}

	const statusOptions: CellOption[] = [
		{ id: 'todo', label: 'Todo', color: '#737373' },
		{ id: 'in-progress', label: 'In Progress', color: '#3b82f6' },
		{ id: 'review', label: 'Review', color: '#f59e0b' },
		{ id: 'done', label: 'Done', color: '#22c55e' }
	];

	const priorityOptions: CellOption[] = [
		{ id: 'low', label: 'Low', color: '#06b6d4' },
		{ id: 'medium', label: 'Medium', color: '#f97316' },
		{ id: 'high', label: 'High', color: '#ef4444' },
		{ id: 'critical', label: 'Critical', color: '#8b5cf6' }
	];

	const tagOptions: CellOption[] = [
		{ id: 'frontend', label: 'Frontend', color: '#3b82f6' },
		{ id: 'backend', label: 'Backend', color: '#22c55e' },
		{ id: 'design', label: 'Design', color: '#ec4899' },
		{ id: 'devops', label: 'DevOps', color: '#f97316' },
		{ id: 'docs', label: 'Docs', color: '#8b5cf6' }
	];

	let taskData = $state<TaskRow[]>([
		{
			id: '1',
			title: 'Build DataTable cell editors',
			status: 'in-progress',
			priority: 'high',
			tags: ['frontend'],
			rating: 4,
			done: false,
			dueDate: Date.now() + 86400000 * 3,
			website: 'https://svelte.dev',
			estimate: 8
		},
		{
			id: '2',
			title: 'Write documentation',
			status: 'todo',
			priority: 'medium',
			tags: ['docs'],
			rating: 0,
			done: false,
			dueDate: undefined,
			website: '',
			estimate: 4
		},
		{
			id: '3',
			title: 'Deploy staging environment',
			status: 'done',
			priority: 'low',
			tags: ['devops', 'backend'],
			rating: 5,
			done: true,
			dueDate: Date.now() - 86400000,
			website: 'https://staging.example.com',
			estimate: 2
		},
		{
			id: '4',
			title: 'Design system review',
			status: 'review',
			priority: 'medium',
			tags: ['design', 'frontend'],
			rating: 3,
			done: false,
			dueDate: Date.now() + 86400000 * 7,
			website: '',
			estimate: undefined
		},
		{
			id: '5',
			title: 'API rate limiting',
			status: 'todo',
			priority: 'critical',
			tags: ['backend'],
			rating: 0,
			done: false,
			dueDate: undefined,
			website: '',
			estimate: 6
		}
	]);

	const taskColumns: ColumnDef<TaskRow>[] = [
		{
			id: 'title',
			header: 'Title',
			accessorKey: 'title',
			sortable: true,
			width: 220,
			cellType: 'text',
			cellConfig: { placeholder: 'Task title...' }
		},
		{
			id: 'status',
			header: 'Status',
			accessorKey: 'status',
			sortable: true,
			width: 140,
			cellType: 'status',
			cellConfig: { options: statusOptions }
		},
		{
			id: 'priority',
			header: 'Priority',
			accessorKey: 'priority',
			width: 130,
			cellType: 'select',
			cellConfig: { options: priorityOptions }
		},
		{
			id: 'tags',
			header: 'Tags',
			accessorKey: 'tags',
			width: 180,
			cellType: 'multi-select',
			cellConfig: { options: tagOptions }
		},
		{ id: 'rating', header: 'Rating', accessorKey: 'rating', width: 120, cellType: 'rating' },
		{
			id: 'done',
			header: 'Done',
			accessorKey: 'done',
			width: 70,
			align: 'center',
			cellType: 'boolean'
		},
		{
			id: 'estimate',
			header: 'Hours',
			accessorKey: 'estimate',
			width: 90,
			cellType: 'number',
			cellConfig: { placeholder: '0' }
		},
		{
			id: 'dueDate',
			header: 'Due Date',
			accessorKey: 'dueDate',
			width: 160,
			cellType: 'date',
			cellConfig: { placeholder: 'Set date...', dateRange: true }
		},
		{
			id: 'website',
			header: 'Link',
			accessorKey: 'website',
			width: 180,
			cellType: 'url',
			cellConfig: { placeholder: 'https://...' }
		}
	];

	function handleCellChange(row: TaskRow, column: ColumnDef<TaskRow>, value: unknown) {
		const idx = taskData.findIndex((r) => r.id === row.id);
		if (idx < 0) return;
		const key = column.accessorKey as keyof TaskRow;
		if (!key) return;
		let resolved = value;
		if (column.cellType === 'date' && typeof value === 'object' && value !== null) {
			resolved = (value as { value: number | undefined }).value;
		}
		const updated = { ...taskData[idx], [key]: resolved };
		taskData = [...taskData.slice(0, idx), updated, ...taskData.slice(idx + 1)];
	}

	const allPeople: CellRelationItem[] = [
		{ id: 'p1', label: 'Alice Chen', icon: 'carbon:user' },
		{ id: 'p2', label: 'Bob Rivera', icon: 'carbon:user' },
		{ id: 'p3', label: 'Carol Kim', icon: 'carbon:user' },
		{ id: 'p4', label: 'Dan Okafor', icon: 'carbon:user' },
		{ id: 'p5', label: 'Eve Santos', icon: 'carbon:user' },
		{ id: 'p6', label: 'Frank Wu', icon: 'carbon:user' },
		{ id: 'p7', label: 'Grace Lee', icon: 'carbon:user' },
		{ id: 'p8', label: 'Hiro Tanaka', icon: 'carbon:user' }
	];

	async function searchPeople(query: string): Promise<CellRelationItem[]> {
		await new Promise((r) => setTimeout(r, 150));
		if (!query) return allPeople;
		return allPeople.filter((p) => p.label.toLowerCase().includes(query.toLowerCase()));
	}

	interface ProjectRow {
		id: string;
		name: string;
		owner: CellRelationItem[];
		contributors: CellRelationItem[];
		status: string;
	}

	let projectData = $state<ProjectRow[]>([
		{
			id: 'r1',
			name: 'phoundry-ui',
			owner: [allPeople[0]],
			contributors: [allPeople[0], allPeople[2]],
			status: 'active'
		},
		{
			id: 'r2',
			name: 'phials-core',
			owner: [allPeople[1]],
			contributors: [allPeople[1], allPeople[3], allPeople[4]],
			status: 'active'
		},
		{ id: 'r3', name: 'pheeder', owner: [], contributors: [allPeople[5]], status: 'paused' }
	]);

	const projectStatusOpts: CellOption[] = [
		{ id: 'active', label: 'Active', color: '#22c55e' },
		{ id: 'paused', label: 'Paused', color: '#f59e0b' },
		{ id: 'archived', label: 'Archived', color: '#737373' }
	];

	const projectColumns: ColumnDef<ProjectRow>[] = [
		{ id: 'name', header: 'Project', accessorKey: 'name', width: 160, cellType: 'text' },
		{
			id: 'status',
			header: 'Status',
			accessorKey: 'status',
			width: 120,
			cellType: 'status',
			cellConfig: { options: projectStatusOpts }
		},
		{
			id: 'owner',
			header: 'Owner',
			accessorKey: 'owner',
			width: 180,
			cellType: 'relation',
			cellConfig: { onSearch: searchPeople, placeholder: 'Assign owner...' }
		},
		{
			id: 'contributors',
			header: 'Contributors',
			accessorKey: 'contributors',
			width: 260,
			cellType: 'relation',
			cellConfig: { onSearch: searchPeople, placeholder: 'Add people...' }
		}
	];

	function handleProjectCellChange(row: ProjectRow, column: ColumnDef<ProjectRow>, value: unknown) {
		const idx = projectData.findIndex((r) => r.id === row.id);
		if (idx < 0) return;
		const key = column.accessorKey as keyof ProjectRow;
		if (!key) return;
		projectData = [...projectData.slice(0, idx), { ...projectData[idx], [key]: value }, ...projectData.slice(idx + 1)];
	}
</script>

<div class="max-w-3xl space-y-8">
	<Example title="Basic Table" code={basicCode}>
		<DataTable data={people} columns={basicColumns} striped />
	</Example>
	<Example title="Sortable Columns" code={sortableCode}>
		<DataTable data={people} columns={sortableColumns} />
	</Example>
	<Example title="With Selection" code={selectableCode}>
		<DataTable
			data={people}
			columns={basicColumns}
			selectable
			onSelectionChange={(ids: Set<string>) => {
				selected = ids;
			}}
		/>
		<p class="mt-2 text-xs text-txt-tertiary">
			Selected: {selected.size ? [...selected].join(', ') : 'none'}
		</p>
	</Example>
	<Separator />
	<Example title="Cell Editors" code={cellEditorCode}>
		<p class="mb-2 text-xs text-txt-tertiary">
			All cell types - text, status, select, multi-select, rating, boolean, number, date, URL. Click cells to edit. Changes are reflected in the data immediately.
		</p>
		<DataTable data={taskData} columns={taskColumns} getRowId={(row) => row.id} onCellChange={handleCellChange} striped />
	</Example>
	<Example title="Grouped rows (groupBy)" code={groupByCode}>
		<p class="mb-2 text-xs text-txt-tertiary">Rows are bucketed by the chosen column after the current sort. Group headers reuse built-in cell display in read-only mode.</p>
		<DataTable data={taskData} columns={taskColumns} getRowId={(row) => row.id} groupBy="status" onCellChange={handleCellChange} striped />
	</Example>
	<Example title="Relation Cells" code={relationCode}>
		<p class="mb-2 text-xs text-txt-tertiary">
			Relation cells use an async <code>onSearch</code> callback to link records.
		</p>
		<DataTable data={projectData} columns={projectColumns} getRowId={(row) => row.id} onCellChange={handleProjectCellChange} />
	</Example>
</div>
