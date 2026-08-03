---
title: Tour
layout: ui
order: 8
status: experimental
---

<script lang="ts">
	import UiDocHeader from '$lib/docs/ui/UiDocHeader.svelte';
	import PropTable from '$lib/docs/ui/PropTable.svelte';
	import type { PropDef } from '$lib/docs/ui/PropTable.svelte';
	import Separator from '$phoundry/components/display/Separator.svelte';
	import TourDemos from '$lib/docs/ui/demos/TourDemos.svelte';

	const tourProps: PropDef[] = [
		{
			name: 'steps',
			type: 'TourStepDef[]',
			description: 'Array of step definitions.',
			required: true
		},
		{
			name: 'open',
			type: 'boolean',
			default: 'false',
			description: 'Whether the tour is visible. Bindable.'
		},
		{ name: 'current', type: 'number', default: '0', description: 'Active step index. Bindable.' },
		{ name: 'onClose', type: '() => void', description: 'Called when the tour is dismissed.' },
		{
			name: 'onChange',
			type: '(current: number) => void',
			description: 'Called when the step changes.'
		},
		{
			name: 'mask',
			type: 'boolean',
			default: 'true',
			description: 'Show dimmed mask overlay with target cutout.'
		},
		{
			name: 'type',
			type: "'default' | 'primary'",
			default: "'default'",
			description: 'Card color scheme.'
		},
		{
			name: 'gap',
			type: '{ offset?: number; radius?: number }',
			default: '{ offset: 6, radius: 4 }',
			description: 'Highlight area gap around the target element.'
		},
		{
			name: 'arrow',
			type: 'boolean',
			default: 'true',
			description: 'Show arrow pointing from card to target.'
		},
		{
			name: 'placement',
			type: 'TourPlacement',
			default: "'bottom'",
			description: 'Default placement for all steps.'
		},
		{
			name: 'zIndex',
			type: 'number',
			default: '350',
			description: 'z-index of the tour overlay layer.'
		},
		{
			name: 'scrollIntoViewOptions',
			type: 'boolean | ScrollIntoViewOptions',
			default: 'true',
			description: 'Scroll targets into view before showing.'
		},
		{
			name: 'disabledInteraction',
			type: 'boolean',
			default: 'false',
			description: 'Block interaction with highlighted element.'
		},
		{
			name: 'indicatorsRender',
			type: 'Snippet<[current, total]>',
			description: 'Custom step indicator renderer.'
		}
	];

	const stepProps: PropDef[] = [
		{
			name: 'target',
			type: '() => HTMLElement | null',
			description: 'Element to highlight. Omit for center-screen placement.'
		},
		{ name: 'title', type: 'string', description: 'Step title.' },
		{ name: 'description', type: 'string', description: 'Step description text.' },
		{ name: 'cover', type: 'Snippet', description: 'Cover content (image/video) above the title.' },
		{ name: 'placement', type: 'TourPlacement', description: 'Override placement for this step.' },
		{ name: 'mask', type: 'boolean', description: 'Override global mask setting for this step.' },
		{
			name: 'scrollIntoView',
			type: 'boolean | ScrollIntoViewOptions',
			description: 'Override scroll behavior for this step.'
		},
		{
			name: 'nextButtonText',
			type: 'string',
			description: 'Custom "Next" / "Finish" button label.'
		},
		{ name: 'prevButtonText', type: 'string', description: 'Custom "Previous" button label.' }
	];
</script>

<UiDocHeader
	title="Tour"
	description="A multi-step guided tour overlay that highlights target elements and displays positioned popover cards with navigation controls."
	importCode={"import { Tour } from 'phoundry-ui';\nimport type { TourStepDef } from 'phoundry-ui';"}
/>

<TourDemos />

<Separator />

<PropTable props={tourProps} title="Tour Props" />

<PropTable props={stepProps} title="TourStepDef" />

## Usage tips

- Use `bind:open` and `bind:current` to control the tour externally.
- Each step's `target` is a function returning an `HTMLElement` - use `bind:element` on buttons or `document.getElementById`.
- Omitting `target` (or returning null) centers the card on screen - useful for intro/welcome steps.
- Set `mask=false` with `type="primary"` for a non-modal tour that doesn't block interaction.
- The `gap` prop controls the highlight cutout padding (`offset`) and corner rounding (`radius`) around the target.
- Keyboard: `Escape` closes, `ArrowLeft`/`ArrowRight` navigate steps.
- Set `disabledInteraction` when you want the highlighted control read-only while still visually emphasizing it.
- Turn off `arrow` for dense layouts where the pointer would collide with nearby UI; combine with `type="primary"` for contrast.
- Raise `zIndex` if other overlays (command palette, modal) share the same stacking context and occlude the tour.
