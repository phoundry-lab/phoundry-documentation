---
title: Slider
layout: ui
order: 10
---

<script lang="ts">
	import UiDocHeader from '$lib/docs/ui/UiDocHeader.svelte';
	import PropTable from '$lib/docs/ui/PropTable.svelte';
	import type { PropDef } from '$lib/docs/ui/PropTable.svelte';
	import Separator from '$phoundry/components/display/Separator.svelte';
	import SliderDemos from '$lib/docs/ui/demos/SliderDemos.svelte';

	const props: PropDef[] = [
		{ name: 'value', type: 'number', description: 'Current slider value', required: true },
		{
			name: 'onchange',
			type: '(value: number) => void',
			description: 'Called with the new value on input',
			required: true
		},
		{
			name: 'min',
			type: 'number',
			default: '0',
			description: 'Minimum value (ignored when ticks are provided)'
		},
		{
			name: 'max',
			type: 'number',
			default: '100',
			description: 'Maximum value (ignored when ticks are provided)'
		},
		{
			name: 'step',
			type: 'number',
			default: '1',
			description: 'Step increment (ignored when ticks are provided)'
		},
		{ name: 'ticks', type: 'SliderTick[]', description: 'Predefined snap points with labels' },
		{ name: 'size', type: "'sm' | 'md'", default: "'sm'", description: 'Track height' },
		{
			name: 'showValue',
			type: 'boolean',
			default: 'false',
			description: 'Display current value next to the slider'
		},
		{
			name: 'valuePosition',
			type: "'start' | 'end'",
			default: "'end'",
			description: 'Which side of the track shows the value label when showValue is true'
		},
		{
			name: 'valueFormatter',
			type: '(v: number) => string',
			description: 'Custom display formatter (ignored when ticks are provided)'
		},
		{ name: 'disabled', type: 'boolean', default: 'false', description: 'Prevents interaction' },
		{ name: 'class', type: 'string', description: 'Additional CSS classes' },
		{ name: 'id', type: 'string', description: 'Element id' },
		{ name: 'name', type: 'string', description: 'Form field name' },
		{
			name: 'element',
			type: 'HTMLInputElement',
			description: 'Bindable reference to the range input'
		},
		{
			name: '…rest',
			type: 'HTMLAttributes<input>',
			description: 'Forwarded to the native range input (e.g. `aria-valuetext`).'
		}
	];
</script>

<UiDocHeader
	title="Slider"
	description="Range slider with optional ticks, value display, and custom formatter. Uses a native range input for full accessibility."
	importCode={"import { Slider } from 'phoundry-ui';"}
/>

<SliderDemos />

<Separator />

<PropTable {props} />

## Usage tips

- When `ticks` are provided, the slider snaps to tick values and uses the tick label for display.
- Use `valueFormatter` for custom units (percentages, currency, etc.) on continuous sliders.
- Set a `class` with a fixed width (e.g. `w-64`) to control slider length.
