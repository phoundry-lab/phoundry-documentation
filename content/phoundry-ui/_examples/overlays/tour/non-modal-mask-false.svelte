<script lang="ts">
	import { Button } from "phoundry-ui";
	import { Tour } from "phoundry-ui";
	import type { TourStepDef } from "phoundry-ui";

	let nonModalOpen = $state(false);

	let nmRef1: HTMLButtonElement | undefined = $state();

	let nmRef2: HTMLButtonElement | undefined = $state();

	const nonModalSteps: TourStepDef[] = $derived([
		{
			target: () => nmRef1 as HTMLElement,
			title: "Non-modal Step 1",
			description: "No mask overlay-. The page stays interactive.",
		},
		{
			target: () => nmRef2 as HTMLElement,
			title: "Non-modal Step 2",
			description:
				'Using type="primary" helps the card stand out without a mask.',
		},
	]);
</script>

<div class="flex items-center gap-2">
	<Button bind:element={nmRef1}>Upload</Button>
	<Button bind:element={nmRef2}>Save</Button>
	<Button variant="primary" onclick={() => (nonModalOpen = true)}
		>Begin Non-modal Tour</Button
	>
</div>
<Tour
	bind:open={nonModalOpen}
	mask={false}
	type="primary"
	steps={nonModalSteps}
/>
