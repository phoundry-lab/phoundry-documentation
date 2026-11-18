<script lang="ts">
	import { tooltip } from "phoundry-ui";
</script>

<div>
	{#snippet richTooltip()}
		<span class="text-xs"
			>Rich <strong class="text-txt-primary">snippet</strong> body</span
		>
	{/snippet}
	<span
		{@attach tooltip({ content: richTooltip })}
		class="cursor-default rounded border border-border-muted px-3 py-1.5 text-sm text-txt-secondary"
	>
		Hover for snippet
	</span>
</div>
