<script lang="ts">
	import { DataTable } from "phoundry-ui";
	import type { ColumnDef, CellOption } from "phoundry-ui";

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
		{ id: "todo", label: "Todo", color: "#737373" },
		{ id: "in-progress", label: "In Progress", color: "#3b82f6" },
		{ id: "review", label: "Review", color: "#f59e0b" },
		{ id: "done", label: "Done", color: "#22c55e" },
	];

	const priorityOptions: CellOption[] = [
		{ id: "low", label: "Low", color: "#06b6d4" },
		{ id: "medium", label: "Medium", color: "#f97316" },
		{ id: "high", label: "High", color: "#ef4444" },
		{ id: "critical", label: "Critical", color: "#8b5cf6" },
	];

	const tagOptions: CellOption[] = [
		{ id: "frontend", label: "Frontend", color: "#3b82f6" },
		{ id: "backend", label: "Backend", color: "#22c55e" },
		{ id: "design", label: "Design", color: "#ec4899" },
		{ id: "devops", label: "DevOps", color: "#f97316" },
		{ id: "docs", label: "Docs", color: "#8b5cf6" },
	];

	let taskData = $state<TaskRow[]>([
		{
			id: "1",
			title: "Build DataTable cell editors",
			status: "in-progress",
			priority: "high",
			tags: ["frontend"],
			rating: 4,
			done: false,
			dueDate: Date.now() + 86400000 * 3,
			website: "https://svelte.dev",
			estimate: 8,
		},
		{
			id: "2",
			title: "Write documentation",
			status: "todo",
			priority: "medium",
			tags: ["docs"],
			rating: 0,
			done: false,
			dueDate: undefined,
			website: "",
			estimate: 4,
		},
		{
			id: "3",
			title: "Deploy staging environment",
			status: "done",
			priority: "low",
			tags: ["devops", "backend"],
			rating: 5,
			done: true,
			dueDate: Date.now() - 86400000,
			website: "https://staging.example.com",
			estimate: 2,
		},
		{
			id: "4",
			title: "Design system review",
			status: "review",
			priority: "medium",
			tags: ["design", "frontend"],
			rating: 3,
			done: false,
			dueDate: Date.now() + 86400000 * 7,
			website: "",
			estimate: undefined,
		},
		{
			id: "5",
			title: "API rate limiting",
			status: "todo",
			priority: "critical",
			tags: ["backend"],
			rating: 0,
			done: false,
			dueDate: undefined,
			website: "",
			estimate: 6,
		},
	]);

	const taskColumns: ColumnDef<TaskRow>[] = [
		{
			id: "title",
			header: "Title",
			accessorKey: "title",
			sortable: true,
			width: 220,
			cellType: "text",
			cellConfig: { placeholder: "Task title..." },
		},
		{
			id: "status",
			header: "Status",
			accessorKey: "status",
			sortable: true,
			width: 140,
			cellType: "status",
			cellConfig: { options: statusOptions },
		},
		{
			id: "priority",
			header: "Priority",
			accessorKey: "priority",
			width: 130,
			cellType: "select",
			cellConfig: { options: priorityOptions },
		},
		{
			id: "tags",
			header: "Tags",
			accessorKey: "tags",
			width: 180,
			cellType: "multi-select",
			cellConfig: { options: tagOptions },
		},
		{
			id: "rating",
			header: "Rating",
			accessorKey: "rating",
			width: 120,
			cellType: "rating",
		},
		{
			id: "done",
			header: "Done",
			accessorKey: "done",
			width: 70,
			align: "center",
			cellType: "boolean",
		},
		{
			id: "estimate",
			header: "Hours",
			accessorKey: "estimate",
			width: 90,
			cellType: "number",
			cellConfig: { placeholder: "0" },
		},
		{
			id: "dueDate",
			header: "Due Date",
			accessorKey: "dueDate",
			width: 160,
			cellType: "date",
			cellConfig: { placeholder: "Set date...", dateRange: true },
		},
		{
			id: "website",
			header: "Link",
			accessorKey: "website",
			width: 180,
			cellType: "url",
			cellConfig: { placeholder: "https://..." },
		},
	];

	function handleCellChange(
		row: TaskRow,
		column: ColumnDef<TaskRow>,
		value: unknown,
	) {
		const idx = taskData.findIndex((r) => r.id === row.id);
		if (idx < 0) return;
		const key = column.accessorKey as keyof TaskRow;
		if (!key) return;
		let resolved = value;
		if (
			column.cellType === "date" &&
			typeof value === "object" &&
			value !== null
		) {
			resolved = (value as { value: number | undefined }).value;
		}
		const updated = { ...taskData[idx], [key]: resolved };
		taskData = [...taskData.slice(0, idx), updated, ...taskData.slice(idx + 1)];
	}
</script>

<p class="mb-2 text-xs text-txt-tertiary">
	Rows are bucketed by the chosen column after the current sort. Group headers
	reuse built-in cell display in read-only mode.
</p>
<DataTable
	data={taskData}
	columns={taskColumns}
	getRowId={(row) => row.id}
	groupBy="status"
	onCellChange={handleCellChange}
	striped
/>
