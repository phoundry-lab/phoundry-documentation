<script lang="ts">
	import { Select } from "phoundry-ui";
	import type { SelectOption } from "phoundry-ui";

	const descOptions: SelectOption[] = [
		{ value: "sm", label: "Small", description: "640px max width" },
		{ value: "md", label: "Medium", description: "768px max width" },
		{ value: "lg", label: "Large", description: "1024px max width" },
		{ value: "xl", label: "Extra Large", description: "1280px max width" },
	];

	let sm = $state<string | undefined>(undefined);

	let descVal = $state<string | undefined>(undefined);
</script>

<div class="max-w-xs">
	<Select
		options={descOptions}
		value={descVal}
		onchange={(v: string | undefined) => {
			descVal = v;
		}}
		placeholder="Pick a breakpoint..."
	/>
</div>
<p class="mt-2 text-xs text-txt-tertiary">Selected: {descVal ?? "none"}</p>
