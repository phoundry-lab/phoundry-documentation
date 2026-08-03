---
title: Badge
layout: ui
order: 1
---

<script lang="ts">
	import UiDocHeader from '$lib/docs/ui/UiDocHeader.svelte';
	import Example from '$lib/docs/ui/Example.svelte';
	import PropTable from '$lib/docs/ui/PropTable.svelte';
	import type { PropDef } from '$lib/docs/ui/PropTable.svelte';
	import Separator from '$phoundry/components/display/Separator.svelte';
	import Badge from '$phoundry/components/display/Badge.svelte';
	import { PhiIcons } from '$phoundry/icons.js';

	const props: PropDef[] = [
		{
			name: 'color',
			type: "'red' | 'orange' | 'yellow' | 'green' | 'cyan' | 'blue' | 'purple' | 'pink' | 'gray'",
			default: "'gray'",
			description: 'Theme option color.'
		},
		{
			name: 'size',
			type: "'sm' | 'md' | 'lg'",
			default: "'sm'",
			description: 'Badge size - typography recalibrated for toolbar rows using the Button control scale.'
		},
		{ name: 'icon', type: 'string', description: 'Iconify icon string shown before the label.' },
		{
			name: 'dot',
			type: 'boolean',
			default: 'false',
			description: 'Render as a small colored dot instead of a label.'
		},
		{ name: 'class', type: 'string', description: 'Additional CSS classes.' },
		{ name: 'children', type: 'Snippet', description: 'Badge label content.' }
	];

	const variantsCode = `<Badge>Gray</Badge>
<Badge color="blue">Blue</Badge>
<Badge color="green">Green</Badge>
<Badge color="yellow">Yellow</Badge>
<Badge color="red">Red</Badge>
<Badge color="cyan">Cyan</Badge>`;

	const sizesCode = `<Badge size="sm" color="blue">Small</Badge>
<Badge size="md" color="blue">Medium</Badge>
<Badge size="lg" color="blue">Large</Badge>`;

	const iconCode = `<Badge icon={PhiIcons.edit} color="blue">Featured</Badge>
<Badge icon={PhiIcons.check} color="green">Verified</Badge>
<Badge icon={PhiIcons.warning} color="yellow">Caution</Badge>`;

	const iconOnlyCode = `<Badge icon={PhiIcons.info} color="blue" />
<Badge icon={PhiIcons.check} color="green" />
<Badge icon={PhiIcons.warning} color="yellow" />
<Badge icon={PhiIcons.cancel} color="red" />`;

	const dotCode = `<Badge color="green" dot />
<Badge color="yellow" dot />
<Badge color="red" dot />
<Badge dot />`;
</script>

<UiDocHeader
	title="Badge"
	description="Compact label for status, categories, or counts. Supports theme option colors, an optional icon, and a dot-only mode for minimal status indicators."
	importCode={"import { Badge } from 'phoundry-ui';"}
/>

<Example title="Variants" code={variantsCode}>
	<div class="flex flex-wrap items-center gap-2">
		<Badge>Gray</Badge>
		<Badge color="blue">Blue</Badge>
		<Badge color="green">Green</Badge>
		<Badge color="yellow">Yellow</Badge>
		<Badge color="red">Red</Badge>
		<Badge color="cyan">Cyan</Badge>
	</div>
</Example>

<Example title="Sizes" code={sizesCode}>
	<p class="mb-2 text-xs text-txt-secondary">
		<code>lg</code> increases label typography; combine with <code>icon</code> for dense toolbar badges.
	</p>
	<div class="flex flex-wrap items-center gap-2">
		<Badge size="sm" color="blue">Small</Badge>
		<Badge size="md" color="blue">Medium</Badge>
		<Badge size="lg" color="blue">Large</Badge>
	</div>
</Example>

<Example title="With Icon" code={iconCode}>
	<div class="flex items-center gap-2">
		<Badge icon={PhiIcons.edit} color="blue">Featured</Badge>
		<Badge icon={PhiIcons.check} color="green">Verified</Badge>
		<Badge icon={PhiIcons.warning} color="yellow">Caution</Badge>
	</div>
</Example>

<Example title="Icon Only" code={iconOnlyCode}>
	<p class="mb-2 text-xs text-txt-secondary">
		When there are no <code>children</code>, the badge shrinks to a square chip sized by <code>size</code>.
	</p>
	<div class="flex items-center gap-2">
		<Badge icon={PhiIcons.info} color="blue" />
		<Badge icon={PhiIcons.check} color="green" />
		<Badge icon={PhiIcons.warning} color="yellow" />
		<Badge icon={PhiIcons.cancel} color="red" />
	</div>
</Example>

<Example title="Dot Mode" code={dotCode}>
	<div class="flex items-center gap-3">
		<div class="flex items-center gap-1.5">
			<Badge color="green" dot />
			<span class="text-xs text-txt-secondary">Online</span>
		</div>
		<div class="flex items-center gap-1.5">
			<Badge color="yellow" dot />
			<span class="text-xs text-txt-secondary">Away</span>
		</div>
		<div class="flex items-center gap-1.5">
			<Badge color="red" dot />
			<span class="text-xs text-txt-secondary">Busy</span>
		</div>
		<div class="flex items-center gap-1.5">
			<Badge dot />
			<span class="text-xs text-txt-secondary">Offline</span>
		</div>
	</div>
</Example>

<Separator />

<PropTable {props} />

## Usage tips

- Use `dot` mode for compact status indicators next to labels or avatars.
- In `dot` mode, only `color` and `size` apply - children and `icon` are ignored.
- The `icon` prop accepts any Iconify string (or `PhiIcons` entries) and scales with `size`.
- Combine badges with other components - e.g. inside table cells, card headers, or list items.
