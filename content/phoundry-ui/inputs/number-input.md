---
title: NumberInput
layout: ui
order: 5
---

<script lang="ts">
	import UiDocHeader from '$lib/docs/ui/UiDocHeader.svelte';
	import PropTable from '$lib/docs/ui/PropTable.svelte';
	import type { PropDef } from '$lib/docs/ui/PropTable.svelte';
	import Separator from '$phoundry/components/display/Separator.svelte';
	import NumberInputDemos from '$lib/docs/ui/demos/NumberInputDemos.svelte';

	const props: PropDef[] = [
		{ name: 'value', type: 'number', description: 'Current numeric value', required: true },
		{
			name: 'onchange',
			type: '(value: number) => void',
			description: 'Called when value changes',
			required: true
		},
		{ name: 'min', type: 'number', description: 'Minimum allowed value' },
		{ name: 'max', type: 'number', description: 'Maximum allowed value' },
		{ name: 'step', type: 'number', default: '1', description: 'Increment / decrement step' },
		{
			name: 'size',
			type: "'sm' | 'md'",
			default: "'sm'",
			description: 'Wrapper height aligned to Button `sm` / `md` control scale'
		},
		{
			name: 'width',
			type: 'string',
			default: "'w-24'",
			description: 'Tailwind width class for the wrapper'
		},
		{
			name: 'buttonLayout',
			type: "'vertical' | 'horizontal'",
			default: "'vertical'",
			description: 'Button arrangement: vertical (stacked on right) or horizontal (left/right)'
		},
		{
			name: 'disabled',
			type: 'boolean',
			default: 'false',
			description: 'Disables the input and buttons'
		},
		{ name: 'class', type: 'string', description: 'Additional CSS classes' },
		{ name: 'id', type: 'string', description: 'HTML id attribute' },
		{ name: 'name', type: 'string', description: 'HTML name attribute for forms' },
		{
			name: 'element',
			type: 'HTMLInputElement',
			description: 'Bindable reference to the underlying input element'
		},
		{
			name: '…rest',
			type: 'HTMLAttributes<input>',
			description: 'Additional attributes forwarded to the inner `<input>` (e.g. `aria-label`, `autocomplete`).'
		}
	];
</script>

<UiDocHeader
	title="NumberInput"
	description="Numeric input with increment/decrement buttons, min/max clamping, step control, and keyboard arrow support. Hold-to-repeat on buttons for fast value changes."
	importCode={"import { NumberInput } from 'phoundry-ui';"}
/>

<NumberInputDemos />

<Separator />

<PropTable {props} />

## Usage tips

- Hold down the +/- buttons for continuous increment - useful for large ranges.
- Arrow Up / Arrow Down keys work when the input is focused.
- Use `width` to control the wrapper size - defaults to `w-24` which works well for most counters.
- Always set `min` and `max` when the domain has natural bounds to prevent invalid values.
- Non-numeric manual input resolves to `min` when set, otherwise `0` - validate in your form layer if you need stricter behavior.
