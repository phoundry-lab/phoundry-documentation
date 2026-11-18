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
	<ButtonDropdown size="xs" items={fileItems}>Extra Small</ButtonDropdown>
	<ButtonDropdown size="sm" items={fileItems}>Small</ButtonDropdown>
	<ButtonDropdown size="md" items={fileItems}>Medium</ButtonDropdown>
	<ButtonDropdown size="lg" items={fileItems}>Large</ButtonDropdown>
</div>
