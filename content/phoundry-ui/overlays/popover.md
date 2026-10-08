---
title: Popover
layout: ui
order: 7
---

<script lang="ts">
	import UiDocHeader from '$lib/docs/ui/UiDocHeader.svelte';
	import PropTable from '$lib/docs/ui/PropTable.svelte';
	import type { PropDef } from '$lib/docs/ui/PropTable.svelte';
	import Separator from '$phoundry/components/display/Separator.svelte';
	import PopoverDemos from '$lib/docs/ui/demos/PopoverDemos.svelte';

	const props: PropDef[] = [
		{
			name: 'open',
			type: 'boolean',
			default: 'false',
			description: 'Whether the popover is open. Bindable.'
		},
		{
			name: 'onOpenChange',
			type: '(open: boolean) => void',
			description: 'Callback when open state changes.'
		},
		{
			name: 'placement',
			type: 'PopoverPlacement',
			default: "'bottom-start'",
			description: 'Positioning relative to the trigger element.'
		},
		{
			name: 'offset',
			type: 'number',
			default: '4',
			description: 'Gap in pixels between trigger and popover.'
		},
		{
			name: 'flip',
			type: 'boolean',
			default: 'true',
			description: 'Flip to opposite side if there is not enough space.'
		},
		{
			name: 'dismissible',
			type: 'boolean',
			default: 'true',
			description: 'Close on an outside pointer press, including touch.'
		},
		{
			name: 'class',
			type: 'string',
			description: 'Additional CSS classes for the floating panel.'
		},
		{
			name: 'trigger',
			type: 'Snippet<[toggle: () => void]>',
			description: 'Trigger region - receives `toggle`. Optional only if you drive `open` entirely from the outside (unusual).'
		},
		{ name: 'children', type: 'Snippet', description: 'Popover body content.', required: true }
	];
</script>

<UiDocHeader
	title="Popover"
	description="Floating panel anchored to a trigger element with auto-positioning, flip behavior, and backdrop dismissal."
	importCode={"import { Popover } from 'phoundry-ui';"}
/>

<PopoverDemos />

<Separator />

<PropTable {props} />

## Usage tips

- The `trigger` snippet receives a `toggle` function - call it on click to open/close.
- Use `bind:open` for controlled state - you can open/close from external buttons or logic.
- With `flip: true` (default), the popover repositions if it would overflow the viewport.
- Set `dismissible: false` to prevent closing on outside clicks (useful for forms).
- The floating panel uses `role="dialog"`; focus management is minimal - trap focus inside when hosting complex widgets.
- `Escape` closes the top contextual owner regardless of `dismissible` (handled on `window`).

Outside pointer presses consume the dismissal gesture. Presses within the panel preserve native focus, caret, and editing behavior.

## Application Back

Declarative `Popover` and programmatic `PopoverOverlay` register their existing close behavior with `getContextualDismissal()` while open. Import it from `phoundry-ui`; read its reactive `active` property when coordinating application focus, and call `back()` before dismissing the application surface beneath it. The call closes only the latest mounted menu level or Popover and returns `true` when consumed. Closing preserves the usual `onOpenChange` or manager callback behavior, and registration is released on close and teardown.

`dismissible: false` controls outside pointer dismissal; Escape and semantic Back still close the Popover. This interface does not manage application navigation, dialogs, or browser history.
