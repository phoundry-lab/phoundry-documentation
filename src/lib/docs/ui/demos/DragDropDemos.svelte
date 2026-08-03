<script lang="ts">
	import Example from '$lib/docs/ui/Example.svelte';
	import { dndList, dndItem, DndGhost, DndIndicator, type DndItemData } from '$phoundry/utilities/drag-drop/index.js';

	interface ListItem extends DndItemData {
		id: string;
		label: string;
	}

	let items = $state<ListItem[]>([
		{ id: '1', label: 'First item' },
		{ id: '2', label: 'Second item' },
		{ id: '3', label: 'Third item' },
		{ id: '4', label: 'Fourth item' },
		{ id: '5', label: 'Fifth item' }
	]);

	const sortableDemo = $derived(
		dndList({
			id: 'demo-list',
			axis: 'y',
			showZoneIndicator: false,
			onReorder(fromIndex, toIndex) {
				const moved = items.splice(fromIndex, 1)[0];
				items.splice(toIndex, 0, moved);
				items = [...items];
			}
		})
	);

	let itemsA = $state<ListItem[]>([
		{ id: 'a1', label: 'Alpha' },
		{ id: 'a2', label: 'Beta' }
	]);
	let itemsB = $state<ListItem[]>([
		{ id: 'b1', label: 'Gamma' },
		{ id: 'b2', label: 'Delta' }
	]);

	let pendingCross: { item: ListItem; fromListId: string } | null = null;

	const listAAttach = $derived(
		dndList({
			id: 'cross-a',
			axis: 'y',
			acceptFrom: ['cross-b'],
			showZoneIndicator: false,
			onReorder(fromIndex, toIndex) {
				const moved = itemsA.splice(fromIndex, 1)[0];
				itemsA.splice(toIndex, 0, moved);
				itemsA = [...itemsA];
			},
			onRemove(item: DndItemData) {
				const i = itemsA.findIndex((x) => String(x.id) === String(item.id));
				if (i < 0) return;
				const [removed] = itemsA.splice(i, 1);
				itemsA = [...itemsA];
				pendingCross = { item: removed, fromListId: 'cross-a' };
			},
			onReceive(item, fromListId, toIndex) {
				const data = pendingCross?.fromListId === fromListId ? pendingCross.item : (item as ListItem);
				itemsA.splice(toIndex, 0, data);
				itemsA = [...itemsA];
				pendingCross = null;
			}
		})
	);

	const listBAttach = $derived(
		dndList({
			id: 'cross-b',
			axis: 'y',
			acceptFrom: ['cross-a'],
			showZoneIndicator: false,
			onReorder(fromIndex, toIndex) {
				const moved = itemsB.splice(fromIndex, 1)[0];
				itemsB.splice(toIndex, 0, moved);
				itemsB = [...itemsB];
			},
			onRemove(item: DndItemData) {
				const i = itemsB.findIndex((x) => String(x.id) === String(item.id));
				if (i < 0) return;
				const [removed] = itemsB.splice(i, 1);
				itemsB = [...itemsB];
				pendingCross = { item: removed, fromListId: 'cross-b' };
			},
			onReceive(item, fromListId, toIndex) {
				const data = pendingCross?.fromListId === fromListId ? pendingCross.item : (item as ListItem);
				itemsB.splice(toIndex, 0, data);
				itemsB = [...itemsB];
				pendingCross = null;
			}
		})
	);

	const basicCode = `<script lang="ts">
  import {
    dndList,
    dndItem,
    DndGhost,
    DndIndicator,
  } from 'phoundry-ui';

  interface Row extends Record<string, unknown> {
    id: string;
    label: string;
  }

  let items = $state<Row[]>([
    { id: '1', label: 'First' },
    { id: '2', label: 'Second' },
  ]);

  const list = $derived(
    dndList({
      id: 'my-list',
      axis: 'y',
      showZoneIndicator: false,
      onReorder(fromIndex, toIndex) {
        const moved = items.splice(fromIndex, 1)[0];
        items.splice(toIndex, 0, moved);
        items = [...items];
      },
    }),
  );
<${'/'}script>

<div {@attach list} class="space-y-1">
  {#each items as item (item.id)}
    <div
      {@attach dndItem({ id: item.id, data: item })}
      class="rounded border px-3 py-2 text-xs"
    >
      {item.label}
    </div>
  {/each}
</div>

<DndGhost />
<DndIndicator />`;

	const crossCode = `// List A
const listA = $derived(dndList({
  id: 'list-a',
  acceptFrom: ['list-b'],
  onReorder: ...,
  onRemove(item) { /* remove from A, set pending */ },
  onReceive(item, fromId, toIndex) { /* insert into A */ },
}));

// List B - mirror with acceptFrom: ['list-a']`;
</script>

<div class="max-w-3xl space-y-8">
	<Example title="Sortable list" code={basicCode}>
		<div class="space-y-2">
			<div {@attach sortableDemo} class="space-y-1">
				{#each items as item (item.id)}
					<div
						{@attach dndItem({ id: item.id, data: item })}
						class="cursor-grab rounded border border-border-muted bg-surface-raised px-3 py-2 text-xs text-txt-primary transition-colors select-none hover:border-border-default"
					>
						{item.label}
					</div>
				{/each}
			</div>
			<p class="text-[11px] text-txt-tertiary">
				Drag to reorder. Import bundled styles (<code>phoundry-ui/styles/components.css</code>) so <code>dnd.css</code> applies (grab cursor, dragging opacity, zone hints).
			</p>
		</div>
	</Example>

	<Example title="Cross-list transfer" code={crossCode}>
		<div class="grid grid-cols-2 gap-4">
			<div class="space-y-1">
				<p class="text-[10px] font-medium text-txt-secondary">List A</p>
				<div {@attach listAAttach} class="min-h-[120px] space-y-1 rounded border border-border-muted p-2">
					{#each itemsA as item (item.id)}
						<div {@attach dndItem({ id: item.id, data: item })} class="cursor-grab rounded bg-surface-raised px-2 py-1.5 text-xs text-txt-primary">
							{item.label}
						</div>
					{/each}
				</div>
			</div>
			<div class="space-y-1">
				<p class="text-[10px] font-medium text-txt-secondary">List B</p>
				<div {@attach listBAttach} class="min-h-[120px] space-y-1 rounded border border-border-muted p-2">
					{#each itemsB as item (item.id)}
						<div {@attach dndItem({ id: item.id, data: item })} class="cursor-grab rounded bg-surface-raised px-2 py-1.5 text-xs text-txt-primary">
							{item.label}
						</div>
					{/each}
				</div>
			</div>
		</div>
	</Example>

	<DndGhost />
	<DndIndicator />
</div>
