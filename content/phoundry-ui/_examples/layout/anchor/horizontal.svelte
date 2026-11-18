<script lang="ts">
	import { Anchor } from "phoundry-ui";
	import type { AnchorItem } from "phoundry-ui";

	let horizontalContainer = $state<HTMLElement>();

	const basicItems: AnchorItem[] = [
		{ key: "basic-intro", href: "#basic-intro", title: "Introduction" },
		{ key: "basic-install", href: "#basic-install", title: "Installation" },
		{ key: "basic-usage", href: "#basic-usage", title: "Usage" },
		{ key: "basic-api", href: "#basic-api", title: "API Reference" },
	];
</script>

<div class="space-y-2">
	<Anchor
		items={basicItems.map((i) => ({
			...i,
			key: "hz-" + i.key,
			href: "#hz-" + i.key.replace("basic-", ""),
		}))}
		target={horizontalContainer}
		direction="horizontal"
		affix={false}
	/>
	<div
		bind:this={horizontalContainer}
		class="h-36 space-y-4 overflow-y-auto rounded-lg border border-border-muted p-4"
	>
		<section id="hz-intro">
			<h3 class="text-sm font-medium text-txt-primary">Introduction</h3>
			<p class="mt-1 text-xs text-txt-secondary">
				Horizontal anchor for compact navigation.
			</p>
			<div class="h-20"></div>
		</section>
		<section id="hz-install">
			<h3 class="text-sm font-medium text-txt-primary">Installation</h3>
			<p class="mt-1 text-xs text-txt-secondary">Same install process.</p>
			<div class="h-20"></div>
		</section>
		<section id="hz-usage">
			<h3 class="text-sm font-medium text-txt-primary">Usage</h3>
			<p class="mt-1 text-xs text-txt-secondary">
				Set direction to horizontal.
			</p>
			<div class="h-20"></div>
		</section>
		<section id="hz-api">
			<h3 class="text-sm font-medium text-txt-primary">API Reference</h3>
			<p class="mt-1 text-xs text-txt-secondary">Full API below.</p>
			<div class="h-20"></div>
		</section>
	</div>
</div>
