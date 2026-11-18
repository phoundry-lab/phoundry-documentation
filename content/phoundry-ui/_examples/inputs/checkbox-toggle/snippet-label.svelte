<script lang="ts">
	import { CheckboxToggle } from "phoundry-ui";

	let richLabelToggle = $state(true);
</script>

{#snippet promo()}
	Accept <span class="font-medium text-accent-secondary">beta features</span>
{/snippet}

<CheckboxToggle
	checked={richLabelToggle}
	onchange={() => (richLabelToggle = !richLabelToggle)}
	label={promo}
	description="Pass a snippet when the label needs inline formatting."
/>
