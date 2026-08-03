<script lang="ts">
	import Example from '$lib/docs/ui/Example.svelte';
	import Button from '$phoundry/components/buttons/Button.svelte';
	import { createVirtualList } from '$phoundry/data/virtual-list/index.js';

	interface Props {
		basicCode: string;
		variableCode: string;
	}

	let { basicCode, variableCode }: Props = $props();

	const vl = createVirtualList({ count: 10000, itemHeight: 32, overscan: 5 });

	const vlVariable = createVirtualList({
		count: 800,
		itemHeight: (i: number) => (i % 9 === 0 ? 52 : 30),
		overscan: 8
	});
</script>

<div class="max-w-3xl space-y-8">
	<Example title="10,000 Items" code={basicCode}>
		<div use:vl.action class="h-64 overflow-auto rounded-lg border border-border-muted" onscroll={vl.handleScroll}>
			<div style="height: {vl.totalHeight}px; position: relative;">
				{#each vl.items as item (item.index)}
					<div style="position: absolute; top: {item.start}px; height: {item.size}px; width: 100%;" class="flex items-center border-b border-border-muted px-3 text-sm">
						Row {item.index}
					</div>
				{/each}
			</div>
		</div>
		<p class="mt-2 text-xs text-txt-tertiary">Rendering {vl.items.length} of 10,000 items</p>
	</Example>
	<Example title="Variable row heights" code={variableCode}>
		<p class="mb-2 text-xs text-txt-secondary">
			Every 9th row is taller- <code>itemHeight</code> as a function recomputes offsets cumulatively.
		</p>
		<div class="mb-2 flex gap-2">
			<Button size="sm" onclick={() => vlVariable.scrollToIndex(400, 'center')}>Jump to index 400</Button>
		</div>
		<div use:vlVariable.action class="h-56 overflow-auto rounded-lg border border-border-muted" onscroll={vlVariable.handleScroll}>
			<div style="height: {vlVariable.totalHeight}px; position: relative;">
				{#each vlVariable.items as item (item.index)}
					<div
						style="position: absolute; top: {item.start}px; height: {item.size}px; width: 100%;"
						class="flex items-center border-b border-border-muted px-3 text-xs"
						class:bg-surface-sunken={item.index % 9 === 0}
					>
						{item.index % 9 === 0 ? 'Section header' : 'Row'} {item.index}
					</div>
				{/each}
			</div>
		</div>
	</Example>
</div>
