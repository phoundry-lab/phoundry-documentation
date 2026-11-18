<script lang="ts">
	import { TextInput } from "phoundry-ui";
	import { PhiIcons } from "phoundry-ui";

	let password = $state("");

	let search = $state("");
</script>

<div class="flex max-w-sm flex-col gap-3">
	<TextInput
		type="password"
		value={password}
		oninput={(v: string) => {
			password = v;
		}}
		placeholder="Password"
	/>
	<TextInput
		type="search"
		value={search}
		oninput={(v: string) => {
			search = v;
		}}
		placeholder="Search..."
		icon={PhiIcons.search}
	/>
</div>
