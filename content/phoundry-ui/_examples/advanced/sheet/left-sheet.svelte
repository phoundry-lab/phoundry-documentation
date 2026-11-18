<script lang="ts">
	import { Sheet } from "phoundry-ui";
	import { Button } from "phoundry-ui";

	let leftOpen = $state(false);
</script>

<Button onclick={() => (leftOpen = true)}>Open Left Sheet</Button>
<Sheet
	open={leftOpen}
	onclose={() => (leftOpen = false)}
	side="left"
	title="Navigation"
>
	<div class="space-y-3 text-sm">
		<p>Left sheets work well for navigation or sidebars.</p>
	</div>
</Sheet>
