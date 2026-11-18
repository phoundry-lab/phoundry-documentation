<script lang="ts">
	import { RichTextEditor } from "phoundry-ui";

	let disabledContent = $state("<p>Read-only body</p>");
</script>

<p class="mb-2 text-xs text-txt-secondary">
	Toolbar actions no-op; the surface is not editable.
</p>
<RichTextEditor
	value={disabledContent}
	onchange={(html: string) => (disabledContent = html)}
	disabled
	minHeight="72px"
/>
