<script lang="ts">
	import Example from '$lib/docs/ui/Example.svelte';
	import { createRovingTabIndex } from '$phoundry/utilities/focus/roving-tabindex.svelte.js';

	let focusedH = $state(0);
	const hRoving = createRovingTabIndex({
		orientation: 'horizontal',
		loop: true,
		onFocus: (_el, idx) => (focusedH = idx)
	});

	let focusedV = $state(0);
	const vRoving = createRovingTabIndex({
		orientation: 'vertical',
		loop: true,
		onFocus: (_el, idx) => (focusedV = idx)
	});

	let focusedBoth = $state(0);
	const bothRoving = createRovingTabIndex({
		orientation: 'both',
		loop: false,
		itemSelector: '[data-roving-item]',
		onFocus: (_el, idx) => (focusedBoth = idx)
	});

	const toolbarItems = ['Bold', 'Italic', 'Underline', 'Strikethrough', 'Code'];
	const menuItems = ['Profile', 'Settings', 'Notifications', 'Logout'];
	const gridItems = ['A1', 'A2', 'B1', 'B2'];

	const horizontalCode = `<script lang="ts">
  import { createRovingTabIndex } from 'phoundry-ui';

  let focused = $state(0);
  const roving = createRovingTabIndex({
    orientation: 'horizontal',
    loop: true,
    onFocus: (_el, idx) => (focused = idx),
  });

  const items = ['Bold', 'Italic', 'Underline', 'Strikethrough', 'Code'];
<${'/'}script>

<div use:roving.action class="flex gap-1" role="toolbar">
  {#each items as item, i}
    <button
      data-roving-item
      class="px-3 py-1.5 rounded text-xs"
      class:bg-accent-primary={focused === i}
    >
      {item}
    </button>
  {/each}
</div>`;

	const verticalCode = `<div use:roving.action class="flex flex-col" role="menu">
  {#each items as item}
    <button role="menuitem" class="px-3 py-2 text-left text-xs rounded hover:bg-surface-raised">
      {item}
    </button>
  {/each}
</div>`;

	const bothCode = `const roving = createRovingTabIndex({
  orientation: 'both',
  loop: false,
  itemSelector: '[data-roving-item]',
});

<div use:roving.action class="grid grid-cols-2 gap-1" role="group">
  {#each cells as cell}
    <button type="button" data-roving-item class="rounded px-2 py-1 text-xs">{cell}</button>
  {/each}
</div>`;
</script>

<div class="max-w-3xl space-y-8">
	<Example title="Horizontal Toolbar" code={horizontalCode}>
		<div class="space-y-3">
			<div use:hRoving.action class="flex gap-1" role="toolbar">
				{#each toolbarItems as item, i (item)}
					<button
						data-roving-item
						class="rounded px-3 py-1.5 text-xs transition-colors {focusedH === i ? 'bg-accent-primary text-white' : 'bg-surface-raised text-txt-secondary hover:bg-surface-overlay'}"
					>
						{item}
					</button>
				{/each}
			</div>
			<p class="text-[11px] text-txt-tertiary">
				Tab into the toolbar, then use <kbd>←</kbd> <kbd>→</kbd> to navigate. Focused:
				<strong>{toolbarItems[focusedH]}</strong>
			</p>
		</div>
	</Example>

	<Example title="Both axes (grid)" code={bothCode}>
		<p class="mb-2 text-[11px] text-txt-secondary">
			<code>orientation="both"</code> wires ↑↓←→; <code>loop=false</code> stops wrapping at edges - good for spatial palettes.
		</p>
		<div use:bothRoving.action class="grid w-44 grid-cols-2 gap-1 rounded-lg border border-border-muted p-2" role="group" aria-label="Demo grid">
			{#each gridItems as item, i (item)}
				<button
					type="button"
					data-roving-item
					class="rounded px-2 py-2 text-xs transition-colors {focusedBoth === i ? 'bg-accent-primary text-white' : 'bg-surface-raised text-txt-secondary hover:bg-surface-overlay'}"
				>
					{item}
				</button>
			{/each}
		</div>
		<p class="mt-2 text-[11px] text-txt-tertiary">Focused: {gridItems[focusedBoth]}</p>
	</Example>

	<Example title="Vertical Menu" code={verticalCode}>
		<div class="space-y-3">
			<div use:vRoving.action class="flex w-48 flex-col overflow-hidden rounded-lg border border-border-muted" role="menu">
				{#each menuItems as item, i (item)}
					<button
						role="menuitem"
						class="px-3 py-2 text-left text-xs transition-colors {focusedV === i ? 'bg-accent-primary/15 text-accent-secondary' : 'text-txt-secondary hover:bg-surface-raised'}"
					>
						{item}
					</button>
				{/each}
			</div>
			<p class="text-[11px] text-txt-tertiary">
				Use <kbd>↑</kbd> <kbd>↓</kbd> to navigate. <kbd>Home</kbd> / <kbd>End</kbd> jump to first/last.
			</p>
		</div>
	</Example>
</div>
