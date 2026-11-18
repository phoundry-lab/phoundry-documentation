<script lang="ts">
	import { Anchor } from "phoundry-ui";
	import type { AnchorItem } from "phoundry-ui";

	let manualContainer = $state<HTMLElement>();

	const basicItems: AnchorItem[] = [
		{ key: "basic-intro", href: "#basic-intro", title: "Introduction" },
		{ key: "basic-install", href: "#basic-install", title: "Installation" },
		{ key: "basic-usage", href: "#basic-usage", title: "Usage" },
		{ key: "basic-api", href: "#basic-api", title: "API Reference" },
	];
</script>

<div class="flex gap-4">
	<Anchor items={basicItems} target={manualContainer} affix={false} />
	<div
		bind:this={manualContainer}
		class="h-48 flex-1 space-y-4 overflow-y-auto rounded-lg border border-border-muted p-4"
	>
		<section id="basic-intro">
			<h3 class="text-sm font-medium text-txt-primary">Introduction</h3>
			<p class="mt-1 text-xs text-txt-secondary">
				Welcome to the Anchor component. It provides scroll-aware navigation for
				long pages.
			</p>
			<div class="h-24"></div>
		</section>
		<section id="basic-install">
			<h3 class="text-sm font-medium text-txt-primary">Installation</h3>
			<p class="mt-1 text-xs text-txt-secondary">
				Install via npm: <code>npm install phoundry-ui</code>
			</p>
			<div class="h-24"></div>
		</section>
		<section id="basic-usage">
			<h3 class="text-sm font-medium text-txt-primary">Usage</h3>
			<p class="mt-1 text-xs text-txt-secondary">
				Import the component and pass your items array.
			</p>
			<div class="h-24"></div>
		</section>
		<section id="basic-api">
			<h3 class="text-sm font-medium text-txt-primary">API Reference</h3>
			<p class="mt-1 text-xs text-txt-secondary">
				See the props table below for full API documentation.
			</p>
			<div class="h-24"></div>
		</section>
	</div>
</div>
