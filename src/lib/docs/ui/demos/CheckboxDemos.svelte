<script lang="ts">
	import Example from '$lib/docs/ui/Example.svelte';
	import Checkbox from '$phoundry/components/inputs/Checkbox.svelte';

	let basic = $state(false);
	let withLabel = $state(false);
	let withDesc = $state(true);
	let indeterminate = $state(true);
	let disabledChecked = $state(true);
	let mdSize = $state(true);
	let agree = $state(false);

	const basicCode = `<Checkbox checked={value} onchange={() => value = !value} />`;

	const labelCode = `<Checkbox
  checked={value}
  onchange={() => value = !value}
  label="Accept terms and conditions"
  description="You agree to our privacy policy"
/>`;

	const indeterminateCode = `<Checkbox
  checked={false}
  indeterminate={indeterminate}
  onchange={() => indeterminate = false}
  label="Select all"
/>`;

	const sizesCode = `<Checkbox checked={v} onchange={...} size="sm" label="Small" />
<Checkbox checked={v} onchange={...} size="md" label="Medium" />`;

	const formCode = `<form method="post">
  <Checkbox checked={agree} onchange={...} name="terms" label="I agree" />
</form>`;

	const disabledCode = `<Checkbox checked={true} disabled label="Disabled (checked)" />
<Checkbox checked={false} disabled label="Disabled (unchecked)" />`;
</script>

<div class="space-y-8">
	<Example title="Basic toggle" code={basicCode}>
		<div class="flex items-center gap-3">
			<Checkbox checked={basic} onchange={() => (basic = !basic)} />
			<span class="text-xs text-txt-tertiary">{basic ? 'Checked' : 'Unchecked'}</span>
		</div>
	</Example>

	<Example title="With label and description" code={labelCode}>
		<div class="flex flex-col gap-3">
			<Checkbox checked={withLabel} onchange={() => (withLabel = !withLabel)} label="Enable notifications" />
			<Checkbox checked={withDesc} onchange={() => (withDesc = !withDesc)} label="Accept terms and conditions" description="You agree to our privacy policy" />
		</div>
	</Example>

	<Example title="Indeterminate state" code={indeterminateCode}>
		<Checkbox
			checked={false}
			{indeterminate}
			onchange={() => {
				indeterminate = false;
			}}
			label="Select all"
			description="Some items are selected"
		/>
	</Example>

	<Example title="Sizes" code={sizesCode}>
		<div class="flex flex-col gap-3">
			<Checkbox checked={mdSize} onchange={() => (mdSize = !mdSize)} size="sm" label="Small box" />
			<Checkbox checked={mdSize} onchange={() => (mdSize = !mdSize)} size="md" label="Medium box" />
		</div>
	</Example>

	<Example title="Form name (hidden input)" code={formCode}>
		<p class="mb-2 text-xs text-txt-secondary">
			With <code>name</code>, a hidden <code>&lt;input type="checkbox"&gt;</code> mirrors state for native submission. Keep <code>id</code> in sync with external labels if you do not use the built-in label.
		</p>
		<Checkbox checked={agree} onchange={() => (agree = !agree)} name="demo-terms" label="Demo field name" />
	</Example>

	<Example title="Disabled" code={disabledCode}>
		<div class="flex flex-col gap-3">
			<Checkbox checked={disabledChecked} disabled label="Disabled (checked)" />
			<Checkbox checked={false} disabled label="Disabled (unchecked)" />
		</div>
	</Example>
</div>
