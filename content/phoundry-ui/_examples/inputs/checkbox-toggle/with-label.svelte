<script lang="ts">
	import { CheckboxToggle } from "phoundry-ui";

	let withLabel = $state(true);

	let withDesc = $state(false);
</script>

<div class="flex flex-col gap-3">
	<CheckboxToggle
		checked={withLabel}
		onchange={() => (withLabel = !withLabel)}
		label="Auto-save enabled"
	/>
	<CheckboxToggle
		checked={withDesc}
		onchange={() => (withDesc = !withDesc)}
		label="Enable notifications"
		description="Receive push notifications for important events"
	/>
</div>
