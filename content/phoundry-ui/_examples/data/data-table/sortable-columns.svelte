<script lang="ts">
	import { DataTable } from "phoundry-ui";

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

	const sortableColumns = [
		{
			id: "name",
			header: "Name",
			accessorKey: "name" as const,
			sortable: true,
		},
		{
			id: "email",
			header: "Email",
			accessorKey: "email" as const,
			sortable: true,
		},
		{
			id: "role",
			header: "Role",
			accessorKey: "role" as const,
			sortable: true,
		},
		{ id: "status", header: "Status", accessorKey: "status" as const },
	];
</script>

<DataTable data={people} columns={sortableColumns} />
