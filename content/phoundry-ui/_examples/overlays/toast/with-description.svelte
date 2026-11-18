<script lang="ts">
	import { Button } from "phoundry-ui";
	import { getToastManager } from "phoundry-ui";

	const toast = getToastManager();
</script>

<Button
	onclick={() =>
		toast.add({
			message: "File uploaded",
			description: "report.pdf was uploaded successfully.",
			variant: "success",
		})}
>
	Toast with Description
</Button>
