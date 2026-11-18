<script lang="ts">
	import { ButtonDropdown } from "phoundry-ui";
	import { PhiIcons } from "phoundry-ui";
	import type { MenuItem } from "phoundry-ui";

	const fileItems: MenuItem[] = [
		{ id: "new", type: "action", label: "New File", action: () => {} },
		{ id: "open", type: "action", label: "Open...", action: () => {} },
		{ type: "separator" },
		{ id: "save", type: "action", label: "Save", action: () => {} },
		{ id: "save-as", type: "action", label: "Save As...", action: () => {} },
	];
</script>

<div class="flex flex-wrap items-center gap-2">
	<ButtonDropdown
		icon={PhiIcons.edit}
		variant="primary"
		items={fileItems}
		singleClickAction={() => {}}>Save</ButtonDropdown
	>
	<ButtonDropdown
		icon={PhiIcons.edit}
		size="sm"
		variant="ghost"
		items={fileItems}
		singleClickAction={() => {}}>Save</ButtonDropdown
	>
	<ButtonDropdown
		icon={PhiIcons.launch}
		items={fileItems}
		singleClickAction={() => {}}>Export</ButtonDropdown
	>
</div>
