<script lang="ts">
	import { Breadcrumb } from "phoundry-ui";
	import type { BreadcrumbItem } from "phoundry-ui";
	import { PhiIcons } from "phoundry-ui";

	let lastClicked = $state("");

	const longItems: BreadcrumbItem[] = [
		{ id: "home", label: "Home", icon: PhiIcons.folder },
		{ id: "workspace", label: "Workspace" },
		{ id: "projects", label: "Projects" },
		{ id: "phoundry-ui", label: "Phoundry UI" },
		{ id: "components", label: "Components" },
		{ id: "navigation", label: "Navigation" },
		{ id: "breadcrumb", label: "Breadcrumb" },
	];
</script>

<Breadcrumb
	items={longItems}
	maxVisible={3}
	onnavigate={(item: BreadcrumbItem) => {
		lastClicked = item.label;
	}}
/>
<p class="mt-2 text-xs text-txt-tertiary">
	7 items, showing first + last 2 with an overflow menu for the rest.
</p>
