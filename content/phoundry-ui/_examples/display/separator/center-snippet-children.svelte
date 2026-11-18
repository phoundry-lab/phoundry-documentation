<script lang="ts">
	import { Separator } from "phoundry-ui";
	import { Badge } from "phoundry-ui";
</script>

<p class="mb-2 text-xs text-txt-secondary">
	Use <code>children</code> when the center needs richer markup than a plain
	string <code>label</code>.
</p>
<Separator>
	{#snippet children()}
		<Badge size="xs">Beta</Badge>
	{/snippet}
</Separator>
