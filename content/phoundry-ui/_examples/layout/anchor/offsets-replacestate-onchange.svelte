<script lang="ts">
	import { Anchor } from "phoundry-ui";
	import type { AnchorItem } from "phoundry-ui";

	let offsetContainer = $state<HTMLElement>();

	let activeHash = $state("");

	const basicItems: AnchorItem[] = [
		{ key: "basic-intro", href: "#basic-intro", title: "Introduction" },
		{ key: "basic-install", href: "#basic-install", title: "Installation" },
		{ key: "basic-usage", href: "#basic-usage", title: "Usage" },
		{ key: "basic-api", href: "#basic-api", title: "API Reference" },
	];
</script>

<p class="mb-2 text-xs text-txt-secondary">
	<code>offsetTop</code> shifts which heading counts as “active” while
	scrolling.
	<code>targetOffset</code> controls the gap after clicking (defaults to
	<code>offsetTop</code>).
	<code>replace</code> avoids cluttering history on each jump.
</p>
<div class="flex gap-4">
	<Anchor
		items={basicItems.map((i) => ({
			...i,
			key: "off-" + i.key,
			href: "#off-" + i.key.replace("basic-", ""),
		}))}
		target={offsetContainer}
		offsetTop={28}
		targetOffset={12}
		replace
		affix={false}
		onChange={(href) => {
			activeHash = href;
		}}
	/>
	<div
		bind:this={offsetContainer}
		class="h-44 flex-1 space-y-4 overflow-y-auto rounded-lg border border-border-muted p-4"
	>
		<section id="off-intro">
			<h3 class="text-sm font-medium text-txt-primary">Introduction</h3>
			<p class="mt-1 text-xs text-txt-secondary">
				Scroll to see <code>onChange</code> update.
			</p>
			<div class="h-20"></div>
		</section>
		<section id="off-install">
			<h3 class="text-sm font-medium text-txt-primary">Installation</h3>
			<p class="mt-1 text-xs text-txt-secondary">Middle segment.</p>
			<div class="h-20"></div>
		</section>
		<section id="off-usage">
			<h3 class="text-sm font-medium text-txt-primary">Usage</h3>
			<p class="mt-1 text-xs text-txt-secondary">Another section.</p>
			<div class="h-20"></div>
		</section>
		<section id="off-api">
			<h3 class="text-sm font-medium text-txt-primary">API Reference</h3>
			<p class="mt-1 text-xs text-txt-secondary">Last segment.</p>
			<div class="h-20"></div>
		</section>
	</div>
</div>
{#if activeHash}
	<p class="mt-2 text-[11px] text-txt-tertiary">
		Active: <code>{activeHash}</code>
	</p>
{/if}
