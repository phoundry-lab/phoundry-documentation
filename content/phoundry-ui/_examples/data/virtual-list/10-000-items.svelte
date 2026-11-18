<script lang="ts">
	import { createVirtualList } from "phoundry-ui";

	const vl = createVirtualList({ count: 10000, itemHeight: 32, overscan: 5 });
</script>

<div
	use:vl.action
	class="h-64 overflow-auto rounded-lg border border-border-muted"
	onscroll={vl.handleScroll}
>
	<div style="height: {vl.totalHeight}px; position: relative;">
		{#each vl.items as item (item.index)}
			<div
				style="position: absolute; top: {item.start}px; height: {item.size}px; width: 100%;"
				class="flex items-center border-b border-border-muted px-3 text-sm"
			>
				Row {item.index}
			</div>
		{/each}
	</div>
</div>
<p class="mt-2 text-xs text-txt-tertiary">
	Rendering {vl.items.length} of 10,000 items
</p>
