<script lang="ts">
	import { Sheet } from "phoundry-ui";
	import { Button } from "phoundry-ui";

	let topOpen = $state(false);
</script>

<Button onclick={() => (topOpen = true)}>Open Top Sheet</Button>
<Sheet
	open={topOpen}
	onclose={() => (topOpen = false)}
	side="top"
	size="lg"
	title="Notifications"
>
	<div class="space-y-3 p-1 text-sm">
		<p>
			<code>side="top"</code> / <code>bottom</code> map <code>size</code> to height
			instead of width.
		</p>
	</div>
</Sheet>
