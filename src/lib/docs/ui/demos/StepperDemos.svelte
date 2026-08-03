<script lang="ts">
	import Example from '$lib/docs/ui/Example.svelte';
	import Stepper from '$phoundry/components/advanced/Stepper.svelte';
	import Button from '$phoundry/components/buttons/Button.svelte';

	const steps = [
		{ id: 'account', label: 'Account', description: 'Create your account' },
		{ id: 'profile', label: 'Profile', description: 'Set up your profile' },
		{ id: 'preferences', label: 'Preferences', description: 'Choose your preferences' },
		{ id: 'review', label: 'Review', description: 'Confirm and submit' }
	];

	let horizontalStep = $state(0);
	let verticalStep = $state(0);
	let numberedStep = $state(1);
	let iconStep = $state(0);

	const iconSteps = [
		{ id: 'upload', label: 'Upload', icon: 'carbon:upload', description: 'Pick a file' },
		{ id: 'review', label: 'Review', icon: 'carbon:view', description: 'Check details' },
		{ id: 'finish', label: 'Finish', icon: 'carbon:checkmark', description: 'Submit' }
	];

	const horizontalCode = `const steps = [
  { id: 'account', label: 'Account', description: 'Create your account' },
  { id: 'profile', label: 'Profile', description: 'Set up your profile' },
  { id: 'preferences', label: 'Preferences' },
  { id: 'review', label: 'Review', description: 'Confirm and submit' },
];

let current = $state(0);

<Stepper {steps} currentStep={current} />
<div class="flex gap-2">
  <Button onclick={() => current--} disabled={current === 0}>Back</Button>
  <Button onclick={() => current++} disabled={current === steps.length - 1} variant="primary">Next</Button>
</div>`;

	const verticalCode = `<Stepper {steps} currentStep={current} orientation="vertical" />`;

	const numberedCode = `<Stepper {steps} currentStep={current} showNumbers clickable onstepchange={(i) => current = i} />`;

	const iconsCode = `const steps = [
  { id: 'upload', label: 'Upload', icon: 'carbon:upload' },
  { id: 'finish', label: 'Finish', icon: 'carbon:checkmark' },
];

<Stepper {steps} currentStep={current} showNumbers={false} />`;
</script>

<div class="max-w-3xl space-y-8">
	<Example title="Horizontal with Navigation" code={horizontalCode}>
		<Stepper {steps} currentStep={horizontalStep} />
		<div class="mt-4 flex gap-2">
			<Button onclick={() => (horizontalStep = Math.max(0, horizontalStep - 1))} disabled={horizontalStep === 0}>Back</Button>
			<Button onclick={() => (horizontalStep = Math.min(steps.length - 1, horizontalStep + 1))} disabled={horizontalStep === steps.length - 1} variant="primary">Next</Button>
		</div>
		<p class="mt-2 text-xs text-txt-tertiary">
			Step {horizontalStep + 1} of {steps.length}: {steps[horizontalStep].label}
		</p>
	</Example>

	<Example title="Vertical" code={verticalCode}>
		<div class="max-w-xs">
			<Stepper {steps} currentStep={verticalStep} orientation="vertical" />
		</div>
		<div class="mt-4 flex gap-2">
			<Button size="sm" onclick={() => (verticalStep = Math.max(0, verticalStep - 1))} disabled={verticalStep === 0}>Back</Button>
			<Button size="sm" onclick={() => (verticalStep = Math.min(steps.length - 1, verticalStep + 1))} disabled={verticalStep === steps.length - 1} variant="primary">Next</Button>
		</div>
	</Example>

	<Example title="Icons in indicators" code={iconsCode}>
		<p class="mb-2 text-xs text-txt-secondary">
			Pass <code>icon</code> on each <code>StepperStep</code>; disable numeric badges with the <code>showNumbers</code> prop when they clutter compact layouts.
		</p>
		<Stepper steps={iconSteps} currentStep={iconStep} showNumbers={false} />
		<div class="mt-3 flex gap-2">
			<Button size="sm" onclick={() => (iconStep = Math.max(0, iconStep - 1))} disabled={iconStep === 0}>Back</Button>
			<Button size="sm" variant="primary" onclick={() => (iconStep = Math.min(iconSteps.length - 1, iconStep + 1))} disabled={iconStep === iconSteps.length - 1}>Next</Button>
		</div>
	</Example>

	<Example title="With Numbers & Clickable" code={numberedCode}>
		<Stepper {steps} currentStep={numberedStep} showNumbers clickable onstepchange={(i: number) => (numberedStep = i)} />
		<p class="mt-2 text-xs text-txt-tertiary">Click any step to navigate.</p>
	</Example>
</div>
