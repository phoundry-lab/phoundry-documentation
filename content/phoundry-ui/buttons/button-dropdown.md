---
title: ButtonDropdown
layout: ui
order: 2
---

<script lang="ts">
	import UiDocHeader from '$lib/docs/ui/UiDocHeader.svelte';
	import PropTable from '$lib/docs/ui/PropTable.svelte';
	import type { PropDef } from '$lib/docs/ui/PropTable.svelte';
	import Separator from '$phoundry/components/display/Separator.svelte';
	import ButtonDropdownDemos from '$lib/docs/ui/demos/ButtonDropdownDemos.svelte';

	const props: PropDef[] = [
		{
			name: 'items',
			type: 'MenuItem[] | () => MenuItem[]',
			required: true,
			description: 'Menu items to display. Can be a static array or a function that returns items lazily.'
		},
		{
			name: 'placement',
			type: 'PopoverPlacement',
			default: "'bottom-end'",
			description: 'Where the dropdown opens relative to the button (top…right-end; see popover placement types).'
		},
		{
			name: 'showArrow',
			type: 'boolean',
			default: 'true',
			description: 'Show the chevron indicator. When singleClickAction is set, the chevron is always shown (this prop is effectively ignored in split mode).'
		},
		{
			name: 'singleClickAction',
			type: '(e: MouseEvent) => void',
			description: 'Split control: the main label area runs this handler; the chevron segment opens the menu. Renders as two <button>s; href is ignored. element bind targets the left button.'
		},
		{
			name: '...buttonProps',
			type: 'Omit<ButtonProps, "onclick" | "href" | "target" | "rel">',
			description: 'Same fields as Button (variant, size, icon, loading, disabled, active, title, noTooltip, class, element bind, etc.). href / link mode is not supported - use Button + separate menu if you need a link trigger.'
		}
	];
</script>

<UiDocHeader
	title="ButtonDropdown"
	description="Button that opens a dropdown menu on click, powered by the ContextMenu overlay system."
	importCode={"import { ButtonDropdown } from 'phoundry-ui';"}
/>

<ButtonDropdownDemos />

<Separator />

<PropTable {props} />

## Usage tips

- Pass `items` as a function for lazy evaluation - useful when menu items depend on current state.
- The dropdown uses the same `ContextMenu` overlay, so it requires `provideContextMenu()` (or `setupOverlays()`) in a parent layout.
- Set `showArrow={false}` to hide the chevron for a cleaner look (not used when `singleClickAction` is set).
