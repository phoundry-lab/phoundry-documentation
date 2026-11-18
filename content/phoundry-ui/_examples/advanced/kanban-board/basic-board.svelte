<script lang="ts">
	import { KanbanBoard } from "phoundry-ui";
	import type { KanbanColumn, KanbanMoveEvent } from "phoundry-ui";

	let columns = $state<KanbanColumn[]>([
		{
			id: "todo",
			title: "To Do",
			color: "#6366f1",
			cards: [
				{
					id: "c1",
					title: "Design landing page",
					description: "Create mockups for the new landing page",
					labels: [{ text: "design", color: "#8b5cf6" }],
				},
				{
					id: "c2",
					title: "Set up CI/CD",
					labels: [{ text: "devops", color: "#06b6d4" }],
				},
				{
					id: "c3",
					title: "Write API docs",
					description: "Document REST endpoints",
					labels: [{ text: "docs", color: "#f97316" }],
				},
			],
		},
		{
			id: "progress",
			title: "In Progress",
			color: "#f59e0b",
			cards: [
				{
					id: "c4",
					title: "Implement auth flow",
					description: "OAuth2 + session management",
					labels: [{ text: "backend", color: "#ef4444" }],
				},
				{
					id: "c5",
					title: "Build component library",
					labels: [{ text: "frontend", color: "#22c55e" }],
				},
			],
		},
		{
			id: "done",
			title: "Done",
			color: "#22c55e",
			cards: [
				{
					id: "c6",
					title: "Project setup",
					labels: [{ text: "devops", color: "#06b6d4" }],
				},
			],
		},
	]);

	function handleMove(event: KanbanMoveEvent) {
		const newColumns = columns.map((col) => ({
			...col,
			cards: col.cards.filter((c) => c.id !== event.card.id),
		}));
		const targetCol = newColumns.find((c) => c.id === event.toColumnId);
		if (targetCol) {
			targetCol.cards.splice(event.toIndex, 0, event.card);
		}
		columns = newColumns;
	}
</script>

<KanbanBoard {columns} onmove={handleMove} />
