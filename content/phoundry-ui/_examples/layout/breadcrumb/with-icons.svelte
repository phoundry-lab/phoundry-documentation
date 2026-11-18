<script lang="ts">
	import { Breadcrumb } from "phoundry-ui";
	import type { BreadcrumbItem } from "phoundry-ui";
	import { PhiIcons } from "phoundry-ui";

	let lastClicked = $state("");

	const iconItems: BreadcrumbItem[] = [
		{ id: "home", label: "Home", icon: PhiIcons.folder },
		{ id: "projects", label: "Projects", icon: PhiIcons.document },
		{ id: "phoundry-ui", label: "Phoundry UI", icon: PhiIcons.edit },
		{ id: "components", label: "Components" },
	];
</script>

<Breadcrumb
	items={iconItems}
	onnavigate={(item: BreadcrumbItem) => {
		lastClicked = item.label;
	}}
/>
