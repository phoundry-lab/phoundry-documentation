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
</script>

<div class="flex items-center gap-2">
	<ButtonDropdown items={fileItems} placement="bottom-start"
		>Bottom Start</ButtonDropdown
	>
	<ButtonDropdown items={fileItems} placement="bottom-end"
		>Bottom End</ButtonDropdown
	>
	<ButtonDropdown items={fileItems} placement="top-start"
		>Top Start</ButtonDropdown
	>
	<ButtonDropdown items={fileItems} placement="top-end">Top End</ButtonDropdown>
</div>
