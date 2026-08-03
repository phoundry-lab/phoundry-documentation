---
title: FormField
layout: ui
order: 1
---

<script lang="ts">
	import UiDocHeader from '$lib/docs/ui/UiDocHeader.svelte';
	import PropTable from '$lib/docs/ui/PropTable.svelte';
	import type { PropDef } from '$lib/docs/ui/PropTable.svelte';
	import Separator from '$phoundry/components/display/Separator.svelte';
	import FormFieldDemos from '$lib/docs/ui/demos/FormFieldDemos.svelte';

	const props: PropDef[] = [
		{ name: 'label', type: 'string | Snippet', description: 'Field label text or custom snippet.' },
		{ name: 'description', type: 'string', description: 'Helper text shown below the input.' },
		{
			name: 'error',
			type: 'string',
			description: 'Error message - replaces description when present.'
		},
		{
			name: 'required',
			type: 'boolean',
			default: 'false',
			description: 'Shows a red asterisk next to the label.'
		},
		{
			name: 'disabled',
			type: 'boolean',
			default: 'false',
			description: 'Dims the entire field and prevents interaction.'
		},
		{
			name: 'id',
			type: 'string',
			description: 'HTML id for the label\u2019s `for` attribute. Auto-generated if omitted.'
		},
		{ name: 'class', type: 'string', description: 'Additional CSS classes on the wrapper.' },
		{ name: 'children', type: 'Snippet', description: 'The input element to wrap.', required: true }
	];
</script>

<UiDocHeader
	title="FormField"
	description="Wrapper that adds a label, description or error text, and a required indicator around any input component. Provide the same explicit id on both FormField and the control so the label’s for/id wiring matches the focusable input."
	importCode={"import { FormField, TextInput } from 'phoundry-ui';"}
/>

<FormFieldDemos />

<Separator />

<PropTable {props} />

## Usage tips

- The `error` prop takes priority over `description` - only one displays at a time.
- When you omit `id`, FormField still generates one for the label - mirror it on your input via `bind:element` patterns or pass an explicit shared id as shown above.
- Pass a Snippet for `label` when you need custom markup (e.g. an icon next to the label text).
- Wrap any input component - `TextInput`, `Select`, `Textarea`, etc.
