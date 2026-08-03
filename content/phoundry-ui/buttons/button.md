---
title: Button
layout: ui
order: 1
---

<script lang="ts">
	import UiDocHeader from '$lib/docs/ui/UiDocHeader.svelte';
	import Example from '$lib/docs/ui/Example.svelte';
	import PropTable from '$lib/docs/ui/PropTable.svelte';
	import type { PropDef } from '$lib/docs/ui/PropTable.svelte';
	import Separator from '$phoundry/components/display/Separator.svelte';
	import Button from '$phoundry/components/buttons/Button.svelte';
	import { PhiIcons } from '$phoundry/icons.js';

	const variantsCode = `<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="danger">Danger</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>`;

	const sizesCode = `<Button size="xs">Extra Small</Button>
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>`;

	const iconsCode = `<Button icon={PhiIcons.add} variant="primary">Add Item</Button>
<Button icon={PhiIcons.edit} iconPosition="right">Settings</Button>
<Button icon={PhiIcons.close} iconOnly title="Close" tooltipPlacement="right" />`;

	const statesCode = `<Button loading>Saving...</Button>
<Button active>Active</Button>
<Button disabled>Disabled</Button>`;

	const fullWidthCode = `<div class="w-64">
	<Button variant="primary" fullWidth>Continue</Button>
</div>`;

	const asLinkCode = `<Button href="https://example.com" target="_blank" variant="link">External Link</Button>`;

	const props: PropDef[] = [
		{
			name: 'variant',
			type: "'primary' | 'secondary' | 'outline' | 'danger' | 'ghost' | 'link'",
			default: "'secondary'",
			description: 'Visual style of the button.'
		},
		{
			name: 'size',
			type: "'xs' | 'sm' | 'md' | 'lg'",
			default: "'md'",
			description: 'Canonical control scale - heights, typography, padding, and icon px shared via controlSizes.'
		},
		{ name: 'icon', type: 'string', description: 'Iconify icon string shown alongside or instead of text.' },
		{
			name: 'iconPosition',
			type: "'left' | 'right'",
			default: "'left'",
			description: 'Which side to place the icon on.'
		},
		{
			name: 'iconOnly',
			type: 'boolean',
			default: 'false',
			description: 'Render only the icon with square padding. Use with title for accessibility.'
		},
		{ name: 'loading', type: 'boolean', default: 'false', description: 'Show a spinner and disable interaction.' },
		{ name: 'active', type: 'boolean', default: 'false', description: 'Highlight the button as currently active/selected.' },
		{ name: 'disabled', type: 'boolean', default: 'false', description: 'Disable the button.' },
		{ name: 'class', type: 'string', description: 'Additional CSS classes merged onto the outer interactive element.' },
		{
			name: 'element',
			type: 'HTMLButtonElement | HTMLAnchorElement',
			description: 'Bindable reference to the underlying button or anchor.'
		},
		{ name: 'href', type: 'string', description: 'When provided, renders an <a> tag instead of <button>.' },
		{ name: 'target', type: 'string', description: 'Link target when using href (e.g. _blank).' },
		{ name: 'rel', type: 'string', description: 'Optional link rel; defaults to noopener noreferrer when target is _blank.' },
		{ name: 'title', type: 'string', description: 'Tooltip text (uses the phoundry-ui tooltip system by default).' },
		{ name: 'noTooltip', type: 'boolean', default: 'false', description: 'Use native title attribute instead of tooltip system.' },
		{
			name: 'tooltipPlacement',
			type: 'TooltipPlacement',
			default: "'top'",
			description: 'Placement for the automatic title tooltip. Accepts follow-cursor or any PopoverPlacement value.'
		},
		{ name: 'fullWidth', type: 'boolean', default: 'false', description: 'Stretch the button to the width of its parent.' },
		{ name: 'onclick', type: '(e: MouseEvent) => void', description: 'Click handler.' },
		{ name: 'children', type: 'Snippet', description: 'Button label content.' },
		{
			name: '...rest',
			type: 'HTMLButtonAttributes',
			description: 'Other native attributes (type, aria-*, data-*, keyboard handlers, etc.) are forwarded to the DOM element.'
		}
	];
</script>

<UiDocHeader
	title="Button"
	description="Versatile button with multiple variants, sizes, icon support, loading state, and automatic tooltip integration."
	importCode={"import { Button } from 'phoundry-ui';"}
/>

<Example title="Variants" code={variantsCode}>
	<div class="flex flex-wrap items-center gap-2">
		<Button variant="primary">Primary</Button>
		<Button variant="secondary">Secondary</Button>
		<Button variant="outline">Outline</Button>
		<Button variant="danger">Danger</Button>
		<Button variant="ghost">Ghost</Button>
		<Button variant="link">Link</Button>
	</div>
</Example>

<Example title="Sizes" code={sizesCode}>
	<div class="flex items-center gap-2">
		<Button size="xs">Extra Small</Button>
		<Button size="sm">Small</Button>
		<Button size="md">Medium</Button>
		<Button size="lg">Large</Button>
	</div>
	<div class="mt-2 flex items-center gap-2">
		<Button icon={PhiIcons.add} size="xs">Extra Small</Button>
		<Button icon={PhiIcons.info} size="sm">Small</Button>
		<Button icon={PhiIcons.edit} size="md">Medium</Button>
		<Button icon={PhiIcons.add} size="lg">Large</Button>
	</div>
</Example>

<Example title="With Icons" code={iconsCode}>
	<div class="flex items-center gap-2">
		<Button icon={PhiIcons.add} variant="primary">Add Item</Button>
		<Button icon={PhiIcons.edit} iconPosition="right">Settings</Button>
		<Button icon={PhiIcons.close} iconOnly title="Close" tooltipPlacement="right" />
	</div>
</Example>

<Example title="States" code={statesCode}>
	<div class="flex items-center gap-2">
		<Button loading>Saving...</Button>
		<Button active>Active</Button>
		<Button variant="outline" icon={PhiIcons.folder} active>Add Folder</Button>
		<Button disabled>Disabled</Button>
	</div>
</Example>

<Example title="Full width" code={fullWidthCode}>
	<div class="w-64 space-y-2">
		<Button variant="primary" fullWidth>Continue</Button>
		<Button variant="outline" fullWidth icon={PhiIcons.add}>Add item</Button>
	</div>
</Example>

<Example title="As Link" code={asLinkCode}>
	<Button href="https://example.com" target="_blank" variant="link">External Link</Button>
</Example>

<Separator />

<PropTable {props} />

## Usage tips

- Use `iconOnly` with a `title` prop for accessible icon buttons - the tooltip appears automatically.
- Use `tooltipPlacement` to anchor the automatic tooltip to the button; the default placement is `top`.
- Set `noTooltip` to use the native browser title attribute instead of the phoundry-ui tooltip system.
- The `link` variant removes height and padding - it renders inline like a text link.
- `ButtonGroup` renders text-only segments inside an inset, rounded shell; use `Button` elsewhere for icons, variants, or links.
