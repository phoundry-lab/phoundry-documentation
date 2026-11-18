<script lang="ts">
	import { Button } from "phoundry-ui";
	import { getToastManager } from "phoundry-ui";

	const toast = getToastManager();
</script>

<div class="flex flex-wrap gap-2">
	<Button
		size="sm"
		onclick={() =>
			toast.add({
				id: "demo-sync",
				message: "Saving…",
				duration: 0,
				dismissible: false,
			})}
	>
		Start save
	</Button>
	<Button
		size="sm"
		variant="primary"
		onclick={() =>
			toast.add({
				id: "demo-sync",
				message: "Saved",
				variant: "success",
				duration: 2500,
			})}
	>
		Finish save
	</Button>
</div>
