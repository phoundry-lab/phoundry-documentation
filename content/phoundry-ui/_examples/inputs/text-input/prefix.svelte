<script lang="ts">
	import { TextInput } from "phoundry-ui";
	import { PhiIcons } from "phoundry-ui";

	let search = $state("");

	let prefixOnly = $state("");

	let prefixWithIcon = $state("");

	let prefixBgDemo = $state("");
</script>

<div class="flex max-w-sm flex-col gap-3">
	<TextInput
		value={prefixOnly}
		oninput={(v: string) => {
			prefixOnly = v;
		}}
		prefix="$"
		placeholder="0.00"
	/>
	<TextInput
		value={prefixWithIcon}
		oninput={(v: string) => {
			prefixWithIcon = v;
		}}
		icon={PhiIcons.search}
		prefix="#"
		placeholder="lookup"
	/>
	<TextInput
		value={prefixBgDemo}
		oninput={(v: string) => {
			prefixBgDemo = v;
		}}
		icon={PhiIcons.search}
		prefix="USD"
		prefixBg
		placeholder="0.00"
	/>
</div>
