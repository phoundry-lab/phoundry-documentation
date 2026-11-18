<script lang="ts">
	import { NumberInput } from "phoundry-ui";

	let basic = $state(42);
</script>

<div class="flex items-center gap-4">
	<div class="flex flex-col items-start gap-1">
		<span class="text-[10px] text-txt-tertiary">vertical (default)</span>
		<NumberInput
			value={basic}
			onchange={(v: number) => {
				basic = v;
			}}
		/>
	</div>
	<div class="flex flex-col items-start gap-1">
		<span class="text-[10px] text-txt-tertiary">horizontal</span>
		<NumberInput
			value={basic}
			onchange={(v: number) => {
				basic = v;
			}}
			buttonLayout="horizontal"
		/>
	</div>
</div>
