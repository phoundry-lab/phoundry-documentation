<script lang="ts">
	import { createRovingTabIndex } from "phoundry-ui";

	let focusedH = $state(0);

	const hRoving = createRovingTabIndex({
		orientation: "horizontal",
		loop: true,
		onFocus: (_el, idx) => (focusedH = idx),
	});

	const toolbarItems = ["Bold", "Italic", "Underline", "Strikethrough", "Code"];
</script>

<div class="space-y-3">
	<div use:hRoving.action class="flex gap-1" role="toolbar">
		{#each toolbarItems as item, i (item)}
			<button
				data-roving-item
				class="rounded px-3 py-1.5 text-xs transition-colors {focusedH === i
					? 'bg-accent-primary text-white'
					: 'bg-surface-raised text-txt-secondary hover:bg-surface-overlay'}"
			>
				{item}
			</button>
		{/each}
	</div>
	<p class="text-[11px] text-txt-tertiary">
		Tab into the toolbar, then use <kbd>←</kbd> <kbd>→</kbd> to navigate.
		Focused:
		<strong>{toolbarItems[focusedH]}</strong>
	</p>
</div>
