<script lang="ts">
	let { data }: { data: Record<string, unknown> | Record<string, unknown>[] } = $props();
</script>

<svelte:head>
	{@html `<script type="application/ld+json">${JSON.stringify(data).replaceAll('<', '\\u003c')}</script>`}
</svelte:head>

