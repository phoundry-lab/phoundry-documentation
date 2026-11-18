<script lang="ts">
	import { RadioGroup } from "phoundry-ui";
	import type { RadioOption } from "phoundry-ui";

	let horizValue = $state("sm");

	const horizOptions: RadioOption[] = [
		{ value: "sm", label: "Small" },
		{ value: "md", label: "Medium" },
		{ value: "lg", label: "Large" },
	];
</script>

<div class="flex items-center gap-6">
	<RadioGroup
		options={horizOptions}
		value={horizValue}
		onchange={(v: string) => (horizValue = v)}
		orientation="horizontal"
	/>
	<span class="text-xs text-txt-tertiary"
		>Selected: <strong class="text-txt-primary">{horizValue}</strong></span
	>
</div>
