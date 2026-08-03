---
title: StatusCheckbox
layout: ui
order: 7
---

<script lang="ts">
	import UiDocHeader from '$lib/docs/ui/UiDocHeader.svelte';
	import PropTable from '$lib/docs/ui/PropTable.svelte';
	import type { PropDef } from '$lib/docs/ui/PropTable.svelte';
	import Separator from '$phoundry/components/display/Separator.svelte';
	import StatusCheckboxDemos from '$lib/docs/ui/demos/StatusCheckboxDemos.svelte';

	const props: PropDef[] = [
		{ name: 'activeKey', type: 'string', description: 'Current state key (bindable)', required: true },
		{
			name: 'states',
			type: 'StatusCheckboxStateDef[]',
			description: 'Ordered states for cycle/snap; defaults to unchecked / indeterminate / checked'
		},
		{
			name: 'fallbackChar',
			type: 'string',
			description: 'Character shown when activeKey is not in states (gray box)'
		},
		{ name: 'disabled', type: 'boolean', default: 'false', description: 'Prevents interaction' },
		{ name: 'size', type: "'sm' | 'md'", default: "'sm'", description: 'Indicator box (~14px sm / ~16px md display size)' },
		{
			name: 'ariaLabelPrefix',
			type: 'string',
			description: 'Prepended to state label for aria-label (e.g. "Task")'
		},
		{
			name: 'onchange',
			type: '(key: string, event?: MouseEvent) => void',
			description: 'Called after cycle or snap with the new key'
		},
		{ name: 'class', type: 'string', description: 'Additional CSS classes on the button' },
		{
			name: 'element',
			type: 'HTMLButtonElement',
			description: 'Bindable reference to the control button'
		}
	];
</script>

<UiDocHeader
	title="StatusCheckbox"
	description="Multi-state checkbox that snaps between first/last on click and cycles through all states with Ctrl/Cmd+click. Each state can use an Iconify icon and a CSS color."
	importCode={"import { StatusCheckbox } from 'phoundry-ui';"}
/>

<StatusCheckboxDemos />

<Separator />

<PropTable {props} />
