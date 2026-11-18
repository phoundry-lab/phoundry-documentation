<script lang="ts">
	import { NoiseOverlay } from "phoundry-ui";
</script>

<p class="mb-2 text-xs text-txt-secondary">
	Tuple <code>baseFrequency</code> stretches noise asymmetrically;
	<code>seed</code>
	stabilizes the pattern across hot reloads; try <code>blendMode</code> values
	like
	<code>overlay</code>, <code>multiply</code>, or <code>normal</code> to match your
	background.
</p>
<div
	class="relative h-28 overflow-hidden rounded-md border border-border-default bg-surface-base"
>
	<NoiseOverlay
		position="absolute"
		opacity={0.14}
		zIndex={0}
		baseFrequency={[0.85, 1.05]}
		numOctaves={4}
		seed={42}
		blendMode="overlay"
	/>
	<div class="relative z-10 flex h-full items-center justify-center px-3">
		<span class="text-center text-xs text-txt-secondary"
			>Stronger grain + <code>overlay</code> blend for demo.</span
		>
	</div>
</div>
