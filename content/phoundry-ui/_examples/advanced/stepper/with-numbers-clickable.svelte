<script lang="ts">
	import { Stepper } from "phoundry-ui";

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

	let numberedStep = $state(1);
</script>

<Stepper
	{steps}
	currentStep={numberedStep}
	showNumbers
	clickable
	onstepchange={(i: number) => (numberedStep = i)}
/>
<p class="mt-2 text-xs text-txt-tertiary">Click any step to navigate.</p>
