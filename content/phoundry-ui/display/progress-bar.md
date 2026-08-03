---
title: ProgressBar
layout: ui
order: 7
---

<script lang="ts">
	import UiDocHeader from '$lib/docs/ui/UiDocHeader.svelte';
	import PropTable from '$lib/docs/ui/PropTable.svelte';
	import type { PropDef } from '$lib/docs/ui/PropTable.svelte';
	import Separator from '$phoundry/components/display/Separator.svelte';
	import ProgressBarDemos from '$lib/docs/ui/demos/ProgressBarDemos.svelte';

	const props: PropDef[] = [
		{
			name: 'value',
			type: 'number',
			description: '0–100 for determinate progress. Omit or pass -1 for indeterminate.'
		},
		{
			name: 'variant',
			type: "'default' | 'success' | 'warning' | 'error'",
			default: "'default'",
			description: 'Semantic color of the progress fill.'
		},
		{ name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Bar thickness.' },
		{
			name: 'showValue',
			type: 'boolean',
			default: 'false',
			description: 'Display percentage text next to the bar.'
		},
		{ name: 'class', type: 'string', description: 'Additional CSS classes.' }
	];
</script>

<UiDocHeader
	title="ProgressBar"
	description="Horizontal progress indicator with determinate and indeterminate modes. Supports semantic color variants and optional percentage display."
	importCode={"import { ProgressBar } from 'phoundry-ui';"}
/>

<ProgressBarDemos />

<Separator />

<PropTable {props} />

## Usage tips

- Omit `value` or pass `-1` for an animated indeterminate bar.
- Use `variant="success"` when progress reaches 100% to reinforce completion.
- Enable `showValue` for file uploads or long-running tasks where users need exact progress.
