<script lang="ts">
	import { Slider } from "phoundry-ui";

	let disabledSl = $state(40);
</script>

<Slider
	value={disabledSl}
	onchange={(v: number) => (disabledSl = v)}
	min={0}
	max={100}
	disabled
	showValue
	class="w-64"
/>
