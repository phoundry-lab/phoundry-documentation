<script lang="ts">
	import { dndList, dndItem, type DndItemData } from "phoundry-ui";

	interface ListItem extends DndItemData {
		id: string;
		label: string;
	}

	let itemsA = $state<ListItem[]>([
		{ id: "a1", label: "Alpha" },
		{ id: "a2", label: "Beta" },
	]);

	let itemsB = $state<ListItem[]>([
		{ id: "b1", label: "Gamma" },
		{ id: "b2", label: "Delta" },
	]);

	let pendingCross: { item: ListItem; fromListId: string } | null = null;

	const listAAttach = $derived(
		dndList({
			id: "cross-a",
			axis: "y",
			acceptFrom: ["cross-b"],
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
				pendingCross = { item: removed, fromListId: "cross-a" };
			},
			onReceive(item, fromListId, toIndex) {
				const data =
					pendingCross?.fromListId === fromListId
						? pendingCross.item
						: (item as ListItem);
				itemsA.splice(toIndex, 0, data);
				itemsA = [...itemsA];
				pendingCross = null;
			},
		}),
	);

	const listBAttach = $derived(
		dndList({
			id: "cross-b",
			axis: "y",
			acceptFrom: ["cross-a"],
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
				pendingCross = { item: removed, fromListId: "cross-b" };
			},
			onReceive(item, fromListId, toIndex) {
				const data =
					pendingCross?.fromListId === fromListId
						? pendingCross.item
						: (item as ListItem);
				itemsB.splice(toIndex, 0, data);
				itemsB = [...itemsB];
				pendingCross = null;
			},
		}),
	);
</script>

<div class="grid grid-cols-2 gap-4">
	<div class="space-y-1">
		<p class="text-[10px] font-medium text-txt-secondary">List A</p>
		<div
			{@attach listAAttach}
			class="min-h-[120px] space-y-1 rounded border border-border-muted p-2"
		>
			{#each itemsA as item (item.id)}
				<div
					{@attach dndItem({ id: item.id, data: item })}
					class="cursor-grab rounded bg-surface-raised px-2 py-1.5 text-xs text-txt-primary"
				>
					{item.label}
				</div>
			{/each}
		</div>
	</div>
	<div class="space-y-1">
		<p class="text-[10px] font-medium text-txt-secondary">List B</p>
		<div
			{@attach listBAttach}
			class="min-h-[120px] space-y-1 rounded border border-border-muted p-2"
		>
			{#each itemsB as item (item.id)}
				<div
					{@attach dndItem({ id: item.id, data: item })}
					class="cursor-grab rounded bg-surface-raised px-2 py-1.5 text-xs text-txt-primary"
				>
					{item.label}
				</div>
			{/each}
		</div>
	</div>
</div>
