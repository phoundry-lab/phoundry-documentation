<script lang="ts">
	import { TreeView } from "phoundry-ui";
	import type { TreeNode } from "phoundry-ui";

	const fileTree: TreeNode[] = [
		{
			id: "src",
			label: "src",
			icon: "carbon:folder",
			children: [
				{
					id: "src/lib",
					label: "lib",
					icon: "carbon:folder",
					children: [
						{
							id: "src/lib/index.ts",
							label: "index.ts",
							icon: "carbon:document",
						},
						{
							id: "src/lib/utils.ts",
							label: "utils.ts",
							icon: "carbon:document",
						},
					],
				},
				{
					id: "src/routes",
					label: "routes",
					icon: "carbon:folder",
					children: [
						{
							id: "src/routes/+page.svelte",
							label: "+page.svelte",
							icon: "carbon:document",
						},
						{
							id: "src/routes/+layout.svelte",
							label: "+layout.svelte",
							icon: "carbon:document",
						},
					],
				},
			],
		},
		{ id: "package.json", label: "package.json", icon: "carbon:document" },
		{ id: "README.md", label: "README.md", icon: "carbon:document" },
	];

	let basicSelected = $state<string[]>([]);
</script>

<div class="max-w-xs">
	<TreeView
		nodes={fileTree}
		selected={basicSelected}
		onselect={(ids: string[]) => {
			basicSelected = ids;
		}}
	/>
</div>
<p class="mt-2 text-xs text-txt-tertiary">
	Selected: {basicSelected.length ? basicSelected.join(", ") : "none"}
</p>
