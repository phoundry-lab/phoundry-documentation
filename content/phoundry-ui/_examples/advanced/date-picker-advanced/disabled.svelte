<script lang="ts">
	import {
		DatePickerAdvanced,
		type DatePickerAdvancedValue,
	} from "phoundry-ui";

	let disabledDemo = $state<DatePickerAdvancedValue>({
		startDate: new Date(2026, 4, 15),
		endDate: null,
		includeTime: false,
		includeEndDate: false,
	});
</script>

<DatePickerAdvanced bind:value={disabledDemo} disabled />
