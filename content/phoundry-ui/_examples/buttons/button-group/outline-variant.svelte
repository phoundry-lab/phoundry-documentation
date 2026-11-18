<script lang="ts">
	import { ButtonGroup } from "phoundry-ui";

	let outlineView = $state("day");
</script>

<ButtonGroup
	variant="outline"
	items={[
		{
			label: "Day",
			active: outlineView === "day",
			onclick: () => (outlineView = "day"),
		},
		{
			label: "Week",
			active: outlineView === "week",
			onclick: () => (outlineView = "week"),
		},
		{
			label: "Month",
			active: outlineView === "month",
			onclick: () => (outlineView = "month"),
		},
	]}
/>
