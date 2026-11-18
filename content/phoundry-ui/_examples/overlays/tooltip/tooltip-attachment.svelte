<script lang="ts">
	import { tooltip } from "phoundry-ui";
</script>

<div class="flex flex-wrap items-center gap-4">
	<span
		{@attach tooltip("This is a tooltip")}
		class="cursor-default rounded border border-border-muted px-3 py-1.5 text-sm text-txt-secondary"
	>
		String shorthand
	</span>
	<span
		{@attach tooltip({ content: "Uses TooltipOptions shape", disabled: false })}
		class="cursor-default rounded border border-border-muted px-3 py-1.5 text-sm text-txt-secondary"
	>
		Options object
	</span>
</div>
