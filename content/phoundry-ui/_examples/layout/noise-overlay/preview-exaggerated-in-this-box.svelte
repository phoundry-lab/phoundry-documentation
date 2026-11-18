<script lang="ts">
	import { NoiseOverlay } from "phoundry-ui";
</script>

<div
	class="relative h-32 overflow-hidden rounded-md border border-border-default bg-surface-raised"
>
	<NoiseOverlay position="absolute" opacity={0.22} zIndex={0} />
	<div class="relative z-10 flex h-full items-center justify-center p-3">
		<p class="text-center text-xs text-txt-secondary">
			Higher opacity here for visibility; the docs site root uses a lower value.
		</p>
	</div>
</div>
