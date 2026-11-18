<script lang="ts">
	import { Select } from "phoundry-ui";
	import type { SelectOption } from "phoundry-ui";

	const plainOptions: SelectOption[] = [
		{ value: "apple", label: "Apple" },
		{ value: "banana", label: "Banana" },
		{ value: "cherry", label: "Cherry" },
		{ value: "dragonfruit", label: "Dragonfruit" },
	];

	let outline = $state<string | undefined>(undefined);

	let minimal = $state<string | undefined>(undefined);

	let filled = $state<string | undefined>(undefined);
</script>

<div class="flex flex-wrap items-start gap-3">
	<div class="w-44">
		<span class="mb-1 block text-[10px] text-txt-tertiary">outline</span>
		<Select
			options={plainOptions}
			value={outline}
			onchange={(v: string | undefined) => {
				outline = v;
			}}
			variant="outline"
			placeholder="Outline..."
		/>
	</div>
	<div class="w-44">
		<span class="mb-1 block text-[10px] text-txt-tertiary">ghost (minimal)</span
		>
		<Select
			options={plainOptions}
			value={minimal}
			onchange={(v: string | undefined) => {
				minimal = v;
			}}
			variant="ghost"
			placeholder="Ghost..."
		/>
	</div>
	<div class="w-44">
		<span class="mb-1 block text-[10px] text-txt-tertiary"
			>filled (default)</span
		>
		<Select
			options={plainOptions}
			value={filled}
			onchange={(v: string | undefined) => {
				filled = v;
			}}
			variant="filled"
			placeholder="Filled..."
		/>
	</div>
</div>
