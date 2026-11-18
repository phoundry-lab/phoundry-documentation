<script lang="ts">
	import { Checkbox } from "phoundry-ui";

	let basic = $state(false);
</script>

<div class="flex items-center gap-3">
	<Checkbox checked={basic} onchange={() => (basic = !basic)} />
	<span class="text-xs text-txt-tertiary"
		>{basic ? "Checked" : "Unchecked"}</span
	>
</div>
