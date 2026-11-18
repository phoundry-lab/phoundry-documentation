<script lang="ts">
	import { DropZone } from "phoundry-ui";

	let droppedFiles = $state<string[]>([]);

	function handleDrop(files: File[]) {
		droppedFiles = files.map(
			(f) => `${f.name} (${(f.size / 1024).toFixed(1)} KB)`,
		);
	}
</script>

<DropZone ondrop={(files) => handleDrop(files)}>
	<div
		class="rounded-lg border-2 border-dashed border-border-muted p-8 text-center text-xs text-txt-tertiary"
	>
		<p>Drag files here to upload</p>
		<p class="mt-1 text-[10px]">
			Drop overlay appears automatically on drag-over
		</p>
	</div>
</DropZone>
{#if droppedFiles.length > 0}
	<div class="mt-2 text-xs text-txt-secondary">
		<p class="font-medium">Dropped:</p>
		<ul class="list-inside list-disc">
			{#each droppedFiles as f (f)}
				<li>{f}</li>
			{/each}
		</ul>
	</div>
{/if}
