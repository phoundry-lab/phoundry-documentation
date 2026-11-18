<script lang="ts">
	import { Select } from "phoundry-ui";
	import type { SelectOption } from "phoundry-ui";

	const plainOptions: SelectOption[] = [
		{ value: "apple", label: "Apple" },
		{ value: "banana", label: "Banana" },
		{ value: "cherry", label: "Cherry" },
		{ value: "dragonfruit", label: "Dragonfruit" },
	];

	let shrinkVal = $state<string | undefined>("cherry");
</script>

<p class="mb-2 text-xs text-txt-secondary">
	Fits the trigger width to its content instead of stretching full-width.
</p>
<Select
	options={plainOptions}
	value={shrinkVal}
	onchange={(v: string | undefined) => {
		shrinkVal = v;
	}}
	shrink
/>
