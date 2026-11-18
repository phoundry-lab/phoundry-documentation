<script lang="ts">
	import { Checkbox } from "phoundry-ui";

	let disabledChecked = $state(true);
</script>

<div class="flex flex-col gap-3">
	<Checkbox checked={disabledChecked} disabled label="Disabled (checked)" />
	<Checkbox checked={false} disabled label="Disabled (unchecked)" />
</div>
