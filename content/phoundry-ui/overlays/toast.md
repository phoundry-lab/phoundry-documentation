---
title: Toast
layout: ui
order: 5
---

<script lang="ts">
	import UiDocHeader from '$lib/docs/ui/UiDocHeader.svelte';
	import PropTable from '$lib/docs/ui/PropTable.svelte';
	import type { PropDef } from '$lib/docs/ui/PropTable.svelte';
	import Separator from '$phoundry/components/display/Separator.svelte';
	import ToastDemos from '$lib/docs/ui/demos/ToastDemos.svelte';

	const optionProps: PropDef[] = [
		{ name: 'message', type: 'string', description: 'Toast message text.', required: true },
		{
			name: 'id',
			type: 'string',
			description: 'Stable ID - posting another toast with the same ID replaces the previous one.'
		},
		{
			name: 'variant',
			type: "'default' | 'success' | 'error' | 'warning' | 'info'",
			default: "'default'",
			description: 'Visual style.'
		},
		{
			name: 'duration',
			type: 'number',
			default: '4000',
			description: 'Auto-dismiss time in ms. Set to 0 for persistent.'
		},
		{ name: 'description', type: 'string', description: 'Secondary text shown below the message.' },
		{
			name: 'dismissible',
			type: 'boolean',
			default: 'true',
			description: 'Show a dismiss button.'
		},
		{
			name: 'action',
			type: '{ label: string; onclick: () => void }',
			description: 'Action button displayed in the toast.'
		}
	];

	const overlayProps: PropDef[] = [
		{
			name: 'position',
			type: "'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'",
			default: "'bottom-right'",
			description: 'Screen position for the toast stack.'
		}
	];

	const managerMethods: PropDef[] = [
		{ name: 'add(options)', type: 'ToastOptions → string', description: 'Enqueue a toast; returns its ID.' },
		{ name: 'success / error / warning / info', type: '(message, partial?) → string', description: 'Shorthand variants of add().' },
		{ name: 'dismiss(id)', type: 'void', description: 'Remove one toast by ID.' },
		{ name: 'clear()', type: 'void', description: 'Remove every toast.' },
		{ name: 'toasts', type: 'ToastEntry[]', description: 'Reactive list for debugging or custom UI.' }
	];
</script>

<UiDocHeader
	title="Toast"
	description="Non-blocking notification toasts with variants, actions, and auto-dismiss. Singleton manager accessible from anywhere."
	importCode={"import { getToastManager } from 'phoundry-ui';"}
/>

<ToastDemos />

<Separator />

<PropTable props={optionProps} title="ToastOptions" />

<PropTable props={overlayProps} title="ToastOverlay Props" />

<PropTable props={managerMethods} title="ToastManager" />

## Usage tips

- Pass `maxToasts` to `setupOverlays` or the first `getToastManager(max)` call - it only applies when the singleton is first created.
- `getToastManager()` returns a singleton - call it from any component or service after overlays are initialized.
- Render `ToastOverlay` once in your root layout to display toasts.
- Set `duration: 0` for persistent toasts that require manual dismissal.
- Use `manager.clear()` to dismiss all active toasts at once.
