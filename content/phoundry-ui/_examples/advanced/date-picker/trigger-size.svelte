<script lang="ts">
	import { DatePicker } from "phoundry-ui";

	let singleDate = $state<Date | null>(null);
</script>

<div class="flex flex-wrap items-end gap-3">
	<DatePicker
		value={singleDate}
		onchange={(d: Date) => {
			singleDate = d;
		}}
		inputSize="sm"
	/>
	<DatePicker
		value={singleDate}
		onchange={(d: Date) => {
			singleDate = d;
		}}
		inputSize="lg"
	/>
</div>
<p class="mt-2 text-xs text-txt-tertiary">
	Same selection; <code>inputSize</code> only affects the field height.
</p>
