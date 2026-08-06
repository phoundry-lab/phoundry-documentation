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
		{ name: 'showChannelSummary', type: 'boolean', default: 'true', description: 'Show the compact RGB and hue summary below the value field.' },
		{ name: 'presetColors', type: 'ColorPickerPreset[]', description: 'Controlled named presets. Omit for the defaults; pass `[]` to suppress them.' },
		{ name: 'recentColors', type: 'string[]', description: 'Controlled recent CSS colors, rendered in the provided order.' },
		{ name: 'customColors', type: 'ColorPickerCustomGroup', description: 'One labeled consumer-defined color group with item-owned pick callbacks.' },
		{ name: 'onpresetadd', type: '(value: string) => void', description: 'Shows the dashed + control and requests that the normalized current color be added.' },
		{ name: 'onpresetdelete', type: '(preset: ColorPickerPreset) => void', description: 'Enables right-click and Delete/Backspace preset removal requests.' },
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

## Managed color sections

```ts
interface ColorPickerPreset {
	id: string;
	name: string;
	value: string;
}

interface ColorPickerCustomItem {
	id: string;
	name: string;
	value: string;
	onpick: () => void;
}

interface ColorPickerCustomGroup {
	label: string;
	description?: string;
	colors: ColorPickerCustomItem[];
}
```

`presetColors`, `recentColors`, and `customColors` are controlled. The picker requests preset mutations through `onpresetadd` and `onpresetdelete`; consumers own persistence and pass the updated arrays back.

## Usage tips

- Use `format="rgb"` or `format="hsl"` when authors prefer typing CSS functions - callbacks remain hex for a single canonical storage format.
- Pass controlled `presetColors` to name and manage a consumer-owned palette. An empty array suppresses the built-in presets.
- `recentColors` is presentation-only; persist, deduplicate, order, and cap recents in the consumer.
- Use `customColors` for semantic or theme-backed CSS colors. Each custom item owns its callback, so it can preserve intent that a hex callback cannot represent.
- Manual Hex, RGB, and HSL fields commit on blur or Enter. Escape or invalid/out-of-range input restores the current value.
- Use `size="sm"` for inline usage in toolbars or compact UIs.
- The picker uses HSV internally for intuitive color selection - hue on the slider, saturation/value on the area.
