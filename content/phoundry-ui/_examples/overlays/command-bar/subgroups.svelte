<script lang="ts">
	import { Button } from "phoundry-ui";
	import { getCommandBarState } from "phoundry-ui";

	const barState = getCommandBarState();
</script>

<p class="mb-2 text-xs text-txt-secondary">
	Subgroups appear in the root list with a chevron. Choose one to drill in; <strong
		>Esc</strong
	>
	or the back control returns to the root. Use a
	<code>content</code> snippet for a fully custom panel instead of command rows.
</p>
<div class="flex items-center gap-2">
	<Button onclick={() => barState.open()}>Open palette (with subgroups)</Button>
</div>
