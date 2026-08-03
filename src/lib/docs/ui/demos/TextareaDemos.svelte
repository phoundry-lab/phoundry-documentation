<script lang="ts">
	import Example from '$lib/docs/ui/Example.svelte';
	import Textarea from '$phoundry/components/inputs/Textarea.svelte';

	let basic = $state('');
	let autoResize = $state('Type here and watch the textarea grow as you add more lines...');
	let small = $state('');
	let medium = $state('');
	let large = $state('');
	let noneResize = $state('');
	let fillDemo = $state('');
	let ghostDemo = $state('');
	let outlineDemo = $state('');
	let disabledTa = $state('Disabled body');

	const basicCode = `<Textarea value={text} oninput={(v) => text = v} placeholder="Write something..." />`;

	const autoCode = `<Textarea
  value={text}
  oninput={(v) => text = v}
  resize="auto"
  rows={2}
/>`;

	const sizesCode = `<Textarea value={sm} oninput={(v) => sm = v} placeholder="Small" size="sm" rows={2} />
<Textarea value={md} oninput={(v) => md = v} placeholder="Medium" size="md" rows={2} />
<Textarea value={lg} oninput={(v) => lg = v} placeholder="Large" size="lg" rows={2} />`;

	const variantsTaCode = `<Textarea variant="outline" … />
<Textarea variant="fill" … />
<Textarea variant="ghost" … />`;

	const resizeNoneCode = `<Textarea resize="none" rows={4} … />`;
</script>

<div class="space-y-8">
	<Example title="Basic" code={basicCode}>
		<div class="max-w-md">
			<Textarea
				value={basic}
				oninput={(v: string) => {
					basic = v;
				}}
				placeholder="Write something..."
			/>
		</div>
		<p class="mt-2 text-xs text-txt-tertiary">Length: {basic.length}</p>
	</Example>

	<Example title="Auto-resize" code={autoCode}>
		<div class="max-w-md">
			<Textarea
				value={autoResize}
				oninput={(v: string) => {
					autoResize = v;
				}}
				resize="auto"
				rows={2}
			/>
		</div>
	</Example>

	<Example title="Sizes" code={sizesCode}>
		<div class="flex max-w-md flex-col gap-3">
			<Textarea
				value={small}
				oninput={(v: string) => {
					small = v;
				}}
				placeholder="Small"
				size="sm"
				rows={2}
			/>
			<Textarea
				value={medium}
				oninput={(v: string) => {
					medium = v;
				}}
				placeholder="Medium"
				size="md"
				rows={2}
			/>
			<Textarea
				value={large}
				oninput={(v: string) => {
					large = v;
				}}
				placeholder="Large"
				size="lg"
				rows={2}
			/>
		</div>
	</Example>

	<Example title="Variants" code={variantsTaCode}>
		<div class="flex max-w-md flex-col gap-3">
			<Textarea value={outlineDemo} oninput={(v: string) => (outlineDemo = v)} variant="outline" placeholder="outline" rows={2} />
			<Textarea value={fillDemo} oninput={(v: string) => (fillDemo = v)} variant="fill" placeholder="fill" rows={2} />
			<Textarea value={ghostDemo} oninput={(v: string) => (ghostDemo = v)} variant="ghost" placeholder="ghost" rows={2} />
		</div>
	</Example>

	<Example title="Resize none & disabled" code={resizeNoneCode}>
		<div class="flex max-w-md flex-col gap-3">
			<Textarea value={noneResize} oninput={(v: string) => (noneResize = v)} resize="none" rows={4} placeholder="Fixed height - no manual resize" />
			<Textarea value={disabledTa} oninput={(v: string) => (disabledTa = v)} disabled rows={3} />
		</div>
	</Example>
</div>
