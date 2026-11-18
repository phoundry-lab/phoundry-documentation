<script lang="ts">
	import { NumberInput } from "phoundry-ui";

	let sizeSm = $state(10);

	let sizeMd = $state(10);

	let sizeLg = $state(10);
</script>

<div class="flex items-center gap-4">
	<div class="flex flex-col items-start gap-1">
		<span class="text-[10px] text-txt-tertiary">sm</span>
		<NumberInput
			value={sizeSm}
			onchange={(v: number) => {
				sizeSm = v;
			}}
			size="sm"
		/>
	</div>
	<div class="flex flex-col items-start gap-1">
		<span class="text-[10px] text-txt-tertiary">md</span>
		<NumberInput
			value={sizeMd}
			onchange={(v: number) => {
				sizeMd = v;
			}}
			size="md"
		/>
	</div>
	<div class="flex flex-col items-start gap-1">
		<span class="text-[10px] text-txt-tertiary">lg</span>
		<NumberInput
			value={sizeLg}
			onchange={(v: number) => (sizeLg = v)}
			size="lg"
		/>
	</div>
</div>
