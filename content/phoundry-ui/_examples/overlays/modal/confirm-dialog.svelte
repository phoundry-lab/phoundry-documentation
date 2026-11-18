<script lang="ts">
	import { Button } from "phoundry-ui";
	import { useModalManagerAPI } from "phoundry-ui";

	const manager = useModalManagerAPI();

	let confirmResult = $state<boolean | null>(null);

	async function handleConfirm() {
		confirmResult = await manager.confirm({
			title: "Delete Item",
			message:
				"Are you sure you want to delete this item? This action cannot be undone.",
			confirmLabel: "Delete",
			danger: true,
		});
	}
</script>

<div class="flex items-center gap-3">
	<Button variant="danger" onclick={handleConfirm}>Open Confirm</Button>
	{#if confirmResult !== null}
		<span class="text-xs text-txt-secondary">
			Result: {confirmResult ? "Confirmed" : "Cancelled"}
		</span>
	{/if}
</div>
