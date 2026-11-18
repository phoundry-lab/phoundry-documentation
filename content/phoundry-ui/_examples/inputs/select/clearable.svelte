<script lang="ts">
	import { Select } from "phoundry-ui";
	import type { SelectOption } from "phoundry-ui";

	const plainOptions: SelectOption[] = [
		{ value: "apple", label: "Apple" },
		{ value: "banana", label: "Banana" },
		{ value: "cherry", label: "Cherry" },
		{ value: "dragonfruit", label: "Dragonfruit" },
	];

	let clearable = $state<string | undefined>("cherry");
</script>

<div class="max-w-xs">
	<Select
		options={plainOptions}
		value={clearable}
		onchange={(v: string | undefined) => {
			clearable = v;
		}}
		clearable
		placeholder="Pick or clear..."
	/>
</div>
