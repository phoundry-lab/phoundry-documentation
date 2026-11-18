<script lang="ts">
	import { StarRating } from "phoundry-ui";
</script>

<div class="flex flex-col gap-2">
	<div class="flex items-center gap-3">
		<StarRating rating={4} readonly />
		<span class="text-xs text-txt-tertiary">4 / 5</span>
	</div>
	<div class="flex items-center gap-3">
		<StarRating rating={2.5} readonly allowHalf />
		<span class="text-xs text-txt-tertiary">2.5 / 5</span>
	</div>
</div>
