---
title: Tabs
layout: ui
order: 2
---

<script lang="ts">
	import UiDocHeader from '$lib/docs/ui/UiDocHeader.svelte';
	import PropTable from '$lib/docs/ui/PropTable.svelte';
	import type { PropDef } from '$lib/docs/ui/PropTable.svelte';
	import Separator from '$phoundry/components/display/Separator.svelte';
	import TabsDemos from '$lib/docs/ui/demos/TabsDemos.svelte';

	const props: PropDef[] = [
		{ name: 'items', type: 'TabItem[]', description: 'Array of tab definitions.', required: true },
		{ name: 'value', type: 'string', description: 'Active tab id.', required: true },
		{
			name: 'onchange',
			type: '(id: string) => void',
			description: 'Called when active tab changes.',
			required: true
		},
		{
			name: 'onclose',
			type: '(id: string) => void',
			description: 'Called when a closable tab is closed.'
		},
		{
			name: 'orientation',
			type: "'horizontal' | 'vertical'",
			default: "'horizontal'",
			description: 'Tab list direction.'
		},
		{
			name: 'variant',
			type: "'default' | 'pills' | 'underline'",
			default: "'default'",
			description: 'Visual style.'
		},
		{
			name: 'size',
			type: "'sm' | 'md'",
			default: "'sm'",
			description: 'Tab trigger height aligned to Button `sm` (h-5.5) / `md` (h-7).'
		},
		{
			name: 'viewTransition',
			type: 'boolean',
			default: 'true',
			description: 'Use the View Transition API to cross-fade panel content on tab change (where supported).'
		},
		{ name: 'class', type: 'string', description: 'Additional CSS classes on the tab list.' },
		{
			name: 'tab',
			type: 'Snippet<[TabItem, boolean]>',
			description: 'Custom tab renderer snippet.'
		},
		{
			name: 'panel',
			type: 'Snippet<[TabItem]>',
			description: 'Panel content rendered below the active tab.'
		}
	];

	const tabItemProps: PropDef[] = [
		{ name: 'id', type: 'string', description: 'Unique tab identifier.', required: true },
		{ name: 'label', type: 'string', description: 'Tab display text.', required: true },
		{ name: 'icon', type: 'string', description: 'Iconify icon string.' },
		{
			name: 'closable',
			type: 'boolean',
			default: 'false',
			description: 'Show close button on tab.'
		},
		{ name: 'disabled', type: 'boolean', default: 'false', description: 'Disable tab interaction.' }
	];
</script>

<UiDocHeader
	title="Tabs"
	description="Tab bar with keyboard navigation, closable tabs, and three visual variants (default, pills, underline). Supports horizontal/vertical orientation and panel rendering via snippets."
	importCode={"import { Tabs } from 'phoundry-ui';"}
/>

<TabsDemos />

<Separator />

<PropTable {props} />

<PropTable props={tabItemProps} title="TabItem" />

## Usage tips

- Arrow keys navigate between tabs; Home/End jump to first/last.
- Use `variant="underline"` for content-area tab bars and `"pills"` for sidebar navigation.
- The `panel` snippet receives the active `TabItem` - render different content per tab inside it.
- Provide `onclose` to enable the close button on tabs marked `closable: true`.
- Panel content has built-in top padding and cross-fades via the View Transition API. Pass `viewTransition={false}` to opt out.
