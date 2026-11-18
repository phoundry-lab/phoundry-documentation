<script lang="ts">
	import { Slider } from "phoundry-ui";

	let basic = $state(50);
</script>

<div class="flex items-center gap-3">
	<Slider
		value={basic}
		onchange={(v: number) => (basic = v)}
		min={0}
		max={100}
		class="w-64"
	/>
	<span class="text-xs text-txt-tertiary">{basic}</span>
</div>
