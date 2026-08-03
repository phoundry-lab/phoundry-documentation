---
title: Context Menu
layout: ui
order: 3
---

<script lang="ts">
	import UiDocHeader from '$lib/docs/ui/UiDocHeader.svelte';
	import PropTable from '$lib/docs/ui/PropTable.svelte';
	import type { PropDef } from '$lib/docs/ui/PropTable.svelte';
	import Separator from '$phoundry/components/display/Separator.svelte';
	import ContextMenuDemos from '$lib/docs/ui/demos/ContextMenuDemos.svelte';

	const openOptionsProps: PropDef[] = [
		{ name: 'ariaLabel', type: 'string', description: 'Accessible name for the menu panel. Defaults to `"Context menu"`.' },
		{ name: 'anchor', type: "'start' | 'end'", description: 'Horizontal alignment relative to the open point.' },
		{ name: 'side', type: 'PopoverSide', description: "Which edge of the trigger the menu opens from. Defaults to `'bottom'`." },
		{ name: 'onClose', type: '() => void', description: 'Called when the menu closes (Escape, backdrop, or after an action).' },
		{ name: 'trigger', type: 'unknown', description: 'Optional trigger reference for callers that track menu origin.' }
	];

	const actionProps: PropDef[] = [
		{
			name: 'type',
			type: "'action'",
			description: 'Menu item that triggers a callback.',
			required: true
		},
		{ name: 'id', type: 'string', description: 'Stable key for shortcuts / analytics.', required: true },
		{ name: 'label', type: 'string', description: 'Display text.', required: true },
		{ name: 'icon', type: 'string', description: 'Iconify icon string.' },
		{ name: 'shortcut', type: 'string', description: 'Display-only shortcut hint.' },
		{
			name: 'pluginId',
			type: 'string',
			description: 'Optional plugin scope for shortcut manager lookups (`pluginId.id`).'
		},
		{ name: 'danger', type: 'boolean', default: 'false', description: 'Red danger styling.' },
		{
			name: 'disabled',
			type: 'boolean',
			default: 'false',
			description: 'Non-interactive row.'
		},
		{
			name: 'selected',
			type: 'boolean',
			description: 'Decorates the row as checked/active where supported.'
		},
		{
			name: 'preventClose',
			type: 'boolean',
			default: 'false',
			description: 'Keep the overlay open after invoking the action.'
		},
		{
			name: 'action',
			type: '() => void | Promise<void>',
			description: 'Handler run when the row is activated.',
			required: true
		}
	];

	const separatorProps: PropDef[] = [
		{
			name: 'type',
			type: "'separator'",
			description: 'Horizontal rule between groups.',
			required: true
		}
	];

	const labelProps: PropDef[] = [
		{
			name: 'type',
			type: "'label'",
			description: 'Non-interactive heading row.',
			required: true
		},
		{ name: 'label', type: 'string', description: 'Muted caption text.', required: true }
	];

	const customProps: PropDef[] = [
		{
			name: 'type',
			type: "'custom'",
			description: 'Fully custom row body via snippet.',
			required: true
		},
		{ name: 'id', type: 'string', required: true, description: 'Stable key.' },
		{
			name: 'render',
			type: 'Snippet<[context?: CustomMenuItemContext]>',
			description: 'Snippet rendered inside the menu row. The optional context can open a descendant panel from one of the snippet controls or close the current panel.',
			required: true
		},
		{ name: 'disabled', type: 'boolean', default: 'false', description: 'Skip pointer interaction.' }
	];

	const booleanProps: PropDef[] = [
		{
			name: 'type',
			type: "'boolean'",
			description: 'Toggle row with checkbox on the right.',
			required: true
		},
		{ name: 'label', type: 'string', description: 'Display text.', required: true },
		{ name: 'icon', type: 'string', description: 'Iconify icon string.' },
		{ name: 'pluginId', type: 'string', description: 'Plugin ID (same role as on action items).' },
		{
			name: 'preventClose',
			type: 'boolean',
			default: 'false',
			description: 'Keep the menu open after toggling.'
		},
		{ name: 'value', type: 'boolean', description: 'Checked state.', required: true },
		{
			name: 'onchange',
			type: '(nextValue: boolean) => void | Promise<void>',
			description: 'Called with the new value after the user toggles the row.',
			required: true
		}
	];

	const submenuProps: PropDef[] = [
		{ name: 'type', type: "'submenu'", description: 'Nested submenu container.', required: true },
		{ name: 'label', type: 'string', description: 'Submenu trigger label.', required: true },
		{ name: 'items', type: 'MenuItem[]', description: 'Child menu items.', required: true }
	];

	const groupProps: PropDef[] = [
		{
			name: 'type',
			type: "'group'",
			description: 'Horizontal row of icon-only controls.',
			required: true
		},
		{ name: 'id', type: 'string', description: 'Stable key (see MenuItemBase).', required: true },
		{
			name: 'items',
			type: 'GroupMenuChildItem[]',
			description: 'Toolbar row: **`action`** and **`boolean`** as icon-only `Button`s (labels via tooltip / `aria-label`); **`separator`** as a vertical rule.',
			required: true
		},
		{
			name: 'disabled',
			type: 'boolean',
			default: 'false',
			description: 'Disables all controls in the group.'
		}
	];
</script>

<UiDocHeader
	title="Context Menu"
	description="Right-click context menu overlay with nested submenus, optional horizontal icon groups, shortcuts, boolean toggles, and danger actions."
	importCode={"import { useContextMenuAPI, contextMenu } from 'phoundry-ui';"}
/>

<ContextMenuDemos />

<Separator />

<PropTable props={openOptionsProps} title="OpenMenuOptions (4th argument to api.open)" />

<PropTable props={actionProps} title="ActionMenuItem" />

<PropTable props={booleanProps} title="BooleanMenuItem" />

<PropTable props={submenuProps} title="SubmenuMenuItem" />

<PropTable props={groupProps} title="GroupMenuItem" />

<PropTable props={separatorProps} title="SeparatorMenuItem" />

<PropTable props={labelProps} title="LabelMenuItem" />

<PropTable props={customProps} title="CustomMenuItem" />

### Custom menu descendants

The snippet context exposes `openSubmenu(item, trigger, intent?)` and `closePanel()`. Use `openSubmenu` when an editor rendered by a `CustomMenuItem` needs another menu level, such as an option-level editor. Pass the control element that should anchor the child panel and use `intent: 'keyboard'` for keyboard activation.

Descendants opened this way stay in the same menu session. Pointer opens preserve neutral focus; keyboard opens focus the first interactive control. Arrow Left or Escape closes the current child panel and returns focus to its trigger. `closePanel()` closes only the panel containing that custom item (or the root session when called at the root).

## Usage tips

- `provideContextMenu()` must be called in the root layout, and `ContextMenuOverlay` must be rendered there - or call `setupOverlays()` once to initialize all overlay managers together.
- The menu auto-positions to stay within the viewport.
- Arrow keys, Home, and End move the highlighted row; Enter and Space activate it. Escape closes the menu. The active row uses the same background as hover; focus returns to the element that opened the menu.
- `api.open` accepts either a static array or `() => MenuItem[]` so menus can read live state (as with the attachment demo). Pass `ariaLabel` in the fourth argument when the default `"Context menu"` label is too generic.
- For click-based dropdowns from a button, use `ButtonDropdown` instead.
