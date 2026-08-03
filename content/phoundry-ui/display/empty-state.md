---
title: EmptyState
layout: ui
order: 6
---

<script lang="ts">
	import UiDocHeader from '$lib/docs/ui/UiDocHeader.svelte';
	import Example from '$lib/docs/ui/Example.svelte';
	import PropTable from '$lib/docs/ui/PropTable.svelte';
	import type { PropDef } from '$lib/docs/ui/PropTable.svelte';
	import Separator from '$phoundry/components/display/Separator.svelte';
	import EmptyState from '$phoundry/components/display/EmptyState.svelte';
	import Button from '$phoundry/components/buttons/Button.svelte';
	import { PhiIcons } from '$phoundry/icons.js';

	const props: PropDef[] = [
		{ name: 'icon', type: 'string', description: 'Iconify icon string shown above the title.' },
		{ name: 'title', type: 'string', description: 'Main heading text.', required: true },
		{ name: 'description', type: 'string', description: 'Supporting text below the title.' },
		{ name: 'action', type: 'Snippet', description: 'Action area - typically a Button.' },
		{
			name: 'size',
			type: "'sm' | 'md' | 'lg'",
			default: "'md'",
			description: 'Controls spacing, icon size, and typography scale.'
		},
		{ name: 'class', type: 'string', description: 'Additional CSS classes.' }
	];

	const basicCode = `<EmptyState
  icon={PhiIcons.document}
  title="No documents"
  description="Upload your first file to get started."
/>`;

	const actionCode = `<EmptyState
  icon={PhiIcons.folder}
  title="No projects yet"
  description="Create a project to organize your work."
>
  {#snippet action()}
    <Button variant="primary" icon={PhiIcons.add}>New Project</Button>
  {/snippet}
</EmptyState>`;

	const sizesCode = `<EmptyState size="sm" title="Nothing here" description="Small variant." />
<EmptyState size="md" title="Nothing here" description="Medium variant." />
<EmptyState size="lg" title="Nothing here" description="Large variant." />`;
</script>

<UiDocHeader
	title="EmptyState"
	description="Centered placeholder for empty views with icon, title, description, and optional action slot. Three sizes control spacing, icon dimensions, and typography."
	importCode={"import { EmptyState, Button } from 'phoundry-ui';"}
/>

<Example title="Basic" code={basicCode}>
	<EmptyState icon={PhiIcons.document} title="No documents" description="Upload your first file to get started." />
</Example>

<Example title="With Action Button" code={actionCode}>
	<EmptyState icon={PhiIcons.folder} title="No projects yet" description="Create a project to organize your work.">
		{#snippet action()}
			<Button variant="primary" icon={PhiIcons.add}>New Project</Button>
		{/snippet}
	</EmptyState>
</Example>

<Example title="Sizes" code={sizesCode}>
	<div class="space-y-4 divide-y divide-border-muted">
		<EmptyState size="sm" title="Nothing here" description="Small variant." />
		<EmptyState size="md" title="Nothing here" description="Medium variant." />
		<EmptyState size="lg" title="Nothing here" description="Large variant." />
	</div>
</Example>

<Separator />

<PropTable {props} />

## Usage tips

- Use the `action` snippet to provide a clear call-to-action (e.g. "Create", "Upload", "Import").
- Use `size="sm"` for inline empty states (e.g. inside a card or panel) and `size="lg"` for full-page views.
- Always provide a `description` to guide the user on what to do next.
- `icon` is optional - omit it for text-only empty states in tight layouts.
