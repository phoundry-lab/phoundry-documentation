---
title: ButtonCheckbox
layout: ui
order: 8
---

<script lang="ts">
	import UiDocHeader from '$lib/docs/ui/UiDocHeader.svelte';
	import PropTable from '$lib/docs/ui/PropTable.svelte';
	import type { PropDef } from '$lib/docs/ui/PropTable.svelte';
	import Separator from '$phoundry/components/display/Separator.svelte';
	import ButtonCheckboxDemos from '$lib/docs/ui/demos/ButtonCheckboxDemos.svelte';

	const props: PropDef[] = [
		{ name: 'checked', type: 'boolean', description: 'Two-state value (bindable).', required: true },
		{
			name: 'onchange',
			type: '(checked: boolean) => void',
			description: 'Called after toggling; receives the new checked state.'
		},
		{
			name: 'disabled',
			type: 'boolean',
			description: 'Disables the control.',
			default: 'false'
		},
		{
			name: 'variant',
			type: "'primary' | 'secondary' | 'outline' | 'danger' | 'ghost' | 'link'",
			description: 'Same variants as `Button`.',
			default: "'secondary'"
		},
		{ name: 'size', type: "'xs' | 'sm' | 'md' | 'lg'", description: 'Matches `Button` sizing.', default: "'md'" },
		{ name: 'icon', type: 'string', description: 'Optional Iconify icon beside the label.' },
		{
			name: 'iconPosition',
			type: "'left' | 'right'",
			default: "'left'",
			description: 'Icon placement when `icon` is set.'
		},
		{
			name: 'iconOnly',
			type: 'boolean',
			default: 'false',
			description: 'Square icon-only layout - pair with `title` for accessibility.'
		},
		{
			name: 'loading',
			type: 'boolean',
			default: 'false',
			description: 'Shows spinner and prevents toggling.'
		},
		{ name: 'title', type: 'string', description: 'Tooltip text (phoundry tooltip system).' },
		{
			name: 'noTooltip',
			type: 'boolean',
			default: 'false',
			description: 'Use native `title` attribute instead of the tooltip attachment.'
		},
		{ name: 'class', type: 'string', description: 'Merged onto the outer `Button` wrapper.' },
		{ name: 'children', type: 'Snippet', description: 'Label next to the faux checkbox.' },
		{
			name: '...rest',
			type: 'HTMLButtonAttributes',
			description: 'Forwarded to the inner `Button` (e.g. `aria-*`, `id`, keyboard handlers). Not for `href` - this stays a checkbox button.'
		}
	];
</script>

<UiDocHeader
	title="ButtonCheckbox"
	description="Checkbox semantics (`role=&quot;checkbox&quot;`, `aria-checked`) with `Button` visuals. Inherits most `Button` props except `onclick`, `active`, and link-related props."
	importCode={"import { ButtonCheckbox } from 'phoundry-ui';"}
/>

<ButtonCheckboxDemos />

<Separator />

<PropTable {props} />

## Usage notes

- Use for toolbar toggles or dense lists where a checkbox box would feel out of place.
- For forms that submit natively, prefer plain `Checkbox` with a `name` + hidden input.
- Space/Enter toggle the control; click hits the full button surface.
