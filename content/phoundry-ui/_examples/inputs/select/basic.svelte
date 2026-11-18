<script lang="ts">
	import { Select } from "phoundry-ui";
	import type { SelectOption } from "phoundry-ui";

	const plainOptions: SelectOption[] = [
		{ value: "apple", label: "Apple" },
		{ value: "banana", label: "Banana" },
		{ value: "cherry", label: "Cherry" },
		{ value: "dragonfruit", label: "Dragonfruit" },
	];

	let basic = $state<string | undefined>("apple");
</script>

<div class="max-w-xs">
	<Select
		options={plainOptions}
		value={basic}
		onchange={(v: string | undefined) => {
			basic = v;
		}}
		placeholder="Pick a fruit..."
	/>
</div>
<p class="mt-2 text-xs text-txt-tertiary">Selected: {basic ?? "none"}</p>
