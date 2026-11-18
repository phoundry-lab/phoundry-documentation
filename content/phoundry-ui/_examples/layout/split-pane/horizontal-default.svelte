<script lang="ts">
	import { SplitPane } from "phoundry-ui";
</script>

<div class="h-48 overflow-hidden rounded-lg border border-border-muted">
	<SplitPane defaultSize={200} class="h-full">
		{#snippet first()}
			<div class="h-full bg-surface-sunken p-3 text-xs text-txt-secondary">
				Sidebar
			</div>
		{/snippet}
		{#snippet second()}
			<div class="h-full p-3 text-xs text-txt-secondary">Main content area</div>
		{/snippet}
	</SplitPane>
</div>
