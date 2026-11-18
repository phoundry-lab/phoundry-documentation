<script lang="ts">
	import { RichTextEditor } from "phoundry-ui";

	let minimalContent = $state("");

	const minimalToolbar = ["bold", "italic", "link"] as const;
</script>

<RichTextEditor
	value={minimalContent}
	onchange={(html: string) => {
		minimalContent = html;
	}}
	toolbar={[...minimalToolbar]}
	placeholder="Write a comment..."
	minHeight="80px"
/>
