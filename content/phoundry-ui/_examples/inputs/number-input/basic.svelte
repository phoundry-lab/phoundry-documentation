<script lang="ts">
	import { NumberInput } from "phoundry-ui";

	let basic = $state(42);
</script>

<div class="flex items-center gap-4">
	<NumberInput
		value={basic}
		onchange={(v: number) => {
			basic = v;
		}}
	/>
	<span class="text-xs text-txt-tertiary">Value: {basic}</span>
</div>
