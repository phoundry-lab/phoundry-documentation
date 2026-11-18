<script lang="ts">
	import { Button } from "phoundry-ui";
	import { getToastManager } from "phoundry-ui";

	const toast = getToastManager();
</script>

<div class="flex flex-wrap gap-2">
	<Button
		size="sm"
		onclick={() =>
			toast.add({ message: "Pinned - click ✕ to close", duration: 0 })}
		>Sticky toast</Button
	>
	<Button size="sm" variant="outline" onclick={() => toast.clear()}
		>Clear all</Button
	>
</div>
