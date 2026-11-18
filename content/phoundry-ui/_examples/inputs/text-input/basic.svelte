<script lang="ts">
	import { TextInput } from "phoundry-ui";

	let basic = $state("");
</script>

<div class="max-w-sm">
	<TextInput
		value={basic}
		oninput={(v: string) => {
			basic = v;
		}}
		placeholder="Your name"
	/>
</div>
