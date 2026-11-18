<script lang="ts">
	import { CheckboxToggle } from "phoundry-ui";

	let disabled = $state(false);
</script>

<div class="flex flex-col gap-3">
	<CheckboxToggle checked={true} disabled label="Disabled (on)" />
	<CheckboxToggle checked={disabled} disabled label="Disabled (off)" />
</div>
