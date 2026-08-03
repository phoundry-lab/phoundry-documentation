<script lang="ts">
	import Example from '$lib/docs/ui/Example.svelte';
	import ButtonDropdown from '$phoundry/components/buttons/ButtonDropdown.svelte';
	import { PhiIcons } from '$phoundry/icons.js';
	import type { MenuItem } from '$phoundry/overlay/context-menu/context-menu.types.js';

	const fileItems: MenuItem[] = [
		{ id: 'new', type: 'action', label: 'New File', action: () => {} },
		{ id: 'open', type: 'action', label: 'Open...', action: () => {} },
		{ type: 'separator' },
		{ id: 'save', type: 'action', label: 'Save', action: () => {} },
		{ id: 'save-as', type: 'action', label: 'Save As...', action: () => {} }
	];

	const dangerItems: MenuItem[] = [
		{ id: 'archive', type: 'action', label: 'Archive', action: () => {} },
		{ id: 'delete', type: 'action', label: 'Delete', action: () => {}, danger: true }
	];

	const basicCode = `<ButtonDropdown items={[
  { label: 'New File', action: () => {} },
  { label: 'Open...', action: () => {} },
  { type: 'separator' },
  { label: 'Save', action: () => {} },
]}>File</ButtonDropdown>`;

	const variantsCode = `<ButtonDropdown variant="primary" items={items}>Primary</ButtonDropdown>
<ButtonDropdown variant="outline" items={items}>Outline</ButtonDropdown>
<ButtonDropdown variant="danger" items={items}>Danger</ButtonDropdown>`;

	const sizesCode = `<ButtonDropdown size="xs" items={items}>Extra Small</ButtonDropdown>
<ButtonDropdown size="sm" items={items}>Small</ButtonDropdown>
<ButtonDropdown size="md" items={items}>Medium</ButtonDropdown>
<ButtonDropdown size="lg" items={items}>Large</ButtonDropdown>`;

	const splitSizesCode = `<ButtonDropdown size="xs" variant="secondary" items={items} singleClickAction={onSave}>Label</ButtonDropdown>
<ButtonDropdown size="sm" variant="secondary" items={items} singleClickAction={onSave}>Label</ButtonDropdown>
<ButtonDropdown size="md" variant="secondary" items={items} singleClickAction={onSave}>Label</ButtonDropdown>
<ButtonDropdown size="lg" variant="secondary" items={items} singleClickAction={onSave}>Label</ButtonDropdown>`;

	const splitVariantsCode = `<ButtonDropdown variant="primary" items={items} singleClickAction={onPrimary}>Primary</ButtonDropdown>
<ButtonDropdown variant="secondary" items={items} singleClickAction={onAction}>Secondary</ButtonDropdown>
<ButtonDropdown variant="outline" items={items} singleClickAction={onAction}>Outline</ButtonDropdown>
<ButtonDropdown variant="danger" items={dangerItems} singleClickAction={onArchive}>Archive</ButtonDropdown>`;

	const splitIconCode = `<ButtonDropdown
  icon={PhiIcons.edit}
  variant="primary"
  items={items}
  singleClickAction={() => saveNow()}
>Save</ButtonDropdown>
<ButtonDropdown
  icon={PhiIcons.launch}
  items={items}
  singleClickAction={openInEditor}
>Export</ButtonDropdown>`;

	const noArrowCode = `<ButtonDropdown items={items} showArrow={false}>No Arrow</ButtonDropdown>`;

	const placementCode = `<ButtonDropdown items={items} placement="bottom-end">Bottom End</ButtonDropdown>
<ButtonDropdown items={items} placement="top-start">Top Start</ButtonDropdown>`;

	const statesCode = `<ButtonDropdown items={items} loading>Saving…</ButtonDropdown>
<ButtonDropdown items={items} disabled>Unavailable</ButtonDropdown>
<ButtonDropdown items={items} iconOnly title="More actions" variant="ghost" />`;
</script>

<div class="space-y-8">
	<Example title="Basic" code={basicCode}>
		<ButtonDropdown items={fileItems}>File</ButtonDropdown>
	</Example>

	<Example title="Variants" code={variantsCode}>
		<div class="flex items-center gap-2">
			<ButtonDropdown variant="primary" items={fileItems}>Primary</ButtonDropdown>
			<ButtonDropdown variant="outline" items={fileItems}>Outline</ButtonDropdown>
			<ButtonDropdown variant="danger" items={dangerItems}>Danger</ButtonDropdown>
		</div>
	</Example>

	<Example title="Sizes" code={sizesCode}>
		<div class="flex items-center gap-2">
			<ButtonDropdown size="xs" items={fileItems}>Extra Small</ButtonDropdown>
			<ButtonDropdown size="sm" items={fileItems}>Small</ButtonDropdown>
			<ButtonDropdown size="md" items={fileItems}>Medium</ButtonDropdown>
			<ButtonDropdown size="lg" items={fileItems}>Large</ButtonDropdown>
		</div>
	</Example>

	<Example title="Split: sizes (singleClickAction)" code={splitSizesCode}>
		<div class="flex flex-wrap items-center gap-2">
			<ButtonDropdown size="xs" variant="secondary" items={fileItems} singleClickAction={() => {}}>Extra small</ButtonDropdown>
			<ButtonDropdown size="sm" variant="secondary" items={fileItems} singleClickAction={() => {}}>Small</ButtonDropdown>
			<ButtonDropdown size="md" variant="secondary" items={fileItems} singleClickAction={() => {}}>Medium</ButtonDropdown>
			<ButtonDropdown size="lg" variant="secondary" items={fileItems} singleClickAction={() => {}}>Large</ButtonDropdown>
		</div>
	</Example>

	<Example title="Split: variants (singleClickAction)" code={splitVariantsCode}>
		<div class="flex flex-wrap items-center gap-2">
			<ButtonDropdown variant="primary" items={fileItems} singleClickAction={() => {}}>Primary</ButtonDropdown>
			<ButtonDropdown variant="secondary" items={fileItems} singleClickAction={() => {}}>Secondary</ButtonDropdown>
			<ButtonDropdown variant="outline" items={fileItems} singleClickAction={() => {}}>Outline</ButtonDropdown>
			<ButtonDropdown variant="danger" items={dangerItems} singleClickAction={() => {}}>Archive</ButtonDropdown>
		</div>
	</Example>

	<Example title="Split: with icon (singleClickAction)" code={splitIconCode}>
		<div class="flex flex-wrap items-center gap-2">
			<ButtonDropdown icon={PhiIcons.edit} variant="primary" items={fileItems} singleClickAction={() => {}}>Save</ButtonDropdown>
			<ButtonDropdown icon={PhiIcons.edit} size="sm" variant="ghost" items={fileItems} singleClickAction={() => {}}>Save</ButtonDropdown>
			<ButtonDropdown icon={PhiIcons.launch} items={fileItems} singleClickAction={() => {}}>Export</ButtonDropdown>
		</div>
	</Example>

	<Example title="Without Arrow" code={noArrowCode}>
		<div class="flex items-center gap-2">
			<ButtonDropdown items={fileItems} showArrow={false}>No Arrow</ButtonDropdown>
			<ButtonDropdown items={fileItems} showArrow={true}>With Arrow</ButtonDropdown>
		</div>
	</Example>

	<Example title="Placement" code={placementCode}>
		<div class="flex items-center gap-2">
			<ButtonDropdown items={fileItems} placement="bottom-start">Bottom Start</ButtonDropdown>
			<ButtonDropdown items={fileItems} placement="bottom-end">Bottom End</ButtonDropdown>
			<ButtonDropdown items={fileItems} placement="top-start">Top Start</ButtonDropdown>
			<ButtonDropdown items={fileItems} placement="top-end">Top End</ButtonDropdown>
		</div>
	</Example>

	<Example title="Loading, disabled, tooltip" code={statesCode}>
		<p class="mb-2 text-xs text-txt-secondary">
			<code>loading</code> shows the same spinner as <code>Button</code> and blocks opening the menu. Icon-only triggers still need <code>title</code> for accessibility.
		</p>
		<div class="flex flex-wrap gap-2">
			<ButtonDropdown items={fileItems} loading>Saving…</ButtonDropdown>
			<ButtonDropdown items={fileItems} disabled>Unavailable</ButtonDropdown>
			<ButtonDropdown items={fileItems} icon={PhiIcons.expand} iconOnly title="More actions" variant="ghost" />
		</div>
	</Example>
</div>
