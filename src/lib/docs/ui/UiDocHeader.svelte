<script lang="ts">
	import Separator from '$phoundry/components/display/Separator.svelte';
	import CodeBlock from './CodeBlock.svelte';
	import DocStatusChip from './DocStatusChip.svelte';
	import DocExperimentalCallout from './DocExperimentalCallout.svelte';
	import { getDocPageStatus } from '$lib/docs/doc-page-status.js';

	interface Props {
		title: string;
		description: string;
		importCode?: string;
	}

	let { title, description, importCode }: Props = $props();
	const status = $derived(getDocPageStatus());
</script>

<div class="mb-8">
	<h1 class="flex flex-wrap items-center gap-2 text-2xl font-semibold text-txt-primary">
		{title}
		{#if status}
			<DocStatusChip {status} />
		{/if}
	</h1>
	<p class="max-w-2xl text-sm text-txt-secondary">{description}</p>
	{#if importCode}
		<CodeBlock code={importCode} lang="ts" />
	{/if}
	{#if status === 'experimental'}
		<DocExperimentalCallout />
	{/if}
	<Separator />
</div>
