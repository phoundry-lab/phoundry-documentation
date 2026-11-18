<script lang="ts">
	import { TagEditor } from "phoundry-ui";

	let basicTags = $state<string[]>(["svelte", "typescript"]);
</script>

<TagEditor
	tags={basicTags}
	onchange={(t: string[]) => {
		basicTags = t;
	}}
/>
