<script lang="ts">
	import { StarRating } from "phoundry-ui";
</script>

<div class="flex items-center gap-6">
	<div class="flex flex-col items-center gap-1">
		<StarRating rating={3} size="xs" readonly />
		<span class="text-[10px] text-txt-tertiary">xs</span>
	</div>
	<div class="flex flex-col items-center gap-1">
		<StarRating rating={3} size="sm" readonly />
		<span class="text-[10px] text-txt-tertiary">sm</span>
	</div>
	<div class="flex flex-col items-center gap-1">
		<StarRating rating={3} size="md" readonly />
		<span class="text-[10px] text-txt-tertiary">md</span>
	</div>
	<div class="flex flex-col items-center gap-1">
		<StarRating rating={3} size="lg" readonly />
		<span class="text-[10px] text-txt-tertiary">lg</span>
	</div>
</div>
