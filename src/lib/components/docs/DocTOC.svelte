<script lang="ts">
	import { onMount, tick } from 'svelte';

	interface TocItem {
		id: string;
		text: string;
		depth: 2 | 3;
	}
	let { articleSelector = 'article.md-doc' }: { articleSelector?: string } = $props();
	let items = $state<TocItem[]>([]);
	let active = $state<string | null>(null);
	let el: HTMLElement | undefined = $state();

	function scan() {
		if (typeof document === 'undefined') return;
		const root = document.querySelector(articleSelector);
		if (!root) return;
		const hs = root.querySelectorAll<HTMLElement>('h2, h3');
		const out: TocItem[] = [];
		for (const h of hs) {
			if (!h.id) continue;
			out.push({
				id: h.id,
				text: h.textContent?.trim() ?? h.id,
				depth: h.tagName === 'H2' ? 2 : 3
			});
		}
		items = out;
	}

	onMount(() => {
		scan();
		const o = new IntersectionObserver(
			(entries) => {
				for (const e of entries) {
					if (e.isIntersecting) {
						if (e.target.id) active = e.target.id;
					}
				}
			},
			{ rootMargin: '-20% 0% -60% 0%' }
		);
		if (el) {
			tick().then(() => {
				scan();
				const root = document.querySelector(articleSelector);
				if (root) for (const h of root.querySelectorAll('h2, h3')) o.observe(h);
			});
		}
		return () => o.disconnect();
	});
</script>

{#if items.length > 0}
	<aside class="doc-toc" aria-label="On this page">
		<p class="doc-toc__label">On this page</p>
		<ul class="doc-toc__list" bind:this={el}>
			{#each items as it (it.id)}
				{@const isActive = active === it.id}
				<li class:is-nested={it.depth === 3}>
					<a
						href="#{it.id}"
						class="doc-toc__link"
						class:is-active={isActive}
					>
						{it.text}
					</a>
				</li>
			{/each}
		</ul>
	</aside>
{/if}

<style>
	.doc-toc {
		display: none;
		position: sticky;
		top: 4rem;
		align-self: start;
		max-height: calc(100svh - 4rem);
		overflow-y: auto;
		padding: 1.25rem 1rem 2rem 0.75rem;
	}

	@media (min-width: 1280px) {
		.doc-toc {
			display: block;
		}
	}

	.doc-toc__label {
		margin: 0 0 0.5rem;
		padding: 0 0.5rem;
		font-size: 0.625rem;
		font-weight: 600;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--text-tertiary);
		user-select: none;
	}

	.doc-toc__list {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 1px;
	}

	.doc-toc__list li.is-nested {
		padding-left: 0.75rem;
	}

	.doc-toc__link {
		display: block;
		padding: 0.25rem 0.5rem;
		font-size: 0.75rem;
		line-height: 1.4;
		color: var(--text-tertiary);
		text-decoration: none;
		border-radius: 0.375rem;
		transition: background 0.12s ease, color 0.12s ease;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.doc-toc__link:hover {
		color: var(--text-primary);
		background: color-mix(in oklab, var(--surface-raised) 50%, transparent);
	}
	.doc-toc__link.is-active {
		color: var(--accent-secondary);
		font-weight: 500;
	}
</style>
