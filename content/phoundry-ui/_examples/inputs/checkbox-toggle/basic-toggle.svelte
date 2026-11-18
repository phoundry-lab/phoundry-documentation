<script lang="ts">
	import { CheckboxToggle } from "phoundry-ui";

	let basic = $state(false);
</script>

<div class="flex items-center gap-3">
	<CheckboxToggle checked={basic} onchange={() => (basic = !basic)} />
	<span class="text-xs text-txt-tertiary">{basic ? "On" : "Off"}</span>
</div>
