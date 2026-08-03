---
title: TagEditor
layout: ui
order: 2
status: experimental
---

<script lang="ts">
	import UiDocHeader from '$lib/docs/ui/UiDocHeader.svelte';
	import PropTable from '$lib/docs/ui/PropTable.svelte';
	import type { PropDef } from '$lib/docs/ui/PropTable.svelte';
	import Separator from '$phoundry/components/display/Separator.svelte';
	import TagEditorDemos from '$lib/docs/ui/demos/TagEditorDemos.svelte';

	const props: PropDef[] = [
		{ name: 'tags', type: 'string[]', description: 'Current tags.', required: true },
		{
			name: 'placeholder',
			type: 'string',
			default: "'Add tags (comma-separated)…'",
			description: 'Input placeholder text.'
		},
		{
			name: 'onchange',
			type: '(tags: string[]) => void',
			description: 'Called when tags change.',
			required: true
		},
		{
			name: 'onChange',
			type: '(tags: string[]) => void | Promise<void>',
			description: 'Deprecated - use `onchange` instead.'
		},
		{
			name: 'disabled',
			type: 'boolean',
			default: 'false',
			description: 'Disable input and remove buttons.'
		},
		{ name: 'maxTags', type: 'number', description: 'Maximum number of tags allowed.' },
		{
			name: 'validate',
			type: '(tag: string) => boolean | string',
			description: 'Custom validation - return true, false, or an error message string.'
		},
		{
			name: 'suggestions',
			type: 'string[] | ((query: string) => Promise<string[]>)',
			description: 'Static array or async function for typeahead suggestions.'
		},
		{ name: 'class', type: 'string', description: 'Additional CSS classes.' }
	];
</script>

<UiDocHeader
	title="TagEditor"
	description="Tag input with comma-separated entry, duplicate detection, validation, max limit, and typeahead suggestions (static or async). Tags display as removable chips."
	importCode={"import { TagEditor } from 'phoundry-ui';"}
/>

<TagEditorDemos />

<Separator />

<PropTable {props} />

## Usage tips

- Type a tag and press Enter or click Add. Use commas to add multiple tags at once.
- Backspace on an empty input removes the last tag.
- Duplicates are rejected automatically with an inline validation message.
- Pass an async function to `suggestions` for server-side typeahead (debounced at 200ms).
