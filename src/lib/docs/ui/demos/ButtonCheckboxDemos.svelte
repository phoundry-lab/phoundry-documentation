<script lang="ts">
	import Example from '$lib/docs/ui/Example.svelte';
	import ButtonCheckbox from '$phoundry/components/inputs/ButtonCheckbox.svelte';
	import { PhiIcons } from '$phoundry/icons.js';

	let checked = $state(false);
	let loadingToggle = $state(false);

	const basicCode = `<ButtonCheckbox bind:checked>
	Accept Terms
</ButtonCheckbox>`;

	const variantsCode = `<ButtonCheckbox bind:checked variant="primary">Primary</ButtonCheckbox>
<ButtonCheckbox bind:checked variant="secondary">Secondary</ButtonCheckbox>
<ButtonCheckbox bind:checked variant="outline">Outline</ButtonCheckbox>
<ButtonCheckbox bind:checked variant="danger">Danger</ButtonCheckbox>
<ButtonCheckbox bind:checked variant="ghost">Ghost</ButtonCheckbox>
<ButtonCheckbox bind:checked variant="link">Link</ButtonCheckbox>`;

	const sizesCode = `<ButtonCheckbox bind:checked size="sm">Small</ButtonCheckbox>
<ButtonCheckbox bind:checked size="md">Medium</ButtonCheckbox>
<ButtonCheckbox bind:checked size="lg">Large</ButtonCheckbox>`;

	const iconLoadingCode = `<ButtonCheckbox bind:checked iconOnly title="Star thread" icon={PhiIcons.starOutline} variant="ghost" />
<ButtonCheckbox bind:checked loading variant="primary">Saving…</ButtonCheckbox>`;
</script>

<div class="space-y-8">
	<Example title="Basic Usage" code={basicCode}>
		<ButtonCheckbox bind:checked>Accept Terms</ButtonCheckbox>
		<div class="mt-4 text-sm text-txt-secondary">
			Status: {checked ? 'Checked' : 'Unchecked'}
		</div>
	</Example>

	<Example title="Variants" code={variantsCode}>
		<div class="flex flex-wrap gap-4">
			<ButtonCheckbox bind:checked variant="primary">Primary</ButtonCheckbox>
			<ButtonCheckbox bind:checked variant="secondary">Secondary</ButtonCheckbox>
			<ButtonCheckbox bind:checked variant="outline">Outline</ButtonCheckbox>
			<ButtonCheckbox bind:checked variant="danger">Danger</ButtonCheckbox>
			<ButtonCheckbox bind:checked variant="ghost">Ghost</ButtonCheckbox>
			<ButtonCheckbox bind:checked variant="link">Link</ButtonCheckbox>
		</div>
	</Example>

	<Example title="Sizes" code={sizesCode}>
		<div class="flex items-center gap-4">
			<ButtonCheckbox variant="ghost" bind:checked size="sm">Small</ButtonCheckbox>
			<ButtonCheckbox bind:checked size="md" icon={PhiIcons.edit}>Medium</ButtonCheckbox>
			<ButtonCheckbox bind:checked size="lg">Large</ButtonCheckbox>
		</div>
	</Example>

	<Example title="Icon-only & loading" code={iconLoadingCode}>
		<div class="flex flex-wrap items-center gap-4">
			<ButtonCheckbox bind:checked iconOnly title="Star thread" icon={PhiIcons.starOutline} variant="ghost" />
			<ButtonCheckbox bind:checked={loadingToggle} loading variant="primary">Saving…</ButtonCheckbox>
		</div>
	</Example>
</div>
