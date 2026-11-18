<script lang="ts">
	import { TextInput } from "phoundry-ui";

	import { PhiIcons } from "phoundry-ui";

	let search = $state("");

	let clearablePlain = $state("hello");

	let clearableWithIcon = $state("phoundry");
</script>

<div class="flex max-w-sm flex-col gap-3">
	<TextInput
		value={clearablePlain}
		oninput={(v: string) => {
			clearablePlain = v;
		}}
		placeholder="Type something..."
		clearable
	/>
	<TextInput
		value={clearableWithIcon}
		oninput={(v: string) => {
			clearableWithIcon = v;
		}}
		icon={PhiIcons.search}
		placeholder="Search..."
		clearable
	/>
</div>
<p class="mt-2 text-xs text-txt-tertiary">
	The clear button appears only when the input has a value.
</p>
