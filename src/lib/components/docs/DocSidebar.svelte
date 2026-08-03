<script lang="ts">
	import Icon from '@iconify/svelte';
	import { resolveDocSidebarIcon } from '$lib/docs/doc-page-frontmatter.js';
	import { buildDocSidebarRows } from '$lib/docs/doc-navigation.logic.js';
	import type { DocPage, DocSet } from '$lib/docs/types';
	import DocStatusChip from '$lib/docs/ui/DocStatusChip.svelte';

	interface Props {
		set: DocSet;
		current: DocPage;
	}

	let { set, current }: Props = $props();
	let expansionOverrides = $state<Record<string, boolean>>({});

	const rows = $derived(buildDocSidebarRows(set, current.slug, expansionOverrides));
	const depthClasses = ['pl-2', 'pl-5', 'pl-8', 'pl-11'] as const;

	function classesForDepth(depth: number): string {
		return depthClasses[Math.min(depth, depthClasses.length - 1)]!;
	}

	function toggleGroup(groupId: string, expanded: boolean) {
		expansionOverrides[groupId] = !expanded;
	}
</script>

<nav
	class={[
		'doc-sidebar',
		'sticky top-16 hidden h-[calc(100svh-4rem)] self-start overflow-y-auto border-r border-border-muted py-5 pr-3 pl-4 md:block'
	]}
	aria-label="Documentation"
>
	<div class={['doc-sidebar__inner', 'flex flex-col gap-0.5']}>
		<a
			href={set.home.href}
			data-active={current.slug === set.home.slug || undefined}
			class={[
				'doc-sidebar__home',
				'flex items-center gap-1.5 rounded-md px-2 py-1.5 text-[0.8125rem] leading-snug text-txt-secondary no-underline hover:bg-surface-raised hover:text-txt-primary',
				'data-active:bg-accent-primary/15 data-active:font-medium data-active:text-accent-secondary'
			]}
		>
			{#if set.home.icon}
				<span
					class={['doc-sidebar__icon', 'inline-flex shrink-0 items-center justify-center']}
					aria-hidden="true"
				>
					<Icon icon={set.home.icon} width={15} height={15} />
				</span>
			{/if}
			<span class={['doc-sidebar__link-label', 'min-w-0 flex-1']}>{set.home.title}</span>
		</a>

		{#each set.looseTopPages as page (page.slug)}
			{#if !page.hidden}
				<a
					href={page.href}
					data-active={current.slug === page.slug || undefined}
					class={[
						'doc-sidebar__page',
						'flex items-center gap-1.5 rounded-md px-2 py-1.5 text-[0.8125rem] leading-snug text-txt-secondary no-underline hover:bg-surface-raised hover:text-txt-primary',
						'data-active:bg-accent-primary/15 data-active:font-medium data-active:text-accent-secondary'
					]}
				>
					{#if page.icon}
						<span
							class={['doc-sidebar__icon', 'inline-flex shrink-0 items-center justify-center']}
							aria-hidden="true"
						>
							<Icon icon={page.icon} width={15} height={15} />
						</span>
					{/if}
					<span class={['doc-sidebar__link-label', 'min-w-0 flex-1']}>{page.title}</span>
					{#if page.status}<DocStatusChip status={page.status} />{/if}
				</a>
			{/if}
		{/each}

		{#each rows as row (row.kind === 'group' ? `group:${row.group.id}` : `page:${row.page.slug}`)}
			{#if row.kind === 'group'}
				<div
					data-active={row.active || undefined}
					data-ancestor={row.ancestorOfActive || undefined}
					class={[
						'doc-sidebar__group-row',
						'flex min-w-0 items-center rounded-md text-txt-secondary hover:bg-surface-raised hover:text-txt-primary',
						'data-active:bg-accent-primary/15 data-active:font-medium data-active:text-accent-secondary data-ancestor:text-txt-primary',
						classesForDepth(row.depth)
					]}
				>
					{#if row.group.indexPage}
						<a
							href={row.group.indexPage.href}
							class={[
								'doc-sidebar__group-link',
								'flex min-w-0 flex-1 items-center gap-1.5 py-1.5 text-[0.8125rem] leading-snug no-underline'
							]}
						>
							{#if row.group.icon}
								<span
									class={['doc-sidebar__icon', 'inline-flex shrink-0 items-center justify-center']}
									aria-hidden="true"
								>
									<Icon icon={row.group.icon} width={15} height={15} />
								</span>
							{/if}
							<span class={['doc-sidebar__link-label', 'min-w-0 flex-1']}>{row.group.title}</span>
						</a>
					{:else}
						<span
							class={[
								'doc-sidebar__group-label',
								'flex min-w-0 flex-1 items-center gap-1.5 py-1.5 text-[0.8125rem] leading-snug'
							]}
						>
							{row.group.title}
						</span>
					{/if}
					<button
						type="button"
						aria-label={`${row.expanded ? 'Collapse' : 'Expand'} ${row.group.title}`}
						aria-expanded={row.expanded}
						class={[
							'doc-sidebar__disclosure',
							'mr-1 flex h-6 w-6 shrink-0 items-center justify-center rounded text-txt-tertiary hover:bg-surface-overlay hover:text-txt-primary'
						]}
						onclick={() => toggleGroup(row.group.id, row.expanded)}
					>
						<Icon
							icon="phoundry-mono:chevron-right"
							width={13}
							height={13}
							class={[
								'doc-sidebar__disclosure-icon',
								'transition-transform duration-150',
								row.expanded && 'rotate-90'
							]}
						/>
					</button>
				</div>
			{:else}
				{@const pageIcon = resolveDocSidebarIcon(row.page.icon, row.fallbackIcon)}
				<a
					href={row.page.href}
					data-active={row.active || undefined}
					class={[
						'doc-sidebar__page',
						'flex items-center gap-1.5 rounded-md py-1.5 pr-2 text-[0.8125rem] leading-snug text-txt-secondary no-underline hover:bg-surface-raised hover:text-txt-primary',
						'data-active:bg-accent-primary/15 data-active:font-medium data-active:text-accent-secondary',
						classesForDepth(row.depth)
					]}
				>
					{#if pageIcon}
						<span
							class={['doc-sidebar__icon', 'inline-flex shrink-0 items-center justify-center']}
							aria-hidden="true"
						>
							<Icon icon={pageIcon} width={15} height={15} />
						</span>
					{/if}
					<span class={['doc-sidebar__link-label', 'min-w-0 flex-1']}>{row.page.title}</span>
					{#if row.page.status}<DocStatusChip status={row.page.status} />{/if}
				</a>
			{/if}
		{/each}
	</div>
</nav>
