---
title: Anchor
layout: ui
order: 1
status: experimental
---

<script lang="ts">
	import UiDocHeader from '$lib/docs/ui/UiDocHeader.svelte';
	import PropTable from '$lib/docs/ui/PropTable.svelte';
	import type { PropDef } from '$lib/docs/ui/PropTable.svelte';
	import Separator from '$phoundry/components/display/Separator.svelte';
	import AnchorDemos from '$lib/docs/ui/demos/AnchorDemos.svelte';

	const props: PropDef[] = [
		{ name: 'items', type: 'AnchorItem[]', description: 'Explicit anchor items (manual mode).' },
		{
			name: 'target',
			type: 'HTMLElement',
			description: 'Scrollable container to scan for headings (auto mode).'
		},
		{
			name: 'headingSelector',
			type: 'string',
			default: "'h2, h3'",
			description: 'CSS selector for discoverable headings in auto mode.'
		},
		{
			name: 'direction',
			type: "'vertical' | 'horizontal'",
			default: "'vertical'",
			description: 'Layout direction. Horizontal disables nesting.'
		},
		{
			name: 'offsetTop',
			type: 'number',
			default: '0',
			description: 'Pixel offset for calculating the active section position.'
		},
		{
			name: 'targetOffset',
			type: 'number',
			description: 'Scroll-to offset when clicking a link. Defaults to offsetTop.'
		},
		{
			name: 'bounds',
			type: 'number',
			default: '5',
			description: 'Bounding distance in px for active section detection.'
		},
		{
			name: 'affix',
			type: 'boolean',
			default: 'true',
			description: 'Stick the anchor with position: sticky.'
		},
		{
			name: 'replace',
			type: 'boolean',
			default: 'false',
			description: 'Use replaceState instead of pushState for URL hash.'
		},
		{
			name: 'onChange',
			type: '(activeHref: string) => void',
			description: 'Fires when the highlighted link changes (hash string, e.g. `#section-id`).'
		},
		{
			name: 'onclick',
			type: '(e: MouseEvent, item: AnchorItem) => void',
			description: 'Click handler for anchor links.'
		},
		{
			name: 'getCurrentAnchor',
			type: '(href: string) => string',
			description: 'Override which link is highlighted.'
		},
		{ name: 'class', type: 'string', description: 'Additional CSS classes.' }
	];

	const itemProps: PropDef[] = [
		{ name: 'key', type: 'string', description: 'Unique identifier.', required: true },
		{
			name: 'href',
			type: 'string',
			description: 'Hash target (e.g. #section-id).',
			required: true
		},
		{ name: 'title', type: 'string', description: 'Display text.', required: true },
		{ name: 'children', type: 'AnchorItem[]', description: 'Nested child links (vertical only).' }
	];
</script>

<UiDocHeader
	title="Anchor"
	description="Scroll-aware table-of-contents navigation. Provide items manually or point it at a scrollable container to auto-discover headings."
	importCode={"import { Anchor } from 'phoundry-ui';"}
/>

<AnchorDemos />

<Separator />

<PropTable {props} />

<PropTable props={itemProps} title="AnchorItem" />

## Usage tips

- Pass `items` for full control, or `target` to auto-discover headings from a container.
- In auto mode, headings without `id` attributes get one assigned automatically (slugified from text).
- Use `headingSelector` to control which heading levels are included (e.g. `"h2, h3"` or just `"h3"`).
- Set `direction="horizontal"` for compact inline navigation. Nesting is disabled in horizontal mode.
- The component renders nothing when there are no items - safe to include in layouts unconditionally.
- Add to a layout file with `target={mainEl}` to get a page ToC on every page automatically.
