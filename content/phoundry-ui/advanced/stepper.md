---
title: Stepper
layout: ui
order: 6
status: experimental
---

<script lang="ts">
	import UiDocHeader from '$lib/docs/ui/UiDocHeader.svelte';
	import PropTable from '$lib/docs/ui/PropTable.svelte';
	import type { PropDef } from '$lib/docs/ui/PropTable.svelte';
	import Separator from '$phoundry/components/display/Separator.svelte';
	import StepperDemos from '$lib/docs/ui/demos/StepperDemos.svelte';

	const props: PropDef[] = [
		{
			name: 'steps',
			type: 'StepperStep[]',
			description: 'Array of step definitions.',
			required: true
		},
		{
			name: 'currentStep',
			type: 'number',
			description: 'Zero-based index of the active step.',
			required: true
		},
		{
			name: 'clickable',
			type: 'boolean',
			default: 'false',
			description: 'Allow clicking steps to navigate.'
		},
		{
			name: 'onstepchange',
			type: '(stepIndex: number) => void',
			description: 'Called when a clickable step is clicked.'
		},
		{
			name: 'orientation',
			type: "'horizontal' | 'vertical'",
			default: "'horizontal'",
			description: 'Layout direction.'
		},
		{
			name: 'showNumbers',
			type: 'boolean',
			default: 'true',
			description: 'Show numeric badges for upcoming steps; completed steps still show the check icon.'
		},
		{ name: 'class', type: 'string', description: 'Additional CSS classes.' },
		{
			name: 'step',
			type: 'Snippet',
			description: 'Custom snippet for rendering each step indicator.'
		}
	];

	const stepDefProps: PropDef[] = [
		{ name: 'id', type: 'string', description: 'Unique step identifier.', required: true },
		{ name: 'label', type: 'string', description: 'Step label text.', required: true },
		{ name: 'description', type: 'string', description: 'Optional description below the label.' },
		{ name: 'icon', type: 'string', description: 'Iconify icon for the step indicator.' },
		{ name: 'optional', type: 'boolean', description: 'Mark step as optional.' }
	];
</script>

<UiDocHeader
	title="Stepper"
	description="Multi-step progress indicator with horizontal/vertical layout, clickable navigation, and step numbers."
	importCode={"import { Stepper } from 'phoundry-ui';"}
/>

<StepperDemos />

<Separator />

<PropTable {props} />

<PropTable props={stepDefProps} title="StepperStep" />

## Usage tips

- Use `clickable` with `onstepchange` for wizard UIs where users can jump between completed steps.
- Mark optional steps with `optional: true` to display an "Optional" label.
- Use the `step` snippet prop for fully custom step indicators when icons + labels are not enough.
- `clickable` requires `onstepchange` - clicks on non-current steps invoke the handler.
- Vertical orientation works well in sidebars or narrow containers.
