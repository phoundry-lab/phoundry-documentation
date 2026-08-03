<script lang="ts">
	import DocHeader from './DocHeader.svelte';
	import DocSidebar from './DocSidebar.svelte';
	import DocBreadcrumbs from './DocBreadcrumbs.svelte';
	import DocFooter from './DocFooter.svelte';
	import DocTOC from './DocTOC.svelte';
	import UiDocsOverlays from './UiDocsOverlays.svelte';
	import type { DocSet, DocPage } from '$lib/docs/types';
	import type { Snippet } from 'svelte';
	import { Footer } from '$lib/components';

	interface Props {
		set: DocSet;
		current: DocPage;
		children: Snippet;
	}
	let { set, current, children }: Props = $props();

	/** The phoundry-ui set embeds live demos that need the overlay stack (modal, tooltip, …). */
	const needsOverlays = $derived(set.id === 'phoundry-ui');
</script>

<div class="doc-shell bg-surface-base">
	<DocHeader {set} />

	<div class="doc-shell__body">
		<DocSidebar {set} {current} />

		<main class="doc-shell__main">
			<div class="doc-shell__content">
				<DocBreadcrumbs {set} {current} />
				{#if needsOverlays}
					<UiDocsOverlays>
						{@render children?.()}
					</UiDocsOverlays>
				{:else}
					{@render children?.()}
				{/if}
				<DocFooter {set} {current} />
			</div>
		</main>

		<DocTOC articleSelector=".md-doc" />
	</div>

	<Footer />
</div>

<style>
	.doc-shell {
		display: flex;
		flex-direction: column;
		min-height: 100svh;
	}

	.doc-shell__body {
		flex: 1;
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		width: 100%;
	}

	@media (min-width: 768px) {
		.doc-shell__body {
			grid-template-columns: 16rem minmax(0, 1fr);
		}
	}

	@media (min-width: 1280px) {
		.doc-shell__body {
			grid-template-columns: 16rem minmax(0, 1fr) 14rem;
		}
	}

	.doc-shell__main {
		min-width: 0;
		padding: 2rem 1.25rem 4rem;
	}

	@media (min-width: 640px) {
		.doc-shell__main {
			padding: 2.5rem 2rem 5rem;
		}
	}

	@media (min-width: 1024px) {
		.doc-shell__main {
			padding: 3rem 3rem 6rem;
		}
	}

	.doc-shell__content {
		max-width: 46rem;
		margin: 0 auto;
	}
</style>
