<script lang="ts">
	import { Tabs } from "phoundry-ui";
	import type { TabItem } from "phoundry-ui";

	let activePanel = $state("editor");

	let noVtTab = $state("editor");

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

<p class="mb-2 text-xs text-txt-secondary">
	Disable cross-fading when the DOM inside panels cannot be duplicated safely or
	when animations feel sluggish on low-power devices.
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
		<div
			class="rounded-lg border border-border-muted p-4 text-xs text-txt-secondary"
		>
			Static swap (no view transition)- <strong>{item.label}</strong>
		</div>
	{/snippet}
</Tabs>
