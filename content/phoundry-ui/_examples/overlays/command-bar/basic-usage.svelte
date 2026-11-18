<script lang="ts">
	import { Button } from "phoundry-ui";
	import { getCommandBarState } from "phoundry-ui";

	const barState = getCommandBarState();

	let lastExecuted = $state("");
</script>

<div class="flex items-center gap-3">
	<Button onclick={() => barState.open()}>Open Command Bar</Button>
	{#if lastExecuted}
		<span class="text-xs text-txt-secondary">Executed: {lastExecuted}</span>
	{/if}
</div>
