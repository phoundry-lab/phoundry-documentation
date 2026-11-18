<script lang="ts">
	import { TextInput } from "phoundry-ui";

	let small = $state("");

	let medium = $state("");

	let large = $state("");
</script>

<div class="flex max-w-sm flex-col gap-3">
	<TextInput
		value={small}
		oninput={(v: string) => {
			small = v;
		}}
		placeholder="Small"
		size="sm"
		clearable
	/>
	<TextInput
		value={medium}
		oninput={(v: string) => {
			medium = v;
		}}
		placeholder="Medium"
		size="md"
		clearable
	/>
	<TextInput
		value={large}
		oninput={(v: string) => {
			large = v;
		}}
		placeholder="Large"
		size="lg"
		clearable
	/>
</div>
