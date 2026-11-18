<script lang="ts">
	import { Button } from "phoundry-ui";
	import { Tour } from "phoundry-ui";
	import type { TourStepDef } from "phoundry-ui";

	let gapOpen = $state(false);

	let gapRef: HTMLButtonElement | undefined = $state();

	let gapOffset = $state(12);

	let gapRadius = $state(8);

	const gapSteps: TourStepDef[] = $derived([
		{
			target: () => gapRef as HTMLElement,
			title: "Custom Gap",
			description: `offset: ${gapOffset}px, radius: ${gapRadius}px`,
		},
	]);
</script>

<div class="flex items-center gap-4">
	<label class="flex items-center gap-2 text-xs text-txt-secondary">
		Offset:
		<input type="range" min="0" max="24" bind:value={gapOffset} class="w-24" />
		<span class="w-6 font-mono">{gapOffset}</span>
	</label>
	<label class="flex items-center gap-2 text-xs text-txt-secondary">
		Radius:
		<input type="range" min="0" max="20" bind:value={gapRadius} class="w-24" />
		<span class="w-6 font-mono">{gapRadius}</span>
	</label>
	<Button
		bind:element={gapRef}
		variant="primary"
		onclick={() => (gapOpen = true)}>Show Tour</Button
	>
</div>
<Tour
	bind:open={gapOpen}
	gap={{ offset: gapOffset, radius: gapRadius }}
	steps={gapSteps}
/>
