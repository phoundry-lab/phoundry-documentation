<script lang="ts">
	import {
		DatePickerAdvanced,
		type DatePickerAdvancedValue,
	} from "phoundry-ui";

	let dateValue = $state<DatePickerAdvancedValue>({
		startDate: null,
		endDate: null,
		includeTime: false,
		includeEndDate: false,
	});

	function formatDateTime(d: Date | null): string {
		if (!d) return "none";
		return d.toLocaleString();
	}
</script>

<p class="mb-2 text-xs text-txt-tertiary">
	End date, include time, and clear - controlled via bindable value. Week starts
	on Monday.
</p>
<DatePickerAdvanced bind:value={dateValue} weekStartsOn={1} />
<p class="mt-2 text-xs text-txt-tertiary">
	Date: {formatDateTime(dateValue.startDate)}
	{#if dateValue.includeEndDate && dateValue.endDate}
		→ {formatDateTime(dateValue.endDate)}
	{/if}
</p>
