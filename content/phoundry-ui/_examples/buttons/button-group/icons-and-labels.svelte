<script lang="ts">
	import { ButtonGroup } from "phoundry-ui";
	import { PhiIcons } from "phoundry-ui";

	let iconSelection = $state("check");
</script>

<p class="mb-2 text-xs text-txt-secondary">
	Omit label for a square icon-only item and provide an accessible name with
	aria-label or title.
</p>
<ButtonGroup
	items={[
		{
			icon: PhiIcons.check,
			"aria-label": "Check",
			active: iconSelection === "check",
			onclick: () => (iconSelection = "check"),
		},
		{
			icon: PhiIcons.add,
			label: "Add",
			active: iconSelection === "add",
			onclick: () => (iconSelection = "add"),
		},
		{ loading: true, "aria-label": "Processing" },
	]}
/>
