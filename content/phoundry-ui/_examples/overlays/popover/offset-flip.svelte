<script lang="ts">
	import { Button } from "phoundry-ui";
	import { Popover } from "phoundry-ui";
</script>

<p class="mb-2 text-xs text-txt-secondary">
	<code>offset</code> grows the gap from the anchor; <code>flip=false</code> keeps
	the requested placement even near viewport edges (may overflow - test on small screens).
</p>
<div class="flex justify-center py-4">
	<Popover placement="bottom" offset={16}>
		{#snippet trigger(toggle)}
			<Button size="sm" onclick={toggle}>offset 16</Button>
		{/snippet}
		<div
			class="rounded-lg border border-border-muted bg-surface-base p-3 text-xs shadow-lg"
		>
			Extra breathing room from the trigger.
		</div>
	</Popover>
</div>
