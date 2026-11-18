<script lang="ts">
	import { StatusCheckbox } from "phoundry-ui";

	let basic = $state("unchecked");
</script>

<div class="flex items-center gap-3">
	<StatusCheckbox bind:activeKey={basic} />
	<span class="text-sm text-txt-secondary"
		>Key: <code class="text-txt-primary">{basic}</code></span
	>
</div>
<p class="text-xs text-txt-tertiary">
	Click to snap between unchecked and checked; Ctrl/Cmd+click cycles all states.
</p>
