<script lang="ts">
	import { TextInput } from "phoundry-ui";

	let readOnlyDemo = $state("Read-only value");

	let disabledDemo = $state("Disabled");
</script>

<div class="flex max-w-sm flex-col gap-3">
	<TextInput
		value={readOnlyDemo}
		oninput={(v: string) => (readOnlyDemo = v)}
		readonly
		placeholder="Cannot edit"
	/>
	<TextInput
		value={disabledDemo}
		oninput={(v: string) => (disabledDemo = v)}
		disabled
	/>
</div>
