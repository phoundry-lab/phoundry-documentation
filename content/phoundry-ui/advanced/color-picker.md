---
title: ColorPicker
layout: ui
order: 1
---

<script lang="ts">
	import UiDocHeader from '$lib/docs/ui/UiDocHeader.svelte';
	import PropTable from '$lib/docs/ui/PropTable.svelte';
	import type { PropDef } from '$lib/docs/ui/PropTable.svelte';
	import Separator from '$phoundry/components/display/Separator.svelte';
	import ColorPickerDemos from '$lib/docs/ui/demos/ColorPickerDemos.svelte';

	const props: PropDef[] = [
		{ name: 'value', type: 'string', description: 'Current color value.', required: true },
		{
			name: 'onchange',
			type: '(color: string) => void',
			description: 'Called when the color changes. The value is always normalized hex (e.g. `#22c55e`), including after typing in RGB/HSL form.',
			required: true
		},
		{
			name: 'format',
			type: "'hex' | 'rgb' | 'hsl'",
			default: "'hex'",
			description: 'How the text field displays and parses manual entry. Callbacks still receive hex.'
		},
		{
			name: 'showInput',
			type: 'boolean',
			default: 'true',
			description: 'Show the text input for manual entry.'
		},
		{
			name: 'showPresets',
			type: 'boolean',
			default: 'true',
			description: 'Show the preset color swatches.'
		},
		{
			name: 'presets',
			type: 'string[]',
			description: 'Custom preset colors. Uses defaults if not provided.'
		},
		{ name: 'disabled', type: 'boolean', default: 'false', description: 'Disable interaction.' },
		{ name: 'size', type: "'sm' | 'md'", default: "'md'", description: 'Picker size.' },
		{ name: 'class', type: 'string', description: 'Additional CSS classes.' }
	];
</script>

<UiDocHeader
	title="ColorPicker"
	description="HSV color picker with text input, preset swatches, and multiple output formats."
	importCode={"import { ColorPicker } from 'phoundry-ui';"}
/>

<ColorPickerDemos />

<Separator />

<PropTable {props} />

## Usage tips

- Use `format="rgb"` or `format="hsl"` when authors prefer typing CSS functions - callbacks remain hex for a single canonical storage format.
- Pass custom `presets` to match your brand palette or design tokens.
- Use `size="sm"` for inline usage in toolbars or compact UIs.
- The picker uses HSV internally for intuitive color selection - hue on the slider, saturation/value on the area.
