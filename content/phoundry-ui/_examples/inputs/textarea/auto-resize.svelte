<script lang="ts">
	import { Textarea } from "phoundry-ui";

	let autoResize = $state(
		"Type here and watch the textarea grow as you add more lines...",
	);
</script>

<div class="max-w-md">
	<Textarea
		value={autoResize}
		oninput={(v: string) => {
			autoResize = v;
		}}
		resize="auto"
		rows={2}
	/>
</div>
