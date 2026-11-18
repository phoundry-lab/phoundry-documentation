<script lang="ts">
	import { Button } from "phoundry-ui";
	import { useModalManagerAPI } from "phoundry-ui";
	import ExampleCustomModal from "../../_shared/ExampleCustomModal.svelte";

	const manager = useModalManagerAPI();

	let customResult = $state<"exported" | "archived" | undefined | null>(null);

	async function handleCustomModal() {
		customResult = await manager.open<"exported" | "archived" | undefined>(
			ExampleCustomModal,
			{ projectName: "Northwind" },
			{
				closeOnBackdrop: false,
				icon: "mdi:folder-outline",
				iconColor: "var(--ph-text-tertiary)",
			},
		);
	}
</script>

<div class="flex items-center gap-3">
	<Button onclick={handleCustomModal}>Open custom modal</Button>
	{#if customResult !== null}
		<span class="text-xs text-txt-secondary">
			Result:
			{#if customResult === undefined}
				dismissed
			{:else if customResult === "exported"}
				exported
			{:else}
				archived
			{/if}
		</span>
	{/if}
</div>
