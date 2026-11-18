<script lang="ts">
	import { Anchor } from "phoundry-ui";
	import type { AnchorItem } from "phoundry-ui";

	let nestedContainer = $state<HTMLElement>();

	const nestedItems: AnchorItem[] = [
		{
			key: "nested-getting-started",
			href: "#nested-getting-started",
			title: "Getting Started",
			children: [
				{
					key: "nested-prereqs",
					href: "#nested-prereqs",
					title: "Prerequisites",
				},
				{ key: "nested-setup", href: "#nested-setup", title: "Setup" },
			],
		},
		{
			key: "nested-components",
			href: "#nested-components",
			title: "Components",
			children: [
				{ key: "nested-button", href: "#nested-button", title: "Button" },
				{ key: "nested-input", href: "#nested-input", title: "Input" },
				{ key: "nested-select", href: "#nested-select", title: "Select" },
			],
		},
	];
</script>

<div class="flex gap-4">
	<Anchor items={nestedItems} target={nestedContainer} affix={false} />
	<div
		bind:this={nestedContainer}
		class="h-56 flex-1 space-y-4 overflow-y-auto rounded-lg border border-border-muted p-4"
	>
		<section id="nested-getting-started">
			<h2 class="text-sm font-semibold text-txt-primary">Getting Started</h2>
			<div class="h-12"></div>
		</section>
		<section id="nested-prereqs">
			<h3 class="pl-2 text-xs font-medium text-txt-primary">Prerequisites</h3>
			<p class="mt-1 pl-2 text-xs text-txt-secondary">Node.js 18+, Svelte 5.</p>
			<div class="h-16"></div>
		</section>
		<section id="nested-setup">
			<h3 class="pl-2 text-xs font-medium text-txt-primary">Setup</h3>
			<p class="mt-1 pl-2 text-xs text-txt-secondary">Run the init script.</p>
			<div class="h-16"></div>
		</section>
		<section id="nested-components">
			<h2 class="text-sm font-semibold text-txt-primary">Components</h2>
			<div class="h-12"></div>
		</section>
		<section id="nested-button">
			<h3 class="pl-2 text-xs font-medium text-txt-primary">Button</h3>
			<p class="mt-1 pl-2 text-xs text-txt-secondary">
				Primary action trigger.
			</p>
			<div class="h-16"></div>
		</section>
		<section id="nested-input">
			<h3 class="pl-2 text-xs font-medium text-txt-primary">Input</h3>
			<p class="mt-1 pl-2 text-xs text-txt-secondary">Text input field.</p>
			<div class="h-16"></div>
		</section>
		<section id="nested-select">
			<h3 class="pl-2 text-xs font-medium text-txt-primary">Select</h3>
			<p class="mt-1 pl-2 text-xs text-txt-secondary">Dropdown selector.</p>
			<div class="h-16"></div>
		</section>
	</div>
</div>
