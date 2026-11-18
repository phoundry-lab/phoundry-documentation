<script lang="ts">
	import { Button } from "phoundry-ui";
	import { getPopoverManager } from "phoundry-ui";

	const programmaticPopover = getPopoverManager();
</script>

{#snippet programmaticDemo()}
	<div
		class="rounded-lg border border-border-muted bg-surface-base px-3 py-2 text-xs shadow-lg"
	>
		Programmatic popover body
	</div>
{/snippet}

<p class="mb-2 text-xs text-txt-secondary">
	Use when the anchor is not a stable child of the overlay host (selection
	rects, hover targets). Mount
	<code>PopoverOverlay</code> once in the root layout; optional
	<code>content</code>
	on <code>open()</code> overrides the default child.
</p>
<Button
	size="sm"
	onclick={(e) => {
		const el = e.currentTarget as HTMLElement;
		programmaticPopover.open({
			anchor: el,
			placement: "top",
			ariaLabel: "Demo programmatic popover",
			content: programmaticDemo,
		});
	}}
>
	Open anchored to this button
</Button>
