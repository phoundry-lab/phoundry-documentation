<script lang="ts">
	import { TagEditor } from "phoundry-ui";

	let asyncTags = $state<string[]>([]);

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

<p class="mb-2 text-xs text-txt-secondary">
	The lookup is debounced (~200ms). Errors fall back to an empty suggestion
	list.
</p>
<TagEditor
	tags={asyncTags}
	onchange={(t: string[]) => {
		asyncTags = t;
	}}
	suggestions={async (q: string) => {
		await new Promise((r) => setTimeout(r, 150));
		return allSuggestions.filter((s) =>
			s.toLowerCase().includes(q.trim().toLowerCase()),
		);
	}}
	placeholder="Type “sv”…"
/>
