<script lang="ts">
	import Example from '$lib/docs/ui/Example.svelte';
	import Slider from '$phoundry/components/inputs/Slider.svelte';
	import type { SliderTick } from '$phoundry/components/inputs/Slider.svelte';

	let basic = $state(50);
	let withValue = $state(75);
	let tickValue = $state(14);
	let formatted = $state(0.5);
	let disabledSl = $state(40);
	let valueStart = $state(2);

	const fontTicks: SliderTick[] = [
		{ value: 10, label: '10px' },
		{ value: 12, label: '12px' },
		{ value: 14, label: '14px' },
		{ value: 16, label: '16px' },
		{ value: 18, label: '18px' },
		{ value: 20, label: '20px' }
	];

	const basicCode = `<Slider value={val} onchange={(v) => val = v} min={0} max={100} />`;

	const showValueCode = `<Slider value={val} onchange={(v) => val = v} min={0} max={100} showValue />`;

	const valueStartCode = `<Slider value={val} onchange={(v) => val = v} ticks={fontTicks} showValue valuePosition="start" />`;

	const ticksCode = `const fontTicks: SliderTick[] = [
  { value: 10, label: '10px' },
  { value: 12, label: '12px' },
  { value: 14, label: '14px' },
  { value: 16, label: '16px' },
  { value: 18, label: '18px' },
  { value: 20, label: '20px' },
];

<Slider value={val} onchange={(v) => val = v} ticks={fontTicks} showValue />`;

	const disabledCode = `<Slider value={v} onchange={set} disabled />`;

	const formatterCode = `<Slider
  value={opacity}
  onchange={(v) => opacity = v}
  min={0} max={1} step={0.01}
  showValue
  valueFormatter={(v) => \`\${Math.round(v * 100)}%\`}
/>`;
</script>

<div class="space-y-8">
	<Example title="Basic" code={basicCode}>
		<div class="flex items-center gap-3">
			<Slider value={basic} onchange={(v: number) => (basic = v)} min={0} max={100} class="w-64" />
			<span class="text-xs text-txt-tertiary">{basic}</span>
		</div>
	</Example>

	<Example title="With showValue" code={showValueCode}>
		<Slider value={withValue} onchange={(v: number) => (withValue = v)} min={0} max={100} showValue class="w-64" />
	</Example>

	<Example title="Value label on the left" code={valueStartCode}>
		<Slider
			value={valueStart}
			onchange={(v: number) => (valueStart = v)}
			ticks={fontTicks}
			showValue
			valuePosition="start"
			class="w-64"
		/>
	</Example>

	<Example title="With ticks" code={ticksCode}>
		<Slider value={tickValue} onchange={(v: number) => (tickValue = v)} ticks={fontTicks} showValue class="w-64" />
	</Example>

	<Example title="Disabled" code={disabledCode}>
		<Slider value={disabledSl} onchange={(v: number) => (disabledSl = v)} min={0} max={100} disabled showValue class="w-64" />
	</Example>

	<Example title="Custom formatter" code={formatterCode}>
		<Slider value={formatted} onchange={(v: number) => (formatted = v)} min={0} max={1} step={0.01} showValue valueFormatter={(v) => `${Math.round(v * 100)}%`} class="w-64" />
	</Example>
</div>
