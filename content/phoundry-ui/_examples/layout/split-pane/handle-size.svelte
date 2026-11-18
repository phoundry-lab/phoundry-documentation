<script lang="ts">
	import { SplitPane } from "phoundry-ui";

	let fatHandleSize = $state(220);
</script>

<p class="mb-2 text-xs text-txt-secondary">
	Increase <code>handleSize</code> for touch-heavy layouts-. The hit target grows
	while the visible groove stays styled.
</p>
<div class="h-48 overflow-hidden rounded-lg border border-border-muted">
	<SplitPane
		bind:size={fatHandleSize}
		handleSize={18}
		min={80}
		max={420}
		class="h-full"
	>
		{#snippet first()}
			<div class="h-full bg-surface-sunken p-3 text-xs text-txt-secondary">
				Wide handle
			</div>
		{/snippet}
		{#snippet second()}
			<div class="h-full p-3 text-xs text-txt-secondary">
				Drag the padded divider
			</div>
		{/snippet}
	</SplitPane>
</div>
