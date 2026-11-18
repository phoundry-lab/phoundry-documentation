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

	let iconStep = $state(0);

	const iconSteps = [
		{
			id: "upload",
			label: "Upload",
			icon: "carbon:upload",
			description: "Pick a file",
		},
		{
			id: "review",
			label: "Review",
			icon: "carbon:view",
			description: "Check details",
		},
		{
			id: "finish",
			label: "Finish",
			icon: "carbon:checkmark",
			description: "Submit",
		},
	];
</script>

<p class="mb-2 text-xs text-txt-secondary">
	Pass <code>icon</code> on each <code>StepperStep</code>; disable numeric
	badges with the <code>showNumbers</code> prop when they clutter compact layouts.
</p>
<Stepper steps={iconSteps} currentStep={iconStep} showNumbers={false} />
<div class="mt-3 flex gap-2">
	<Button
		size="sm"
		onclick={() => (iconStep = Math.max(0, iconStep - 1))}
		disabled={iconStep === 0}>Back</Button
	>
	<Button
		size="sm"
		variant="primary"
		onclick={() => (iconStep = Math.min(iconSteps.length - 1, iconStep + 1))}
		disabled={iconStep === iconSteps.length - 1}>Next</Button
	>
</div>
