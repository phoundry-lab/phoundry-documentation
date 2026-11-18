<script lang="ts">
	import { SplitPane } from "phoundry-ui";
</script>

<div class="h-64 overflow-hidden rounded-lg border border-border-muted">
	<SplitPane direction="vertical" defaultSize={150} class="h-full">
		{#snippet first()}
			<div class="h-full bg-surface-sunken p-3 text-xs text-txt-secondary">
				Top pane
			</div>
		{/snippet}
		{#snippet second()}
			<div class="h-full p-3 text-xs text-txt-secondary">Bottom pane</div>
		{/snippet}
	</SplitPane>
</div>
