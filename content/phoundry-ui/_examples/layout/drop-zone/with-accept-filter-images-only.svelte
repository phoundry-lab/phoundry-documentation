<script lang="ts">
	import { DropZone } from "phoundry-ui";

	let imageFiles = $state<string[]>([]);

	function handleImageDrop(files: File[]) {
		imageFiles = files.map((f) => f.name);
	}
</script>

<DropZone ondrop={(files) => handleImageDrop(files)} accept={["image/*"]}>
	<div
		class="rounded-lg border-2 border-dashed border-border-muted p-8 text-center text-xs text-txt-tertiary"
	>
		<p>Drop images only (*.png, *.jpg, etc.)</p>
		<p class="mt-1 text-[10px]">Non-image files will show an error overlay</p>
	</div>
</DropZone>
{#if imageFiles.length > 0}
	<div class="mt-2 text-xs text-txt-secondary">
		<p class="font-medium">Accepted images:</p>
		<ul class="list-inside list-disc">
			{#each imageFiles as f (f)}
				<li>{f}</li>
			{/each}
		</ul>
	</div>
{/if}
