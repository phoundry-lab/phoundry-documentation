<script lang="ts">
	import { Button } from "phoundry-ui";
	import { useModalManagerAPI } from "phoundry-ui";

	const manager = useModalManagerAPI();

	let promptResult = $state<string | null>(null);

	async function handlePrompt() {
		promptResult = await manager.prompt({
			title: "Rename File",
			message: "Enter a new name for the file:",
			defaultValue: "untitled.txt",
			placeholder: "filename",
			icon: "lucide:file-pen",
			iconColor: "var(--ph-text-tertiary)",
		});
	}
</script>

<div class="flex items-center gap-3">
	<Button onclick={handlePrompt}>Open Prompt</Button>
	{#if promptResult !== null}
		<span class="text-xs text-txt-secondary">Result: "{promptResult}"</span>
	{/if}
</div>
