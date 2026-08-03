<script lang="ts">
	import Example from '$lib/docs/ui/Example.svelte';
	import RadioGroup from '$phoundry/components/inputs/RadioGroup.svelte';
	import type { RadioOption } from '$phoundry/components/inputs/RadioGroup.svelte';

	let basicValue = $state('option1');
	let horizValue = $state('sm');
	let descValue = $state('pro');
	let disabledValue = $state('a');
	let sizeDemo = $state('sm');
	let groupDisabledVal = $state('x');

	const basicOptions: RadioOption[] = [
		{ value: 'option1', label: 'Option 1' },
		{ value: 'option2', label: 'Option 2' },
		{ value: 'option3', label: 'Option 3' }
	];

	const horizOptions: RadioOption[] = [
		{ value: 'sm', label: 'Small' },
		{ value: 'md', label: 'Medium' },
		{ value: 'lg', label: 'Large' }
	];

	const descOptions: RadioOption[] = [
		{ value: 'free', label: 'Free', description: 'Basic features for personal use' },
		{ value: 'pro', label: 'Pro', description: 'Advanced features and priority support' },
		{ value: 'enterprise', label: 'Enterprise', description: 'Custom solutions for large teams' }
	];

	const disabledOptions: RadioOption[] = [
		{ value: 'a', label: 'Available' },
		{ value: 'b', label: 'Also available' },
		{ value: 'c', label: 'Unavailable', disabled: true }
	];

	const sizeOptions: RadioOption[] = [
		{ value: 'sm', label: 'Small' },
		{ value: 'md', label: 'Medium' }
	];

	const groupDisabledOptions: RadioOption[] = [
		{ value: 'x', label: 'One' },
		{ value: 'y', label: 'Two' }
	];

	const basicCode = `const options: RadioOption[] = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
];

<RadioGroup {options} value={selected} onchange={(v) => selected = v} />`;

	const horizontalCode = `<RadioGroup options={sizes} value={size} onchange={(v) => size = v} orientation="horizontal" />`;

	const descriptionsCode = `const plans: RadioOption[] = [
  { value: 'free', label: 'Free', description: 'Basic features for personal use' },
  { value: 'pro', label: 'Pro', description: 'Advanced features and priority support' },
  { value: 'enterprise', label: 'Enterprise', description: 'Custom solutions for large teams' },
];

<RadioGroup options={plans} value={plan} onchange={(v) => plan = v} />`;

	const disabledOptionCode = `const options: RadioOption[] = [
  { value: 'a', label: 'Available' },
  { value: 'b', label: 'Also available' },
  { value: 'c', label: 'Unavailable', disabled: true },
];

<RadioGroup {options} value={val} onchange={(v) => val = v} />`;

	const sizesCode = `<RadioGroup options={opts} value={v} onchange={set} size="md" />`;

	const groupDisabledCode = `<RadioGroup options={opts} value={v} onchange={set} disabled />`;
</script>

<div class="space-y-8">
	<Example title="Basic vertical" code={basicCode}>
		<div class="flex items-start gap-6">
			<RadioGroup options={basicOptions} value={basicValue} onchange={(v: string) => (basicValue = v)} />
			<span class="text-xs text-txt-tertiary">Selected: <strong class="text-txt-primary">{basicValue}</strong></span>
		</div>
	</Example>

	<Example title="Horizontal" code={horizontalCode}>
		<div class="flex items-center gap-6">
			<RadioGroup options={horizOptions} value={horizValue} onchange={(v: string) => (horizValue = v)} orientation="horizontal" />
			<span class="text-xs text-txt-tertiary">Selected: <strong class="text-txt-primary">{horizValue}</strong></span>
		</div>
	</Example>

	<Example title="With descriptions" code={descriptionsCode}>
		<RadioGroup options={descOptions} value={descValue} onchange={(v: string) => (descValue = v)} />
	</Example>

	<Example title="Disabled option" code={disabledOptionCode}>
		<RadioGroup options={disabledOptions} value={disabledValue} onchange={(v: string) => (disabledValue = v)} />
	</Example>

	<Example title="Sizes (sm / md)" code={sizesCode}>
		<div class="flex flex-wrap items-start gap-8">
			<div>
				<p class="mb-2 text-[10px] text-txt-tertiary">size=&quot;sm&quot; (default)</p>
				<RadioGroup options={sizeOptions} value={sizeDemo} onchange={(v: string) => (sizeDemo = v)} size="sm" />
			</div>
			<div>
				<p class="mb-2 text-[10px] text-txt-tertiary">size=&quot;md&quot;</p>
				<RadioGroup options={sizeOptions} value={sizeDemo} onchange={(v: string) => (sizeDemo = v)} size="md" />
			</div>
		</div>
	</Example>

	<Example title="Group disabled" code={groupDisabledCode}>
		<p class="mb-2 text-xs text-txt-secondary">Disables the entire radiogroup- Individual option <code>disabled</code> flags add finer control.</p>
		<RadioGroup options={groupDisabledOptions} value={groupDisabledVal} onchange={(v: string) => (groupDisabledVal = v)} disabled />
	</Example>
</div>
