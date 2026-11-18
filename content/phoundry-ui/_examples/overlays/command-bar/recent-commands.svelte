<script lang="ts">
	import { Button } from "phoundry-ui";
	import { getCommandBarState } from "phoundry-ui";

	const barState = getCommandBarState();

	let recentIds = $state<string[]>(["save", "search"]);
</script>

<p class="mb-2 text-xs text-txt-secondary">
	Open the palette and run a command - executed ids bubble to the Recent group
	via <code>onTrackRecent</code>.
</p>
<div class="flex items-center gap-2">
	<Button onclick={() => barState.open()}>Open palette</Button>
	<span class="text-[11px] text-txt-tertiary"
		>recent: {recentIds.join(", ")}</span
	>
</div>
