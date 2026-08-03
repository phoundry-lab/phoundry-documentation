---
title: CollapsibleSection
layout: ui
order: 8
---

<script lang="ts">
	import UiDocHeader from '$lib/docs/ui/UiDocHeader.svelte';
	import PropTable from '$lib/docs/ui/PropTable.svelte';
	import type { PropDef } from '$lib/docs/ui/PropTable.svelte';
	import Separator from '$phoundry/components/display/Separator.svelte';
	import CollapsibleSectionDemos from '$lib/docs/ui/demos/CollapsibleSectionDemos.svelte';

	const props: PropDef[] = [
		{ name: 'title', type: 'string', description: 'Header text.', required: true },
		{
			name: 'defaultOpen',
			type: 'boolean',
			default: 'true',
			description: 'Initial open state (uncontrolled mode).'
		},
		{
			name: 'open',
			type: 'boolean',
			description: 'Controlled open state - overrides internal state when provided.'
		},
		{
			name: 'onToggle',
			type: '() => void',
			description: 'Called on toggle. When provided, component becomes fully controlled.'
		},
		{
			name: 'onOpenChange',
			type: '(open: boolean) => void',
			description: 'Called with the new open state after toggle.'
		},
		{ name: 'children', type: 'Snippet', description: 'Section content.', required: true },
		{ name: 'icon', type: 'string', description: 'Iconify icon shown before the title.' },
		{
			name: 'extraButtons',
			type: '{ button: ButtonProps; showWhenCollapsed: boolean }[]',
			description:
				'Small `Button` instances beside the chevron. `showWhenCollapsed` chooses visibility when the section is collapsed vs expanded.'
		},
		{
			name: 'contentPadding',
			type: 'boolean',
			default: 'true',
			description: 'Apply default padding to the content area.'
		},
		{
			name: 'fullHeight',
			type: 'boolean',
			default: 'false',
			description: 'Stretch to fill parent height when open.'
		}
	];
</script>

<UiDocHeader
	title="CollapsibleSection"
	description="Expandable/collapsible content section with a clickable header, optional icon, and extra action buttons. Supports both controlled and uncontrolled open state."
	importCode={"import { CollapsibleSection } from 'phoundry-ui';"}
/>

<CollapsibleSectionDemos />

<Separator />

<PropTable {props} />

## Usage tips

- The header row uses `role="button"` with keyboard activation - ensure titles stay concise for screen readers.
- Use uncontrolled mode (just `defaultOpen`) for simple cases; use `open` + `onToggle` for external control.
- The `extraButtons` prop lets you add action buttons (e.g. "Add", "Edit") to the header row alongside the toggle.
- Set `contentPadding={false}` when embedding full-bleed content like tables or lists.
- Use `fullHeight` inside flex layouts where the section should stretch to fill remaining space.
