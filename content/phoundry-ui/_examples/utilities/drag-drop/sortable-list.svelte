<script lang="ts">
	import { dndList, dndItem, type DndItemData } from "phoundry-ui";

	interface ListItem extends DndItemData {
		id: string;
		label: string;
	}

	let items = $state<ListItem[]>([
		{ id: "1", label: "First item" },
		{ id: "2", label: "Second item" },
		{ id: "3", label: "Third item" },
		{ id: "4", label: "Fourth item" },
		{ id: "5", label: "Fifth item" },
	]);

	const sortableDemo = $derived(
		dndList({
			id: "demo-list",
			axis: "y",
			showZoneIndicator: false,
			onReorder(fromIndex, toIndex) {
				const moved = items.splice(fromIndex, 1)[0];
				items.splice(toIndex, 0, moved);
				items = [...items];
			},
		}),
	);
</script>

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
		Drag to reorder. Import bundled styles (<code
			>phoundry-ui/styles/components.css</code
		>) so <code>dnd.css</code> applies (grab cursor, dragging opacity, zone hints).
	</p>
</div>
