<script lang="ts">
	import { JsonTree } from "phoundry-ui";

	const sample = {
		name: "Phials",
		count: 3,
		ok: true,
		nested: {
			theme: "dark",
			tags: ["app", "files"],
		},
	};
</script>

<div class="rounded-md border border-border-muted bg-surface-sunken px-3 py-2">
	<JsonTree value={sample} />
</div>
