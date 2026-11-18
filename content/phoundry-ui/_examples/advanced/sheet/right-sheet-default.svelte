<script lang="ts">
	import { Sheet } from "phoundry-ui";
	import { Button } from "phoundry-ui";

	let rightOpen = $state(false);
</script>

<Button onclick={() => (rightOpen = true)}>Open Right Sheet</Button>
<Sheet open={rightOpen} onclose={() => (rightOpen = false)} title="Details">
	<div class="space-y-3 text-sm">
		<p>This sheet slides in from the right edge.</p>
		<p class="text-txt-secondary">
			It's great for detail panels, settings, or secondary content.
		</p>
	</div>
</Sheet>
