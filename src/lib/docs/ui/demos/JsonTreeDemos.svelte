<script lang="ts">
	import Example from '$lib/docs/ui/Example.svelte';
	import JsonTree from '$phoundry/components/display/JsonTree.svelte';

	const sample = {
		name: 'Phials',
		count: 3,
		ok: true,
		nested: {
			theme: 'dark',
			tags: ['app', 'files']
		}
	};

	const arraySample = [
		{ id: 1, label: 'alpha' },
		{ id: 2, label: 'beta' }
	];

	const basicCode = `<JsonTree value={{ name: 'Phials', count: 3, nested: { theme: 'dark' } }} />`;

	const arrayCode = `<JsonTree value={[{ id: 1, label: 'alpha' }, { id: 2, label: 'beta' }]} />`;

	const expandedCode = `<JsonTree
  value={{ nested: { theme: 'dark', tags: ['app', 'files'] } }}
  defaultExpandDepth={2}
/>`;
</script>

<div class="space-y-8">
	<Example title="Object" code={basicCode}>
		<div class="rounded-md border border-border-muted bg-surface-sunken px-3 py-2">
			<JsonTree value={sample} />
		</div>
	</Example>

	<Example title="Array" code={arrayCode}>
		<div class="rounded-md border border-border-muted bg-surface-sunken px-3 py-2">
			<JsonTree value={arraySample} />
		</div>
	</Example>

	<Example title="Deeper default expand" code={expandedCode}>
		<p class="mb-2 text-xs text-txt-secondary">
			<code>defaultExpandDepth</code> of 2 opens the first nested object. The default is 1: root
			keys visible, nested containers collapsed.
		</p>
		<div class="rounded-md border border-border-muted bg-surface-sunken px-3 py-2">
			<JsonTree value={sample} defaultExpandDepth={2} />
		</div>
	</Example>
</div>
