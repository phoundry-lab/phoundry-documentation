<script lang="ts">
	import { Tabs } from "phoundry-ui";
	import type { TabItem } from "phoundry-ui";

	let activePanel = $state("editor");

	const closableTabs: TabItem[] = [
		{ id: "editor", label: "Editor", icon: "carbon:document" },
		{ id: "preview", label: "Preview", icon: "carbon:view", closable: true },
		{
			id: "terminal",
			label: "Terminal",
			icon: "carbon:terminal",
			closable: true,
		},
	];

	let panelTabs = $state([...closableTabs]);

	function closeTab(id: string) {
		panelTabs = panelTabs.filter((t) => t.id !== id);
		if (activePanel === id) {
			activePanel = panelTabs[0]?.id ?? "";
		}
	}
</script>

<Tabs
	items={panelTabs}
	value={activePanel}
	onchange={(id: string) => {
		activePanel = id;
	}}
	onclose={closeTab}
>
	{#snippet panel(item)}
		<div
			class="rounded-lg border border-border-muted p-4 text-xs text-txt-secondary"
		>
			Content for <strong>{item.label}</strong> tab.
		</div>
	{/snippet}
</Tabs>
