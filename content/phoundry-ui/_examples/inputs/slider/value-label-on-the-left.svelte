<script lang="ts">
	import { Slider } from "phoundry-ui";
	import type { SliderTick } from "phoundry-ui";

	let valueStart = $state(2);

	const fontTicks: SliderTick[] = [
		{ value: 10, label: "10px" },
		{ value: 12, label: "12px" },
		{ value: 14, label: "14px" },
		{ value: 16, label: "16px" },
		{ value: 18, label: "18px" },
		{ value: 20, label: "20px" },
	];
</script>

<Slider
	value={valueStart}
	onchange={(v: number) => (valueStart = v)}
	ticks={fontTicks}
	showValue
	valuePosition="start"
	class="w-64"
/>
