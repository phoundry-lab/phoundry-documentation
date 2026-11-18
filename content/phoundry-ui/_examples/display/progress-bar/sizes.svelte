<script lang="ts">
	import { ProgressBar } from "phoundry-ui";

	let value = $state(65);
</script>

<div class="max-w-sm space-y-3">
	<div>
		<span class="mb-1 block text-[10px] text-txt-tertiary">sm</span>
		<ProgressBar value={60} size="sm" />
	</div>
	<div>
		<span class="mb-1 block text-[10px] text-txt-tertiary">md</span>
		<ProgressBar value={60} size="md" />
	</div>
	<div>
		<span class="mb-1 block text-[10px] text-txt-tertiary">lg</span>
		<ProgressBar value={60} size="lg" />
	</div>
</div>
