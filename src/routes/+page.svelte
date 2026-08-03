<script lang="ts">
	import { page } from '$app/state';
	import { siteUrl } from '$lib/urls';
	import type { DocSet } from '$lib/docs/types';

	let { data } = $props();
	const sets = $derived(
		(Object.values(data.manifest).filter((x) => x != null) as DocSet[])
	);

	const phialsUser = $derived(data.manifest.phials ?? null);
	const phialsDeveloper = $derived(data.manifest['phials-developer'] ?? null);
	const otherDocSets = $derived(
		sets.filter((s) => s.id !== 'phials' && s.id !== 'phials-developer')
	);

	const homeUrl = $derived(siteUrl('docs', '/', page.url));
	const ogImageAbsolute = $derived(new URL('/og-image.jpg', page.url).href);
</script>

<svelte:head>
	<title>Documentation – Phoundry</title>
	<meta
		name="description"
		content="Browse Phials and Phoundry UI documentation."
	/>
	<meta property="og:type" content="website" />
	<meta property="og:title" content="Documentation – Phoundry" />
	<meta
		property="og:description"
		content="Browse product documentation on docs.phoundry.app."
	/>
	<meta property="og:url" content={homeUrl} />
	<meta property="og:image" content={ogImageAbsolute} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Documentation – Phoundry" />
	<meta
		name="twitter:description"
		content="Browse product documentation on docs.phoundry.app."
	/>
	<meta name="twitter:image" content={ogImageAbsolute} />
</svelte:head>

<div class="docs-index">
	<header class="docs-index__header">
		<span class="docs-index__kicker">Phoundry Docs</span>
		<h1 class="docs-index__title">Documentation</h1>
		<p class="docs-index__lede">
			Pick a product to start browsing. Each set has its own guides, reference, and walkthroughs.
		</p>
	</header>

	<ul class="docs-index__grid">
		{#if phialsUser || phialsDeveloper}
			<li class="docs-index__phials">
				<div class="docs-index__card docs-index__card--phials phi-specular-card">
					<div class="docs-index__card-head">
						<div class="docs-index__card-icon" aria-hidden="true">
							<img src="/icons/phials-icon-32.svg" alt="" width="24" height="24" />
						</div>
						<h2 class="docs-index__card-title">Phials</h2>
					</div>
					<p class="docs-index__card-desc">
						User guides and developer documentation for the Phials desktop file manager.
					</p>
					<div class="docs-index__phials-actions">
						{#if phialsUser}
							<a
								href={siteUrl('docs', phialsUser.home.href, page.url)}
								class="docs-index__sub-link"
							>
								User guide
								<span aria-hidden="true">→</span>
							</a>
						{/if}
						{#if phialsDeveloper}
							<a
								href={siteUrl('docs', phialsDeveloper.home.href, page.url)}
								class="docs-index__sub-link"
							>
								Developer docs
								<span aria-hidden="true">→</span>
							</a>
						{/if}
					</div>
				</div>
			</li>
		{/if}
		{#each otherDocSets as m (m.id)}
			<li>
				<a href={siteUrl('docs', m.home.href, page.url)} class="docs-index__card phi-specular-card">
					<div class="docs-index__card-head">
						<div class="docs-index__card-icon" aria-hidden="true">
							{#if m.productSite}
								<img src={`/icons/${m.id}-icon-32.svg`} alt="" width="24" height="24" />
							{:else}
								<span class="docs-index__card-glyph">{m.title.charAt(0)}</span>
							{/if}
						</div>
						<h2 class="docs-index__card-title">{m.title}</h2>
						<span class="docs-index__card-arrow" aria-hidden="true">→</span>
					</div>
					{#if m.home.description}
						<p class="docs-index__card-desc">{m.home.description}</p>
					{/if}
				</a>
			</li>
		{/each}
	</ul>
</div>

<style>
	.docs-index {
		margin: 0 auto;
		width: 100%;
		max-width: 48rem;
	}

	.docs-index__header {
		display: flex;
		flex-direction: column;
		gap: 0.625rem;
		margin-bottom: 2.5rem;
	}

	.docs-index__kicker {
		font-family: 'Orbitron', var(--font-header);
		font-size: 0.6875rem;
		font-weight: 900;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: var(--text-tertiary);
	}

	.docs-index__title {
		margin: 0;
		font-family: var(--font-header);
		font-size: clamp(2rem, 4vw, 2.75rem);
		font-weight: 600;
		line-height: 1.1;
		letter-spacing: -0.02em;
		color: var(--text-primary);
	}

	.docs-index__lede {
		margin: 0;
		max-width: 36rem;
		font-size: 1rem;
		line-height: 1.6;
		color: var(--text-secondary);
	}

	.docs-index__grid {
		list-style: none;
		padding: 0;
		margin: 0;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));
		gap: 0.875rem;
	}

	.docs-index__card {
		display: flex;
		flex-direction: column;
		gap: 0.6rem;
		padding: 1.25rem;
		border: 1px solid var(--border-muted);
		border-radius: 0.75rem;
		background: color-mix(in oklab, var(--surface-base) 60%, transparent);
		text-decoration: none;
		transition: border-color 0.2s ease, background 0.2s ease, transform 0.2s ease;
	}
	.docs-index__card:hover {
		border-color: var(--border-emphasis);
		background: color-mix(in oklab, var(--surface-base) 85%, transparent);
	}

	.docs-index__card-head {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	.docs-index__card-icon {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 2rem;
		height: 2rem;
		border-radius: 0.5rem;
		background: color-mix(in oklab, var(--surface-raised) 70%, transparent);
		border: 1px solid var(--border-muted);
	}
	.docs-index__card-icon img {
		opacity: 0.9;
	}
	.docs-index__card-glyph {
		font-family: var(--font-header);
		font-size: 1rem;
		font-weight: 700;
		color: var(--text-secondary);
	}

	.docs-index__card-title {
		flex: 1;
		margin: 0;
		font-size: 1rem;
		font-weight: 600;
		color: var(--text-primary);
	}

	.docs-index__card-arrow {
		color: var(--text-tertiary);
		transition: color 0.15s ease, transform 0.15s ease;
	}
	.docs-index__card:hover .docs-index__card-arrow {
		color: var(--text-primary);
		transform: translateX(2px);
	}

	.docs-index__card-desc {
		margin: 0;
		font-size: 0.875rem;
		line-height: 1.5;
		color: var(--text-secondary);
	}

	.docs-index__card--phials {
		cursor: default;
	}

	.docs-index__phials-actions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin-top: 0.25rem;
	}

	.docs-index__sub-link {
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
		font-size: 0.8125rem;
		font-weight: 600;
		color: var(--text-primary);
		text-decoration: none;
		padding: 0.45rem 0.65rem;
		border-radius: 0.375rem;
		border: 1px solid var(--border-muted);
		background: color-mix(in oklab, var(--surface-raised) 45%, transparent);
		transition: border-color 0.15s ease, background 0.15s ease;
	}
	.docs-index__sub-link:hover {
		border-color: var(--border-emphasis);
		background: color-mix(in oklab, var(--surface-raised) 75%, transparent);
	}
	.docs-index__sub-link span {
		color: var(--text-tertiary);
		transition: transform 0.15s ease, color 0.15s ease;
	}
	.docs-index__sub-link:hover span {
		color: var(--text-primary);
		transform: translateX(2px);
	}
</style>
