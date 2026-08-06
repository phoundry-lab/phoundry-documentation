<script lang="ts">
	import type { Component } from 'svelte';
	import Example from '$lib/docs/ui/Example.svelte';
	import ColorPicker from '$phoundry/components/advanced/ColorPicker.svelte';

	let hexColor = $state('#3b82f6');
	let minimalColor = $state('#ef4444');
	let rgbFlow = $state('#22c55e');
	let hslFlow = $state('#a855f7');
	let smallPicker = $state('#f97316');
	let disabledPicker = $state('#64748b');
	let presetDemo = $state('#06b6d4');
	let managedPresets = $state([
		{ id: 'midnight', name: 'Midnight', value: '#0f172a' },
		{ id: 'slate', name: 'Slate', value: '#64748b' }
	]);

	type PickerPreset = { id: string; name: string; value: string };
	type ExpandedPickerProps = {
		value: string;
		onchange: (value: string) => void;
		format?: 'hex' | 'rgb' | 'hsl';
		showInput?: boolean;
		showChannelSummary?: boolean;
		showPresets?: boolean;
		presetColors?: PickerPreset[];
		recentColors?: string[];
		customColors?: {
			label: string;
			description?: string;
			colors: Array<{ id: string; name: string; value: string; onpick: () => void }>;
		};
		onpresetadd?: (value: string) => void;
		onpresetdelete?: (preset: PickerPreset) => void;
		disabled?: boolean;
		size?: 'sm' | 'md';
	};
	const ExpandedColorPicker = ColorPicker as unknown as Component<ExpandedPickerProps>;
	const themeColors = {
		label: 'Theme Colors',
		description: 'These colors match the active application theme.',
		colors: [
			{ id: 'theme-blue', name: 'Blue', value: 'var(--option-blue)', onpick: () => (presetDemo = 'var(--option-blue)') },
			{ id: 'theme-green', name: 'Green', value: 'var(--option-green)', onpick: () => (presetDemo = 'var(--option-green)') },
			{ id: 'theme-pink', name: 'Pink', value: 'var(--option-pink)', onpick: () => (presetDemo = 'var(--option-pink)') }
		]
	};

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

	const presetsCode = `<ColorPicker
  value={color}
  onchange={(next) => color = next}
  presetColors={presets}
  recentColors={recents}
  customColors={themeColors}
  onpresetadd={addPreset}
  onpresetdelete={deletePreset}
/>`;
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
		<ExpandedColorPicker
			value={presetDemo}
			onchange={(c: string) => {
				presetDemo = c;
			}}
			presetColors={managedPresets}
			recentColors={['#f97316', '#8b5cf6']}
			customColors={themeColors}
			onpresetadd={(value) => {
				managedPresets = [...managedPresets, { id: crypto.randomUUID(), name: value, value }];
			}}
			onpresetdelete={(preset) => {
				managedPresets = managedPresets.filter((item) => item.id !== preset.id);
			}}
		/>
	</Example>
</div>
