<script lang="ts">
	import {
		DatePickerAdvanced,
		type DatePickerAdvancedValue,
	} from "phoundry-ui";

	let compactValue = $state<DatePickerAdvancedValue>({
		startDate: new Date(2026, 4, 10),
		endDate: null,
		includeTime: false,
		includeEndDate: false,
	});

	const advMin = new Date(2026, 4, 1);

	const advMax = new Date(2026, 4, 28);
</script>

<p class="mb-2 text-xs text-txt-secondary">
	Matches the internal panel used by <code>DatePicker</code> - only the grid + navigation
	chrome.
</p>
<DatePickerAdvanced
	bind:value={compactValue}
	showToggles={false}
	minDate={advMin}
	maxDate={advMax}
/>
