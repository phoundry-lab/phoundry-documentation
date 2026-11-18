<script lang="ts">
	import { Button } from "phoundry-ui";
	import { createVirtualList } from "phoundry-ui";

	const vlVariable = createVirtualList({
		count: 800,
		itemHeight: (i: number) => (i % 9 === 0 ? 52 : 30),
		overscan: 8,
	});
</script>

<p class="mb-2 text-xs text-txt-secondary">
	Every 9th row is taller- <code>itemHeight</code> as a function recomputes offsets
	cumulatively.
</p>
<div class="mb-2 flex gap-2">
	<Button size="sm" onclick={() => vlVariable.scrollToIndex(400, "center")}
		>Jump to index 400</Button
	>
</div>
<div
	use:vlVariable.action
	class="h-56 overflow-auto rounded-lg border border-border-muted"
	onscroll={vlVariable.handleScroll}
>
	<div style="height: {vlVariable.totalHeight}px; position: relative;">
		{#each vlVariable.items as item (item.index)}
			<div
				style="position: absolute; top: {item.start}px; height: {item.size}px; width: 100%;"
				class="flex items-center border-b border-border-muted px-3 text-xs"
				class:bg-surface-sunken={item.index % 9 === 0}
			>
				{item.index % 9 === 0 ? "Section header" : "Row"}
				{item.index}
			</div>
		{/each}
	</div>
</div>
