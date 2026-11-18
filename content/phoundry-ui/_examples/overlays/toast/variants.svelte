<script lang="ts">
	import { Button } from "phoundry-ui";
	import { getToastManager } from "phoundry-ui";

	const toast = getToastManager();
</script>

<div class="flex flex-wrap items-center gap-2">
	<Button variant="primary" onclick={() => toast.success("Changes saved")}
		>Success</Button
	>
	<Button variant="danger" onclick={() => toast.error("Something went wrong")}
		>Error</Button
	>
	<Button onclick={() => toast.warning("Storage almost full")}>Warning</Button>
	<Button onclick={() => toast.info("New version available")}>Info</Button>
</div>
