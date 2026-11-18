<script lang="ts">
	import { DataTable } from "phoundry-ui";
	import type { ColumnDef, CellOption, CellRelationItem } from "phoundry-ui";

	type Person = { name: string; email: string; role: string; status: string };

	const people: Person[] = [
		{
			name: "Alice Chen",
			email: "alice@example.com",
			role: "Engineer",
			status: "Active",
		},
		{
			name: "Bob Rivera",
			email: "bob@example.com",
			role: "Designer",
			status: "Away",
		},
		{
			name: "Carol Kim",
			email: "carol@example.com",
			role: "Manager",
			status: "Active",
		},
		{
			name: "Dan Okafor",
			email: "dan@example.com",
			role: "Engineer",
			status: "Offline",
		},
	];

	const allPeople: CellRelationItem[] = [
		{ id: "p1", label: "Alice Chen", icon: "carbon:user" },
		{ id: "p2", label: "Bob Rivera", icon: "carbon:user" },
		{ id: "p3", label: "Carol Kim", icon: "carbon:user" },
		{ id: "p4", label: "Dan Okafor", icon: "carbon:user" },
		{ id: "p5", label: "Eve Santos", icon: "carbon:user" },
		{ id: "p6", label: "Frank Wu", icon: "carbon:user" },
		{ id: "p7", label: "Grace Lee", icon: "carbon:user" },
		{ id: "p8", label: "Hiro Tanaka", icon: "carbon:user" },
	];

	async function searchPeople(query: string): Promise<CellRelationItem[]> {
		await new Promise((r) => setTimeout(r, 150));
		if (!query) return allPeople;
		return allPeople.filter((p) =>
			p.label.toLowerCase().includes(query.toLowerCase()),
		);
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
			id: "r1",
			name: "phoundry-ui",
			owner: [allPeople[0]],
			contributors: [allPeople[0], allPeople[2]],
			status: "active",
		},
		{
			id: "r2",
			name: "phials-core",
			owner: [allPeople[1]],
			contributors: [allPeople[1], allPeople[3], allPeople[4]],
			status: "active",
		},
		{
			id: "r3",
			name: "pheeder",
			owner: [],
			contributors: [allPeople[5]],
			status: "paused",
		},
	]);

	const projectStatusOpts: CellOption[] = [
		{ id: "active", label: "Active", color: "#22c55e" },
		{ id: "paused", label: "Paused", color: "#f59e0b" },
		{ id: "archived", label: "Archived", color: "#737373" },
	];

	const projectColumns: ColumnDef<ProjectRow>[] = [
		{
			id: "name",
			header: "Project",
			accessorKey: "name",
			width: 160,
			cellType: "text",
		},
		{
			id: "status",
			header: "Status",
			accessorKey: "status",
			width: 120,
			cellType: "status",
			cellConfig: { options: projectStatusOpts },
		},
		{
			id: "owner",
			header: "Owner",
			accessorKey: "owner",
			width: 180,
			cellType: "relation",
			cellConfig: { onSearch: searchPeople, placeholder: "Assign owner..." },
		},
		{
			id: "contributors",
			header: "Contributors",
			accessorKey: "contributors",
			width: 260,
			cellType: "relation",
			cellConfig: { onSearch: searchPeople, placeholder: "Add people..." },
		},
	];

	function handleProjectCellChange(
		row: ProjectRow,
		column: ColumnDef<ProjectRow>,
		value: unknown,
	) {
		const idx = projectData.findIndex((r) => r.id === row.id);
		if (idx < 0) return;
		const key = column.accessorKey as keyof ProjectRow;
		if (!key) return;
		projectData = [
			...projectData.slice(0, idx),
			{ ...projectData[idx], [key]: value },
			...projectData.slice(idx + 1),
		];
	}
</script>

<p class="mb-2 text-xs text-txt-tertiary">
	Relation cells use an async <code>onSearch</code> callback to link records.
</p>
<DataTable
	data={projectData}
	columns={projectColumns}
	getRowId={(row) => row.id}
	onCellChange={handleProjectCellChange}
/>
