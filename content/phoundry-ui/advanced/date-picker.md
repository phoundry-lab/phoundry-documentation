---
title: DatePicker
layout: ui
order: 2
---

<script lang="ts">
	import UiDocHeader from '$lib/docs/ui/UiDocHeader.svelte';
	import PropTable from '$lib/docs/ui/PropTable.svelte';
	import type { PropDef } from '$lib/docs/ui/PropTable.svelte';
	import Separator from '$phoundry/components/display/Separator.svelte';
	import DatePickerDemos from '$lib/docs/ui/demos/DatePickerDemos.svelte';

	const datePickerProps: PropDef[] = [
		{ name: 'value', type: 'Date | null', description: 'Selected date (single mode).' },
		{ name: 'rangeStart', type: 'Date | null', description: 'Range start date (range mode).' },
		{ name: 'rangeEnd', type: 'Date | null', description: 'Range end date (range mode).' },
		{
			name: 'mode',
			type: "'single' | 'range'",
			default: "'single'",
			description: 'Selection mode.'
		},
		{
			name: 'onchange',
			type: '(date: Date) => void',
			description: 'Called when a single date is selected.'
		},
		{
			name: 'onrangechange',
			type: '(start: Date, end: Date) => void',
			description: 'Called when a range is completed.'
		},
		{ name: 'minDate', type: 'Date', description: 'Earliest selectable date.' },
		{ name: 'maxDate', type: 'Date', description: 'Latest selectable date.' },
		{
			name: 'disabled',
			type: 'boolean',
			default: 'false',
			description: 'Disable the input and picker.'
		},
		{
			name: 'weekStartsOn',
			type: '0 | 1',
			default: '0',
			description: 'First day of week: 0 = Sunday, 1 = Monday.'
		},
		{
			name: 'placeholder',
			type: 'string',
			default: "'Select date'",
			description: 'Placeholder when empty.'
		},
		{
			name: 'inputSize',
			type: "'sm' | 'md' | 'lg'",
			default: "'md'",
			description: 'Size of the read-only trigger field (passed to TextInput).'
		},
		{ name: 'class', type: 'string', description: 'Additional CSS classes on the wrapper.' }
	];
</script>

<UiDocHeader
	title="DatePicker"
	description="DatePicker is a read-only text field that opens the calendar in a popover (single or range). For an inline calendar with time and toggles, see DatePickerAdvanced."
	importCode={"import { DatePicker } from 'phoundry-ui';"}
/>

<DatePickerDemos />

<Separator />

<PropTable props={datePickerProps} title="DatePicker props" />

## Usage tips

- Use `minDate` and `maxDate` to constrain selectable dates.
- In `range` mode, the first click sets the start and the second click sets the end.
- Set `weekStartsOn={1}` for Monday-first calendars (ISO standard).
