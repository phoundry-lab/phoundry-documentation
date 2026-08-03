<script lang="ts">
	import Example from '$lib/docs/ui/Example.svelte';
	import NumberInput from '$phoundry/components/inputs/NumberInput.svelte';

	let basic = $state(42);
	let bounded = $state(5);
	let stepped = $state(0);
	let sizeSm = $state(10);
	let sizeMd = $state(10);
	let disabledDemo = $state(3);

	const basicCode = `<NumberInput value={qty} onchange={(v) => qty = v} />`;

	const minMaxCode = `<NumberInput value={qty} onchange={(v) => qty = v} min={0} max={10} />`;

	const stepCode = `<NumberInput value={price} onchange={(v) => price = v} step={0.25} min={0} />`;

	const sizesCode = `<NumberInput value={v} onchange={set} size="sm" />
<NumberInput value={v} onchange={set} size="md" />`;

	const layoutCode = `<NumberInput value={v} onchange={set} /> <!-- vertical (default) -->
<NumberInput value={v} onchange={set} buttonLayout="horizontal" />`;

	const disabledCode = `<NumberInput value={qty} onchange={set} disabled />`;
</script>

<div class="space-y-8">
	<Example title="Basic" code={basicCode}>
		<div class="flex items-center gap-4">
			<NumberInput
				value={basic}
				onchange={(v: number) => {
					basic = v;
				}}
			/>
			<span class="text-xs text-txt-tertiary">Value: {basic}</span>
		</div>
	</Example>

	<Example title="With Min / Max" code={minMaxCode}>
		<div class="flex items-center gap-4">
			<NumberInput
				value={bounded}
				onchange={(v: number) => {
					bounded = v;
				}}
				min={0}
				max={10}
			/>
			<span class="text-xs text-txt-tertiary">Clamped 0–10: {bounded}</span>
		</div>
	</Example>

	<Example title="Custom Step" code={stepCode}>
		<div class="flex items-center gap-4">
			<NumberInput
				value={stepped}
				onchange={(v: number) => {
					stepped = v;
				}}
				step={0.25}
				min={0}
				width="w-28"
			/>
			<span class="text-xs text-txt-tertiary">Step 0.25: {stepped}</span>
		</div>
	</Example>

	<Example title="Sizes" code={sizesCode}>
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
		</div>
	</Example>

	<Example title="Disabled" code={disabledCode}>
		<p class="mb-2 text-xs text-txt-secondary">Steppers are inert and the field does not accept edits.</p>
		<NumberInput value={disabledDemo} onchange={(v: number) => (disabledDemo = v)} disabled />
	</Example>

	<Example title="Button Layout" code={layoutCode}>
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
	</Example>
</div>
