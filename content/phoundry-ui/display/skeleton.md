---
title: Skeleton
layout: ui
order: 5
---

<script lang="ts">
	import UiDocHeader from '$lib/docs/ui/UiDocHeader.svelte';
	import Example from '$lib/docs/ui/Example.svelte';
	import PropTable from '$lib/docs/ui/PropTable.svelte';
	import type { PropDef } from '$lib/docs/ui/PropTable.svelte';
	import Separator from '$phoundry/components/display/Separator.svelte';
	import Skeleton from '$phoundry/components/display/Skeleton.svelte';

	const props: PropDef[] = [
		{
			name: 'variant',
			type: "'rect' | 'circle' | 'text'",
			default: "'rect'",
			description: 'Shape of the placeholder.'
		},
		{
			name: 'width',
			type: 'string',
			description: 'CSS width value. Defaults to 100% for rect/text, 40px for circle.'
		},
		{
			name: 'height',
			type: 'string',
			description: 'CSS height value. Defaults to 20px for rect, matches width for circle.'
		},
		{
			name: 'lines',
			type: 'number',
			default: '3',
			description: 'Number of text lines (only for variant="text").'
		},
		{ name: 'class', type: 'string', description: 'Additional CSS classes.' }
	];

	const rectCode = `<Skeleton width="200px" height="40px" />
<Skeleton width="100%" height="20px" />`;

	const circleCode = `<Skeleton variant="circle" width="48px" />
<Skeleton variant="circle" width="32px" />`;

	const textCode = `<Skeleton variant="text" lines={3} />
<Skeleton variant="text" lines={5} width="300px" />
<Skeleton variant="text" lines={1} width="120px" />`;

	const cardCode = `<div class="flex gap-3 p-4 rounded-lg border border-border-muted">
  <Skeleton variant="circle" width="40px" />
  <div class="flex-1 space-y-2">
    <Skeleton width="60%" height="14px" />
    <Skeleton variant="text" lines={2} />
  </div>
</div>`;
</script>

<UiDocHeader
	title="Skeleton"
	description="Animated placeholder for loading states. Renders as a rectangle, circle, or multi-line text block with a pulse animation."
	importCode={"import { Skeleton } from 'phoundry-ui';"}
/>

<Example title="Rectangle" code={rectCode}>
	<div class="max-w-sm space-y-3">
		<Skeleton width="200px" height="40px" />
		<Skeleton width="100%" height="20px" />
	</div>
</Example>

<Example title="Circle" code={circleCode}>
	<div class="flex items-center gap-3">
		<Skeleton variant="circle" width="48px" />
		<Skeleton variant="circle" width="32px" />
	</div>
</Example>

<Example title="Text Lines" code={textCode}>
	<div class="max-w-sm space-y-4">
		<Skeleton variant="text" lines={3} />
		<Skeleton variant="text" lines={5} width="300px" />
		<div>
			<p class="mb-1 text-[10px] text-txt-tertiary">Single line title shimmer</p>
			<Skeleton variant="text" lines={1} width="120px" />
		</div>
	</div>
</Example>

<Example title="Card Composition" code={cardCode}>
	<div class="max-w-sm">
		<div class="flex gap-3 rounded-lg border border-border-muted p-4">
			<Skeleton variant="circle" width="40px" />
			<div class="flex-1 space-y-2">
				<Skeleton width="60%" height="14px" />
				<Skeleton variant="text" lines={2} />
			</div>
		</div>
	</div>
</Example>

<Separator />

<PropTable {props} />

## Usage tips

- Compose multiple skeletons to mirror the layout of the content being loaded.
- The last line in `variant="text"` is automatically shorter (75%) for a natural look.
- Use fixed `width`/`height` to prevent layout shift when content loads.
- Add utility classes via `class` (e.g. rounded corners) to mirror cards or avatar stacks.
- Animation follows global motion preferences via the theme stylesheet - no extra props required.
