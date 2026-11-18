<script lang="ts">
	import { Breadcrumb } from "phoundry-ui";
	import type { BreadcrumbItem } from "phoundry-ui";

	let lastClicked = $state("");

	const basicItems: BreadcrumbItem[] = [
		{ id: "home", label: "Home" },
		{ id: "docs", label: "Docs" },
		{ id: "breadcrumb", label: "Breadcrumb" },
	];
</script>

<Breadcrumb
	items={basicItems}
	onnavigate={(item: BreadcrumbItem) => {
		lastClicked = item.label;
	}}
/>
{#if lastClicked}
	<p class="mt-2 text-xs text-txt-tertiary">Clicked: {lastClicked}</p>
{/if}
