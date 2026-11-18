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

<ButtonDropdown items={fileItems}>File</ButtonDropdown>
