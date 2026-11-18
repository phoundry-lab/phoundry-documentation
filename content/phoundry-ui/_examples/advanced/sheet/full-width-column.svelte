<script lang="ts">
	import { Sheet } from "phoundry-ui";
	import { Button } from "phoundry-ui";

	let fullOpen = $state(false);
</script>

<Button variant="outline" onclick={() => (fullOpen = true)}
	>Open full-width sheet</Button
>
<Sheet
	open={fullOpen}
	onclose={() => (fullOpen = false)}
	side="right"
	size="full"
	title="Wide panel"
>
	<div class="p-4 text-sm text-txt-secondary">
		<code>size="full"</code> stretches to the opposing edge.
	</div>
</Sheet>
