<script lang="ts">
	import { Badge } from "phoundry-ui";
</script>

<div class="flex items-center gap-3">
	<div class="flex items-center gap-1.5">
		<Badge color="green" dot />
		<span class="text-xs text-txt-secondary">Online</span>
	</div>
	<div class="flex items-center gap-1.5">
		<Badge color="yellow" dot />
		<span class="text-xs text-txt-secondary">Away</span>
	</div>
	<div class="flex items-center gap-1.5">
		<Badge color="red" dot />
		<span class="text-xs text-txt-secondary">Busy</span>
	</div>
	<div class="flex items-center gap-1.5">
		<Badge dot />
		<span class="text-xs text-txt-secondary">Offline</span>
	</div>
</div>
