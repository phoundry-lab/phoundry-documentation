<script lang="ts">
	import { NumberInput } from "phoundry-ui";

	let stepped = $state(0);
</script>

<div class="flex items-center gap-4">
	<NumberInput
		value={stepped}
		onchange={(v: number) => {
			stepped = v;
		}}
		step={0.25}
		min={0}
		width="7rem"
	/>
	<span class="text-xs text-txt-tertiary">Step 0.25: {stepped}</span>
</div>
