<script lang="ts">
	import { createRovingTabIndex } from "phoundry-ui";

	let focusedV = $state(0);

	const vRoving = createRovingTabIndex({
		orientation: "vertical",
		loop: true,
		onFocus: (_el, idx) => (focusedV = idx),
	});

	const menuItems = ["Profile", "Settings", "Notifications", "Logout"];
</script>

<div class="space-y-3">
	<div
		use:vRoving.action
		class="flex w-48 flex-col overflow-hidden rounded-lg border border-border-muted"
		role="menu"
	>
		{#each menuItems as item, i (item)}
			<button
				role="menuitem"
				class="px-3 py-2 text-left text-xs transition-colors {focusedV === i
					? 'bg-accent-primary/15 text-accent-secondary'
					: 'text-txt-secondary hover:bg-surface-raised'}"
			>
				{item}
			</button>
		{/each}
	</div>
	<p class="text-[11px] text-txt-tertiary">
		Use <kbd>↑</kbd> <kbd>↓</kbd> to navigate. <kbd>Home</kbd> / <kbd>End</kbd> jump
		to first/last.
	</p>
</div>
