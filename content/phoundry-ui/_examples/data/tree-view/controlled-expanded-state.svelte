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

	let expandedControlled = $state<string[]>(["src"]);
</script>

<p class="mb-2 text-xs text-txt-secondary">
	Keep <code>expanded</code> in your store so folders stay open across navigations.
</p>
<div class="max-w-xs">
	<TreeView
		nodes={fileTree}
		selected={basicSelected}
		bind:expanded={expandedControlled}
		onselect={(ids: string[]) => {
			basicSelected = ids;
		}}
	/>
</div>
<p class="mt-2 text-[11px] text-txt-tertiary">
	Expanded IDs: {expandedControlled.join(", ") || "(none)"}
</p>
