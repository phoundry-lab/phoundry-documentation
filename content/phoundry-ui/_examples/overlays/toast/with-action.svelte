<script lang="ts">
	import { Button } from "phoundry-ui";
	import { getToastManager } from "phoundry-ui";

	const toast = getToastManager();
</script>

<Button
	onclick={() =>
		toast.add({
			message: "Item deleted",
			action: { label: "Undo", onclick: () => toast.info("Undone!") },
		})}
>
	Toast with Action
</Button>
