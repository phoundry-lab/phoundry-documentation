<script lang="ts">
	import { Select } from "phoundry-ui";
	import type { SelectOption } from "phoundry-ui";

	const plainOptions: SelectOption[] = [
		{ value: "apple", label: "Apple" },
		{ value: "banana", label: "Banana" },
		{ value: "cherry", label: "Cherry" },
		{ value: "dragonfruit", label: "Dragonfruit" },
	];

	let errorVal = $state<string | undefined>(undefined);
</script>

<div class="max-w-xs">
	<Select
		options={plainOptions}
		value={errorVal}
		onchange={(v: string | undefined) => {
			errorVal = v;
		}}
		invalid
		error="Selection required"
		placeholder="Required field..."
	/>
</div>
