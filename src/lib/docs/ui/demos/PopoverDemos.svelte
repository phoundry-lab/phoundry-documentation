<script lang="ts">
	import Example from '$lib/docs/ui/Example.svelte';
	import Button from '$phoundry/components/buttons/Button.svelte';
	import { Popover, getPopoverManager } from '$phoundry/overlay/popover/index.js';
	import type { PopoverPlacement } from '$phoundry/overlay/popover/index.js';

	const programmaticPopover = getPopoverManager();

	let controlledOpen = $state(false);
	let stickyOpen = $state(false);
	const placements: PopoverPlacement[] = ['top', 'bottom-end', 'right', 'left'];

	const basicCode = `<Popover>
  {#snippet trigger(toggle)}
    <Button onclick={toggle}>Open Popover</Button>
  {/snippet}
  <div class="p-3 bg-surface-base rounded-lg border border-border-muted shadow-lg">
    <p class="text-sm">Popover content here</p>
  </div>
</Popover>`;

	const placementCode = `<Popover placement="top">...</Popover>
<Popover placement="bottom-end">...</Popover>
<Popover placement="right">...</Popover>`;

	const offsetCode = `<Popover placement="right-start" offset={12} flip={false}>
  {#snippet trigger(t)}
    <Button onclick={t}>Anchor</Button>
  {/snippet}
  <div class="p-3">…</div>
</Popover>`;

	const dismissibleCode = `<Popover dismissible={false} bind:open>
  {#snippet trigger(t)}<Button onclick={t}>Open</Button>{/snippet}
  <div>Use an explicit Close action</div>
</Popover>`;

	const controlledCode = `let open = $state(false);

<Popover bind:open>
  {#snippet trigger(toggle)}
    <Button onclick={toggle}>Toggle</Button>
  {/snippet}
  <div class="p-3">Controlled content</div>
</Popover>
<Button onclick={() => open = false}>Close from outside</Button>`;

	const programmaticCode = `import { getPopoverManager, PopoverOverlay } from 'phoundry-ui';

// In +layout.svelte after setupOverlays():
// <PopoverOverlay>{#snippet children()}…toolbar…{/snippet}</PopoverOverlay>

const popover = getPopoverManager();
popover.open({
  anchor: elementOrDomRect,
  placement: 'top',
  ariaLabel: 'Actions',
});`;
</script>

{#snippet programmaticDemo()}
	<div class="rounded-lg border border-border-muted bg-surface-base px-3 py-2 text-xs shadow-lg">
		Programmatic popover body
	</div>
{/snippet}

<div class="space-y-8">
	<Example title="Basic Popover" code={basicCode}>
		<Popover>
			{#snippet trigger(toggle)}
				<Button onclick={toggle}>Open Popover</Button>
			{/snippet}
			<div class="min-w-48 rounded-lg border border-border-muted bg-surface-base p-3 shadow-lg">
				<p class="mb-1 text-sm font-medium text-txt-primary">Popover Title</p>
				<p class="text-xs text-txt-secondary">This is a basic popover with some content.</p>
			</div>
		</Popover>
	</Example>

	<Example title="Placement Options" code={placementCode}>
		<div class="flex flex-wrap items-center gap-2">
			{#each placements as p (p)}
				<Popover placement={p}>
					{#snippet trigger(toggle)}
						<Button size="sm" onclick={toggle}>{p}</Button>
					{/snippet}
					<div class="rounded-lg border border-border-muted bg-surface-base p-2 shadow-lg">
						<p class="text-xs whitespace-nowrap text-txt-secondary">Placed: {p}</p>
					</div>
				</Popover>
			{/each}
		</div>
	</Example>

	<Example title="Offset & flip" code={offsetCode}>
		<p class="mb-2 text-xs text-txt-secondary">
			<code>offset</code> grows the gap from the anchor; <code>flip=false</code> keeps the requested placement even near viewport edges (may overflow - test on small screens).
		</p>
		<div class="flex justify-center py-4">
			<Popover placement="bottom" offset={16}>
				{#snippet trigger(toggle)}
					<Button size="sm" onclick={toggle}>offset 16</Button>
				{/snippet}
				<div class="rounded-lg border border-border-muted bg-surface-base p-3 text-xs shadow-lg">Extra breathing room from the trigger.</div>
			</Popover>
		</div>
	</Example>

	<Example title="Non-dismissible backdrop" code={dismissibleCode}>
		<p class="mb-2 text-xs text-txt-secondary">
			Outside clicks no longer close the surface - pair with a button that calls <code>toggle()</code> or clears <code>bind:open</code>.
		</p>
		<div class="flex flex-wrap items-center gap-2">
			<Popover dismissible={false} bind:open={stickyOpen}>
				{#snippet trigger(toggle)}
					<Button size="sm" onclick={toggle}>Open sticky</Button>
				{/snippet}
				<div class="min-w-52 rounded-lg border border-border-muted bg-surface-base p-3 text-xs shadow-lg">
					<p class="mb-2 text-txt-secondary">Backdrop clicks do nothing.</p>
					<Button size="sm" variant="primary" onclick={() => (stickyOpen = false)}>Close</Button>
				</div>
			</Popover>
		</div>
	</Example>

	<Example title="Controlled Open" code={controlledCode}>
		<div class="flex items-center gap-2">
			<Popover bind:open={controlledOpen}>
				{#snippet trigger(toggle)}
					<Button onclick={toggle}>Toggle Popover</Button>
				{/snippet}
				<div class="min-w-48 rounded-lg border border-border-muted bg-surface-base p-3 shadow-lg">
					<p class="text-sm text-txt-primary">Controlled popover</p>
					<p class="mt-1 text-xs text-txt-secondary">Open: {controlledOpen}</p>
				</div>
			</Popover>
			<Button size="sm" variant="outline" onclick={() => (controlledOpen = false)} disabled={!controlledOpen}>Close Externally</Button>
		</div>
	</Example>

	<Example title="Programmatic overlay" code={programmaticCode}>
		<p class="mb-2 text-xs text-txt-secondary">
			Use when the anchor is not a stable child of the overlay host (selection rects, hover targets). Mount
			<code>PopoverOverlay</code> once in the root layout; optional <code>content</code> on <code>open()</code> overrides the default child.
		</p>
		<Button
			size="sm"
			onclick={(e) => {
				const el = e.currentTarget as HTMLElement;
				programmaticPopover.open({
					anchor: el,
					placement: 'top',
					ariaLabel: 'Demo programmatic popover',
					content: programmaticDemo
				});
			}}
		>
			Open anchored to this button
		</Button>
	</Example>
</div>
