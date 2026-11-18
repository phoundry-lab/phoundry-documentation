<script lang="ts">
	import { Tabs } from "phoundry-ui";
	import type { TabItem } from "phoundry-ui";

	let verticalTab = $state("general");

	const basicTabs: TabItem[] = [
		{ id: "general", label: "General" },
		{ id: "appearance", label: "Appearance" },
		{ id: "keybindings", label: "Keybindings" },
		{ id: "disabled", label: "Disabled", disabled: true },
	];
</script>

<p class="mb-2 text-xs text-txt-secondary">
	<code>orientation="vertical"</code> stacks tabs and pins the panel
	beside/below depending on your layout wrapper- Combine with
	<code>variant="pills"</code> for sidebar navigation.
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
			<div
				class="rounded-lg bg-surface-sunken/40 p-4 text-xs text-txt-secondary"
			>
				Vertical orientation keeps the tablist beside the panel - active: <strong
					class="text-txt-primary">{item.label}</strong
				>
			</div>
		{/snippet}
	</Tabs>
</div>
