---
title: Tooltip
layout: ui
order: 6
---

<script lang="ts">
	import UiDocHeader from '$lib/docs/ui/UiDocHeader.svelte';
	import PropTable from '$lib/docs/ui/PropTable.svelte';
	import type { PropDef } from '$lib/docs/ui/PropTable.svelte';
	import Separator from '$phoundry/components/display/Separator.svelte';
	import TooltipDemos from '$lib/docs/ui/demos/TooltipDemos.svelte';

	const attachmentProps: PropDef[] = [
		{
			name: 'tooltip(...)',
			type: 'TooltipOptions | string | Snippet',
			description:
				'Pass a string for shorthand (`tooltip("Hi")` expands to `{ content: "Hi" }`). Otherwise use `{ content, disabled? }`.',
			required: true
		},
		{
			name: 'content',
			type: 'string | Snippet',
			description: 'Tooltip body - plain text or a snippet with richer markup.'
		},
		{
			name: 'disabled',
			type: 'boolean',
			default: 'false',
			description: 'Skip attaching listeners - useful while loading.'
		}
	];
</script>

<UiDocHeader
	title="Tooltip"
	description="Hover tooltips via Svelte 5 attachments. Automatically integrated with Button's title prop."
	importCode={"import { tooltip } from 'phoundry-ui';"}
/>

<TooltipDemos />

<Separator />

<PropTable props={attachmentProps} title="tooltip() attachment" />

## Usage tips

- Initialize overlays once via `setupOverlays()` (or wire providers manually) and mount `TooltipOverlay` beside other overlays - the attachment talks to `getTooltipManager()`.
- `Button` with a `title` prop automatically uses the tooltip system. Set `noTooltip` to use the native browser title instead.
- Tooltips hide on pointer leave, immediately on click, and on window scroll (capture phase).
- Prefer concise strings in tooltips; move long help text into dialogs or docs - hover delays make long copy hard to read.
