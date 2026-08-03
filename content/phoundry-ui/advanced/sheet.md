---
title: Sheet
layout: ui
order: 5
---

<script lang="ts">
	import UiDocHeader from '$lib/docs/ui/UiDocHeader.svelte';
	import PropTable from '$lib/docs/ui/PropTable.svelte';
	import type { PropDef } from '$lib/docs/ui/PropTable.svelte';
	import Separator from '$phoundry/components/display/Separator.svelte';
	import SheetDemos from '$lib/docs/ui/demos/SheetDemos.svelte';

	const props: PropDef[] = [
		{ name: 'open', type: 'boolean', description: 'Whether the sheet is visible.', required: true },
		{
			name: 'onclose',
			type: '() => void',
			description: 'Called when the sheet should close.',
			required: true
		},
		{
			name: 'side',
			type: "'left' | 'right' | 'top' | 'bottom'",
			default: "'right'",
			description: 'Which edge the sheet slides from.'
		},
		{
			name: 'size',
			type: "'sm' | 'md' | 'lg' | 'xl' | 'full'",
			default: "'md'",
			description: 'Sheet width (left/right) or height (top/bottom).'
		},
		{ name: 'title', type: 'string', description: 'Header title text.' },
		{
			name: 'closeOnBackdrop',
			type: 'boolean',
			default: 'true',
			description: 'Close when clicking the backdrop.'
		},
		{
			name: 'closeOnEscape',
			type: 'boolean',
			default: 'true',
			description: 'Close on Escape key.'
		},
		{
			name: 'showCloseButton',
			type: 'boolean',
			default: 'true',
			description: 'Show the X close button in the header.'
		},
		{ name: 'class', type: 'string', description: 'Additional CSS classes for the sheet panel.' },
		{ name: 'children', type: 'Snippet', description: 'Sheet body content.', required: true }
	];
</script>

<UiDocHeader
	title="Sheet"
	description="Slide-in drawer panel from any edge. Supports backdrop, keyboard dismiss, and multiple sizes."
	importCode={"import { Sheet } from 'phoundry-ui';"}
/>

<SheetDemos />

<Separator />

<PropTable {props} />

## Usage tips

- Use `side="right"` for detail panels, `side="left"` for navigation, and `side="bottom"` for mobile-style menus.
- Set `closeOnBackdrop=false` for sheets with unsaved form data to prevent accidental dismissal.
- The `size` prop controls width for left/right sheets and height for top/bottom sheets (`sm`–`xl` map to px presets, `full` fills the axis).
- `showCloseButton={false}` hides the header close control - still provide another dismiss affordance when `closeOnEscape` is left enabled.
- Uses `role="dialog"` and `aria-modal="true"`; add your own focus trap if the sheet contains complex interactive widgets.
