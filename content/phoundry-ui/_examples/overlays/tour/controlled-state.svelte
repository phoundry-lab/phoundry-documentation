<script lang="ts">
	import { Button } from "phoundry-ui";
	import { Tour } from "phoundry-ui";
	import type { TourStepDef } from "phoundry-ui";

	let controlledOpen = $state(false);

	let controlledStep = $state(0);

	let ctrlRef1: HTMLButtonElement | undefined = $state();

	let ctrlRef2: HTMLButtonElement | undefined = $state();

	let ctrlRef3: HTMLButtonElement | undefined = $state();

	const controlledSteps: TourStepDef[] = $derived([
		{
			target: () => ctrlRef1 as HTMLElement,
			title: "Step 1",
			description: "First step.",
		},
		{
			target: () => ctrlRef2 as HTMLElement,
			title: "Step 2",
			description: "Second step.",
		},
		{
			target: () => ctrlRef3 as HTMLElement,
			title: "Step 3",
			description: "Third step.",
		},
	]);
</script>

<div class="flex items-center gap-2">
	<Button bind:element={ctrlRef1}>A</Button>
	<Button bind:element={ctrlRef2}>B</Button>
	<Button bind:element={ctrlRef3}>C</Button>
	<Button
		variant="outline"
		onclick={() => {
			controlledStep = 0;
			controlledOpen = true;
		}}
	>
		Start at 1
	</Button>
	<Button
		variant="outline"
		onclick={() => {
			controlledStep = 1;
			controlledOpen = true;
		}}
	>
		Jump to 2
	</Button>
	<Button
		variant="primary"
		onclick={() => {
			controlledStep = 2;
			controlledOpen = true;
		}}
	>
		Jump to 3
	</Button>
	<span class="text-xs text-txt-tertiary">Step: {controlledStep}</span>
</div>
<Tour
	bind:open={controlledOpen}
	bind:current={controlledStep}
	steps={controlledSteps}
/>
