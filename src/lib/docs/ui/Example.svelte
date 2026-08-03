<script lang="ts">
	import type { Snippet } from 'svelte';
	import CollapsibleSection from '$phoundry/components/display/CollapsibleSection.svelte';
	import CodeBlock from './CodeBlock.svelte';

	interface Props {
		title: string;
		code?: string;
		children: Snippet;
	}

	let { title, code, children }: Props = $props();
</script>

<section class="rounded-lg border border-border-muted bg-surface-base">
	<h3 class="border-b border-border-muted px-5 py-3 text-sm font-medium text-txt-primary">
		{title}
	</h3>
	<div class="p-5">
		{@render children()}
	</div>
	{#if code}
		<CollapsibleSection title="Show code" class="!border-none">
			<CodeBlock {code} />
		</CollapsibleSection>
	{/if}
</section>
