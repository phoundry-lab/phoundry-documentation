<script lang="ts">
	import Example from '$lib/docs/ui/Example.svelte';
	import Sheet from '$phoundry/components/advanced/Sheet.svelte';
	import Button from '$phoundry/components/buttons/Button.svelte';

	let rightOpen = $state(false);
	let leftOpen = $state(false);
	let bottomOpen = $state(false);
	let topOpen = $state(false);
	let fullOpen = $state(false);
	let modalLikeOpen = $state(false);

	const rightCode = `let open = $state(false);

<Button onclick={() => open = true}>Open Right Sheet</Button>

<Sheet open={open} onclose={() => open = false} title="Details">
  <p>Sheet content goes here.</p>
</Sheet>`;

	const leftCode = `<Sheet open={open} onclose={() => open = false} side="left" title="Navigation">
  <p>Sidebar navigation content.</p>
</Sheet>`;

	const bottomCode = `<Sheet open={open} onclose={() => open = false} side="bottom" size="sm" title="Quick Actions">
  <p>Bottom sheet content.</p>
</Sheet>`;

	const topCode = `<Sheet open={open} onclose={() => open = false} side="top" size="lg" title="Notifications">
  <p>Top sheet - height follows size presets.</p>
</Sheet>`;

	const fullCode = `<Sheet open={open} onclose={() => open = false} side="right" size="full" title="Fullscreen column" />`;

	const modalLikeCode = `<Sheet
  open={open}
  onclose={() => open = false}
  closeOnBackdrop={false}
  title="Review changes"
>
  <p>Must close via button or X - backdrop clicks ignored.</p>
</Sheet>`;
</script>

<div class="max-w-3xl space-y-8">
	<Example title="Right Sheet (Default)" code={rightCode}>
		<Button onclick={() => (rightOpen = true)}>Open Right Sheet</Button>
		<Sheet open={rightOpen} onclose={() => (rightOpen = false)} title="Details">
			<div class="space-y-3 text-sm">
				<p>This sheet slides in from the right edge.</p>
				<p class="text-txt-secondary">It's great for detail panels, settings, or secondary content.</p>
			</div>
		</Sheet>
	</Example>

	<Example title="Left Sheet" code={leftCode}>
		<Button onclick={() => (leftOpen = true)}>Open Left Sheet</Button>
		<Sheet open={leftOpen} onclose={() => (leftOpen = false)} side="left" title="Navigation">
			<div class="space-y-3 text-sm">
				<p>Left sheets work well for navigation or sidebars.</p>
			</div>
		</Sheet>
	</Example>

	<Example title="Top Sheet" code={topCode}>
		<Button onclick={() => (topOpen = true)}>Open Top Sheet</Button>
		<Sheet open={topOpen} onclose={() => (topOpen = false)} side="top" size="lg" title="Notifications">
			<div class="space-y-3 p-1 text-sm">
				<p><code>side="top"</code> / <code>bottom</code> map <code>size</code> to height instead of width.</p>
			</div>
		</Sheet>
	</Example>

	<Example title="Full width column" code={fullCode}>
		<Button variant="outline" onclick={() => (fullOpen = true)}>Open full-width sheet</Button>
		<Sheet open={fullOpen} onclose={() => (fullOpen = false)} side="right" size="full" title="Wide panel">
			<div class="p-4 text-sm text-txt-secondary"><code>size="full"</code> stretches to the opposing edge.</div>
		</Sheet>
	</Example>

	<Example title="Modal-like dismissal" code={modalLikeCode}>
		<Button variant="secondary" onclick={() => (modalLikeOpen = true)}>Open guarded sheet</Button>
		<Sheet open={modalLikeOpen} onclose={() => (modalLikeOpen = false)} closeOnBackdrop={false} title="Confirm">
			<div class="space-y-3 px-4 pb-4 text-sm">
				<p class="text-txt-secondary">Users cannot dismiss accidentally-, require an explicit action.</p>
				<Button size="sm" onclick={() => (modalLikeOpen = false)}>Acknowledge</Button>
			</div>
		</Sheet>
	</Example>

	<Example title="Bottom Sheet" code={bottomCode}>
		<Button onclick={() => (bottomOpen = true)}>Open Bottom Sheet</Button>
		<Sheet open={bottomOpen} onclose={() => (bottomOpen = false)} side="bottom" size="sm" title="Quick Actions">
			<div class="space-y-3 text-sm">
				<p>Bottom sheets are useful for mobile-style action menus or compact content.</p>
			</div>
		</Sheet>
	</Example>
</div>
