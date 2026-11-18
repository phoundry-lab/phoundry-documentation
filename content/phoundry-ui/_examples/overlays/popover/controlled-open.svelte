<script lang="ts">
	import { Button } from "phoundry-ui";
	import { Popover } from "phoundry-ui";

	let controlledOpen = $state(false);
</script>

<div class="flex items-center gap-2">
	<Popover bind:open={controlledOpen}>
		{#snippet trigger(toggle)}
			<Button onclick={toggle}>Toggle Popover</Button>
		{/snippet}
		<div
			class="min-w-48 rounded-lg border border-border-muted bg-surface-base p-3 shadow-lg"
		>
			<p class="text-sm text-txt-primary">Controlled popover</p>
			<p class="mt-1 text-xs text-txt-secondary">Open: {controlledOpen}</p>
		</div>
	</Popover>
	<Button
		size="sm"
		variant="outline"
		onclick={() => (controlledOpen = false)}
		disabled={!controlledOpen}>Close Externally</Button
	>
</div>
