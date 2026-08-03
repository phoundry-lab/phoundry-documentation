---
title: Checkbox
layout: ui
order: 6
---

<script lang="ts">
	import UiDocHeader from '$lib/docs/ui/UiDocHeader.svelte';
	import PropTable from '$lib/docs/ui/PropTable.svelte';
	import type { PropDef } from '$lib/docs/ui/PropTable.svelte';
	import Separator from '$phoundry/components/display/Separator.svelte';
	import CheckboxDemos from '$lib/docs/ui/demos/CheckboxDemos.svelte';

	const props: PropDef[] = [
		{
			name: 'checked',
			type: 'boolean',
			description: 'Whether the checkbox is checked',
			required: true
		},
		{ name: 'onchange', type: '() => void', description: 'Called when the checkbox is toggled' },
		{
			name: 'indeterminate',
			type: 'boolean',
			default: 'false',
			description: 'Shows a dash icon instead of a checkmark (mixed state)'
		},
		{ name: 'disabled', type: 'boolean', default: 'false', description: 'Prevents interaction' },
		{ name: 'size', type: "'sm' | 'md'", default: "'sm'", description: 'Indicator box (~14px sm / ~16px md display size, not full control height)' },
		{
			name: 'label',
			type: 'string | Snippet',
			description: 'Inline label rendered next to the checkbox'
		},
		{ name: 'description', type: 'string', description: 'Helper text below the label' },
		{ name: 'class', type: 'string', description: 'Additional CSS classes' },
		{ name: 'id', type: 'string', description: 'Element id (auto-generated if omitted)' },
		{ name: 'name', type: 'string', description: 'Form field name - renders a hidden input' },
		{
			name: 'element',
			type: 'HTMLButtonElement',
			description: 'Bindable reference to the checkbox button.'
		},
		{
			name: '...rest',
			type: 'Record<string, unknown>',
			description: 'Additional attributes forwarded to the checkbox `<button>` (e.g. `aria-invalid`, `data-testid`).'
		}
	];
</script>

<UiDocHeader
	title="Checkbox"
	description="Checkbox with label and indeterminate state. Accessible via keyboard (Space/Enter) with support for form integration."
	importCode={"import { Checkbox } from 'phoundry-ui';"}
/>

<CheckboxDemos />

<Separator />

<PropTable {props} />

## Usage tips

- Use `indeterminate` for "select all" patterns where only some children are checked.
- Pass a `name` prop to render a hidden `<input>` for native form submission.
- When using without the `label` prop, wrap in your own `<label>` for accessibility.
