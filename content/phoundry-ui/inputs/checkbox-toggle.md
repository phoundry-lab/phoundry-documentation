---
title: CheckboxToggle
layout: ui
order: 9
---

<script lang="ts">
	import UiDocHeader from '$lib/docs/ui/UiDocHeader.svelte';
	import PropTable from '$lib/docs/ui/PropTable.svelte';
	import type { PropDef } from '$lib/docs/ui/PropTable.svelte';
	import Separator from '$phoundry/components/display/Separator.svelte';
	import CheckboxToggleDemos from '$lib/docs/ui/demos/CheckboxToggleDemos.svelte';

	const props: PropDef[] = [
		{ name: 'checked', type: 'boolean', description: 'Whether the toggle is on', required: true },
		{ name: 'onchange', type: '() => void', description: 'Called when the toggle is flipped' },
		{ name: 'disabled', type: 'boolean', default: 'false', description: 'Prevents interaction' },
		{
			name: 'size',
			type: "'sm' | 'md'",
			default: "'sm'",
			description: 'Size of the toggle track and thumb'
		},
		{
			name: 'label',
			type: 'string | Snippet',
			description: 'Inline label rendered next to the toggle'
		},
		{ name: 'description', type: 'string', description: 'Helper text below the label' },
		{ name: 'class', type: 'string', description: 'Additional CSS classes' },
		{ name: 'id', type: 'string', description: 'Element id (auto-generated if omitted)' },
		{ name: 'name', type: 'string', description: 'Form field name - renders a hidden input' },
		{
			name: 'element',
			type: 'HTMLButtonElement',
			description: 'Bindable reference to the switch button.'
		},
		{
			name: '...rest',
			type: 'Record<string, unknown>',
			description: 'Forwarded to the `<button>` (e.g. `aria-describedby`).'
		}
	];
</script>

<UiDocHeader
	title="CheckboxToggle"
	description="Toggle switch with sliding pill animation. Semantically a switch (role=&quot;switch&quot;) with optional label and press animation on the thumb."
	importCode={"import { CheckboxToggle } from 'phoundry-ui';"}
/>

<CheckboxToggleDemos />

<Separator />

<PropTable {props} />

## Usage tips

- Use for boolean settings that take effect immediately (e.g. dark mode, notifications).
- Prefer `Checkbox` over `CheckboxToggle` when the value is part of a form that requires explicit submission.
- The thumb has a press animation - users get tactile feedback on click.
- Pass a `name` prop for native form submission via hidden input.
