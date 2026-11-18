<script lang="ts">
	import { DropZone } from "phoundry-ui";

	let droppedFiles = $state<string[]>([]);

	function handleDrop(files: File[]) {
		droppedFiles = files.map(
			(f) => `${f.name} (${(f.size / 1024).toFixed(1)} KB)`,
		);
	}
</script>

{#snippet releaseHint()}
	<div
		class="rounded-lg bg-accent-primary/15 p-4 text-center text-sm font-medium text-accent-secondary"
	>
		Release to import
	</div>
{/snippet}

<DropZone ondrop={(files) => handleDrop(files)} active={releaseHint}>
	<div
		class="rounded-lg border-2 border-dashed border-border-muted p-8 text-center text-xs text-txt-tertiary"
	>
		Custom overlay replaces the default “Drop to upload” chrome.
	</div>
</DropZone>
