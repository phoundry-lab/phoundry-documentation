<script lang="ts">
	import { Textarea } from "phoundry-ui";

	let noneResize = $state("");

	let disabledTa = $state("Disabled body");
</script>

<div class="flex max-w-md flex-col gap-3">
	<Textarea
		value={noneResize}
		oninput={(v: string) => (noneResize = v)}
		resize="none"
		rows={4}
		placeholder="Fixed height - no manual resize"
	/>
	<Textarea
		value={disabledTa}
		oninput={(v: string) => (disabledTa = v)}
		disabled
		rows={3}
	/>
</div>
