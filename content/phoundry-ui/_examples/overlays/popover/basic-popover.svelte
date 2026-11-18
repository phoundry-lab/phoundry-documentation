<script lang="ts">
	import { Button } from "phoundry-ui";
	import { Popover } from "phoundry-ui";
</script>

<Popover>
	{#snippet trigger(toggle)}
		<Button onclick={toggle}>Open Popover</Button>
	{/snippet}
	<div
		class="min-w-48 rounded-lg border border-border-muted bg-surface-base p-3 shadow-lg"
	>
		<p class="mb-1 text-sm font-medium text-txt-primary">Popover Title</p>
		<p class="text-xs text-txt-secondary">
			This is a basic popover with some content.
		</p>
	</div>
</Popover>
