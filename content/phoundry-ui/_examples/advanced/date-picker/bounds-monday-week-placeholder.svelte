<script lang="ts">
	import { DatePicker } from "phoundry-ui";

	let singleDate = $state<Date | null>(null);

	let constrainedDate = $state<Date | null>(null);

	const minBoundary = new Date(2026, 4, 1);

	const maxBoundary = new Date(2026, 4, 31);

	function formatDate(d: Date | null): string {
		if (!d) return "none";
		return d.toLocaleDateString();
	}
</script>

<div class="flex flex-wrap items-end gap-4">
	<DatePicker
		value={constrainedDate}
		onchange={(d: Date) => {
			constrainedDate = d;
		}}
		minDate={minBoundary}
		maxDate={maxBoundary}
		weekStartsOn={1}
		placeholder="Pick a May 2026 date"
	/>
	<DatePicker
		value={singleDate}
		onchange={(d: Date) => (singleDate = d)}
		disabled
		placeholder="Disabled trigger"
	/>
</div>
<p class="mt-2 text-xs text-txt-tertiary">
	Constrained: {formatDate(constrainedDate)}
</p>
