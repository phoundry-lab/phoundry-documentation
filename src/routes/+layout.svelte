<script lang="ts">
	import '../layout.css';
	import { page } from '$app/state';
	import { registerPhoundryIcons } from 'phoundry-ui/icons';
	import DocHeader from '$lib/components/docs/DocHeader.svelte';
	import DocShell from '$lib/components/docs/DocShell.svelte';
	import { Footer, JsonLd } from '$lib/components';
	import { organizationJsonLd } from '$lib/seo/structured-data';
	import type { DocPage, DocSet } from '$lib/docs/types';

	registerPhoundryIcons();

	let { children } = $props();
	const data = $derived(page.data);
	const shell = $derived.by(() => {
		if (!data || typeof data !== 'object' || !('docPage' in data) || !('set' in data)) return null;
		return { set: data.set as DocSet, docPage: data.docPage as DocPage };
	});
	const canonical = $derived(`https://docs.phoundry.app${page.url.pathname}`);
</script>

<svelte:head>
	<link rel="canonical" href={canonical} />
	<link rel="icon" href="/icons/phials-icon-32.svg" type="image/svg+xml" />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:ital,wght@0,100..900;1,100..900&family=Host+Grotesk:ital,wght@0,300..800;1,300..800&family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&family=Orbitron:wght@400..900&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<JsonLd data={organizationJsonLd()} />

<div class="docs-root bg-surface-sunken text-txt-primary flex min-h-svh flex-col">
	{#if shell}
		<DocShell set={shell.set} current={shell.docPage}>
			{@render children()}
		</DocShell>
	{:else}
		<DocHeader />
		<div class="docs-root__index">{@render children()}</div>
		<Footer />
	{/if}
</div>

<style>
	.docs-root__index { flex: 1; padding: 3rem 1.5rem 5rem; }
	@media (min-width: 768px) { .docs-root__index { padding: 4rem 2rem 6rem; } }
</style>

