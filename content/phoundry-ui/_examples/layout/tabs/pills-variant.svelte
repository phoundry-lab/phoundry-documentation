<script lang="ts">
	import { Tabs } from "phoundry-ui";
	import type { TabItem } from "phoundry-ui";

	let activePills = $state("general");

	const basicTabs: TabItem[] = [
		{ id: "general", label: "General" },
		{ id: "appearance", label: "Appearance" },
		{ id: "keybindings", label: "Keybindings" },
		{ id: "disabled", label: "Disabled", disabled: true },
	];
</script>

<Tabs
	items={basicTabs}
	value={activePills}
	onchange={(id: string) => {
		activePills = id;
	}}
	variant="pills"
/>
<p class="mt-2 text-xs text-txt-tertiary">Active: {activePills}</p>
