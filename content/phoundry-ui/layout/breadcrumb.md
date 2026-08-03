---
title: Breadcrumb
layout: ui
order: 4
---

<script lang="ts">
	import UiDocHeader from '$lib/docs/ui/UiDocHeader.svelte';
	import PropTable from '$lib/docs/ui/PropTable.svelte';
	import type { PropDef } from '$lib/docs/ui/PropTable.svelte';
	import Separator from '$phoundry/components/display/Separator.svelte';
	import BreadcrumbDemos from '$lib/docs/ui/demos/BreadcrumbDemos.svelte';

	const props: PropDef[] = [
		{
			name: 'items',
			type: 'BreadcrumbItem[]',
			description: 'Breadcrumb segments in order.',
			required: true
		},
		{
			name: 'onnavigate',
			type: '(item: BreadcrumbItem) => void',
			description: 'Called when a breadcrumb is clicked.'
		},
		{
			name: 'separator',
			type: 'string',
			default: "'/'",
			description: 'Separator character between items.'
		},
		{
			name: 'maxVisible',
			type: 'number',
			description: 'Max segments to show before collapsing middle items into a dropdown.'
		},
		{ name: 'size', type: "'sm' | 'md'", default: "'sm'", description: 'Text and icon size.' },
		{ name: 'class', type: 'string', description: 'Additional CSS classes.' }
	];

	const itemProps: PropDef[] = [
		{ name: 'id', type: 'string', description: 'Unique identifier.', required: true },
		{ name: 'label', type: 'string', description: 'Display text.', required: true },
		{ name: 'icon', type: 'string', description: 'Iconify icon string.' },
		{ name: 'href', type: 'string', description: 'Renders as a link instead of a button.' }
	];
</script>

<UiDocHeader
	title="Breadcrumb"
	description="Navigation breadcrumb trail with overflow collapsing. Supports icons, custom separators, and click or href navigation per item."
	importCode={"import { Breadcrumb } from 'phoundry-ui';"}
/>

<BreadcrumbDemos />

<Separator />

<PropTable {props} />

<PropTable props={itemProps} title="BreadcrumbItem" />

## Usage tips

- The last item renders as plain text (non-clickable) to indicate the current page.
- Use `maxVisible` to keep the breadcrumb compact - middle items collapse into a "…" dropdown.
- Items with `href` render as `<a>` tags; otherwise they render as buttons that call `onnavigate`.
- Set `separator` to `"›"` or `">"` for alternative visual styles.
- The overflow menu relies on `--z-dropdown` from `components.css`; define it if you override the theme stack.
