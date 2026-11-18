<script lang="ts">
	import { SplitPane } from "phoundry-ui";

	let horizontalSize = $state(200);
</script>

<div class="h-48 overflow-hidden rounded-lg border border-border-muted">
	<SplitPane bind:size={horizontalSize} min={80} max={400} class="h-full">
		{#snippet first()}
			<div class="h-full bg-surface-sunken p-3 text-xs text-txt-secondary">
				Width: {horizontalSize}px
			</div>
		{/snippet}
		{#snippet second()}
			<div class="h-full p-3 text-xs text-txt-secondary">
				Drag the handle to resize
			</div>
		{/snippet}
	</SplitPane>
</div>
