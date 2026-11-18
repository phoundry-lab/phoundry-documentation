<script lang="ts">
	import { ProgressBar } from "phoundry-ui";

	let value = $state(65);
</script>

<div class="max-w-sm space-y-3">
	<ProgressBar value={100} variant="success" />
	<ProgressBar value={50} variant="warning" />
	<ProgressBar value={25} variant="error" />
</div>
