<script lang="ts">
	import { CollapsibleSection } from "phoundry-ui";

	let controlledOpen = $state(true);
</script>

<div class="space-y-2">
	<button
		class="rounded bg-surface-raised px-2 py-1 text-xs text-txt-secondary transition-colors hover:bg-surface-overlay"
		onclick={() => {
			controlledOpen = !controlledOpen;
		}}
	>
		{controlledOpen ? "Collapse" : "Expand"}
	</button>
	<CollapsibleSection
		title="Controlled"
		open={controlledOpen}
		onToggle={() => {
			controlledOpen = !controlledOpen;
		}}
	>
		<p class="text-xs text-txt-secondary">Externally controlled open state.</p>
	</CollapsibleSection>
</div>
