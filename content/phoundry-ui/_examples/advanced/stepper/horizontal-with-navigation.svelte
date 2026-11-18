<script lang="ts">
	import { Stepper } from "phoundry-ui";
	import { Button } from "phoundry-ui";

	const steps = [
		{ id: "account", label: "Account", description: "Create your account" },
		{ id: "profile", label: "Profile", description: "Set up your profile" },
		{
			id: "preferences",
			label: "Preferences",
			description: "Choose your preferences",
		},
		{ id: "review", label: "Review", description: "Confirm and submit" },
	];

	let horizontalStep = $state(0);
</script>

<Stepper {steps} currentStep={horizontalStep} />
<div class="mt-4 flex gap-2">
	<Button
		onclick={() => (horizontalStep = Math.max(0, horizontalStep - 1))}
		disabled={horizontalStep === 0}>Back</Button
	>
	<Button
		onclick={() =>
			(horizontalStep = Math.min(steps.length - 1, horizontalStep + 1))}
		disabled={horizontalStep === steps.length - 1}
		variant="primary">Next</Button
	>
</div>
<p class="mt-2 text-xs text-txt-tertiary">
	Step {horizontalStep + 1} of {steps.length}: {steps[horizontalStep].label}
</p>
