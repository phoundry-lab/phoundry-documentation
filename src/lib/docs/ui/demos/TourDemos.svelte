<script lang="ts">
	import Example from '$lib/docs/ui/Example.svelte';
	import Button from '$phoundry/components/buttons/Button.svelte';
	import { Tour } from '$phoundry/overlay/tour/index.js';
	import type { TourStepDef } from '$phoundry/overlay/tour/index.js';

	let basicOpen = $state(false);
	let basicRef1: HTMLButtonElement | undefined = $state();
	let basicRef2: HTMLButtonElement | undefined = $state();
	let basicRef3: HTMLButtonElement | undefined = $state();

	const basicSteps: TourStepDef[] = $derived([
		{
			target: () => basicRef1 as HTMLElement,
			title: 'Upload File',
			description: 'Click here to upload a file to the system.',
			placement: 'bottom'
		},
		{
			target: () => basicRef2 as HTMLElement,
			title: 'Save Changes',
			description: 'Save your current progress before continuing.',
			placement: 'bottom'
		},
		{
			target: () => basicRef3 as HTMLElement,
			title: 'More Options',
			description: 'Access additional settings and preferences from here.',
			placement: 'bottom-end'
		}
	]);

	let placementOpen = $state(false);
	let placeRef: HTMLButtonElement | undefined = $state();
	let placementValue: TourStepDef['placement'] = $state('bottom');

	const placementOptions: TourStepDef['placement'][] = [
		'top',
		'top-start',
		'top-end',
		'bottom',
		'bottom-start',
		'bottom-end',
		'left',
		'left-start',
		'left-end',
		'right',
		'right-start',
		'right-end',
		'center'
	];

	const placementSteps: TourStepDef[] = $derived([
		{
			target: () => placeRef as HTMLElement,
			title: `Placement: ${placementValue}`,
			description: 'The card is positioned relative to this element using the selected placement.',
			placement: placementValue
		}
	]);

	let nonModalOpen = $state(false);
	let nmRef1: HTMLButtonElement | undefined = $state();
	let nmRef2: HTMLButtonElement | undefined = $state();

	const nonModalSteps: TourStepDef[] = $derived([
		{
			target: () => nmRef1 as HTMLElement,
			title: 'Non-modal Step 1',
			description: 'No mask overlay-. The page stays interactive.'
		},
		{
			target: () => nmRef2 as HTMLElement,
			title: 'Non-modal Step 2',
			description: 'Using type="primary" helps the card stand out without a mask.'
		}
	]);

	let gapOpen = $state(false);
	let gapRef: HTMLButtonElement | undefined = $state();
	let gapOffset = $state(12);
	let gapRadius = $state(8);

	const gapSteps: TourStepDef[] = $derived([
		{
			target: () => gapRef as HTMLElement,
			title: 'Custom Gap',
			description: `offset: ${gapOffset}px, radius: ${gapRadius}px`
		}
	]);

	let controlledOpen = $state(false);
	let controlledStep = $state(0);
	let ctrlRef1: HTMLButtonElement | undefined = $state();
	let ctrlRef2: HTMLButtonElement | undefined = $state();
	let ctrlRef3: HTMLButtonElement | undefined = $state();

	const controlledSteps: TourStepDef[] = $derived([
		{ target: () => ctrlRef1 as HTMLElement, title: 'Step 1', description: 'First step.' },
		{ target: () => ctrlRef2 as HTMLElement, title: 'Step 2', description: 'Second step.' },
		{ target: () => ctrlRef3 as HTMLElement, title: 'Step 3', description: 'Third step.' }
	]);

	const basicCode = `let open = $state(false);
let ref1, ref2, ref3;

const steps: TourStepDef[] = [
  { target: () => ref1, title: 'Upload', description: 'Upload a file.' },
  { target: () => ref2, title: 'Save', description: 'Save changes.' },
  { target: () => ref3, title: 'More', description: 'Extra options.' },
];

<Button bind:element={ref1}>Upload</Button>
<Button bind:element={ref2}>Save</Button>
<Button bind:element={ref3}>More</Button>
<Button onclick={() => open = true}>Begin Tour</Button>
<Tour bind:open {steps} />`;

	const placementCode = `<Tour steps={[{ target: () => el, placement: 'top' }]} />`;

	const nonModalCode = `<Tour bind:open mask={false} type="primary" steps={steps} />`;

	const gapCode = `<Tour gap={{ offset: 12, radius: 8 }} steps={steps} />`;

	const controlledCode = `let open = $state(false);
let step = $state(0);

<Tour bind:open bind:current={step} steps={steps} />
<Button onclick={() => { step = 1; open = true; }}>Jump to Step 2</Button>`;
</script>

<div class="space-y-8">
	<Example title="Basic Tour" code={basicCode}>
		<div class="flex items-center gap-2">
			<Button bind:element={basicRef1}>Upload</Button>
			<Button bind:element={basicRef2}>Save</Button>
			<Button bind:element={basicRef3} variant="outline">More</Button>
			<Button variant="primary" onclick={() => (basicOpen = true)}>Begin Tour</Button>
		</div>
		<Tour bind:open={basicOpen} steps={basicSteps} />
	</Example>

	<Example title="Placement" code={placementCode}>
		<div class="mb-3 flex flex-wrap items-center gap-2">
			{#each placementOptions as p (p)}
				<Button
					size="sm"
					variant={placementValue === p ? 'primary' : 'outline'}
					onclick={() => {
						placementValue = p;
					}}
				>
					{p}
				</Button>
			{/each}
		</div>
		<div class="flex justify-center py-6">
			<Button bind:element={placeRef} variant="primary" onclick={() => (placementOpen = true)}>
				Show Tour ({placementValue})
			</Button>
		</div>
		<Tour bind:open={placementOpen} steps={placementSteps} />
	</Example>

	<Example title="Non-modal (mask=false)" code={nonModalCode}>
		<div class="flex items-center gap-2">
			<Button bind:element={nmRef1}>Upload</Button>
			<Button bind:element={nmRef2}>Save</Button>
			<Button variant="primary" onclick={() => (nonModalOpen = true)}>Begin Non-modal Tour</Button>
		</div>
		<Tour bind:open={nonModalOpen} mask={false} type="primary" steps={nonModalSteps} />
	</Example>

	<Example title="Custom Gap" code={gapCode}>
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
			<Button bind:element={gapRef} variant="primary" onclick={() => (gapOpen = true)}>Show Tour</Button>
		</div>
		<Tour bind:open={gapOpen} gap={{ offset: gapOffset, radius: gapRadius }} steps={gapSteps} />
	</Example>

	<Example title="Controlled State" code={controlledCode}>
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
		<Tour bind:open={controlledOpen} bind:current={controlledStep} steps={controlledSteps} />
	</Example>
</div>
