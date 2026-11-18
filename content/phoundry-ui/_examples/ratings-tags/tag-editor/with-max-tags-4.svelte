<script lang="ts">
	import { TagEditor } from "phoundry-ui";

	let limitedTags = $state<string[]>(["alpha", "beta"]);
</script>

<TagEditor
	tags={limitedTags}
	onchange={(t: string[]) => {
		limitedTags = t;
	}}
	maxTags={4}
/>
<p class="mt-2 text-xs text-txt-tertiary">{limitedTags.length} / 4 tags</p>
