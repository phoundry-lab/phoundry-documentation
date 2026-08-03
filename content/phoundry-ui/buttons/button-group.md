---
title: ButtonGroup
layout: ui
order: 3
---

<script lang="ts">
	import UiDocHeader from '$lib/docs/ui/UiDocHeader.svelte';
	import PropTable from '$lib/docs/ui/PropTable.svelte';
	import type { PropDef } from '$lib/docs/ui/PropTable.svelte';
	import Separator from '$phoundry/components/display/Separator.svelte';
	import ButtonGroupDemos from '$lib/docs/ui/demos/ButtonGroupDemos.svelte';

	const props: PropDef[] = [
		{
			name: 'items',
			type: 'ButtonGroupItem[]',
			required: true,
			description: 'Segment entries: `label` (required) plus `icon`, `iconOnly`, `active`, `disabled`, `loading`, `class`, `onclick`, and other native `<button>` attributes.'
		},
		{
			name: 'variant',
			type: "'secondary' | 'outline'",
			default: "'secondary'",
			description: '`secondary` is the raised strip (default). `outline` matches `Button variant="outline"` shell styling (base fill, stronger outer border, radial highlight); the active segment is indicated by background only (`surface-overlay`).'
		},
		{
			name: 'size',
			type: "'sm' | 'md'",
			default: "'md'",
			description: 'Height of the group; maps to the same scale as `Button` sm/md content.'
		},
		{
			name: 'class',
			type: 'string',
			default: "''",
			description: 'Additional classes on the outer `role="group"` container. Width is intrinsic by default (`w-fit`, like `ButtonDropdown` split). Add `w-full` if the group should stretch in a layout.'
		},
		{
			name: '...rest',
			type: 'HTMLAttributes<HTMLDivElement>',
			description: 'Forwarded to the outer `role="group"` wrapper (`aria-label`, `data-*`, etc.).'
		}
	];
</script>

<UiDocHeader
	title="ButtonGroup"
	description="Groups related segments in a bordered shell (`secondary` raised or `outline`) with inset, rounded segments separated by a small gap."
	importCode={"import { ButtonGroup, type ButtonGroupItem, type ButtonGroupVariant } from 'phoundry-ui';"}
/>

<ButtonGroupDemos />

<Separator />

<PropTable {props} />

## Usage tips

- Set `active` to reflect selection. With `variant="secondary"` (default), the active segment uses a `surface-overlay` fill. With `variant="outline"`, styling aligns with `Button variant="outline"` for the shell; the active segment uses a `surface-overlay` fill only.
- Icons, links, and the tooltip-based `title` pattern are not supported on group items; use a plain `label` string for each segment.
