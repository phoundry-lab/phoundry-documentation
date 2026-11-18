<script lang="ts">
	import { ProgressBar } from "phoundry-ui";

	let value = $state(65);
</script>

<p class="mb-2 text-xs text-txt-secondary">
	Useful when raw progress can overshoot before you snap to complete.
</p>
<div class="max-w-sm">
	<ProgressBar value={150} variant="success" showValue />
</div>
