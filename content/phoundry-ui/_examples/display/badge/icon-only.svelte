<script lang="ts">
	import { Badge } from "phoundry-ui";
	import { PhiIcons } from "phoundry-ui";
</script>

<p class="mb-2 text-xs text-txt-secondary">
	When there are no <code>children</code>, the badge shrinks to a square chip
	sized by <code>size</code>.
</p>
<div class="flex items-center gap-2">
	<Badge icon={PhiIcons.info} color="blue" />
	<Badge icon={PhiIcons.check} color="green" />
	<Badge icon={PhiIcons.warning} color="yellow" />
	<Badge icon={PhiIcons.cancel} color="red" />
</div>
