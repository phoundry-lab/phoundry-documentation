<script lang="ts">
	import { Button } from "phoundry-ui";
	import { Popover } from "phoundry-ui";

	let stickyOpen = $state(false);
</script>

<p class="mb-2 text-xs text-txt-secondary">
	Outside clicks no longer close the surface - pair with a button that calls <code
		>toggle()</code
	>
	or clears <code>bind:open</code>.
</p>
<div class="flex flex-wrap items-center gap-2">
	<Popover dismissible={false} bind:open={stickyOpen}>
		{#snippet trigger(toggle)}
			<Button size="sm" onclick={toggle}>Open sticky</Button>
		{/snippet}
		<div
			class="min-w-52 rounded-lg border border-border-muted bg-surface-base p-3 text-xs shadow-lg"
		>
			<p class="mb-2 text-txt-secondary">Backdrop clicks do nothing.</p>
			<Button size="sm" variant="primary" onclick={() => (stickyOpen = false)}
				>Close</Button
			>
		</div>
	</Popover>
</div>
