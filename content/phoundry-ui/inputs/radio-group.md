---
title: RadioGroup
layout: ui
order: 11
---

<script lang="ts">
	import UiDocHeader from '$lib/docs/ui/UiDocHeader.svelte';
	import PropTable from '$lib/docs/ui/PropTable.svelte';
	import type { PropDef } from '$lib/docs/ui/PropTable.svelte';
	import Separator from '$phoundry/components/display/Separator.svelte';
	import RadioGroupDemos from '$lib/docs/ui/demos/RadioGroupDemos.svelte';

	const props: PropDef[] = [
		{
			name: 'options',
			type: 'RadioOption[]',
			description: 'Array of { value, label, description?, disabled? }',
			required: true
		},
		{ name: 'value', type: 'string', description: 'Currently selected value', required: true },
		{
			name: 'onchange',
			type: '(value: string) => void',
			description: 'Called when selection changes',
			required: true
		},
		{ name: 'name', type: 'string', description: 'Group name (auto-generated if omitted)' },
		{
			name: 'orientation',
			type: "'vertical' | 'horizontal'",
			default: "'vertical'",
			description: 'Layout direction'
		},
		{
			name: 'size',
			type: "'sm' | 'md'",
			default: "'sm'",
			description: 'Size of radio circles and text'
		},
		{ name: 'disabled', type: 'boolean', default: 'false', description: 'Disables all options' },
		{ name: 'class', type: 'string', description: 'Additional CSS classes on the group container' }
	];
</script>

<UiDocHeader
	title="RadioGroup"
	description="Radio button group with arrow-key navigation, horizontal/vertical layout, and per-option descriptions. Only the selected radio is in the tab order."
	importCode={"import { RadioGroup } from 'phoundry-ui';"}
/>

<RadioGroupDemos />

<Separator />

<PropTable {props} />

## Usage tips

- Arrow keys move selection between enabled options - no need to Tab through each radio.
- Set `disabled` on individual options to grey them out while keeping the rest interactive.
- Use `orientation="horizontal"` for compact option sets like size pickers.
- The `description` field on options is great for plan selectors or settings with context.
- Set `name` when embedding multiple groups in one form so browsers associate radios correctly (otherwise a random fallback name is generated).
