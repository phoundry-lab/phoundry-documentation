---
title: Roving TabIndex
layout: ui
order: 4
---

<script lang="ts">
	import UiDocHeader from '$lib/docs/ui/UiDocHeader.svelte';
	import PropTable from '$lib/docs/ui/PropTable.svelte';
	import type { PropDef } from '$lib/docs/ui/PropTable.svelte';
	import Separator from '$phoundry/components/display/Separator.svelte';
	import RovingTabIndexDemos from '$lib/docs/ui/demos/RovingTabIndexDemos.svelte';

	const optionsProps: PropDef[] = [
		{
			name: 'orientation',
			type: "'horizontal' | 'vertical' | 'both'",
			default: "'vertical'",
			description: 'Arrow key direction for navigation.'
		},
		{
			name: 'itemSelector',
			type: 'string',
			default: '[role] / [data-roving-item]',
			description: 'CSS selector for focusable items within the container.'
		},
		{
			name: 'loop',
			type: 'boolean',
			default: 'true',
			description: 'Wrap around when reaching the start or end.'
		},
		{
			name: 'onFocus',
			type: '(element, index) => void',
			description: 'Called when an item receives focus.'
		}
	];

	const returnProps: PropDef[] = [
		{
			name: 'action',
			type: 'Action',
			description: 'Svelte action to apply to the container element via use:roving.action.'
		},
		{
			name: 'focusItem(index)',
			type: '(number) => void',
			description: 'Programmatically focus a specific item by index.'
		},
		{
			name: 'focusedIndex',
			type: 'number (readonly)',
			description: 'The currently focused item index.'
		}
	];
</script>

<UiDocHeader
	title="Roving TabIndex"
	description="Manages tabindex for keyboard navigation within a group of items. Only the focused item is tabbable; arrow keys move focus between items."
	importCode={"import { createRovingTabIndex } from 'phoundry-ui';"}
/>

<RovingTabIndexDemos />

<Separator />
<PropTable props={optionsProps} title="RovingTabIndexOptions" />

<Separator />
<PropTable props={returnProps} title="Return Value" />

## Usage tips

- Items are matched by `[role="tab"]`, `[role="menuitem"]`, `[role="option"]`, `[role="treeitem"]`, or `[data-roving-item]` by default.
- Disabled items (`disabled` or `aria-disabled="true"`) are skipped.
- Use for toolbars, radio groups, tab lists, and menu navigation patterns.
- `Home` and `End` keys are supported for jumping to first/last items.
- Call `focusItem(index)` to programmatically move focus (e.g., after adding/removing items).
