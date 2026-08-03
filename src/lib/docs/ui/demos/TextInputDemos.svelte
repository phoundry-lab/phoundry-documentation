<script lang="ts">
	import Example from '$lib/docs/ui/Example.svelte';
	import TextInput from '$phoundry/components/inputs/TextInput.svelte';
	import { PhiIcons } from '$phoundry/icons.js';

	let basic = $state('');
	let withIcon = $state('');
	let extraSmall = $state('');
	let small = $state('');
	let medium = $state('');
	let large = $state('');
	let readOnlyDemo = $state('Read-only value');
	let disabledDemo = $state('Disabled');
	let password = $state('');
	let search = $state('');
	let outline = $state('');
	let fill = $state('');
	let ghost = $state('');
	let email = $state('');
	let prefixOnly = $state('');
	let prefixWithIcon = $state('');
	let prefixBgDemo = $state('');
	let suffixOnly = $state('');
	let suffixBgDemo = $state('');
	let clearablePlain = $state('hello');
	let clearableWithIcon = $state('phoundry');

	const basicCode = `<TextInput value={name} oninput={(v) => name = v} placeholder="Your name" />`;

	const iconCode = `<TextInput
  value={query}
  oninput={(v) => query = v}
  placeholder="Search..."
  icon={PhiIcons.search}
/>`;

	const sizesCode = `<TextInput value={xs} oninput={(v) => xs = v} placeholder="Extra small" size="xs" clearable />
<TextInput value={sm} oninput={(v) => sm = v} placeholder="Small" size="sm" clearable />
<TextInput value={md} oninput={(v) => md = v} placeholder="Medium" size="md" clearable />
<TextInput value={lg} oninput={(v) => lg = v} placeholder="Large" size="lg" clearable />`;

	const stateCode = `<TextInput value={v} oninput={set} readonly />
<TextInput value={v} oninput={set} disabled />`;

	const typesCode = `<TextInput type="password" value={pw} oninput={(v) => pw = v} placeholder="Password" />
<TextInput type="search" value={q} oninput={(v) => q = v} placeholder="Search..." icon={PhiIcons.search} />`;

	const variantsCode = `<TextInput variant="outline" placeholder="Outline (default)" />
<TextInput variant="fill" placeholder="Fill" />
<TextInput variant="ghost" placeholder="Ghost" />`;

	const autocompleteCode = `<TextInput
  type="email"
  autocomplete="email"
  placeholder="Email address"
/>`;

	const clearableCode = `<TextInput
  value={text}
  oninput={(v) => text = v}
  placeholder="Type something..."
  clearable
/>
<TextInput
  value={query}
  oninput={(v) => query = v}
  icon={PhiIcons.search}
  placeholder="Search..."
  clearable
/>`;

	const suffixCode = `<TextInput value={name} oninput={(v) => name = v} suffix=".md" placeholder="notes" />
<TextInput value={name} oninput={(v) => name = v} suffix=".md" suffixBg placeholder="notes" />`;

	const prefixCode = `<TextInput value={amount} oninput={(v) => amount = v} prefix="$" placeholder="0.00" />
<TextInput
  value={id}
  oninput={(v) => id = v}
  icon={PhiIcons.search}
  prefix="#"
  placeholder="lookup"
/>
<TextInput
  value={total}
  oninput={(v) => total = v}
  icon={PhiIcons.search}
  prefix="USD"
  prefixBg
  placeholder="0.00"
/>`;
</script>

<div class="space-y-8">
	<Example title="Basic" code={basicCode}>
		<div class="max-w-sm">
			<TextInput
				value={basic}
				oninput={(v: string) => {
					basic = v;
				}}
				placeholder="Your name"
			/>
		</div>
		<p class="mt-2 text-xs text-txt-tertiary">Value: {basic || '(empty)'}</p>
	</Example>

	<Example title="With Icon" code={iconCode}>
		<div class="max-w-sm">
			<TextInput
				value={withIcon}
				oninput={(v: string) => {
					withIcon = v;
				}}
				placeholder="Search..."
				icon={PhiIcons.search}
			/>
		</div>
	</Example>

	<Example title="Clearable" code={clearableCode}>
		<div class="flex max-w-sm flex-col gap-3">
			<TextInput
				value={clearablePlain}
				oninput={(v: string) => {
					clearablePlain = v;
				}}
				placeholder="Type something..."
				clearable
			/>
			<TextInput
				value={clearableWithIcon}
				oninput={(v: string) => {
					clearableWithIcon = v;
				}}
				icon={PhiIcons.search}
				placeholder="Search..."
				clearable
			/>
		</div>
		<p class="mt-2 text-xs text-txt-tertiary">The clear button appears only when the input has a value.</p>
	</Example>

	<Example title="Suffix" code={suffixCode}>
		<div class="flex max-w-sm flex-col gap-3">
			<TextInput
				value={suffixOnly}
				oninput={(v: string) => {
					suffixOnly = v;
				}}
				suffix=".md"
				placeholder="notes"
			/>
			<TextInput
				value={suffixBgDemo}
				oninput={(v: string) => {
					suffixBgDemo = v;
				}}
				suffix=".md"
				suffixBg
				placeholder="notes"
			/>
		</div>
	</Example>

	<Example title="Prefix" code={prefixCode}>
		<div class="flex max-w-sm flex-col gap-3">
			<TextInput
				value={prefixOnly}
				oninput={(v: string) => {
					prefixOnly = v;
				}}
				prefix="$"
				placeholder="0.00"
			/>
			<TextInput
				value={prefixWithIcon}
				oninput={(v: string) => {
					prefixWithIcon = v;
				}}
				icon={PhiIcons.search}
				prefix="#"
				placeholder="lookup"
			/>
			<TextInput
				value={prefixBgDemo}
				oninput={(v: string) => {
					prefixBgDemo = v;
				}}
				icon={PhiIcons.search}
				prefix="USD"
				prefixBg
				placeholder="0.00"
			/>
		</div>
	</Example>

	<Example title="Sizes" code={sizesCode}>
		<div class="flex max-w-sm flex-col gap-3">
			<TextInput
				value={extraSmall}
				oninput={(v: string) => {
					extraSmall = v;
				}}
				placeholder="Extra small (16px)"
				size="xs"
				clearable
			/>
			<TextInput
				value={small}
				oninput={(v: string) => {
					small = v;
				}}
				placeholder="Small"
				size="sm"
				clearable
			/>
			<TextInput
				value={medium}
				oninput={(v: string) => {
					medium = v;
				}}
				placeholder="Medium"
				size="md"
				clearable
			/>
			<TextInput
				value={large}
				oninput={(v: string) => {
					large = v;
				}}
				placeholder="Large"
				size="lg"
				clearable
			/>
		</div>
	</Example>

	<Example title="Read-only & disabled" code={stateCode}>
		<div class="flex max-w-sm flex-col gap-3">
			<TextInput value={readOnlyDemo} oninput={(v: string) => (readOnlyDemo = v)} readonly placeholder="Cannot edit" />
			<TextInput value={disabledDemo} oninput={(v: string) => (disabledDemo = v)} disabled />
		</div>
	</Example>

	<Example title="Types (password, search)" code={typesCode}>
		<div class="flex max-w-sm flex-col gap-3">
			<TextInput
				type="password"
				value={password}
				oninput={(v: string) => {
					password = v;
				}}
				placeholder="Password"
			/>
			<TextInput
				type="search"
				value={search}
				oninput={(v: string) => {
					search = v;
				}}
				placeholder="Search..."
				icon={PhiIcons.search}
			/>
		</div>
	</Example>

	<Example title="Variants" code={variantsCode}>
		<div class="flex max-w-sm flex-col gap-3">
			<TextInput
				variant="outline"
				value={outline}
				oninput={(v: string) => {
					outline = v;
				}}
				placeholder="Outline (default)"
			/>
			<TextInput
				variant="fill"
				value={fill}
				oninput={(v: string) => {
					fill = v;
				}}
				placeholder="Fill"
			/>
			<TextInput
				variant="ghost"
				value={ghost}
				oninput={(v: string) => {
					ghost = v;
				}}
				placeholder="Ghost"
			/>
		</div>
	</Example>

	<Example title="Autocomplete" code={autocompleteCode}>
		<div class="flex max-w-sm flex-col gap-3">
			<TextInput
				type="email"
				value={email}
				oninput={(v: string) => {
					email = v;
				}}
				autocomplete="email"
				placeholder="Email address"
			/>
			<p class="text-xs text-txt-tertiary">Browser may suggest saved email addresses</p>
		</div>
	</Example>
</div>
