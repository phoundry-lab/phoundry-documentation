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

<div class="flex flex-wrap items-center gap-2">
	<ButtonDropdown
		size="xs"
		variant="secondary"
		items={fileItems}
		singleClickAction={() => {}}>Extra small</ButtonDropdown
	>
	<ButtonDropdown
		size="sm"
		variant="secondary"
		items={fileItems}
		singleClickAction={() => {}}>Small</ButtonDropdown
	>
	<ButtonDropdown
		size="md"
		variant="secondary"
		items={fileItems}
		singleClickAction={() => {}}>Medium</ButtonDropdown
	>
	<ButtonDropdown
		size="lg"
		variant="secondary"
		items={fileItems}
		singleClickAction={() => {}}>Large</ButtonDropdown
	>
</div>
