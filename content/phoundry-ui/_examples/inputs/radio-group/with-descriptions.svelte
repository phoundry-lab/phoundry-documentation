<script lang="ts">
	import { RadioGroup } from "phoundry-ui";
	import type { RadioOption } from "phoundry-ui";

	let descValue = $state("pro");

	const descOptions: RadioOption[] = [
		{
			value: "free",
			label: "Free",
			description: "Basic features for personal use",
			icon: "phoundry-ui:money-disabled",
		},
		{
			value: "pro",
			label: "Pro",
			description: "Advanced features and priority support",
			icon: "phoundry-ui:money-disabled",
		},
		{
			value: "enterprise",
			label: "Enterprise",
			description: "Custom solutions for large teams",
			icon: "phoundry-ui:money-disabled",
		},
	];
</script>

<RadioGroup
	options={descOptions}
	value={descValue}
	onchange={(v: string) => (descValue = v)}
/>
