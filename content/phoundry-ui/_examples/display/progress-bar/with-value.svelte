<script lang="ts">
	import { ProgressBar } from "phoundry-ui";

	let value = $state(65);
</script>

<div class="max-w-sm space-y-3">
	<ProgressBar {value} showValue />
	<input type="range" min="0" max="100" bind:value class="w-full" />
</div>
