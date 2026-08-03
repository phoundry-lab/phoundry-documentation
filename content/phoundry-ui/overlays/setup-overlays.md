---
title: Overlay setup
layout: ui
order: 1
---

<script lang="ts">
	import UiDocHeader from '$lib/docs/ui/UiDocHeader.svelte';
	import Example from '$lib/docs/ui/Example.svelte';
	import PropTable from '$lib/docs/ui/PropTable.svelte';
	import type { PropDef } from '$lib/docs/ui/PropTable.svelte';
	import Separator from '$phoundry/components/display/Separator.svelte';
	import CodeBlock from '$lib/docs/ui/CodeBlock.svelte';

	const layoutExample = `<script lang="ts">
  import {
    setupOverlays,
    ContextMenuOverlay,
    PopoverOverlay,
    ModalOverlay,
    TooltipOverlay,
    ToastOverlay,
    CommandBar,
  } from 'phoundry-ui';

  setupOverlays();

  const commands = [{ id: 'hello', label: 'Say hello', category: 'Demo' }];
  const commandBarConfig = {
    onExecute: (cmd) => console.log(cmd.id),
  };
<${'/'}script>

<ContextMenuOverlay />
<PopoverOverlay />
<ModalOverlay />
<TooltipOverlay />
<ToastOverlay />
<CommandBar {commands} config={commandBarConfig} />`;

	const returnExample = `const { contextMenu, popover, toast, tooltip, commandBar } = setupOverlays({
  maxToasts: 8,
});

// Modal: use useModalManagerAPI() in child components or getModalManager() elsewhere`;

	const optionsProps: PropDef[] = [
		{
			name: 'maxToasts',
			type: 'number',
			description: 'Maximum concurrent toasts for the toast singleton. Only applies if no prior getToastManager() ran in this session.'
		}
	];

	const resultProps: PropDef[] = [
		{
			name: 'contextMenu',
			type: 'ContextMenuAPI',
			description: 'Programmatic context menu API (same as useContextMenuAPI() after setup).'
		},
		{
			name: 'toast',
			type: 'ToastManager',
			description: 'Toast singleton; equivalent to getToastManager().'
		},
		{
			name: 'tooltip',
			type: 'TooltipManager',
			description: 'Tooltip singleton; equivalent to getTooltipManager().'
		},
		{
			name: 'commandBar',
			type: 'CommandBarState',
			description: 'Command palette state; equivalent to getCommandBarState().'
		},
		{
			name: 'popover',
			type: 'PopoverAPI',
			description: 'Programmatic popover API; equivalent to getPopoverManager() after setup.'
		}
	];
</script>

<UiDocHeader
	title="Overlay setup"
	description="Call setupOverlays() once in your root layout to register the context menu and modal providers and to create the toast, tooltip, and command bar singletons. Render the overlay components alongside it."
	importCode={"import { setupOverlays } from 'phoundry-ui';"}
/>

## Root layout

Call `setupOverlays()` during layout initialization (not in a child or in a module top-level). Match overlay components to the features you use.

<CodeBlock lang="svelte" code={layoutExample} />

## Options and return value

The return object is optional; you can keep using `getToastManager()` and the other getters. The modal API is not on the result - use `useModalManagerAPI()` or `getModalManager()`.

<CodeBlock code={returnExample} />

<Separator />

<PropTable props={optionsProps} title="SetupOverlaysOptions" />

<PropTable props={resultProps} title="SetupOverlaysResult" />

## Usage tips

- Call `setupOverlays()` only once per app shell; duplicate calls overlap Svelte context the same way duplicate `provideModalManager()` would.
- Mount `CommandBar` when you use the command palette - pass your command list and a `config` with `onExecute`; open it via `getCommandBarState().open()`.
- `provideContextMenu()`, `provideModalManager()`, and the individual `get*` functions remain available if you need a different composition.
