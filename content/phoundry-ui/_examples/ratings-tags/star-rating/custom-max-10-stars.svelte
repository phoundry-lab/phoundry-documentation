<script lang="ts">
	import { StarRating } from "phoundry-ui";

	let tenScale = $state(7);
</script>

<p class="mb-2 text-xs text-txt-secondary">
	<code>max</code> adjusts star count and <code>aria-valuemax</code>; keyboard
	Home/End still jump to 0 / max.
</p>
<StarRating
	rating={tenScale}
	max={10}
	onchange={(v: number) => (tenScale = v)}
/>
<p class="mt-2 text-xs text-txt-tertiary">Value: {tenScale} / 10</p>
