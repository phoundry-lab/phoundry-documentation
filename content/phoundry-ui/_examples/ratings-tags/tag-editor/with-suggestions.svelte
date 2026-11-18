<script lang="ts">
	import { TagEditor } from "phoundry-ui";

	let suggestedTags = $state<string[]>(["react"]);

	const allSuggestions = [
		"svelte",
		"react",
		"vue",
		"angular",
		"solid",
		"preact",
		"lit",
		"qwik",
	];
</script>

<TagEditor
	tags={suggestedTags}
	onchange={(t: string[]) => {
		suggestedTags = t;
	}}
	suggestions={allSuggestions}
	placeholder="Type to see suggestions…"
/>
