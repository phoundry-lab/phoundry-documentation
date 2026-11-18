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

<p class="mb-2 text-xs text-txt-secondary">
	<code>loading</code> shows the same spinner as <code>Button</code> and blocks
	opening the menu. Icon-only triggers still need <code>title</code> for accessibility.
</p>
<div class="flex flex-wrap gap-2">
	<ButtonDropdown items={fileItems} loading>Saving…</ButtonDropdown>
	<ButtonDropdown items={fileItems} disabled>Unavailable</ButtonDropdown>
	<ButtonDropdown
		items={fileItems}
		icon={PhiIcons.expand}
		iconOnly
		title="More actions"
		variant="ghost"
	/>
</div>
