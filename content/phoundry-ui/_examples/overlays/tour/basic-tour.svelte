<script lang="ts">
	import { Button } from "phoundry-ui";
	import { Tour } from "phoundry-ui";
	import type { TourStepDef } from "phoundry-ui";

	let basicOpen = $state(false);

	let basicRef1: HTMLButtonElement | undefined = $state();

	let basicRef2: HTMLButtonElement | undefined = $state();

	let basicRef3: HTMLButtonElement | undefined = $state();

	const basicSteps: TourStepDef[] = $derived([
		{
			target: () => basicRef1 as HTMLElement,
			title: "Upload File",
			description: "Click here to upload a file to the system.",
			placement: "bottom",
		},
		{
			target: () => basicRef2 as HTMLElement,
			title: "Save Changes",
			description: "Save your current progress before continuing.",
			placement: "bottom",
		},
		{
			target: () => basicRef3 as HTMLElement,
			title: "More Options",
			description: "Access additional settings and preferences from here.",
			placement: "bottom-end",
		},
	]);
</script>

<div class="flex items-center gap-2">
	<Button bind:element={basicRef1}>Upload</Button>
	<Button bind:element={basicRef2}>Save</Button>
	<Button bind:element={basicRef3} variant="outline">More</Button>
	<Button variant="primary" onclick={() => (basicOpen = true)}
		>Begin Tour</Button
	>
</div>
<Tour bind:open={basicOpen} steps={basicSteps} />
