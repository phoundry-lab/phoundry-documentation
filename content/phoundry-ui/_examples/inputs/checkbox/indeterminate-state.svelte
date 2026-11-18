<script lang="ts">
	import { Checkbox } from "phoundry-ui";

	let indeterminate = $state(true);
</script>

<Checkbox
	checked={false}
	{indeterminate}
	onchange={() => {
		indeterminate = false;
	}}
	label="Select all"
	description="Some items are selected"
/>
