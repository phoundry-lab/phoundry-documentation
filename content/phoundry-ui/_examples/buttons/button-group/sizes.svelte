<script lang="ts">
	import { ButtonGroup } from "phoundry-ui";

	let listMode = $state<"list" | "grid">("list");
</script>

<p class="mb-2 text-xs text-txt-secondary">
	The outer shell matches the shared control height. Segments fit inside its
	border and inset.
</p>
<div class="flex flex-wrap items-center gap-3">
	<ButtonGroup
		size="sm"
		items={[
			{
				label: "List",
				active: listMode === "list",
				onclick: () => (listMode = "list"),
			},
			{
				label: "Grid",
				active: listMode === "grid",
				onclick: () => (listMode = "grid"),
			},
		]}
	/>
	<ButtonGroup
		size="md"
		items={[
			{
				label: "List",
				active: listMode === "list",
				onclick: () => (listMode = "list"),
			},
			{
				label: "Grid",
				active: listMode === "grid",
				onclick: () => (listMode = "grid"),
			},
		]}
	/>
	<ButtonGroup
		size="lg"
		items={[
			{
				label: "List",
				active: listMode === "list",
				onclick: () => (listMode = "list"),
			},
			{
				label: "Grid",
				active: listMode === "grid",
				onclick: () => (listMode = "grid"),
			},
		]}
	/>
</div>
