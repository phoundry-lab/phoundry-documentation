<script lang="ts">
	import Example from '$lib/docs/ui/Example.svelte';
	import Select from '$phoundry/components/inputs/Select.svelte';
	import type { SelectOption, SelectOptionGroup } from '$phoundry/components/inputs/Select.svelte';
	import Separator from '$phoundry/components/display/Separator.svelte';
	import Badge from '$phoundry/components/display/Badge.svelte';
	import TextInput from '$phoundry/components/inputs/TextInput.svelte';

	const plainOptions: SelectOption[] = [
		{ value: 'apple', label: 'Apple' },
		{ value: 'banana', label: 'Banana' },
		{ value: 'cherry', label: 'Cherry' },
		{ value: 'dragonfruit', label: 'Dragonfruit' }
	];

	const iconOptions: SelectOption[] = [
		{ value: 'svelte', label: 'Svelte', icon: 'logos:svelte-icon' },
		{ value: 'react', label: 'React', icon: 'logos:react' },
		{ value: 'vue', label: 'Vue', icon: 'logos:vue' },
		{ value: 'angular', label: 'Angular', icon: 'logos:angular-icon' }
	];

	const descOptions: SelectOption[] = [
		{ value: 'sm', label: 'Small', description: '640px max width' },
		{ value: 'md', label: 'Medium', description: '768px max width' },
		{ value: 'lg', label: 'Large', description: '1024px max width' },
		{ value: 'xl', label: 'Extra Large', description: '1280px max width' }
	];

	const groupedOptions: (SelectOption | SelectOptionGroup)[] = [
		{
			label: 'Frontend',
			options: [
				{ value: 'svelte', label: 'Svelte' },
				{ value: 'react', label: 'React' },
				{ value: 'vue', label: 'Vue' }
			]
		},
		{
			label: 'Backend',
			options: [
				{ value: 'rust', label: 'Rust' },
				{ value: 'go', label: 'Go' },
				{ value: 'python', label: 'Python' }
			]
		}
	];

	let basic = $state<string | undefined>('apple');
	let outline = $state<string | undefined>(undefined);
	let minimal = $state<string | undefined>(undefined);
	let filled = $state<string | undefined>(undefined);
	let sm = $state<string | undefined>(undefined);
	let shrinkVal = $state<string | undefined>('cherry');
	let clearable = $state<string | undefined>('cherry');
	let disabledVal = $state<string | undefined>('apple');
	let errorVal = $state<string | undefined>(undefined);
	let iconVal = $state<string | undefined>(undefined);
	let descVal = $state<string | undefined>(undefined);
	let groupedVal = $state<string | undefined>(undefined);
	let snippetVal = $state<string | undefined>(undefined);
	let indicatorVal = $state<string | undefined>('apple');
	let customStatusText = $state('');

	const statusBadgeColors: Record<string, 'green' | 'yellow' | 'red' | 'gray'> = {
		online: 'green',
		away: 'yellow',
		busy: 'red',
		offline: 'gray'
	};

	const snippetOptions: SelectOption[] = [
		{ value: 'online', label: 'Online' },
		{ value: 'away', label: 'Away' },
		{ value: 'busy', label: 'Busy' },
		{ value: 'offline', label: 'Offline' }
	];

	const basicCode = `const options = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
];

<Select options={options} value={selected} onchange={(v) => selected = v} />`;

	const variantsCode = `<Select options={opts} value={v} onchange={set} variant="outline" />
<Select options={opts} value={v} onchange={set} variant="ghost" />
<Select options={opts} value={v} onchange={set} variant="filled" />`;

	const sizesCode = `<Select options={opts} value={v} onchange={set} size="sm" />
<Select options={opts} value={v} onchange={set} size="md" />`;

	const shrinkCode = `<Select options={opts} value={v} onchange={set} shrink />`;

	const clearableCode = `<Select options={opts} value={v} onchange={set} clearable />`;

	const disabledCode = `<Select options={opts} value={v} onchange={set} disabled />`;

	const errorCode = `<Select options={opts} value={v} onchange={set} invalid error="Selection required" />`;

	const indicatorCode = `<Select
  options={opts}
  value={v}
  onchange={set}
  selectedIndicator="check"
/>`;

	const iconCode = `const options = [
  { value: 'svelte', label: 'Svelte', icon: 'logos:svelte-icon' },
  { value: 'react', label: 'React', icon: 'logos:react' },
  { value: 'vue', label: 'Vue', icon: 'logos:vue' },
];

<Select options={options} value={v} onchange={set} />`;

	const descCode = `const options = [
  { value: 'sm', label: 'Small', description: '640px max width' },
  { value: 'md', label: 'Medium', description: '768px max width' },
  { value: 'lg', label: 'Large', description: '1024px max width' },
];

<Select options={options} value={v} onchange={set} />`;

	const groupsCode = `const options = [
  {
    label: 'Frontend',
    options: [
      { value: 'svelte', label: 'Svelte' },
      { value: 'react', label: 'React' },
    ],
  },
  {
    label: 'Backend',
    options: [
      { value: 'rust', label: 'Rust' },
      { value: 'go', label: 'Go' },
    ],
  },
];

<Select options={options} value={v} onchange={set} />`;

	const customCode = `import { Badge } from 'phoundry-ui';

{#snippet statusRow({ option, selected })}
  <span class="flex items-center gap-2 flex-1 min-w-0">
    <Badge color={colors[option.value]} dot />
    <span class="text-xs truncate">{option.label}</span>
  </span>
{/snippet}

{#snippet customInput()}
  <TextInput
    value={customStatusText}
    oninput={(v) => customStatusText = v}
    placeholder="Custom status..."
    size="sm"
    variant="fill"
  />
{/snippet}

const options = [
  { value: 'online', label: 'Online', custom: { snippet: statusRow } },
  { value: 'away', label: 'Away', custom: { snippet: statusRow } },
  { value: 'busy', label: 'Busy', custom: { snippet: statusRow } },
  // Non-selectable row with interactive content
  { value: '', label: '', custom: { snippet: customInput, selectable: false } },
];

<Select options={options} value={v} onchange={set} />`;
</script>

{#snippet statusRow({ option, selected }: { option: SelectOption; selected: boolean })}
	<span class="flex min-w-0 flex-1 items-center gap-2">
		<Badge color={statusBadgeColors[option.value]} dot />
		<span class="truncate text-xs" class:font-medium={selected}>{option.label}</span>
	</span>
{/snippet}

{#snippet customInputRow()}
	<TextInput value={customStatusText} oninput={(v: string) => (customStatusText = v)} placeholder="Custom status..." size="sm" variant="fill" />
{/snippet}

<div class="space-y-8">
	<h2 class="!mb-0 text-base font-semibold text-txt-primary">Control</h2>
	<p class="!mt-1 text-xs text-txt-secondary">Props that affect the trigger button appearance and behavior.</p>

	<Example title="Basic" code={basicCode}>
		<div class="max-w-xs">
			<Select
				options={plainOptions}
				value={basic}
				onchange={(v: string | undefined) => {
					basic = v;
				}}
				placeholder="Pick a fruit..."
			/>
		</div>
		<p class="mt-2 text-xs text-txt-tertiary">Selected: {basic ?? 'none'}</p>
	</Example>

	<Example title="Variants" code={variantsCode}>
		<div class="flex flex-wrap items-start gap-3">
			<div class="w-44">
				<span class="mb-1 block text-[10px] text-txt-tertiary">outline</span>
				<Select
					options={plainOptions}
					value={outline}
					onchange={(v: string | undefined) => {
						outline = v;
					}}
					variant="outline"
					placeholder="Outline..."
				/>
			</div>
			<div class="w-44">
				<span class="mb-1 block text-[10px] text-txt-tertiary">ghost (minimal)</span>
				<Select
					options={plainOptions}
					value={minimal}
					onchange={(v: string | undefined) => {
						minimal = v;
					}}
					variant="ghost"
					placeholder="Ghost..."
				/>
			</div>
			<div class="w-44">
				<span class="mb-1 block text-[10px] text-txt-tertiary">filled (default)</span>
				<Select
					options={plainOptions}
					value={filled}
					onchange={(v: string | undefined) => {
						filled = v;
					}}
					variant="filled"
					placeholder="Filled..."
				/>
			</div>
		</div>
	</Example>

	<Example title="Sizes" code={sizesCode}>
		<div class="flex flex-wrap items-end gap-3">
			<div class="w-44">
				<span class="mb-1 block text-[10px] text-txt-tertiary">sm</span>
				<Select
					options={plainOptions}
					value={sm}
					onchange={(v: string | undefined) => {
						sm = v;
					}}
					size="sm"
					placeholder="Small..."
				/>
			</div>
			<div class="w-44">
				<span class="mb-1 block text-[10px] text-txt-tertiary">md (default)</span>
				<Select
					options={plainOptions}
					value={basic}
					onchange={(v: string | undefined) => {
						basic = v;
					}}
					size="md"
					placeholder="Medium..."
				/>
			</div>
		</div>
	</Example>

	<Example title="Shrink" code={shrinkCode}>
		<p class="mb-2 text-xs text-txt-secondary">Fits the trigger width to its content instead of stretching full-width.</p>
		<Select
			options={plainOptions}
			value={shrinkVal}
			onchange={(v: string | undefined) => {
				shrinkVal = v;
			}}
			shrink
		/>
	</Example>

	<Example title="Clearable" code={clearableCode}>
		<div class="max-w-xs">
			<Select
				options={plainOptions}
				value={clearable}
				onchange={(v: string | undefined) => {
					clearable = v;
				}}
				clearable
				placeholder="Pick or clear..."
			/>
		</div>
	</Example>

	<Example title="Disabled" code={disabledCode}>
		<div class="max-w-xs">
			<Select
				options={plainOptions}
				value={disabledVal}
				onchange={(v: string | undefined) => {
					disabledVal = v;
				}}
				disabled
			/>
		</div>
	</Example>

	<Example title="Validation" code={errorCode}>
		<div class="max-w-xs">
			<Select
				options={plainOptions}
				value={errorVal}
				onchange={(v: string | undefined) => {
					errorVal = v;
				}}
				invalid
				error="Selection required"
				placeholder="Required field..."
			/>
		</div>
	</Example>

	<Example title="Selected indicator" code={indicatorCode}>
		<p class="mb-2 text-xs text-txt-secondary">
			<code>selectedIndicator="check"</code> shows a checkmark instead of tinting the active row (helpful when accent-on-background is too strong).
		</p>
		<div class="max-w-xs">
			<Select
				options={plainOptions}
				value={indicatorVal}
				onchange={(v: string | undefined) => {
					indicatorVal = v;
				}}
				selectedIndicator="check"
				placeholder="Pick…"
			/>
		</div>
	</Example>

	<Separator />

	<h2 class="!mb-0 text-base font-semibold text-txt-primary">Dropdown</h2>
	<p class="!mt-1 text-xs text-txt-secondary">Options support icons, descriptions, and groups for richer dropdowns.</p>

	<Example title="With Icons" code={iconCode}>
		<div class="max-w-xs">
			<Select
				options={iconOptions}
				value={iconVal}
				onchange={(v: string | undefined) => {
					iconVal = v;
				}}
				placeholder="Pick a framework..."
			/>
		</div>
		<p class="mt-2 text-xs text-txt-tertiary">Selected: {iconVal ?? 'none'}</p>
	</Example>

	<Example title="With Descriptions" code={descCode}>
		<div class="max-w-xs">
			<Select
				options={descOptions}
				value={descVal}
				onchange={(v: string | undefined) => {
					descVal = v;
				}}
				placeholder="Pick a breakpoint..."
			/>
		</div>
		<p class="mt-2 text-xs text-txt-tertiary">Selected: {descVal ?? 'none'}</p>
	</Example>

	<Example title="Grouped Options" code={groupsCode}>
		<div class="max-w-xs">
			<Select
				options={groupedOptions}
				value={groupedVal}
				onchange={(v: string | undefined) => {
					groupedVal = v;
				}}
				placeholder="Pick a language..."
			/>
		</div>
		<p class="mt-2 text-xs text-txt-tertiary">Selected: {groupedVal ?? 'none'}</p>
	</Example>

	<Example title="Custom Snippet" code={customCode}>
		<p class="mb-2 text-xs text-txt-secondary">
			Pass a <code>custom</code> object with a <code>snippet</code> for fully custom rendering in both the dropdown and the trigger. Set <code>selectable: false</code> to embed interactive
			content that doesn't trigger selection.
		</p>
		<div class="max-w-xs">
			<Select
				options={[...snippetOptions.map((o) => ({ ...o, custom: { snippet: statusRow } })), { value: '', label: '', custom: { snippet: customInputRow, selectable: false } }]}
				value={snippetVal}
				onchange={(v: string | undefined) => {
					snippetVal = v;
				}}
				placeholder="Set status..."
			/>
		</div>
		<p class="mt-2 text-xs text-txt-tertiary">Selected: {snippetVal ?? 'none'}</p>
	</Example>
</div>
