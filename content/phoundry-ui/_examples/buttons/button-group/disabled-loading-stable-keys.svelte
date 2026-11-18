<script lang="ts">
	import { ButtonGroup } from "phoundry-ui";

	let segmentDemo = $state("left");
</script>

<p class="mb-2 text-xs text-txt-secondary">
	Optional <code>id</code> on each item stabilizes reconciliation when the list reorders.
	Loading shows the same spinner glyph as other buttons.
</p>
<ButtonGroup
	aria-label="Demo alignment"
	items={[
		{
			id: "seg-left",
			label: "Left",
			active: segmentDemo === "left",
			onclick: () => (segmentDemo = "left"),
		},
		{
			id: "seg-center",
			label: "Center",
			disabled: true,
		},
		{
			id: "seg-right",
			label: "Right",
			loading: true,
			onclick: () => (segmentDemo = "right"),
		},
	]}
/>
