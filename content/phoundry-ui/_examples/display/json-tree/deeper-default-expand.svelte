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

<p class="mb-2 text-xs text-txt-secondary">
	<code>defaultExpandDepth</code> of 2 opens the first nested object. The default
	is 1: root keys visible, nested containers collapsed.
</p>
<div class="rounded-md border border-border-muted bg-surface-sunken px-3 py-2">
	<JsonTree value={sample} defaultExpandDepth={2} />
</div>
