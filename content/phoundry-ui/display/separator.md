---
title: Separator
layout: ui
order: 4
---

<script lang="ts">
	import UiDocHeader from '$lib/docs/ui/UiDocHeader.svelte';
	import Example from '$lib/docs/ui/Example.svelte';
	import PropTable from '$lib/docs/ui/PropTable.svelte';
	import type { PropDef } from '$lib/docs/ui/PropTable.svelte';
	import Separator from '$phoundry/components/display/Separator.svelte';
	import Badge from '$phoundry/components/display/Badge.svelte';

	const props: PropDef[] = [
		{
			name: 'orientation',
			type: "'horizontal' | 'vertical'",
			default: "'horizontal'",
			description: 'Direction of the divider.'
		},
		{
			name: 'label',
			type: 'string',
			description: 'Centered text label shown on the divider line.'
		},
		{
			name: 'children',
			type: 'Snippet',
			description: 'Custom content to display in the center instead of a label.'
		},
		{ name: 'class', type: 'string', description: 'Additional CSS classes.' }
	];

	const basicCode = `<Separator />`;

	const labelCode = `<Separator label="Or continue with" />`;

	const verticalCode = `<div class="flex items-center gap-4 h-8">
  <span>Home</span>
  <Separator orientation="vertical" />
  <span>Settings</span>
  <Separator orientation="vertical" />
  <span>Profile</span>
</div>`;

	const snippetCode = `<Separator>
  {#snippet children()}
    <Badge size="sm">Beta</Badge>
  {/snippet}
</Separator>`;
</script>

<UiDocHeader
	title="Separator"
	description="Visual divider for separating content sections. Supports horizontal and vertical orientation with an optional centered label."
	importCode={"import { Separator } from 'phoundry-ui';"}
/>

<Example title="Basic Horizontal" code={basicCode}>
	<div class="space-y-3">
		<p class="text-xs text-txt-secondary">Content above</p>
		<Separator />
		<p class="text-xs text-txt-secondary">Content below</p>
	</div>
</Example>

<Example title="With Label" code={labelCode}>
	<div class="space-y-3">
		<p class="text-xs text-txt-secondary">Content above</p>
		<Separator label="Or continue with" />
		<p class="text-xs text-txt-secondary">Content below</p>
	</div>
</Example>

<Example title="Vertical" code={verticalCode}>
	<div class="flex h-8 items-center gap-4">
		<span class="text-xs text-txt-secondary">Home</span>
		<Separator orientation="vertical" />
		<span class="text-xs text-txt-secondary">Settings</span>
		<Separator orientation="vertical" />
		<span class="text-xs text-txt-secondary">Profile</span>
	</div>
</Example>

<Example title="Center snippet (children)" code={snippetCode}>
	<p class="mb-2 text-xs text-txt-secondary">
		Use <code>children</code> when the center needs richer markup than a plain string <code>label</code>.
	</p>
	<Separator>
		{#snippet children()}
			<Badge size="sm">Beta</Badge>
		{/snippet}
	</Separator>
</Example>

<Separator />

<PropTable {props} />

## Usage tips

- Use the `label` prop for "or" dividers in forms (e.g. "Or continue with").
- Vertical separators need a parent with explicit height and `display: flex`.
- Pass a `children` snippet for custom center content (icons, badges, etc.).
