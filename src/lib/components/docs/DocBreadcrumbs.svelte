<script lang="ts">
	import Icon from '@iconify/svelte';
	import { buildDocBreadcrumbs } from '$lib/docs/doc-navigation.logic.js';
	import type { DocPage, DocSet } from '$lib/docs/types';

	interface Props {
		set: DocSet;
		current: DocPage;
	}

	let { set, current }: Props = $props();
	const breadcrumbs = $derived(buildDocBreadcrumbs(set, current));
</script>

<nav class={['doc-breadcrumbs', 'mb-6 min-w-0']} aria-label="Breadcrumb">
	<ol class={['doc-breadcrumbs__list', 'flex min-w-0 flex-wrap items-center gap-y-1']}>
		{#each breadcrumbs as breadcrumb, index (`${index}:${breadcrumb.label}`)}
			{#if index > 0}
				<li
					class={[
						'doc-breadcrumbs__separator',
						'flex shrink-0 items-center px-1 text-txt-tertiary'
					]}
					aria-hidden="true"
				>
					<Icon icon="phoundry-mono:chevron-right" width={12} height={12} />
				</li>
			{/if}
			<li class={['doc-breadcrumbs__item', 'max-w-full min-w-0']}>
				{#if breadcrumb.href}
					<a
						href={breadcrumb.href}
						class={[
							'doc-breadcrumbs__link',
							'text-xs font-medium text-txt-secondary no-underline hover:text-txt-primary'
						]}
					>
						{breadcrumb.label}
					</a>
				{:else}
					<span class={['doc-breadcrumbs__current', 'text-xs font-medium text-txt-primary']}>
						{breadcrumb.label}
					</span>
				{/if}
			</li>
		{/each}
	</ol>
</nav>
