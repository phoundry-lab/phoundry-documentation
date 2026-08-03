<script lang="ts">
	import Example from '$lib/docs/ui/Example.svelte';
	import Button from '$phoundry/components/buttons/Button.svelte';
	import { useModalManagerAPI } from '$phoundry/overlay/modal/index.js';
	import ExampleCustomModal from './ExampleCustomModal.svelte';

	const manager = useModalManagerAPI();

	let confirmResult = $state<boolean | null>(null);
	let promptResult = $state<string | null>(null);
	let customResult = $state<'exported' | 'archived' | undefined | null>(null);

	const confirmCode = `const manager = useModalManagerAPI();

const confirmed = await manager.confirm({
  title: 'Delete Item',
  message: 'Are you sure? This cannot be undone.',
  confirmLabel: 'Delete',
  danger: true,
});`;

	const promptCode = `const result = await manager.prompt({
  title: 'Rename File',
  message: 'Enter a new name:',
  defaultValue: 'untitled.txt',
});`;

	const alertCode = `await manager.alert({
  title: 'Update Complete',
  message: 'Your settings have been saved.',
});`;

	const customCode = `const choice = await manager.open(
  ExampleCustomModal,
  { projectName: 'Northwind' },
  { closeOnBackdrop: false, icon: 'mdi:folder-outline' }
);`;

	async function handleConfirm() {
		confirmResult = await manager.confirm({
			title: 'Delete Item',
			message: 'Are you sure you want to delete this item? This action cannot be undone.',
			confirmLabel: 'Delete',
			danger: true
		});
	}

	async function handlePrompt() {
		promptResult = await manager.prompt({
			title: 'Rename File',
			message: 'Enter a new name for the file:',
			defaultValue: 'untitled.txt',
			placeholder: 'filename',
			icon: 'lucide:file-pen',
			iconColor: 'text-txt-tertiary'
		});
	}

	async function handleAlert() {
		await manager.alert({
			title: 'Update Complete',
			message: 'Your settings have been saved successfully.'
		});
	}

	async function handleCustomModal() {
		customResult = await manager.open<'exported' | 'archived' | undefined>(
			ExampleCustomModal,
			{ projectName: 'Northwind' },
			{ closeOnBackdrop: false, icon: 'mdi:folder-outline', iconColor: 'text-txt-tertiary' }
		);
	}
</script>

<div class="space-y-8">
	<Example title="Confirm Dialog" code={confirmCode}>
		<div class="flex items-center gap-3">
			<Button variant="danger" onclick={handleConfirm}>Open Confirm</Button>
			{#if confirmResult !== null}
				<span class="text-xs text-txt-secondary">
					Result: {confirmResult ? 'Confirmed' : 'Cancelled'}
				</span>
			{/if}
		</div>
	</Example>

	<Example title="Prompt Dialog" code={promptCode}>
		<div class="flex items-center gap-3">
			<Button onclick={handlePrompt}>Open Prompt</Button>
			{#if promptResult !== null}
				<span class="text-xs text-txt-secondary">Result: "{promptResult}"</span>
			{/if}
		</div>
	</Example>

	<Example title="Alert Dialog" code={alertCode}>
		<div class="flex flex-wrap items-center gap-3">
			<Button onclick={handleAlert}>Default alert</Button>
		</div>
	</Example>

	<Example title="Custom modal" code={customCode}>
		<div class="flex items-center gap-3">
			<Button onclick={handleCustomModal}>Open custom modal</Button>
			{#if customResult !== null}
				<span class="text-xs text-txt-secondary">
					Result:
					{#if customResult === undefined}
						dismissed
					{:else if customResult === 'exported'}
						exported
					{:else}
						archived
					{/if}
				</span>
			{/if}
		</div>
	</Example>
</div>
