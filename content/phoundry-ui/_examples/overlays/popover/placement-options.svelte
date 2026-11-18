<script lang="ts">
	import { Button } from "phoundry-ui";
	import { Popover } from "phoundry-ui";
	import type { PopoverPlacement } from "phoundry-ui";

	const placements: PopoverPlacement[] = ["top", "bottom-end", "right", "left"];
</script>

<div class="flex flex-wrap items-center gap-2">
	{#each placements as p (p)}
		<Popover placement={p}>
			{#snippet trigger(toggle)}
				<Button size="sm" onclick={toggle}>{p}</Button>
			{/snippet}
			<div
				class="rounded-lg border border-border-muted bg-surface-base p-2 shadow-lg"
			>
				<p class="text-xs whitespace-nowrap text-txt-secondary">Placed: {p}</p>
			</div>
		</Popover>
	{/each}
</div>
