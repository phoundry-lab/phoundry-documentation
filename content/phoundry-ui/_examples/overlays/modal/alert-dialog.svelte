<script lang="ts">
	import { Button } from "phoundry-ui";
	import { useModalManagerAPI } from "phoundry-ui";

	const manager = useModalManagerAPI();

	async function handleAlert() {
		await manager.alert({
			title: "Update Complete",
			message: "Your settings have been saved successfully.",
		});
	}
</script>

<div class="flex flex-wrap items-center gap-3">
	<Button onclick={handleAlert}>Default alert</Button>
</div>
