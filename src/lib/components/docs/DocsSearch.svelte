<script lang="ts">
	interface PagefindData {
		url: string;
		meta: { title?: string };
		excerpt?: string;
	}

	interface PagefindResult {
		data: () => Promise<PagefindData>;
	}

	interface PagefindApi {
		init?: () => Promise<void>;
		search: (query: string) => Promise<{ results: PagefindResult[] }>;
	}

	let query = $state('');
	let results = $state<PagefindData[]>([]);
	let open = $state(false);
	let loading = $state(false);
	let requestId = 0;
	let pagefind: Promise<PagefindApi> | null = null;

	async function loadPagefind(): Promise<PagefindApi> {
		if (!pagefind) {
			const pagefindPath = '/pagefind/pagefind.js';
			pagefind = import(/* @vite-ignore */ pagefindPath).then(async (module) => {
				const api = module as PagefindApi;
				await api.init?.();
				return api;
			});
		}
		return pagefind;
	}

	async function runSearch(value: string) {
		query = value;
		open = true;
		const normalized = value.trim();
		const currentRequest = ++requestId;

		if (normalized.length < 2) {
			results = [];
			loading = false;
			return;
		}

		loading = true;
		try {
			const api = await loadPagefind();
			const response = await api.search(normalized);
			const pages = await Promise.all(response.results.slice(0, 8).map((result) => result.data()));
			if (currentRequest === requestId) results = pages;
		} finally {
			if (currentRequest === requestId) loading = false;
		}
	}

	function closeAfterFocusLeaves(event: FocusEvent) {
		const container = event.currentTarget as HTMLElement;
		if (!container.contains(event.relatedTarget as Node | null)) open = false;
	}
</script>

<div class="docs-search" role="search" onfocusout={closeAfterFocusLeaves}>
	<label class="sr-only" for="docs-search-input">Search documentation</label>
	<span class="docs-search__icon" aria-hidden="true">⌕</span>
	<input
		id="docs-search-input"
		type="search"
		placeholder="Search docs"
		autocomplete="off"
		value={query}
		onfocus={() => (open = true)}
		oninput={(event) => void runSearch(event.currentTarget.value)}
		onkeydown={(event) => {
			if (event.key === 'Escape') open = false;
		}}
	/>

	{#if open && query.trim().length >= 2}
		<div class="docs-search__results" aria-live="polite">
			{#if loading}
				<p>Searching…</p>
			{:else if results.length === 0}
				<p>No documentation found.</p>
			{:else}
				<ul>
					{#each results as result (result.url)}
						<li>
							<a href={result.url}>{result.meta.title ?? result.url}</a>
						</li>
					{/each}
				</ul>
			{/if}
		</div>
	{/if}
</div>

<style>
	.docs-search {
		position: relative;
		width: min(15rem, 32vw);
	}

	.docs-search__icon {
		position: absolute;
		left: 0.55rem;
		top: 50%;
		transform: translateY(-53%);
		color: var(--text-tertiary);
		pointer-events: none;
	}

	input {
		width: 100%;
		height: 2rem;
		padding: 0 0.6rem 0 1.75rem;
		border: 1px solid var(--border-muted);
		border-radius: 0.375rem;
		background: var(--surface-base);
		color: var(--text-primary);
		font: inherit;
		font-size: 0.75rem;
	}

	input::placeholder { color: var(--text-tertiary); }
	input:focus-visible {
		outline: 2px solid var(--accent-primary);
		outline-offset: 1px;
	}

	.docs-search__results {
		position: absolute;
		top: calc(100% + 0.4rem);
		right: 0;
		z-index: 50;
		width: min(24rem, calc(100vw - 2rem));
		max-height: min(28rem, calc(100vh - 5rem));
		overflow-y: auto;
		padding: 0.4rem;
		border: 1px solid var(--border-muted);
		border-radius: 0.5rem;
		background: var(--surface-raised);
		box-shadow: 0 12px 32px rgb(0 0 0 / 0.22);
	}

	p { margin: 0; padding: 0.65rem; color: var(--text-secondary); font-size: 0.75rem; }
	ul { margin: 0; padding: 0; list-style: none; }
	a {
		display: block;
		padding: 0.55rem 0.65rem;
		border-radius: 0.375rem;
		color: var(--text-primary);
		font-size: 0.8rem;
		line-height: 1.25rem;
		text-decoration: none;
	}
	a:hover, a:focus-visible { background: var(--surface-sunken); }

	@media (max-width: 700px) {
		.docs-search { width: 2rem; }
		.docs-search:not(:focus-within) input { color: transparent; padding-right: 0; }
		.docs-search:focus-within { width: min(14rem, 52vw); }
	}
</style>
