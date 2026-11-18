<script lang="ts">
	import { JsonTree } from "phoundry-ui";

	const arraySample = [
		{ id: 1, label: "alpha" },
		{ id: 2, label: "beta" },
	];
</script>

<div class="rounded-md border border-border-muted bg-surface-sunken px-3 py-2">
	<JsonTree value={arraySample} />
</div>
