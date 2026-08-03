<script lang="ts">
	import Example from '$lib/docs/ui/Example.svelte';
	import SplitPane from '$phoundry/components/layout/SplitPane.svelte';

	let horizontalSize = $state(200);
	let fatHandleSize = $state(220);

	const horizontalCode = `<SplitPane defaultSize={200}>
  {#snippet first()}
    <div class="p-4">Sidebar</div>
  {/snippet}
  {#snippet second()}
    <div class="p-4">Main content</div>
  {/snippet}
</SplitPane>`;

	const verticalCode = `<SplitPane direction="vertical" defaultSize={150}>
  {#snippet first()}
    <div class="p-4">Top pane</div>
  {/snippet}
  {#snippet second()}
    <div class="p-4">Bottom pane</div>
  {/snippet}
</SplitPane>`;

	const controlledCode = `<SplitPane bind:size={panelSize} min={80} max={400}>
  {#snippet first()}
    <div class="p-4">Width: {panelSize}px</div>
  {/snippet}
  {#snippet second()}
    <div class="p-4">Main</div>
  {/snippet}
</SplitPane>`;

	const handleCode = `<SplitPane handleSize={16} defaultSize={200}>...</SplitPane>`;
</script>

<div class="space-y-8">
	<Example title="Horizontal (default)" code={horizontalCode}>
		<div class="h-48 overflow-hidden rounded-lg border border-border-muted">
			<SplitPane defaultSize={200} class="h-full">
				{#snippet first()}
					<div class="h-full bg-surface-sunken p-3 text-xs text-txt-secondary">Sidebar</div>
				{/snippet}
				{#snippet second()}
					<div class="h-full p-3 text-xs text-txt-secondary">Main content area</div>
				{/snippet}
			</SplitPane>
		</div>
	</Example>

	<Example title="Vertical" code={verticalCode}>
		<div class="h-64 overflow-hidden rounded-lg border border-border-muted">
			<SplitPane direction="vertical" defaultSize={150} class="h-full">
				{#snippet first()}
					<div class="h-full bg-surface-sunken p-3 text-xs text-txt-secondary">Top pane</div>
				{/snippet}
				{#snippet second()}
					<div class="h-full p-3 text-xs text-txt-secondary">Bottom pane</div>
				{/snippet}
			</SplitPane>
		</div>
	</Example>

	<Example title="Handle size" code={handleCode}>
		<p class="mb-2 text-xs text-txt-secondary">Increase <code>handleSize</code> for touch-heavy layouts-. The hit target grows while the visible groove stays styled.</p>
		<div class="h-48 overflow-hidden rounded-lg border border-border-muted">
			<SplitPane bind:size={fatHandleSize} handleSize={18} min={80} max={420} class="h-full">
				{#snippet first()}
					<div class="h-full bg-surface-sunken p-3 text-xs text-txt-secondary">Wide handle</div>
				{/snippet}
				{#snippet second()}
					<div class="h-full p-3 text-xs text-txt-secondary">Drag the padded divider</div>
				{/snippet}
			</SplitPane>
		</div>
	</Example>

	<Example title="Controlled Size" code={controlledCode}>
		<div class="h-48 overflow-hidden rounded-lg border border-border-muted">
			<SplitPane bind:size={horizontalSize} min={80} max={400} class="h-full">
				{#snippet first()}
					<div class="h-full bg-surface-sunken p-3 text-xs text-txt-secondary">
						Width: {horizontalSize}px
					</div>
				{/snippet}
				{#snippet second()}
					<div class="h-full p-3 text-xs text-txt-secondary">Drag the handle to resize</div>
				{/snippet}
			</SplitPane>
		</div>
	</Example>
</div>
