<script lang="ts">
	import { ButtonGroup } from "phoundry-ui";

	let ghostView = $state("day");
</script>

<ButtonGroup
	variant="ghost"
	items={[
		{
			label: "Day",
			active: ghostView === "day",
			onclick: () => (ghostView = "day"),
		},
		{
			label: "Week",
			active: ghostView === "week",
			onclick: () => (ghostView = "week"),
		},
		{
			label: "Month",
			active: ghostView === "month",
			onclick: () => (ghostView = "month"),
		},
	]}
/>
