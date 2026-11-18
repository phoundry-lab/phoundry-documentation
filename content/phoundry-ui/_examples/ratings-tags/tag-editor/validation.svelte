<script lang="ts">
	import { TagEditor } from "phoundry-ui";

	let validatedTags = $state<string[]>([]);
</script>

<p class="mb-2 text-xs text-txt-secondary">
	Return <code>true</code>, <code>false</code>, or a string error message from
	<code>validate</code>.
</p>
<TagEditor
	tags={validatedTags}
	onchange={(t: string[]) => {
		validatedTags = t;
	}}
	validate={(tag: string) => tag.length >= 3 || "Use at least 3 characters"}
	placeholder="Try “ab” vs “abc”"
/>
