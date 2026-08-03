<script lang="ts">
	import Example from '$lib/docs/ui/Example.svelte';
	import CheckboxToggle from '$phoundry/components/inputs/CheckboxToggle.svelte';

	let basic = $state(false);
	let withLabel = $state(true);
	let withDesc = $state(false);
	let sizeSm = $state(true);
	let sizeMd = $state(false);
	let disabled = $state(false);
	let richLabelToggle = $state(true);

	const basicCode = `<CheckboxToggle checked={value} onchange={() => value = !value} />`;

	const labelCode = `<CheckboxToggle
  checked={value}
  onchange={() => value = !value}
  label="Enable notifications"
  description="Receive push notifications for important events"
/>`;

	const sizesCode = `<CheckboxToggle checked={a} onchange={...} size="sm" label="Small" />
<CheckboxToggle checked={b} onchange={...} size="md" label="Medium" />`;

	const snippetLabelCode = `{#snippet promo()}
  Accept <strong class="text-accent-secondary">marketing email</strong>
{/snippet}

<CheckboxToggle checked={v} onchange={...} label={promo} />`;

	const disabledCode = `<CheckboxToggle checked={false} disabled label="Disabled toggle" />`;
</script>

{#snippet promo()}
	Accept <span class="font-medium text-accent-secondary">beta features</span>
{/snippet}

<div class="space-y-8">
	<Example title="Basic toggle" code={basicCode}>
		<div class="flex items-center gap-3">
			<CheckboxToggle checked={basic} onchange={() => (basic = !basic)} />
			<span class="text-xs text-txt-tertiary">{basic ? 'On' : 'Off'}</span>
		</div>
	</Example>

	<Example title="With label" code={labelCode}>
		<div class="flex flex-col gap-3">
			<CheckboxToggle checked={withLabel} onchange={() => (withLabel = !withLabel)} label="Auto-save enabled" />
			<CheckboxToggle checked={withDesc} onchange={() => (withDesc = !withDesc)} label="Enable notifications" description="Receive push notifications for important events" />
		</div>
	</Example>

	<Example title="Sizes" code={sizesCode}>
		<div class="flex flex-col gap-3">
			<CheckboxToggle checked={sizeSm} onchange={() => (sizeSm = !sizeSm)} size="sm" label="Small (default)" />
			<CheckboxToggle checked={sizeMd} onchange={() => (sizeMd = !sizeMd)} size="md" label="Medium" />
		</div>
	</Example>

	<Example title="Snippet label" code={snippetLabelCode}>
		<CheckboxToggle
			checked={richLabelToggle}
			onchange={() => (richLabelToggle = !richLabelToggle)}
			label={promo}
			description="Pass a snippet when the label needs inline formatting."
		/>
	</Example>

	<Example title="Disabled" code={disabledCode}>
		<div class="flex flex-col gap-3">
			<CheckboxToggle checked={true} disabled label="Disabled (on)" />
			<CheckboxToggle checked={disabled} disabled label="Disabled (off)" />
		</div>
	</Example>
</div>
