<script lang="ts">
	import { TreeView } from "phoundry-ui";
	import type { TreeNode } from "phoundry-ui";

	const flatChildren: TreeNode[] = Array.from({ length: 60 }, (_, i) => ({
		id: `big-${i}`,
		label: `item-${i}.ts`,
		icon: "carbon:document",
	}));

	const bigTree: TreeNode[] = [
		{
			id: "big-root",
			label: "large-folder",
			icon: "carbon:folder",
			children: flatChildren,
		},
	];

	let vsExpanded = $state<string[]>(["big-root"]);

	let vsSelected = $state<string[]>([]);
</script>

<p class="mb-2 text-xs text-txt-secondary">
	Enable <code>virtualScroll</code> when an expanded branch can contain hundreds
	of rows. Set <code>maxHeight</code> so the tree gets a scrollable viewport.
</p>
<TreeView
	nodes={bigTree}
	selected={vsSelected}
	bind:expanded={vsExpanded}
	onselect={(ids: string[]) => {
		vsSelected = ids;
	}}
	virtualScroll
	maxHeight={220}
	itemHeight={28}
	class="rounded-lg border border-border-muted"
/>
