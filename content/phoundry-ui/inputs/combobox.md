---
title: Combobox
layout: ui
order: 4
status: experimental
---

<script lang="ts">
	import UiDocHeader from '$lib/docs/ui/UiDocHeader.svelte';
	import PropTable from '$lib/docs/ui/PropTable.svelte';
	import type { PropDef } from '$lib/docs/ui/PropTable.svelte';
	import Separator from '$phoundry/components/display/Separator.svelte';
	import ComboboxDemos from '$lib/docs/ui/demos/ComboboxDemos.svelte';

	const props: PropDef[] = [
		{
			name: 'options',
			type: 'ComboboxOption[]',
			default: '[]',
			description: 'Available options to search/select from'
		},
		{
			name: 'value',
			type: 'string | string[]',
			description: 'Selected value(s) - string for single, string[] for multiple'
		},
		{
			name: 'onchange',
			type: '(value: string | string[]) => void',
			description: 'Called when selection changes',
			required: true
		},
		{
			name: 'onSearch',
			type: '(query: string) => Promise<ComboboxOption[]>',
			description: 'Async search callback - replaces local filtering'
		},
		{
			name: 'onCreate',
			type: '(query: string) => void',
			description: 'Called when user creates a new option'
		},
		{
			name: 'placeholder',
			type: 'string',
			default: "'Search...'",
			description: 'Input placeholder text'
		},
		{
			name: 'multiple',
			type: 'boolean',
			default: 'false',
			description: 'Enable multi-select with tags'
		},
		{
			name: 'creatable',
			type: 'boolean',
			default: 'false',
			description: 'Allow creating new options from the query'
		},
		{ name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the combobox' },
		{ name: 'size', type: "'sm' | 'md'", default: "'md'", description: 'Field typography and padding aligned to Button control scale' },
		{ name: 'class', type: 'string', description: 'Additional CSS classes on the wrapper' },
		{ name: 'id', type: 'string', description: 'HTML id attribute' },
		{ name: 'name', type: 'string', description: 'HTML name attribute' },
		{
			name: 'element',
			type: 'HTMLInputElement',
			description: 'Bindable reference to the input element'
		},
		{
			name: 'option',
			type: 'Snippet<[item, isActive, isSelected]>',
			description: 'Custom snippet for rendering each option row'
		},
		{
			name: '...rest',
			type: 'Record<string, unknown>',
			description: 'Forwarded to the search `<input>` (e.g. `autocomplete`, `spellcheck`).'
		}
	];
</script>

<UiDocHeader
	title="Combobox"
	description="Searchable dropdown with type-ahead filtering, multi-select with tags, async search, creatable options, option groups, and custom option rendering via snippets."
	importCode={"import { Combobox } from 'phoundry-ui';"}
/>

<ComboboxDemos />

<Separator />

<PropTable {props} />

## Usage tips

- Use `onSearch` for server-side filtering - it debounces at 200 ms and replaces local filtering entirely.
- Combine `multiple` + `creatable` for a tag-input pattern where users can add arbitrary values.
- Provide the `option` snippet to render custom layouts (avatars, badges, etc.) inside each dropdown row.
