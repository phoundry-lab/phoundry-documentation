<script lang="ts">
	import { DatePicker } from "phoundry-ui";

	let singleDate = $state<Date | null>(null);

	function formatDate(d: Date | null): string {
		if (!d) return "none";
		return d.toLocaleDateString();
	}
</script>

<DatePicker
	value={singleDate}
	onchange={(d: Date) => {
		singleDate = d;
	}}
/>
<p class="mt-2 text-xs text-txt-tertiary">Selected: {formatDate(singleDate)}</p>
