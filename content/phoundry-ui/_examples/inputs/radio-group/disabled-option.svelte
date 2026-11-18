<script lang="ts">
	import { RadioGroup } from "phoundry-ui";
	import type { RadioOption } from "phoundry-ui";

	let disabledValue = $state("a");

	const disabledOptions: RadioOption[] = [
		{ value: "a", label: "Available" },
		{ value: "b", label: "Also available" },
		{ value: "c", label: "Unavailable", disabled: true },
	];
</script>

<RadioGroup
	options={disabledOptions}
	value={disabledValue}
	onchange={(v: string) => (disabledValue = v)}
/>
