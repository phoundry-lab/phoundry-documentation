<script lang="ts">
	import { ButtonGroup } from "phoundry-ui";

	let view = $state("day");
</script>

<ButtonGroup
	items={[
		{ label: "Day", active: view === "day", onclick: () => (view = "day") },
		{ label: "Week", active: view === "week", onclick: () => (view = "week") },
		{
			label: "Month",
			active: view === "month",
			onclick: () => (view = "month"),
		},
	]}
/>
