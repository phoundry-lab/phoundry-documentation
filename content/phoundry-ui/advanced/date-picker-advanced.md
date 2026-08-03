---
title: DatePickerAdvanced
layout: ui
order: 3
---

<script lang="ts">
	import UiDocHeader from '$lib/docs/ui/UiDocHeader.svelte';
	import PropTable from '$lib/docs/ui/PropTable.svelte';
	import type { PropDef } from '$lib/docs/ui/PropTable.svelte';
	import Separator from '$phoundry/components/display/Separator.svelte';
	import DatePickerAdvancedDemos from '$lib/docs/ui/demos/DatePickerAdvancedDemos.svelte';

	const advancedProps: PropDef[] = [
		{
			name: 'value',
			type: 'DatePickerAdvancedValue',
			description: 'Bindable structured value (start/end, include toggles).'
		},
		{
			name: 'onchange',
			type: '(type: DatePickerChangeType, value: DatePickerAdvancedValue) => void',
			description: 'Optional lifecycle hook - useful for analytics; state still updates via `bind:value`.'
		},
		{
			name: 'formatDate',
			type: '(date: Date) => string',
			description: 'Optional formatter for selected dates shown in the summary rows.'
		},
		{ name: 'minDate', type: 'Date', description: 'Earliest selectable date.' },
		{ name: 'maxDate', type: 'Date', description: 'Latest selectable date.' },
		{ name: 'disabled', type: 'boolean', default: 'false', description: 'Disable the picker.' },
		{
			name: 'weekStartsOn',
			type: '0 | 1',
			default: '0',
			description: 'First day of week: 0 = Sunday, 1 = Monday.'
		},
		{
			name: 'showToggles',
			type: 'boolean',
			default: 'true',
			description: 'Show date rows + Notion-style toggles (End date, Include time, Clear).'
		},
		{ name: 'class', type: 'string', description: 'Additional CSS classes.' }
	];
</script>

<UiDocHeader
title="DatePickerAdvanced"
description="Inline calendar with optional date summary rows, time pickers, and toggles. Month and year grids keep a stable height; use Back in the header to return to the day grid."
importCode={"import { DatePickerAdvanced } from 'phoundry-ui';"}
/>

<DatePickerAdvancedDemos />

<Separator />

<PropTable props={advancedProps} title="DatePickerAdvanced props" />

## Usage tips

- Use `minDate` and `maxDate` to constrain selectable dates.
- In `range` mode (when `includeEndDate` is true), the first click sets the start and the second click sets the end.
- Use `DatePickerAdvanced` with `showToggles={false}` for a compact calendar (same layout `DatePicker` uses internally).
- Set `weekStartsOn={1}` for Monday-first calendars (ISO standard).
- Use `formatDate` when the picker summary rows need to match a host application's date presentation.
