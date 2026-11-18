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

	let verticalStep = $state(0);
</script>

<div class="max-w-xs">
	<Stepper {steps} currentStep={verticalStep} orientation="vertical" />
</div>
<div class="mt-4 flex gap-2">
	<Button
		size="sm"
		onclick={() => (verticalStep = Math.max(0, verticalStep - 1))}
		disabled={verticalStep === 0}>Back</Button
	>
	<Button
		size="sm"
		onclick={() =>
			(verticalStep = Math.min(steps.length - 1, verticalStep + 1))}
		disabled={verticalStep === steps.length - 1}
		variant="primary">Next</Button
	>
</div>
