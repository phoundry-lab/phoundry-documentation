---
title: Textarea
layout: ui
order: 2
---

<script lang="ts">
	import UiDocHeader from '$lib/docs/ui/UiDocHeader.svelte';
	import PropTable from '$lib/docs/ui/PropTable.svelte';
	import type { PropDef } from '$lib/docs/ui/PropTable.svelte';
	import Separator from '$phoundry/components/display/Separator.svelte';
	import TextareaDemos from '$lib/docs/ui/demos/TextareaDemos.svelte';

	const props: PropDef[] = [
		{ name: 'value', type: 'string', default: "''", description: 'Current textarea value.' },
		{
			name: 'onchange',
			type: '(value: string) => void',
			description: 'Fires on blur after value changes'
		},
		{ name: 'oninput', type: '(value: string) => void', description: 'Fires on every keystroke' },
		{ name: 'placeholder', type: 'string', description: 'Placeholder text' },
		{ name: 'rows', type: 'number', default: '3', description: 'Initial visible rows' },
		{
			name: 'resize',
			type: "'none' | 'vertical' | 'auto'",
			default: "'vertical'",
			description: "Resize behavior - 'auto' grows with content"
		},
		{ name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Typography and padding from `controlSizes` (no fixed height)' },
		{ name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the textarea' },
		{
			name: 'readonly',
			type: 'boolean',
			default: 'false',
			description: 'Makes the textarea read-only'
		},
		{ name: 'class', type: 'string', description: 'Additional CSS classes' },
		{ name: 'id', type: 'string', description: 'HTML id attribute' },
		{ name: 'name', type: 'string', description: 'HTML name attribute for forms' },
		{
			name: 'element',
			type: 'HTMLTextAreaElement',
			description: 'Bindable reference to the underlying textarea element'
		},
		{
			name: '…rest',
			type: 'HTMLAttributes<textarea>',
			description: 'Forwarded native attributes (`rows` also exists as an explicit prop).'
		}
	];
</script>

<UiDocHeader
	title="Textarea"
	description="Multi-line text area with configurable rows, resize behavior, and an auto-resize mode that grows with content."
	importCode={"import { Textarea } from 'phoundry-ui';"}
/>

<TextareaDemos />

<Separator />

<PropTable {props} />

## Usage tips

- Use `resize="auto"` for comment boxes or chat inputs where height should match content.
- Set `resize="none"` when the textarea lives inside a fixed-height layout (e.g. a split pane).
- Pair with `FormField` to add a label, helper text, and character count.
- The auto-resize mode recalculates on every input - for very long documents, prefer `resize="vertical"`.
