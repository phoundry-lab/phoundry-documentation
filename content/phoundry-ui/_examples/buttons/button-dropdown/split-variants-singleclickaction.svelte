<script lang="ts">
	import { ButtonDropdown } from "phoundry-ui";
	import type { MenuItem } from "phoundry-ui";

	const fileItems: MenuItem[] = [
		{ id: "new", type: "action", label: "New File", action: () => {} },
		{ id: "open", type: "action", label: "Open...", action: () => {} },
		{ type: "separator" },
		{ id: "save", type: "action", label: "Save", action: () => {} },
		{ id: "save-as", type: "action", label: "Save As...", action: () => {} },
	];

	const dangerItems: MenuItem[] = [
		{ id: "archive", type: "action", label: "Archive", action: () => {} },
		{
			id: "delete",
			type: "action",
			label: "Delete",
			action: () => {},
			danger: true,
		},
	];
</script>

<div class="flex flex-wrap items-center gap-2">
	<ButtonDropdown
		variant="primary"
		items={fileItems}
		singleClickAction={() => {}}>Primary</ButtonDropdown
	>
	<ButtonDropdown
		variant="secondary"
		items={fileItems}
		singleClickAction={() => {}}>Secondary</ButtonDropdown
	>
	<ButtonDropdown
		variant="outline"
		items={fileItems}
		singleClickAction={() => {}}>Outline</ButtonDropdown
	>
	<ButtonDropdown
		variant="danger"
		items={dangerItems}
		singleClickAction={() => {}}>Archive</ButtonDropdown
	>
</div>
