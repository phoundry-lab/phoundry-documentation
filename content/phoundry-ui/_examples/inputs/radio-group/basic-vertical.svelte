<script lang="ts">
	import { RadioGroup } from "phoundry-ui";
	import type { RadioOption } from "phoundry-ui";

	let basicValue = $state("option1");

	const basicOptions: RadioOption[] = [
		{ value: "option1", label: "Option 1" },
		{ value: "option2", label: "Option 2" },
		{ value: "option3", label: "Option 3" },
	];
</script>

<div class="flex items-start gap-6">
	<RadioGroup
		options={basicOptions}
		value={basicValue}
		onchange={(v: string) => (basicValue = v)}
	/>
	<span class="text-xs text-txt-tertiary"
		>Selected: <strong class="text-txt-primary">{basicValue}</strong></span
	>
</div>
