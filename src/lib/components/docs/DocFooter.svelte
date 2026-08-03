<script lang="ts">
	import type { DocSet, DocPage } from '$lib/docs/types';

	interface Props {
		set: DocSet;
		current: DocPage;
	}
	let { set, current }: Props = $props();

	const flat = $derived(set.flatPageOrder);
	const i = $derived(flat.findIndex((p) => p.slug === current.slug));
	const prev = $derived(i > 0 ? flat[i - 1]! : null);
	const next = $derived(i < flat.length - 1 && i >= 0 ? flat[i + 1]! : null);

	const editUrl = $derived.by(() => {
		return joinEditUrl(
			'https://github.com/phoundry-lab/phoundry-documentation/edit/main',
			current.filePath
		);
	});

	function joinEditUrl(base: string, filePath: string): string {
		const b = base.replace(/\/+$/, '');
		const p = filePath.replace(/^\/+/, '');
		return `${b}/${p}`;
	}
</script>

<footer class="doc-footer">
	<div class="doc-footer__pagination">
		<div class="doc-footer__slot">
			{#if prev}
				<a href={prev.href} class="doc-footer__link doc-footer__link--prev">
					<span class="doc-footer__link-label">← Previous</span>
					<span class="doc-footer__link-title">{prev.title}</span>
				</a>
			{/if}
		</div>

		<div class="doc-footer__slot">
			{#if next}
				<a href={next.href} class="doc-footer__link doc-footer__link--next">
					<span class="doc-footer__link-label">Next →</span>
					<span class="doc-footer__link-title">{next.title}</span>
				</a>
			{/if}
		</div>
	</div>

	{#if editUrl}
		<div class="doc-footer__meta">
			<a href={editUrl} class="doc-footer__edit" rel="noopener noreferrer">
				Edit this page on GitHub →
			</a>
		</div>
	{/if}
</footer>

<style>
	.doc-footer {
		margin-top: 4rem;
		padding-top: 1.75rem;
		border-top: 1px solid var(--border-muted);
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
	}

	.doc-footer__pagination {
		display: grid;
		grid-template-columns: 1fr;
		gap: 0.75rem;
	}

	@media (min-width: 640px) {
		.doc-footer__pagination {
			grid-template-columns: 1fr 1fr;
		}
	}

	.doc-footer__slot {
		display: flex;
	}

	.doc-footer__link {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		width: 100%;
		min-height: 4rem;
		padding: 0.75rem 1rem;
		border: 1px solid var(--border-muted);
		border-radius: 0.5rem;
		background: color-mix(in oklab, var(--surface-base) 40%, transparent);
		text-decoration: none;
		transition: border-color 0.15s ease, background 0.15s ease, transform 0.15s ease;
	}
	.doc-footer__link:hover {
		border-color: var(--border-emphasis);
		background: color-mix(in oklab, var(--surface-raised) 50%, transparent);
	}

	.doc-footer__link--next {
		margin-left: auto;
		text-align: right;
		align-items: flex-end;
	}

	.doc-footer__link-label {
		font-size: 0.6875rem;
		font-weight: 600;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--text-tertiary);
	}

	.doc-footer__link-title {
		font-size: 0.875rem;
		font-weight: 500;
		color: var(--text-primary);
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		max-width: 100%;
	}

	.doc-footer__meta {
		display: flex;
		justify-content: center;
	}

	.doc-footer__edit {
		font-size: 0.75rem;
		color: var(--text-tertiary);
		text-decoration: none;
		transition: color 0.15s ease;
	}
	.doc-footer__edit:hover {
		color: var(--text-primary);
	}
</style>
