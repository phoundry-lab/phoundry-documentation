<script lang="ts">
	import { Slider } from "phoundry-ui";

	let formatted = $state(0.5);
</script>

<Slider
	value={formatted}
	onchange={(v: number) => (formatted = v)}
	min={0}
	max={1}
	step={0.01}
	showValue
	valueFormatter={(v) => `${Math.round(v * 100)}%`}
	class="w-64"
/>
