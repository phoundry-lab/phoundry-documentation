<script lang="ts">
	import { Sheet } from "phoundry-ui";
	import { Button } from "phoundry-ui";

	let bottomOpen = $state(false);
</script>

<Button onclick={() => (bottomOpen = true)}>Open Bottom Sheet</Button>
<Sheet
	open={bottomOpen}
	onclose={() => (bottomOpen = false)}
	side="bottom"
	size="sm"
	title="Quick Actions"
>
	<div class="space-y-3 text-sm">
		<p>
			Bottom sheets are useful for mobile-style action menus or compact content.
		</p>
	</div>
</Sheet>
