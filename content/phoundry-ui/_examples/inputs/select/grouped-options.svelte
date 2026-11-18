<script lang="ts">
	import { Select } from "phoundry-ui";
	import type { SelectOption, SelectOptionGroup } from "phoundry-ui";

	const groupedOptions: (SelectOption | SelectOptionGroup)[] = [
		{
			label: "Frontend",
			options: [
				{ value: "svelte", label: "Svelte" },
				{ value: "react", label: "React" },
				{ value: "vue", label: "Vue" },
			],
		},
		{
			label: "Backend",
			options: [
				{ value: "rust", label: "Rust" },
				{ value: "go", label: "Go" },
				{ value: "python", label: "Python" },
			],
		},
	];

	let groupedVal = $state<string | undefined>(undefined);
</script>

<div class="max-w-xs">
	<Select
		options={groupedOptions}
		value={groupedVal}
		onchange={(v: string | undefined) => {
			groupedVal = v;
		}}
		placeholder="Pick a language..."
	/>
</div>
<p class="mt-2 text-xs text-txt-tertiary">Selected: {groupedVal ?? "none"}</p>
