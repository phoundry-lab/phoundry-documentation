---
title: StarRating
layout: ui
order: 1
---

<script lang="ts">
	import UiDocHeader from '$lib/docs/ui/UiDocHeader.svelte';
	import PropTable from '$lib/docs/ui/PropTable.svelte';
	import type { PropDef } from '$lib/docs/ui/PropTable.svelte';
	import Separator from '$phoundry/components/display/Separator.svelte';
	import StarRatingDemos from '$lib/docs/ui/demos/StarRatingDemos.svelte';

	const props: PropDef[] = [
		{ name: 'rating', type: 'number', description: 'Current rating value.', required: true },
		{ name: 'readonly', type: 'boolean', default: 'false', description: 'Disable interaction.' },
		{
			name: 'size',
			type: "'xs' | 'sm' | 'md' | 'lg'",
			default: "'md'",
			description: 'Star size (12/16/20/24px). xs uses tighter padding for dense readonly rows.'
		},
		{ name: 'max', type: 'number', default: '5', description: 'Total number of stars.' },
		{
			name: 'allowHalf',
			type: 'boolean',
			default: 'false',
			description: 'Enable half-star increments.'
		},
		{
			name: 'onchange',
			type: '(rating: number) => void',
			description: 'Called when the rating changes.'
		},
		{ name: 'class', type: 'string', description: 'Additional CSS classes.' }
	];
</script>

<UiDocHeader
	title="StarRating"
	description="Interactive star rating with hover preview, half-star support, keyboard navigation (arrow keys, Home/End), and click-to-toggle."
	importCode={"import { StarRating } from 'phoundry-ui';"}
/>

<StarRatingDemos />

<Separator />

<PropTable {props} />

## Usage tips

- Click a star to set the rating; click the same star again to reset to 0.
- With `allowHalf`, clicking the left half of a star sets a half-star value.
- Use `readonly` for display-only ratings (e.g. product reviews, averages).
- Use `size="xs"` for dense readonly rows (thumbnail captions, compact table cells); it uses tighter padding than larger sizes.
- Keyboard: Arrow keys adjust by 1 (or 0.5 with `allowHalf`), Home = 0, End = max.
