<script lang="ts">
	import { NumberInput } from "phoundry-ui";

	let bounded = $state(5);
</script>

<div class="flex items-center gap-4">
	<NumberInput
		value={bounded}
		onchange={(v: number) => {
			bounded = v;
		}}
		min={0}
		max={10}
	/>
	<span class="text-xs text-txt-tertiary">Clamped 0–10: {bounded}</span>
</div>
