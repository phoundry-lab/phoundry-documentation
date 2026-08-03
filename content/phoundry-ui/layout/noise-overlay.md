---
title: NoiseOverlay
layout: ui
order: 6
---

<script lang="ts">
	import UiDocHeader from '$lib/docs/ui/UiDocHeader.svelte';
	import Example from '$lib/docs/ui/Example.svelte';
	import PropTable from '$lib/docs/ui/PropTable.svelte';
	import type { PropDef } from '$lib/docs/ui/PropTable.svelte';
	import Separator from '$phoundry/components/display/Separator.svelte';
	import CodeBlock from '$lib/docs/ui/CodeBlock.svelte';
	import NoiseOverlay from '$phoundry/components/layout/NoiseOverlay.svelte';

	const layoutCode = `<script>
  import { NoiseOverlay } from 'phoundry-ui';
<${'/'}script>

<div class="relative min-h-svh">
  <NoiseOverlay />
  <div class="relative z-10">
    {@render children?.()}
  </div>
</div>`;

	const previewCode = `<div class="relative h-32 overflow-hidden">
  <NoiseOverlay position="absolute" opacity={0.22} zIndex={0} />
  <div class="relative z-10 p-3">…</div>
</div>`;

	const tuningCode = `<NoiseOverlay
  position="absolute"
  opacity={0.1}
  baseFrequency={[0.9, 1.1]}
  numOctaves={4}
  seed={42}
  blendMode="overlay"
/>`;

	const props: PropDef[] = [
		{
			name: 'opacity',
			type: 'number',
			default: '0.08',
			description: 'Layer alpha; keep low for a subtle look.'
		},
		{
			name: 'zIndex',
			type: 'number',
			default: '1',
			description: 'Stacking order; keep below your overlay / modal z-indexes.'
		},
		{
			name: 'position',
			type: "'fixed' | 'absolute'",
			default: "'fixed'",
			description: 'Fixed = viewport; absolute = fill a relative/absolute parent.'
		},
		{
			name: 'baseFrequency',
			type: 'string | number | [number, number]',
			default: '0.72',
			description: 'feTurbulence frequency; one value or x/y pair. Higher = finer grain.'
		},
		{
			name: 'numOctaves',
			type: 'number',
			default: '3',
			description: 'Turbulence detail (typically 2–4).'
		},
		{
			name: 'seed',
			type: 'number',
			description: 'Optional 0–999; fixes the pattern when you need a stable look across remounts.'
		},
		{
			name: 'blendMode',
			type: 'string',
			default: "'soft-light'",
			description: 'CSS mix-blend-mode; soft-light and overlay are common for UI grain.'
		},
		{ name: 'class', type: 'string', description: 'Extra classes on the fixed wrapper div.' }
	];
</script>

<UiDocHeader
	title="NoiseOverlay"
	description="Full-viewport static grain using an SVG feTurbulence (fractal noise) + feColorMatrix (desaturate) filter chain. Renders a fixed, pointer-events-none layer meant for a single use near the app root. Prefer opacity around 0.05–0.12 at normal zoom."
	importCode={"import { NoiseOverlay } from 'phoundry-ui';"}
/>

<Example title="Preview (exaggerated in this box)" code={previewCode}>
	<div class="relative h-32 overflow-hidden rounded-md border border-border-default bg-surface-raised">
		<NoiseOverlay position="absolute" opacity={0.22} zIndex={0} />
		<div class="relative z-10 flex h-full items-center justify-center p-3">
			<p class="text-center text-xs text-txt-secondary">Higher opacity here for visibility; the docs site root uses a lower value.</p>
		</div>
	</div>
</Example>

<Example title="Grain tuning" code={tuningCode}>
	<p class="mb-2 text-xs text-txt-secondary">
		Tuple <code>baseFrequency</code> stretches noise asymmetrically; <code>seed</code> stabilizes the pattern across hot reloads; try <code>blendMode</code> values like
		<code>overlay</code>, <code>multiply</code>, or <code>normal</code> to match your background.
	</p>
	<div class="relative h-28 overflow-hidden rounded-md border border-border-default bg-surface-base">
		<NoiseOverlay position="absolute" opacity={0.14} zIndex={0} baseFrequency={[0.85, 1.05]} numOctaves={4} seed={42} blendMode="overlay" />
		<div class="relative z-10 flex h-full items-center justify-center px-3">
			<span class="text-center text-xs text-txt-secondary">Stronger grain + <code>overlay</code> blend for demo.</span>
		</div>
	</div>
</Example>

## Root layout

Mount once inside your top-level `+layout.svelte` (or app shell). Keep `zIndex` under your modal / tooltip layer; the component defaults to `1`. The layer uses `pointer-events: none` so it never steals focus or clicks.

<CodeBlock code={layoutCode} lang="svelte" />

<Separator />

<PropTable {props} />
