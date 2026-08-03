<script lang="ts">
	import Example from '$lib/docs/ui/Example.svelte';
	import ProgressBar from '$phoundry/components/display/ProgressBar.svelte';

	let value = $state(65);

	const determinateCode = `<ProgressBar value={65} />`;

	const variantsCode = `<ProgressBar value={100} variant="success" />
<ProgressBar value={50} variant="warning" />
<ProgressBar value={25} variant="error" />`;

	const sizesCode = `<ProgressBar value={60} size="sm" />
<ProgressBar value={60} size="md" />
<ProgressBar value={60} size="lg" />`;

	const showValueCode = `<ProgressBar value={value} showValue />`;

	const indeterminateCode = `<ProgressBar />`;

	const clampCode = `<ProgressBar value={150} variant="success" showValue />
<!-- Renders as 100% - values are clamped to 0–100. -->`;
</script>

<div class="space-y-8">
	<p class="-mt-4 text-xs text-txt-secondary">
		The bar exposes <code>role="progressbar"</code> with <code>aria-valuenow</code> when determinate. Omit <code>value</code> or pass a negative number for indeterminate (no
		<code>aria-valuenow</code>).
	</p>

	<h2 class="text-base font-semibold text-txt-primary">Determinate</h2>

	<Example title="Determinate" code={determinateCode}>
		<div class="max-w-sm">
			<ProgressBar value={65} />
		</div>
	</Example>

	<Example title="Variants" code={variantsCode}>
		<div class="max-w-sm space-y-3">
			<ProgressBar value={100} variant="success" />
			<ProgressBar value={50} variant="warning" />
			<ProgressBar value={25} variant="error" />
		</div>
	</Example>

	<Example title="Sizes" code={sizesCode}>
		<div class="max-w-sm space-y-3">
			<div>
				<span class="mb-1 block text-[10px] text-txt-tertiary">sm</span>
				<ProgressBar value={60} size="sm" />
			</div>
			<div>
				<span class="mb-1 block text-[10px] text-txt-tertiary">md</span>
				<ProgressBar value={60} size="md" />
			</div>
			<div>
				<span class="mb-1 block text-[10px] text-txt-tertiary">lg</span>
				<ProgressBar value={60} size="lg" />
			</div>
		</div>
	</Example>

	<Example title="With Value" code={showValueCode}>
		<div class="max-w-sm space-y-3">
			<ProgressBar {value} showValue />
			<input type="range" min="0" max="100" bind:value class="w-full" />
		</div>
	</Example>

	<Example title="Clamped values" code={clampCode}>
		<p class="mb-2 text-xs text-txt-secondary">Useful when raw progress can overshoot before you snap to complete.</p>
		<div class="max-w-sm">
			<ProgressBar value={150} variant="success" showValue />
		</div>
	</Example>

	<h2 class="mt-8 text-base font-semibold text-txt-primary">Indeterminate</h2>

	<Example title="Indeterminate" code={indeterminateCode}>
		<div class="max-w-sm">
			<ProgressBar />
		</div>
	</Example>
</div>
