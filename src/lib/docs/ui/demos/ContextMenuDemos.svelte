<script lang="ts">
	import Example from '$lib/docs/ui/Example.svelte';
	import Button from '$phoundry/components/buttons/Button.svelte';
	import { useContextMenuAPI, contextMenu } from '$phoundry/overlay/context-menu/index.js';
	import type { MenuItem } from '$phoundry/overlay/context-menu/index.js';

	const api = useContextMenuAPI();

	let lastAction = $state('');
	let notificationsOn = $state(true);
	let underlineOn = $state(false);

	const menuItems: MenuItem[] = $derived([
		{
			type: 'group',
			id: 'format-toolbar',
			items: [
				{
					type: 'action',
					id: 'cut',
					label: 'Cut',
					icon: 'phoundry-mono:cut',
					preventClose: true,
					action: () => {
						lastAction = 'Cut';
					}
				},
				{
					type: 'action',
					id: 'copy-toolbar',
					label: 'Copy',
					icon: 'phoundry-mono:copy',
					preventClose: true,
					action: () => {
						lastAction = 'Copy (toolbar)';
					}
				},
				{
					type: 'action',
					id: 'paste-toolbar',
					label: 'Paste',
					icon: 'phoundry-mono:paste',
					preventClose: true,
					action: () => {
						lastAction = 'Paste (toolbar)';
					}
				},
				{
					type: 'boolean',
					id: 'underline',
					label: 'Underline',
					icon: 'phoundry-mono:text-underline',
					preventClose: true,
					value: underlineOn,
					onchange: (next) => {
						underlineOn = next;
						lastAction = next ? 'Underline on' : 'Underline off';
					}
				}
			]
		},
		{ type: 'separator' },
		{ type: 'label', label: 'File Actions' },
		{
			type: 'action',
			label: 'Copy',
			icon: 'phoundry-mono:copy',
			shortcut: '⌘C',
			id: 'copy',
			action: () => {
				lastAction = 'Copy';
			}
		},
		{
			type: 'action',
			label: 'Paste',
			icon: 'phoundry-mono:paste',
			shortcut: '⌘V',
			id: 'paste',
			action: () => {
				lastAction = 'Paste';
			}
		},
		{
			type: 'submenu',
			id: 'more-tools',
			label: 'More tools',
			icon: 'phoundry-mono:tools',
			items: [
				{
					type: 'group',
					id: 'submenu-toolbar',
					items: [
						{
							type: 'action',
							id: 'sub-undo',
							label: 'Undo',
							icon: 'phoundry-mono:undo',
							preventClose: true,
							action: () => {
								lastAction = 'Undo (submenu toolbar)';
							}
						},
						{ type: 'separator' },
						{
							type: 'action',
							id: 'sub-redo',
							label: 'Redo',
							icon: 'phoundry-mono:redo',
							preventClose: true,
							action: () => {
								lastAction = 'Redo (submenu toolbar)';
							}
						}
					]
				},
				{ type: 'separator' },
				{
					type: 'action',
					label: 'Nested action',
					icon: 'phoundry-mono:rocket',
					id: 'nested-action',
					action: () => {
						lastAction = 'Nested action';
					}
				}
			]
		},
		{ type: 'separator' },
		{
			type: 'boolean',
			id: 'notifications',
			label: 'Notifications',
			icon: 'phoundry-mono:notification',
			preventClose: true,
			value: notificationsOn,
			onchange: (next) => {
				notificationsOn = next;
				lastAction = next ? 'Notifications on' : 'Notifications off';
			}
		},
		{ type: 'separator' },
		{
			type: 'action',
			label: 'Delete',
			icon: 'phoundry-mono:trash-can',
			danger: true,
			id: 'delete',
			action: () => {
				lastAction = 'Delete';
			}
		}
	]);

	function handleButtonMenu(e: MouseEvent) {
		api.open(() => menuItems, e.clientX, e.clientY);
	}

	const programmaticCode = `const api = useContextMenuAPI();

const items: MenuItem[] = [
  { type: 'action', label: 'Copy', icon: 'phoundry-mono:copy', id: 'copy', action: () => {} },
  { type: 'separator' },
  { type: 'action', label: 'Delete', danger: true, id: 'del', action: () => {} },
];

api.open(() => items, e.clientX, e.clientY, { ariaLabel: 'Edit actions' });`;

	const attachmentCode = `<div {@attach contextMenu({ api, items: menuItems })}>
  Right-click here
</div>`;
</script>

<div class="space-y-8">
	<Example title="Programmatic Open" code={programmaticCode}>
		<div class="flex items-center gap-3">
			<Button onclick={handleButtonMenu}>Click for Menu</Button>
			{#if lastAction}
				<span class="text-xs text-txt-secondary">Last: {lastAction}</span>
			{/if}
		</div>
	</Example>

	<Example title="Right-Click Area (Attachment)" code={attachmentCode}>
		<div
			{@attach contextMenu({ api, items: () => menuItems })}
			class="cursor-context-menu rounded-lg border border-dashed border-border-muted p-6 text-center text-sm text-txt-secondary select-none"
		>
			Right-click anywhere in this area
		</div>
	</Example>
</div>
