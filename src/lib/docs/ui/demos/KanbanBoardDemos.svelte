<script lang="ts">
	import Example from '$lib/docs/ui/Example.svelte';
	import KanbanBoard from '$phoundry/components/advanced/KanbanBoard.svelte';
	import type { KanbanColumn, KanbanMoveEvent } from '$phoundry/components/advanced/KanbanBoard.svelte';

	let columns = $state<KanbanColumn[]>([
		{
			id: 'todo',
			title: 'To Do',
			color: '#6366f1',
			cards: [
				{
					id: 'c1',
					title: 'Design landing page',
					description: 'Create mockups for the new landing page',
					labels: [{ text: 'design', color: '#8b5cf6' }]
				},
				{ id: 'c2', title: 'Set up CI/CD', labels: [{ text: 'devops', color: '#06b6d4' }] },
				{
					id: 'c3',
					title: 'Write API docs',
					description: 'Document REST endpoints',
					labels: [{ text: 'docs', color: '#f97316' }]
				}
			]
		},
		{
			id: 'progress',
			title: 'In Progress',
			color: '#f59e0b',
			cards: [
				{
					id: 'c4',
					title: 'Implement auth flow',
					description: 'OAuth2 + session management',
					labels: [{ text: 'backend', color: '#ef4444' }]
				},
				{
					id: 'c5',
					title: 'Build component library',
					labels: [{ text: 'frontend', color: '#22c55e' }]
				}
			]
		},
		{
			id: 'done',
			title: 'Done',
			color: '#22c55e',
			cards: [{ id: 'c6', title: 'Project setup', labels: [{ text: 'devops', color: '#06b6d4' }] }]
		}
	]);

	let lastAddColumn = $state('');

	function handleMove(event: KanbanMoveEvent) {
		const newColumns = columns.map((col) => ({
			...col,
			cards: col.cards.filter((c) => c.id !== event.card.id)
		}));
		const targetCol = newColumns.find((c) => c.id === event.toColumnId);
		if (targetCol) {
			targetCol.cards.splice(event.toIndex, 0, event.card);
		}
		columns = newColumns;
	}

	const basicCode = `let columns = $state([
  {
    id: 'todo', title: 'To Do', color: '#6366f1',
    cards: [
      { id: 'c1', title: 'Design landing page', labels: ['design'] },
      { id: 'c2', title: 'Set up CI/CD', labels: ['devops'] },
    ],
  },
  {
    id: 'progress', title: 'In Progress', color: '#f59e0b',
    cards: [
      { id: 'c3', title: 'Implement auth flow', labels: ['backend'] },
    ],
  },
  {
    id: 'done', title: 'Done', color: '#22c55e',
    cards: [],
  },
]);

function handleMove(event) {
  const newColumns = columns.map((col) => ({
    ...col,
    cards: col.cards.filter((c) => c.id !== event.card.id),
  }));
  const target = newColumns.find((c) => c.id === event.toColumnId);
  target.cards.splice(event.toIndex, 0, event.card);
  columns = newColumns;
}

<KanbanBoard {columns} onmove={handleMove} />`;

	const addCardCode = `{#snippet columnHeader(column)}
  <div class="flex items-center justify-between border-b px-3 py-2">
    <span class="text-xs font-semibold">{column.title}</span>
    <Button size="xs" variant="ghost" icon="carbon:add" iconOnly title="Add" onclick={() => onadd(column.id)} />
  </div>
{/snippet}

<KanbanBoard {columns} onmove={handleMove} onadd={(id) => openComposer(id)} {columnHeader} />`;
</script>

{#snippet columnHeader(column: KanbanColumn)}
	<div class="flex items-center justify-between gap-2 border-b border-border-muted px-3 py-2">
		<span class="truncate text-xs font-semibold text-txt-primary">{column.title}</span>
		<span class="shrink-0 rounded-full bg-surface-raised px-1.5 py-0.5 text-[10px] text-txt-tertiary">{column.cards.length}</span>
	</div>
{/snippet}

<div class="max-w-3xl space-y-8">
	<Example title="Basic Board" code={basicCode}>
		<KanbanBoard {columns} onmove={handleMove} />
	</Example>

	<Example title="Add-card footer & custom header" code={addCardCode}>
		<p class="mb-2 text-xs text-txt-secondary">
			<code>onadd</code> is separate from the optional header snippet - this demo uses both for illustration.
		</p>
		<KanbanBoard {columns} onmove={handleMove} onadd={(id) => (lastAddColumn = id)} columnHeader={columnHeader} />
		{#if lastAddColumn}
			<p class="mt-2 text-[11px] text-txt-tertiary">Last add click: <code>{lastAddColumn}</code></p>
		{/if}
	</Example>
</div>
