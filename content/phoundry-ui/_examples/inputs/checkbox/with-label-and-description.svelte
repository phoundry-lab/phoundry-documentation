<script lang="ts">
	import { Checkbox } from "phoundry-ui";

	let withLabel = $state(false);

	let withDesc = $state(true);

	let agree = $state(false);
</script>

<div class="flex flex-col gap-3">
	<Checkbox
		checked={withLabel}
		onchange={() => (withLabel = !withLabel)}
		label="Enable notifications"
	/>
	<Checkbox
		checked={withDesc}
		onchange={() => (withDesc = !withDesc)}
		label="Accept terms and conditions"
		description="You agree to our privacy policy"
	/>
</div>
