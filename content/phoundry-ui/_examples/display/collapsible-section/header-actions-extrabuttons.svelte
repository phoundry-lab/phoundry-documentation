<script lang="ts">
	import { CollapsibleSection } from "phoundry-ui";
	import { PhiIcons } from "phoundry-ui";
</script>

<p class="mb-2 text-xs text-txt-secondary">
	<code>stopPropagation</code> on the extra button wrapper keeps header toggles separate
	from actions.
</p>
<CollapsibleSection
	title="Tasks"
	icon={PhiIcons.edit}
	defaultOpen={false}
	extraButtons={[
		{
			showWhenCollapsed: true,
			button: {
				variant: "ghost",
				size: "sm",
				icon: PhiIcons.add,
				title: "Quick add",
				onclick: () => {},
			},
		},
		{
			showWhenCollapsed: false,
			button: {
				variant: "ghost",
				size: "sm",
				icon: PhiIcons.refresh,
				title: "Refresh list",
				onclick: () => {},
			},
		},
	]}
>
	<p class="text-xs text-txt-secondary">
		Collapsed: only the “add” icon shows. Expanded: refresh appears.
	</p>
</CollapsibleSection>
