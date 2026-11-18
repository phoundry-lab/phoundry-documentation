<script lang="ts">
	import { Select } from "phoundry-ui";
	import type { SelectOption } from "phoundry-ui";

	const iconOptions: SelectOption[] = [
		{ value: "svelte", label: "Svelte", icon: "logos:svelte-icon" },
		{ value: "react", label: "React", icon: "logos:react" },
		{ value: "vue", label: "Vue", icon: "logos:vue" },
		{ value: "angular", label: "Angular", icon: "logos:angular-icon" },
	];

	let iconVal = $state<string | undefined>(undefined);
</script>

<div class="max-w-xs">
	<Select
		options={iconOptions}
		value={iconVal}
		onchange={(v: string | undefined) => {
			iconVal = v;
		}}
		placeholder="Pick a framework..."
	/>
</div>
<p class="mt-2 text-xs text-txt-tertiary">Selected: {iconVal ?? "none"}</p>
