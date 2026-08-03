<script lang="ts">
	import Example from '$lib/docs/ui/Example.svelte';
	import DropZone from '$phoundry/components/display/DropZone.svelte';

	let droppedFiles = $state<string[]>([]);
	let imageFiles = $state<string[]>([]);

	function handleDrop(files: File[]) {
		droppedFiles = files.map((f) => `${f.name} (${(f.size / 1024).toFixed(1)} KB)`);
	}

	function handleImageDrop(files: File[]) {
		imageFiles = files.map((f) => f.name);
	}

	const basicCode = `<DropZone ondrop={(files) => handleDrop(files)}>
  <div class="p-8 text-center border-2 border-dashed rounded-lg">
    <p>Drag files here to upload</p>
  </div>
</DropZone>`;

	const acceptCode = `<DropZone
  ondrop={(files) => handleImages(files)}
  accept={['image/*']}
>
  <div class="p-8 text-center border-2 border-dashed rounded-lg">
    <p>Drop images only (*.png, *.jpg, etc.)</p>
  </div>
</DropZone>`;

	const disabledCode = `<DropZone ondrop={() => {}} disabled>
  <div class="p-6 text-center text-txt-tertiary">Uploads locked</div>
</DropZone>`;

	const activeCode = `<DropZone ondrop={handle} active={activeSnippet}>
  {#snippet children()}…{/snippet}
</DropZone>

{#snippet activeSnippet()}
  <div class="rounded-lg bg-accent-primary/20 p-4 text-center text-sm font-medium">Release to import</div>
{/snippet}`;
</script>

{#snippet releaseHint()}
	<div class="rounded-lg bg-accent-primary/15 p-4 text-center text-sm font-medium text-accent-secondary">Release to import</div>
{/snippet}

<div class="space-y-8">
	<Example title="Basic" code={basicCode}>
		<DropZone ondrop={(files) => handleDrop(files)}>
			<div class="rounded-lg border-2 border-dashed border-border-muted p-8 text-center text-xs text-txt-tertiary">
				<p>Drag files here to upload</p>
				<p class="mt-1 text-[10px]">Drop overlay appears automatically on drag-over</p>
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
	</Example>

	<Example title="With Accept Filter (images only)" code={acceptCode}>
		<DropZone ondrop={(files) => handleImageDrop(files)} accept={['image/*']}>
			<div class="rounded-lg border-2 border-dashed border-border-muted p-8 text-center text-xs text-txt-tertiary">
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
	</Example>

	<Example title="Disabled" code={disabledCode}>
		<DropZone ondrop={() => {}} disabled>
			<div class="rounded-lg border-2 border-dashed border-border-muted p-6 text-center text-xs text-txt-tertiary">
				Uploads disabled - drag still shows browser cursor but this zone ignores it.
			</div>
		</DropZone>
	</Example>

	<Example title="Custom active overlay" code={activeCode}>
		<DropZone ondrop={(files) => handleDrop(files)} active={releaseHint}>
			<div class="rounded-lg border-2 border-dashed border-border-muted p-8 text-center text-xs text-txt-tertiary">
				Custom overlay replaces the default “Drop to upload” chrome.
			</div>
		</DropZone>
	</Example>
</div>
