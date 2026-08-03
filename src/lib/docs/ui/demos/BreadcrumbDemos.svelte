<script lang="ts">
	import Example from '$lib/docs/ui/Example.svelte';
	import Breadcrumb from '$phoundry/components/navigation/Breadcrumb.svelte';
	import type { BreadcrumbItem } from '$phoundry/components/navigation/Breadcrumb.svelte';
	import { PhiIcons } from '$phoundry/icons.js';

	let lastClicked = $state('');

	const basicItems: BreadcrumbItem[] = [
		{ id: 'home', label: 'Home' },
		{ id: 'docs', label: 'Docs' },
		{ id: 'breadcrumb', label: 'Breadcrumb' }
	];

	const iconItems: BreadcrumbItem[] = [
		{ id: 'home', label: 'Home', icon: PhiIcons.folder },
		{ id: 'projects', label: 'Projects', icon: PhiIcons.document },
		{ id: 'phoundry-ui', label: 'Phoundry UI', icon: PhiIcons.edit },
		{ id: 'components', label: 'Components' }
	];

	const hrefItems: BreadcrumbItem[] = [
		{ id: 'home', label: 'Home', href: '#bc-h-home', icon: PhiIcons.folder },
		{ id: 'docs', label: 'Docs', href: '#bc-h-docs' },
		{ id: 'here', label: 'Current page' }
	];

	const longItems: BreadcrumbItem[] = [
		{ id: 'home', label: 'Home', icon: PhiIcons.folder },
		{ id: 'workspace', label: 'Workspace' },
		{ id: 'projects', label: 'Projects' },
		{ id: 'phoundry-ui', label: 'Phoundry UI' },
		{ id: 'components', label: 'Components' },
		{ id: 'navigation', label: 'Navigation' },
		{ id: 'breadcrumb', label: 'Breadcrumb' }
	];

	const basicCode = `<Breadcrumb
  items={[
    { id: 'home', label: 'Home' },
    { id: 'docs', label: 'Docs' },
    { id: 'breadcrumb', label: 'Breadcrumb' },
  ]}
  onnavigate={(item) => goto(item.id)}
/>`;

	const iconCode = `import { Breadcrumb, PhiIcons } from 'phoundry-ui';

<Breadcrumb
  items={[
    { id: 'home', label: 'Home', icon: PhiIcons.folder },
    { id: 'projects', label: 'Projects', icon: PhiIcons.document },
    { id: 'phoundry-ui', label: 'Phoundry UI', icon: PhiIcons.edit },
    { id: 'components', label: 'Components' },
  ]}
  onnavigate={(item) => goto(item.id)}
/>`;

	const overflowCode = `<Breadcrumb
  items={longItems}
  maxVisible={3}
  onnavigate={(item) => goto(item.id)}
/>`;

	const separatorCode = `<Breadcrumb items={items} separator="›" />`;

	const hrefCode = `<Breadcrumb
  items={[
    { id: 'home', label: 'Home', href: '/app' },
    { id: 'docs', label: 'Docs', href: '/app/docs' },
    { id: 'here', label: 'This page' },
  ]}
/>`;
</script>

<div class="space-y-8">
	<span id="bc-h-home" hidden></span>
	<span id="bc-h-docs" hidden></span>
	<Example title="Basic" code={basicCode}>
		<Breadcrumb
			items={basicItems}
			onnavigate={(item: BreadcrumbItem) => {
				lastClicked = item.label;
			}}
		/>
		{#if lastClicked}
			<p class="mt-2 text-xs text-txt-tertiary">Clicked: {lastClicked}</p>
		{/if}
	</Example>

	<Example title="With Icons" code={iconCode}>
		<Breadcrumb
			items={iconItems}
			onnavigate={(item: BreadcrumbItem) => {
				lastClicked = item.label;
			}}
		/>
	</Example>

	<Example title="Collapsed Overflow (maxVisible=3)" code={overflowCode}>
		<Breadcrumb
			items={longItems}
			maxVisible={3}
			onnavigate={(item: BreadcrumbItem) => {
				lastClicked = item.label;
			}}
		/>
		<p class="mt-2 text-xs text-txt-tertiary">7 items, showing first + last 2 with an overflow menu for the rest.</p>
	</Example>

	<Example title="Separator + larger size" code={separatorCode}>
		<p class="mb-2 text-xs text-txt-secondary">
			Use <code>separator</code> for brand-specific glyphs; <code>size="md"</code> bumps text and icon metrics.
		</p>
		<Breadcrumb items={basicItems} separator="›" size="md" />
	</Example>

	<Example title="Links vs buttons" code={hrefCode}>
		<p class="mb-2 text-xs text-txt-secondary">
			Segments with <code>href</code> render as real links for middle crumbs; the last segment stays plain text. Use <code>onnavigate</code> when you route with a SPA helper instead.
		</p>
		<Breadcrumb items={hrefItems} />
	</Example>
</div>
