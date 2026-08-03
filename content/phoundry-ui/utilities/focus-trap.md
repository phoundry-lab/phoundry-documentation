---
title: Focus Trap
layout: ui
order: 3
---

<script lang="ts">
	import UiDocHeader from '$lib/docs/ui/UiDocHeader.svelte';
	import PropTable from '$lib/docs/ui/PropTable.svelte';
	import type { PropDef } from '$lib/docs/ui/PropTable.svelte';
	import Separator from '$phoundry/components/display/Separator.svelte';
	import FocusTrapDemos from '$lib/docs/ui/demos/FocusTrapDemos.svelte';

	const optionsProps: PropDef[] = [
		{
			name: 'autoFocus',
			type: 'boolean',
			default: 'true',
			description: 'Auto-focus the first focusable element when the trap activates.'
		},
		{
			name: 'returnFocusOnDeactivate',
			type: 'boolean',
			default: 'true',
			description: 'Return focus to the previously focused element on deactivation.'
		},
		{
			name: 'escapeDeactivates',
			type: 'boolean',
			default: 'false',
			description: 'Allow Escape key to deactivate the trap.'
		},
		{
			name: 'onEscape',
			type: '() => void',
			description: 'Called when Escape is pressed (if escapeDeactivates is true).'
		}
	];

	const returnProps: PropDef[] = [
		{
			name: 'action',
			type: 'Action',
			description:
				'Svelte action: use:trap.action or use:trap.action={{ enabled: boolean }}. When enabled is false, Tab capture is off (e.g. stacked modals not on top) without restoring focus.'
		},
		{
			name: 'activate()',
			type: '() => void',
			description: 'Manually activate the trap (called automatically by the action when enabled).'
		},
		{
			name: 'deactivate(options?)',
			type: '{ restoreFocus?: boolean }',
			description: 'Manually deactivate. Pass restoreFocus: false to pause without moving focus (stacked overlays). Defaults to the trap’s returnFocusOnDeactivate when omitted.'
		},
		{
			name: 'active',
			type: 'boolean (readonly)',
			description: 'Whether the trap is currently active.'
		}
	];

	const actionParams: PropDef[] = [
		{
			name: 'enabled',
			type: 'boolean',
			default: 'true',
			description: 'When false, the action does not activate Tab capture until set true again (see action update).'
		}
	];
</script>

<UiDocHeader
	title="Focus Trap"
	description="Constrains Tab/Shift+Tab focus cycling within a container element. Useful for dialogs, sidebars, and any overlay that should capture keyboard focus."
	importCode={"import { createFocusTrap } from 'phoundry-ui';"}
/>

<div class="max-w-3xl space-y-8">
	<FocusTrapDemos />

	<Separator />
	<PropTable props={optionsProps} title="FocusTrapOptions" />

	<Separator />
	<PropTable props={returnProps} title="Return Value" />

	<Separator />
	<PropTable props={actionParams} title="FocusTrapActionParams (use:trap.action parameter)" />
</div>

## Usage tips

- Used internally by `Modal` and the modal manager overlay - you only need this directly for custom dialogs or sidebar panels.
- The action activates the trap when applied (if `enabled` is not false) and cleans up on `destroy`.
- Focus returns to the previously focused element when the trap deactivates (unless `returnFocusOnDeactivate` is false).
- Only visible, non-disabled focusable elements participate in the cycle.
- Set `escapeDeactivates: true` and provide an `onEscape` callback to handle closing.
