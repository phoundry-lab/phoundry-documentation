<script lang="ts">
	import { Select } from "phoundry-ui";
	import type { SelectOption } from "phoundry-ui";

	const plainOptions: SelectOption[] = [
		{ value: "apple", label: "Apple" },
		{ value: "banana", label: "Banana" },
		{ value: "cherry", label: "Cherry" },
		{ value: "dragonfruit", label: "Dragonfruit" },
	];

	let indicatorVal = $state<string | undefined>("apple");
</script>

<p class="mb-2 text-xs text-txt-secondary">
	<code>selectedIndicator="check"</code> shows a checkmark instead of tinting the
	active row (helpful when accent-on-background is too strong).
</p>
<div class="max-w-xs">
	<Select
		options={plainOptions}
		value={indicatorVal}
		onchange={(v: string | undefined) => {
			indicatorVal = v;
		}}
		selectedIndicator="check"
		placeholder="Pick…"
	/>
</div>
