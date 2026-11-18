<script lang="ts">
	import { Textarea } from "phoundry-ui";

	let basic = $state("");
</script>

<div class="max-w-md">
	<Textarea
		value={basic}
		oninput={(v: string) => {
			basic = v;
		}}
		placeholder="Write something..."
	/>
</div>
<p class="mt-2 text-xs text-txt-tertiary">Length: {basic.length}</p>
