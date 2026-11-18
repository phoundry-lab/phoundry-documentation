<script lang="ts">
	import { createRovingTabIndex } from "phoundry-ui";

	let focusedBoth = $state(0);

	const bothRoving = createRovingTabIndex({
		orientation: "both",
		loop: false,
		itemSelector: "[data-roving-item]",
		onFocus: (_el, idx) => (focusedBoth = idx),
	});

	const gridItems = ["A1", "A2", "B1", "B2"];
</script>

<p class="mb-2 text-[11px] text-txt-secondary">
	<code>orientation="both"</code> wires ↑↓←→; <code>loop=false</code> stops wrapping
	at edges - good for spatial palettes.
</p>
<div
	use:bothRoving.action
	class="grid w-44 grid-cols-2 gap-1 rounded-lg border border-border-muted p-2"
	role="group"
	aria-label="Demo grid"
>
	{#each gridItems as item, i (item)}
		<button
			type="button"
			data-roving-item
			class="rounded px-2 py-2 text-xs transition-colors {focusedBoth === i
				? 'bg-accent-primary text-white'
				: 'bg-surface-raised text-txt-secondary hover:bg-surface-overlay'}"
		>
			{item}
		</button>
	{/each}
</div>
<p class="mt-2 text-[11px] text-txt-tertiary">
	Focused: {gridItems[focusedBoth]}
</p>
