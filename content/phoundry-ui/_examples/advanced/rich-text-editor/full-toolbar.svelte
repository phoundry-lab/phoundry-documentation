<script lang="ts">
	import { RichTextEditor } from "phoundry-ui";

	let fullContent = $state("<p>Start editing here...</p>");

	const fullToolbar = [
		"bold",
		"italic",
		"underline",
		"strikethrough",
		"code",
		"heading",
		"bulletList",
		"numberedList",
		"blockquote",
		"link",
		"horizontalRule",
		"clearFormatting",
	] as const;
</script>

<RichTextEditor
	value={fullContent}
	onchange={(html: string) => {
		fullContent = html;
	}}
	toolbar={[...fullToolbar]}
/>
