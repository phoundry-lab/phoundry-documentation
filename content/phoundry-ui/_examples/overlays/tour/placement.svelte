<script lang="ts">
	import { Button } from "phoundry-ui";
	import { Tour } from "phoundry-ui";
	import type { TourStepDef } from "phoundry-ui";

	let placementOpen = $state(false);

	let placeRef: HTMLButtonElement | undefined = $state();

	let placementValue: TourStepDef["placement"] = $state("bottom");

	const placementOptions: TourStepDef["placement"][] = [
		"top",
		"top-start",
		"top-end",
		"bottom",
		"bottom-start",
		"bottom-end",
		"left",
		"left-start",
		"left-end",
		"right",
		"right-start",
		"right-end",
		"center",
	];

	const placementSteps: TourStepDef[] = $derived([
		{
			target: () => placeRef as HTMLElement,
			title: `Placement: ${placementValue}`,
			description:
				"The card is positioned relative to this element using the selected placement.",
			placement: placementValue,
		},
	]);
</script>

<div class="mb-3 flex flex-wrap items-center gap-2">
	{#each placementOptions as p (p)}
		<Button
			size="sm"
			variant={placementValue === p ? "primary" : "outline"}
			onclick={() => {
				placementValue = p;
			}}
		>
			{p}
		</Button>
	{/each}
</div>
<div class="flex justify-center py-6">
	<Button
		bind:element={placeRef}
		variant="primary"
		onclick={() => (placementOpen = true)}
	>
		Show Tour ({placementValue})
	</Button>
</div>
<Tour bind:open={placementOpen} steps={placementSteps} />
