<script lang="ts">
	import { Select } from "phoundry-ui";
	import type { SelectOption } from "phoundry-ui";

	const plainOptions: SelectOption[] = [
		{ value: "apple", label: "Apple" },
		{ value: "banana", label: "Banana" },
		{ value: "cherry", label: "Cherry" },
		{ value: "dragonfruit", label: "Dragonfruit" },
	];

	let disabledVal = $state<string | undefined>("apple");
</script>

<div class="max-w-xs">
	<Select
		options={plainOptions}
		value={disabledVal}
		onchange={(v: string | undefined) => {
			disabledVal = v;
		}}
		disabled
	/>
</div>
