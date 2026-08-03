---
title: SplitPane
layout: ui
order: 3
status: experimental
---

<script lang="ts">
	import UiDocHeader from '$lib/docs/ui/UiDocHeader.svelte';
	import PropTable from '$lib/docs/ui/PropTable.svelte';
	import type { PropDef } from '$lib/docs/ui/PropTable.svelte';
	import Separator from '$phoundry/components/display/Separator.svelte';
	import SplitPaneDemos from '$lib/docs/ui/demos/SplitPaneDemos.svelte';

	const props: PropDef[] = [
		{
			name: 'direction',
			type: "'horizontal' | 'vertical'",
			default: "'horizontal'",
			description: 'Split axis - horizontal is side-by-side, vertical is stacked.'
		},
		{
			name: 'size',
			type: 'number',
			description: 'Controlled size of the first pane in px (bindable).'
		},
		{
			name: 'defaultSize',
			type: 'number',
			default: '250',
			description: 'Initial size when uncontrolled.'
		},
		{
			name: 'min',
			type: 'number',
			default: '100',
			description: 'Minimum size of either pane in px.'
		},
		{ name: 'max', type: 'number', description: 'Maximum size of the first pane in px.' },
		{
			name: 'onresize',
			type: '(size: number) => void',
			description: 'Called during drag with the current size.'
		},
		{
			name: 'handleSize',
			type: 'number',
			default: '8',
			description: 'Width/height of the drag handle in px.'
		},
		{ name: 'class', type: 'string', description: 'Additional CSS classes on the container.' },
		{
			name: 'first',
			type: 'Snippet',
			description: 'Content for the first (left/top) pane.',
			required: true
		},
		{
			name: 'second',
			type: 'Snippet',
			description: 'Content for the second (right/bottom) pane.',
			required: true
		}
	];
</script>

<UiDocHeader
	title="SplitPane"
	description="Resizable split layout with a draggable divider. Supports horizontal (side-by-side) and vertical (stacked) directions with configurable min/max size constraints."
	importCode={"import { SplitPane } from 'phoundry-ui';"}
/>

<SplitPaneDemos />

<Separator />

<PropTable {props} />

## Usage tips

- The `first` and `second` props are Svelte snippets - use `{#snippet first()}...{/snippet}` syntax.
- The container must have a defined height (e.g. `h-full`, `h-screen`) for the split to render correctly.
- Use `bind:size` for two-way binding to persist or display the pane size.
- Set `max` to prevent the first pane from consuming the entire container.
