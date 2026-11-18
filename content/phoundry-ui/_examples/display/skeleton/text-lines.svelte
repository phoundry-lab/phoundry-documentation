<script lang="ts">
	import { Skeleton } from "phoundry-ui";
</script>

<div class="max-w-sm space-y-4">
	<Skeleton variant="text" lines={3} />
	<Skeleton variant="text" lines={5} width="300px" />
	<div>
		<p class="mb-1 text-[10px] text-txt-tertiary">Single line title shimmer</p>
		<Skeleton variant="text" lines={1} width="120px" />
	</div>
</div>
