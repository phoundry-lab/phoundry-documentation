<script lang="ts">
	import { StarRating } from "phoundry-ui";

	let interactive = $state(3);
</script>

<StarRating
	rating={interactive}
	onchange={(v: number) => {
		interactive = v;
	}}
/>
<p class="mt-2 text-xs text-txt-tertiary">Rating: {interactive}</p>
