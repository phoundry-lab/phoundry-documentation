<script lang="ts">
	import { DatePicker } from "phoundry-ui";

	let rangeStart = $state<Date | null>(null);

	let rangeEnd = $state<Date | null>(null);

	function formatDate(d: Date | null): string {
		if (!d) return "none";
		return d.toLocaleDateString();
	}
</script>

<DatePicker
	mode="range"
	{rangeStart}
	{rangeEnd}
	onrangechange={(s: Date, e: Date) => {
		rangeStart = s;
		rangeEnd = e;
	}}
/>
<p class="mt-2 text-xs text-txt-tertiary">
	Range: {formatDate(rangeStart)} - {formatDate(rangeEnd)}
</p>
