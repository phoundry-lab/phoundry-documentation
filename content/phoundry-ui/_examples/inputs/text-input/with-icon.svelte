<script lang="ts">
	import { TextInput } from "phoundry-ui";
	import { PhiIcons } from "phoundry-ui";

	let withIcon = $state("");

	let search = $state("");
</script>

<div class="max-w-sm">
	<TextInput
		value={withIcon}
		oninput={(v: string) => {
			withIcon = v;
		}}
		placeholder="Search..."
		icon={PhiIcons.search}
	/>
</div>
