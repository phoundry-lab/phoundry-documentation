<script lang="ts">
	import { Slider } from "phoundry-ui";

	let withValue = $state(75);
</script>

<Slider
	value={withValue}
	onchange={(v: number) => (withValue = v)}
	min={0}
	max={100}
	showValue
	class="w-64"
/>
