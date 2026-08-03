<script lang="ts">
	import Example from '$lib/docs/ui/Example.svelte';
	import ButtonGroup from '$phoundry/components/buttons/ButtonGroup.svelte';

	let view = $state('day');
	let outlineView = $state('day');
	let listMode = $state<'list' | 'grid'>('list');
	let segmentDemo = $state('left');

	const toggleCode = `<ButtonGroup
  items={[
    { label: 'Day', active: view === 'day', onclick: () => (view = 'day') },
    { label: 'Week', active: view === 'week', onclick: () => (view = 'week') },
    { label: 'Month', active: view === 'month', onclick: () => (view = 'month') }
  ]}
/>`;

	const outlineCode = `<ButtonGroup
  variant="outline"
  items={[
    { label: 'Day', active: outlineView === 'day', onclick: () => (outlineView = 'day') },
    { label: 'Week', active: outlineView === 'week', onclick: () => (outlineView = 'week') },
    { label: 'Month', active: outlineView === 'month', onclick: () => (outlineView = 'month') }
  ]}
/>`;

	const smallCode = `<ButtonGroup
  size="sm"
  items={[
    { label: 'List', active: listMode === 'list', onclick: () => (listMode = 'list') },
    { label: 'Grid', active: listMode === 'grid', onclick: () => (listMode = 'grid') }
  ]}
/>`;

	const statesCode = `<ButtonGroup
  aria-label="Text alignment"
  items={[
    { id: 'left', label: 'Left', active: align === 'left', onclick: () => (align = 'left') },
    { id: 'center', label: 'Center', disabled: true },
    { id: 'right', label: 'Right', loading: true, onclick: () => (align = 'right') },
  ]}
/>`;
</script>

<div class="space-y-8">
	<Example title="Toggle group" code={toggleCode}>
		<ButtonGroup
			items={[
				{ label: 'Day', active: view === 'day', onclick: () => (view = 'day') },
				{ label: 'Week', active: view === 'week', onclick: () => (view = 'week') },
				{ label: 'Month', active: view === 'month', onclick: () => (view = 'month') }
			]}
		/>
	</Example>

	<Example title="Outline variant" code={outlineCode}>
		<ButtonGroup
			variant="outline"
			items={[
				{ label: 'Day', active: outlineView === 'day', onclick: () => (outlineView = 'day') },
				{ label: 'Week', active: outlineView === 'week', onclick: () => (outlineView = 'week') },
				{ label: 'Month', active: outlineView === 'month', onclick: () => (outlineView = 'month') }
			]}
		/>
	</Example>

	<Example title="Small size" code={smallCode}>
		<ButtonGroup
			size="sm"
			items={[
				{ label: 'List', active: listMode === 'list', onclick: () => (listMode = 'list') },
				{ label: 'Grid', active: listMode === 'grid', onclick: () => (listMode = 'grid') }
			]}
		/>
	</Example>

	<Example title="Disabled, loading, stable keys" code={statesCode}>
		<p class="mb-2 text-xs text-txt-secondary">
			Optional <code>id</code> on each item stabilizes reconciliation when the list reorders. Loading shows the same spinner glyph as other buttons.
		</p>
		<ButtonGroup
			aria-label="Demo alignment"
			items={[
				{
					id: 'seg-left',
					label: 'Left',
					active: segmentDemo === 'left',
					onclick: () => (segmentDemo = 'left')
				},
				{
					id: 'seg-center',
					label: 'Center',
					disabled: true
				},
				{
					id: 'seg-right',
					label: 'Right',
					loading: true,
					onclick: () => (segmentDemo = 'right')
				}
			]}
		/>
	</Example>
</div>
