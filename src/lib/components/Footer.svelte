<footer class="site-footer">
	<div>
		<a href="https://phoundry.app">Phoundry Lab</a>
		<span>Documentation for tools that respect your files.</span>
	</div>
	<nav aria-label="Footer">
		<a href="/phials">Phials</a>
		<a href="/phials-developer">Plugin docs</a>
		<a href="/phoundry-ui">Phoundry UI</a>
		<a href="https://github.com/phoundry-lab/phoundry-documentation">GitHub</a>
	</nav>
</footer>

<style>
	.site-footer {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		gap: 1.5rem;
		padding: 2rem clamp(1.5rem, 4vw, 3rem);
		border-top: 1px solid var(--border-muted);
		background: var(--surface-sunken);
		font-size: 0.75rem;
		color: var(--text-tertiary);
	}
	.site-footer div,
	.site-footer nav { display: flex; flex-wrap: wrap; gap: 1rem; }
	.site-footer a { color: var(--text-secondary); text-decoration: none; }
	.site-footer a:hover { color: var(--text-primary); }
</style>

