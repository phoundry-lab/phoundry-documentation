<script lang="ts">
	import { Skeleton } from "phoundry-ui";
</script>

<div class="max-w-sm">
	<div class="flex gap-3 rounded-lg border border-border-muted p-4">
		<Skeleton variant="circle" width="40px" />
		<div class="flex-1 space-y-2">
			<Skeleton width="60%" height="14px" />
			<Skeleton variant="text" lines={2} />
		</div>
	</div>
</div>
