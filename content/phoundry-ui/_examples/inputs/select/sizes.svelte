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

	let sm = $state<string | undefined>(undefined);
</script>

<div class="flex flex-wrap items-end gap-3">
	<div class="w-44">
		<span class="mb-1 block text-[10px] text-txt-tertiary">sm</span>
		<Select
			options={plainOptions}
			value={sm}
			onchange={(v: string | undefined) => {
				sm = v;
			}}
			size="sm"
			placeholder="Small..."
		/>
	</div>
	<div class="w-44">
		<span class="mb-1 block text-[10px] text-txt-tertiary">md (default)</span>
		<Select
			options={plainOptions}
			value={basic}
			onchange={(v: string | undefined) => {
				basic = v;
			}}
			size="md"
			placeholder="Medium..."
		/>
	</div>
</div>
