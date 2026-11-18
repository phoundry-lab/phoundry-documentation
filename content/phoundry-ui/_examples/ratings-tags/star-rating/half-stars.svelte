<script lang="ts">
	import { StarRating } from "phoundry-ui";

	let half = $state(3.5);
</script>

<StarRating
	rating={half}
	allowHalf
	onchange={(v: number) => {
		half = v;
	}}
/>
<p class="mt-2 text-xs text-txt-tertiary">Rating: {half}</p>
