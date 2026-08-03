<script lang="ts">
	import Example from '$lib/docs/ui/Example.svelte';
	import Tabs from '$phoundry/components/layout/Tabs.svelte';
	import type { TabItem } from '$phoundry/components/layout/Tabs.svelte';

	let activeDefault = $state('general');
	let activePills = $state('general');
	let activeUnderline = $state('general');
	let activePanel = $state('editor');
	let verticalTab = $state('general');
	let noVtTab = $state('editor');

	const basicTabs: TabItem[] = [
		{ id: 'general', label: 'General' },
		{ id: 'appearance', label: 'Appearance' },
		{ id: 'keybindings', label: 'Keybindings' },
		{ id: 'disabled', label: 'Disabled', disabled: true }
	];

	const closableTabs: TabItem[] = [
		{ id: 'editor', label: 'Editor', icon: 'carbon:document' },
		{ id: 'preview', label: 'Preview', icon: 'carbon:view', closable: true },
		{ id: 'terminal', label: 'Terminal', icon: 'carbon:terminal', closable: true }
	];

	let panelTabs = $state([...closableTabs]);

	function closeTab(id: string) {
		panelTabs = panelTabs.filter((t) => t.id !== id);
		if (activePanel === id) {
			activePanel = panelTabs[0]?.id ?? '';
		}
	}

	const defaultCode = `<Tabs
  items={tabs}
  value={active}
  onchange={(id) => active = id}
/>`;

	const pillsCode = `<Tabs
  items={tabs}
  value={active}
  onchange={(id) => active = id}
  variant="pills"
/>`;

	const underlineCode = `<Tabs
  items={tabs}
  value={active}
  onchange={(id) => active = id}
  variant="underline"
/>`;

	const panelCode = `<Tabs
  items={closableTabs}
  value={active}
  onchange={(id) => active = id}
  onclose={(id) => removeTab(id)}
>
  {#snippet panel(item)}
    <div class="p-4">Content for {item.label}</div>
  {/snippet}
</Tabs>`;

	const verticalCode = `<Tabs items={tabs} value={active} onchange={set} orientation="vertical" variant="pills" />`;

	const noVtCode = `<Tabs items={tabs} value={active} onchange={set} viewTransition={false}>
  {#snippet panel(item)}…{/snippet}
</Tabs>`;
</script>

<div class="space-y-8">
	<Example title="Default Variant" code={defaultCode}>
		<Tabs
			items={basicTabs}
			value={activeDefault}
			onchange={(id: string) => {
				activeDefault = id;
			}}
		/>
		<p class="mt-2 text-xs text-txt-tertiary">Active: {activeDefault}</p>
	</Example>

	<Example title="Pills Variant" code={pillsCode}>
		<Tabs
			items={basicTabs}
			value={activePills}
			onchange={(id: string) => {
				activePills = id;
			}}
			variant="pills"
		/>
		<p class="mt-2 text-xs text-txt-tertiary">Active: {activePills}</p>
	</Example>

	<Example title="Vertical tab list" code={verticalCode}>
		<p class="mb-2 text-xs text-txt-secondary">
			<code>orientation="vertical"</code> stacks tabs and pins the panel beside/below depending on your layout wrapper- Combine with <code>variant="pills"</code> for sidebar navigation.
		</p>
		<div class="min-h-[12rem] rounded-lg border border-border-muted p-2">
			<Tabs
				items={basicTabs}
				value={verticalTab}
				onchange={(id: string) => {
					verticalTab = id;
				}}
				orientation="vertical"
				variant="pills"
				class="max-h-48 min-h-0"
			>
				{#snippet panel(item)}
					<div class="rounded-lg bg-surface-sunken/40 p-4 text-xs text-txt-secondary">
						Vertical orientation keeps the tablist beside the panel - active: <strong class="text-txt-primary">{item.label}</strong>
					</div>
				{/snippet}
			</Tabs>
		</div>
	</Example>

	<Example title="Underline Variant" code={underlineCode}>
		<Tabs
			items={basicTabs}
			value={activeUnderline}
			onchange={(id: string) => {
				activeUnderline = id;
			}}
			variant="underline"
		/>
		<p class="mt-2 text-xs text-txt-tertiary">Active: {activeUnderline}</p>
	</Example>

	<Example title="Panel without View Transitions" code={noVtCode}>
		<p class="mb-2 text-xs text-txt-secondary">
			Disable cross-fading when the DOM inside panels cannot be duplicated safely or when animations feel sluggish on low-power devices.
		</p>
		<Tabs
			items={panelTabs}
			value={noVtTab}
			onchange={(id: string) => {
				noVtTab = id;
			}}
			onclose={closeTab}
			viewTransition={false}
		>
			{#snippet panel(item)}
				<div class="rounded-lg border border-border-muted p-4 text-xs text-txt-secondary">
					Static swap (no view transition)- <strong>{item.label}</strong>
				</div>
			{/snippet}
		</Tabs>
	</Example>

	<Example title="With Panel Content" code={panelCode}>
		<Tabs
			items={panelTabs}
			value={activePanel}
			onchange={(id: string) => {
				activePanel = id;
			}}
			onclose={closeTab}
		>
			{#snippet panel(item)}
				<div class="rounded-lg border border-border-muted p-4 text-xs text-txt-secondary">
					Content for <strong>{item.label}</strong> tab.
				</div>
			{/snippet}
		</Tabs>
	</Example>
</div>
