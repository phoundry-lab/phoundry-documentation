<script lang="ts">
	import Example from '$lib/docs/ui/Example.svelte';
	import ColorPicker from '$phoundry/components/advanced/ColorPicker.svelte';

	let hexColor = $state('#3b82f6');
	let minimalColor = $state('#ef4444');
	let rgbFlow = $state('#22c55e');
	let hslFlow = $state('#a855f7');
	let smallPicker = $state('#f97316');
	let disabledPicker = $state('#64748b');
	let presetDemo = $state('#06b6d4');

	const brandPresets = ['#0f172a', '#1e293b', '#334155', '#64748b', '#94a3b8'];

	const basicCode = `let color = $state('#3b82f6');

<ColorPicker value={color} onchange={(c) => color = c} />`;

	const minimalCode = `<ColorPicker
  value={color}
  onchange={(c) => color = c}
  showInput={false}
  showPresets={false}
/>`;

	const formatCode = `<ColorPicker value={c} onchange={(v) => (c = v)} format="rgb" />
<ColorPicker value={c} onchange={(v) => (c = v)} format="hsl" />`;

	const compactCode = `<ColorPicker value={c} onchange={...} size="sm" />
<ColorPicker value={c} onchange={() => {}} disabled />`;

	const presetsCode = `<ColorPicker value={c} onchange={...} presets={brandPresets} />`;
</script>

<div class="max-w-3xl space-y-8">
	<Example title="Basic (Hex)" code={basicCode}>
		<ColorPicker
			value={hexColor}
			onchange={(c: string) => {
				hexColor = c;
			}}
		/>
		<p class="mt-2 text-xs text-txt-tertiary">Value: {hexColor}</p>
	</Example>

	<Example title="Without Input & Presets" code={minimalCode}>
		<ColorPicker
			value={minimalColor}
			onchange={(c: string) => {
				minimalColor = c;
			}}
			showInput={false}
			showPresets={false}
		/>
		<p class="mt-2 text-xs text-txt-tertiary">Value: {minimalColor}</p>
	</Example>

	<Example title="Input field format (hex | rgb | hsl)" code={formatCode}>
		<p class="mb-2 text-xs text-txt-secondary">
			<code>format</code> switches the editable text representation and accepted manual syntax.
			<code>onchange</code> still passes a hex string for consistent storage - convert locally if you need CSS <code>rgb()</code>/<code>hsl()</code>.
		</p>
		<div class="flex flex-col gap-4 sm:flex-row">
			<div class="flex-1">
				<p class="mb-1 text-[11px] font-medium text-txt-secondary">RGB</p>
				<ColorPicker
					value={rgbFlow}
					onchange={(c: string) => {
						rgbFlow = c;
					}}
					format="rgb"
				/>
				<p class="mt-1 text-[11px] text-txt-tertiary">state: {rgbFlow}</p>
			</div>
			<div class="flex-1">
				<p class="mb-1 text-[11px] font-medium text-txt-secondary">HSL</p>
				<ColorPicker
					value={hslFlow}
					onchange={(c: string) => {
						hslFlow = c;
					}}
					format="hsl"
				/>
				<p class="mt-1 text-[11px] text-txt-tertiary">state: {hslFlow}</p>
			</div>
		</div>
	</Example>

	<Example title="Compact & disabled" code={compactCode}>
		<div class="flex flex-wrap items-start gap-6">
			<div>
				<p class="mb-1 text-[11px] font-medium text-txt-secondary">size=&quot;sm&quot;</p>
				<ColorPicker
					value={smallPicker}
					onchange={(c: string) => {
						smallPicker = c;
					}}
					size="sm"
				/>
			</div>
			<div>
				<p class="mb-1 text-[11px] font-medium text-txt-secondary">disabled</p>
				<ColorPicker value={disabledPicker} onchange={() => {}} disabled />
			</div>
		</div>
	</Example>

	<Example title="Custom presets" code={presetsCode}>
		<ColorPicker
			value={presetDemo}
			onchange={(c: string) => {
				presetDemo = c;
			}}
			presets={brandPresets}
		/>
	</Example>
</div>
