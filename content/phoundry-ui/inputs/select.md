---
title: Select
layout: ui
order: 3
---

<script lang="ts">
	import UiDocHeader from '$lib/docs/ui/UiDocHeader.svelte';
	import PropTable from '$lib/docs/ui/PropTable.svelte';
	import type { PropDef } from '$lib/docs/ui/PropTable.svelte';
	import Separator from '$phoundry/components/display/Separator.svelte';
	import SelectDemos from '$lib/docs/ui/demos/SelectDemos.svelte';

	const props: PropDef[] = [
		{
			name: 'options',
			type: 'OptionOrGroup[]',
			description: 'Flat options or option groups to display',
			required: true
		},
		{
			name: 'value',
			type: 'T | undefined',
			description: 'Currently selected value',
			required: true
		},
		{
			name: 'onchange',
			type: '(value: T | undefined) => void',
			description: 'Called when selection changes',
			required: true
		},
		{
			name: 'placeholder',
			type: 'string',
			default: "'Select...'",
			description: 'Placeholder text when no value is selected'
		},
		{ name: 'size', type: "'sm' | 'md'", default: "'md'", description: 'Trigger height aligned to Button `sm` / `md` control scale' },
		{ name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the select' },
		{
			name: 'variant',
			type: "'outline' | 'ghost' | 'filled'",
			default: "'filled'",
			description: 'Visual style of the trigger (`ghost` is the minimal inline style).'
		},
		{
			name: 'shrink',
			type: 'boolean',
			default: 'false',
			description: 'When true, trigger width fits content instead of full width'
		},
		{
			name: 'clearable',
			type: 'boolean',
			default: 'false',
			description: 'Shows a clear button when a value is selected'
		},
		{
			name: 'required',
			type: 'boolean',
			default: 'false',
			description: 'Reserved for HTML semantics - not wired to DOM attributes yet; use `invalid` / `error` for validation UX.'
		},
		{
			name: 'invalid',
			type: 'boolean',
			default: 'false',
			description: 'Applies error styling to the trigger'
		},
		{ name: 'error', type: 'string', description: 'Error message displayed below the select' },
		{ name: 'id', type: 'string', description: 'HTML id attribute' },
		{
			name: 'selectedIndicator',
			type: "'check' | 'background'",
			default: "'background'",
			description: 'How the selected option is indicated in the dropdown'
		},
		{ name: 'name', type: 'string', description: 'Hidden input name for form submission' },
		{
			name: 'element',
			type: 'HTMLButtonElement',
			description: 'Bindable reference to the trigger button'
		}
	];

	const optionProps: PropDef[] = [
		{
			name: 'value',
			type: 'T',
			description: 'The value associated with this option',
			required: true
		},
		{
			name: 'label',
			type: 'string',
			description: 'Display text for the option (also used as accessible fallback)',
			required: true
		},
		{ name: 'description', type: 'string', description: 'Secondary text shown below the label' },
		{ name: 'icon', type: 'string', description: 'Iconify icon string shown before the label' },
		{
			name: 'custom',
			type: 'SelectOptionCustom',
			description: 'Custom rendering config (see below)'
		}
	];

	const customProps: PropDef[] = [
		{
			name: 'snippet',
			type: 'Snippet<[{ option, selected }]>',
			description: 'Svelte snippet that replaces the default option content',
			required: true
		},
		{
			name: 'selectable',
			type: 'boolean',
			default: 'true',
			description: 'When false, the option row is non-selectable (renders as a div for interactive content)'
		}
	];

	const groupProps: PropDef[] = [
		{ name: 'label', type: 'string', description: 'Group header text', required: true },
		{
			name: 'options',
			type: 'SelectOption[]',
			description: 'Options within this group',
			required: true
		}
	];
</script>

<UiDocHeader
	title="Select"
	description="Custom dropdown select with keyboard navigation, option groups, icons, descriptions, clearable state, and validation."
	importCode={"import { Select } from 'phoundry-ui';"}
/>

<SelectDemos />

<Separator />

<PropTable {props} />

<h3 class="text-sm font-medium text-txt-primary">SelectOption</h3>
<PropTable props={optionProps} />

<h3 class="text-sm font-medium text-txt-primary">SelectOptionCustom</h3>
<PropTable props={customProps} />

<h3 class="text-sm font-medium text-txt-primary">SelectOptionGroup</h3>
<PropTable props={groupProps} />

## Usage tips

- Use `variant="ghost"` when the select is inline within a toolbar or header.
- Pass `shrink` to prevent the trigger from stretching to full width.
- Combine `invalid` + `error` for form validation; the error renders below the trigger.
- The dropdown renders as a portal-based overlay for correct z-index stacking.
- Full keyboard navigation: Arrow keys, Enter/Space to select, Escape to close.
- Pass `name` to emit a hidden input for plain HTML forms alongside the visible button trigger.
