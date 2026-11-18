<script lang="ts">
	import { TextInput } from "phoundry-ui";

	let suffixOnly = $state("");

	let suffixBgDemo = $state("");
</script>

<div class="flex max-w-sm flex-col gap-3">
	<TextInput
		value={suffixOnly}
		oninput={(v: string) => {
			suffixOnly = v;
		}}
		suffix=".md"
		placeholder="notes"
	/>
	<TextInput
		value={suffixBgDemo}
		oninput={(v: string) => {
			suffixBgDemo = v;
		}}
		suffix=".md"
		suffixBg
		placeholder="notes"
	/>
</div>
