---
title: VirtualList
layout: ui
order: 3
---

<script lang="ts">
	import UiDocHeader from '$lib/docs/ui/UiDocHeader.svelte';
	import PropTable from '$lib/docs/ui/PropTable.svelte';
	import type { PropDef } from '$lib/docs/ui/PropTable.svelte';
	import Separator from '$phoundry/components/display/Separator.svelte';
	import VirtualListDemos from '$lib/docs/ui/demos/VirtualListDemos.svelte';

	const basicCode = `import { createVirtualList } from 'phoundry-ui';

const vl = createVirtualList({
  count: 10000,
  itemHeight: 32,
  overscan: 5,
});

<div use:vl.action class="h-64 overflow-auto border rounded" onscroll={vl.handleScroll}>
  <div style="height: {vl.totalHeight}px; position: relative;">
    {#each vl.items as item}
      <div
        style="position: absolute; top: {item.start}px; height: {item.size}px; width: 100%;"
        class="flex items-center px-3 text-sm border-b"
      >
        Row {item.index}
      </div>
    {/each}
  </div>
</div>`;

	const variableCode = `const vl = createVirtualList({
  count: 800,
  itemHeight: (i) => (i % 9 === 0 ? 52 : 30),
});

<button onclick={() => vl.scrollToIndex(400, 'center')}>Jump</button>`;

	const optionsProps: PropDef[] = [
		{
			name: 'count',
			type: 'number',
			description:
				'Total logical rows. Use an options object with a `get count()` getter if the backing array length changes - reads rerun whenever scroll geometry updates.',
			required: true
		},
		{
			name: 'itemHeight',
			type: 'number | (index: number) => number',
			description: 'Fixed height or per-item height function.',
			required: true
		},
		{
			name: 'overscan',
			type: 'number',
			default: '5',
			description: 'Extra items rendered above and below the viewport.'
		}
	];

	const returnProps: PropDef[] = [
		{
			name: 'items',
			type: 'VirtualItem[]',
			description: 'Visible items with index, start position, and size.'
		},
		{ name: 'totalHeight', type: 'number', description: 'Total scrollable height in pixels.' },
		{ name: 'scrollOffset', type: 'number', description: 'Current scroll offset.' },
		{ name: 'containerHeight', type: 'number', description: 'Measured container height.' },
		{
			name: 'handleScroll',
			type: '(e: Event) => void',
			description: 'Scroll event handler to attach to the container.'
		},
		{
			name: 'scrollToIndex',
			type: '(index: number, align?: "start" | "center" | "end" | "auto") => void',
			description: 'Scroll so the given index is visible; defaults to smart (“auto”) scrolling.'
		},
		{ name: 'action', type: 'Action', description: 'Svelte use:action for the scroll container.' }
	];
</script>

<UiDocHeader
	title="VirtualList"
	description="Headless virtual scrolling utility. Renders only visible items for lists with thousands of rows."
	importCode={"import { createVirtualList } from 'phoundry-ui';"}
/>

<VirtualListDemos {basicCode} {variableCode} />

<Separator />

<PropTable props={optionsProps} title="Options" />

<PropTable props={returnProps} title="Returns" />

<Separator />

## Usage tips

- This is a headless utility - you provide the container and item markup. Use `use:vl.action` on the scroll container.
- For variable-height items, pass a function to `itemHeight` - e.g. `(i) => i % 5 === 0 ? 48 : 32`.
- Increase `overscan` if you see flickering during fast scrolling.
- Use `scrollToIndex` for keyboard navigation or "scroll to top/bottom" buttons.
