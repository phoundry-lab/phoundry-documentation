---
title: TimePicker
layout: ui
order: 4
---

<script lang="ts">
	import UiDocHeader from '$lib/docs/ui/UiDocHeader.svelte';
	import PropTable from '$lib/docs/ui/PropTable.svelte';
	import type { PropDef } from '$lib/docs/ui/PropTable.svelte';
	import Separator from '$phoundry/components/display/Separator.svelte';
	import TimePickerDemos from '$lib/docs/ui/demos/TimePickerDemos.svelte';

	const timePickerProps: PropDef[] = [
		{ name: 'hour', type: 'number', default: '0', description: 'Hour value (0-23).' },
		{ name: 'minute', type: 'number', default: '0', description: 'Minute value (0-59).' },
		{
			name: 'onchange',
			type: '(hour: number, minute: number) => void',
			description: 'Called when the time changes.'
		},
		{
			name: 'disabled',
			type: 'boolean',
			default: 'false',
			description: 'Disable the inputs and select.'
		},
		{ name: 'class', type: 'string', description: 'Additional CSS classes on the wrapper.' }
	];
</script>

<UiDocHeader title="TimePicker" description="A 12-hour format time picker with an AM/PM select." importCode={"import { TimePicker } from 'phoundry-ui';"} />

<TimePickerDemos />

<Separator />

<PropTable props={timePickerProps} title="TimePicker props" />

## Usage tips

- Use `bind:hour` and `bind:minute` to keep your state in sync with the picker.
- The component automatically handles 12-hour to 24-hour conversion internally.
- The `hour` prop is always a 24-hour value (0-23).
