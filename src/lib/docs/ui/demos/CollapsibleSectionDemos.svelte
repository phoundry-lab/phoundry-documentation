<script lang="ts">
	import Example from '$lib/docs/ui/Example.svelte';
	import CollapsibleSection from '$phoundry/components/display/CollapsibleSection.svelte';
	import { PhiIcons } from '$phoundry/icons.js';

	let controlledOpen = $state(true);

	const basicCode = `<CollapsibleSection title="Details">
  <p>This content is visible by default.</p>
</CollapsibleSection>`;

	const closedCode = `<CollapsibleSection title="Advanced Settings" defaultOpen={false}>
  <p>Hidden until expanded.</p>
</CollapsibleSection>`;

	const iconCode = `<CollapsibleSection title="Configuration" icon={PhiIcons.edit}>
  <p>Section with a leading icon.</p>
</CollapsibleSection>`;

	const extrasCode = `<CollapsibleSection
  title="Tasks"
  icon={PhiIcons.add}
  extraButtons={[
    {
      showWhenCollapsed: true,
      button: {
        variant: 'ghost',
        size: 'sm',
        icon: PhiIcons.add,
        iconOnly: true,
        title: 'Quick add',
        onclick: () => addTask(),
      },
    },
  ]}
>
  ...
</CollapsibleSection>`;

	const controlledCode = `<script>
  let open = $state(true);
<${'/'}script>

<button onclick={() => open = !open}>
  {open ? 'Collapse' : 'Expand'}
</button>

<CollapsibleSection title="Controlled" open={open} onToggle={() => open = !open}>
  <p>Externally controlled section.</p>
</CollapsibleSection>`;
</script>

<div class="space-y-8">
	<Example title="Basic (Default Open)" code={basicCode}>
		<CollapsibleSection title="Details">
			<p class="text-xs text-txt-secondary">This content is visible by default.</p>
		</CollapsibleSection>
	</Example>

	<Example title="Starting Closed" code={closedCode}>
		<CollapsibleSection title="Advanced Settings" defaultOpen={false}>
			<p class="text-xs text-txt-secondary">Hidden until expanded.</p>
		</CollapsibleSection>
	</Example>

	<Example title="With Icon" code={iconCode}>
		<CollapsibleSection title="Configuration" icon={PhiIcons.edit}>
			<p class="text-xs text-txt-secondary">Section with a leading icon in the header.</p>
		</CollapsibleSection>
	</Example>

	<Example title="Header actions (extraButtons)" code={extrasCode}>
		<p class="mb-2 text-xs text-txt-secondary">
			<code>stopPropagation</code> on the extra button wrapper keeps header toggles separate from actions.
		</p>
		<CollapsibleSection
			title="Tasks"
			icon={PhiIcons.edit}
			defaultOpen={false}
			extraButtons={[
				{
					showWhenCollapsed: true,
					button: {
						variant: 'ghost',
						size: 'sm',
						icon: PhiIcons.add,
						iconOnly: true,
						title: 'Quick add',
						onclick: () => {}
					}
				},
				{
					showWhenCollapsed: false,
					button: {
						variant: 'ghost',
						size: 'sm',
						icon: PhiIcons.refresh,
						iconOnly: true,
						title: 'Refresh list',
						onclick: () => {}
					}
				}
			]}
		>
			<p class="text-xs text-txt-secondary">Collapsed: only the “add” icon shows. Expanded: refresh appears.</p>
		</CollapsibleSection>
	</Example>

	<Example title="Controlled" code={controlledCode}>
		<div class="space-y-2">
			<button
				class="rounded bg-surface-raised px-2 py-1 text-xs text-txt-secondary transition-colors hover:bg-surface-overlay"
				onclick={() => {
					controlledOpen = !controlledOpen;
				}}
			>
				{controlledOpen ? 'Collapse' : 'Expand'}
			</button>
			<CollapsibleSection
				title="Controlled"
				open={controlledOpen}
				onToggle={() => {
					controlledOpen = !controlledOpen;
				}}
			>
				<p class="text-xs text-txt-secondary">Externally controlled open state.</p>
			</CollapsibleSection>
		</div>
	</Example>
</div>
