<script lang="ts">
	import Example from '$lib/docs/ui/Example.svelte';
	import Button from '$phoundry/components/buttons/Button.svelte';
	import { getToastManager } from '$phoundry/overlay/toast/index.js';

	const toast = getToastManager();

	const variantsCode = `const toast = getToastManager();

toast.success('Changes saved');
toast.error('Something went wrong');
toast.warning('Storage almost full');
toast.info('New version available');`;

	const descriptionCode = `toast.add({
  message: 'File uploaded',
  description: 'report.pdf was uploaded successfully.',
  variant: 'success',
});`;

	const actionCode = `toast.add({
  message: 'Item deleted',
  variant: 'default',
  action: { label: 'Undo', onclick: () => console.log('Undo!') },
});`;

	const stableIdCode = `toast.add({
  id: 'sync-status',
  message: 'Saving…',
  duration: 0,
});

toast.add({
  id: 'sync-status',
  message: 'Saved',
  variant: 'success',
  duration: 2000,
});`;

	const persistentCode = `const id = toast.add({ message: 'Pinned note', duration: 0 });
toast.dismiss(id);
toast.clear();`;
</script>

<div class="space-y-8">
	<Example title="Variants" code={variantsCode}>
		<div class="flex flex-wrap items-center gap-2">
			<Button variant="primary" onclick={() => toast.success('Changes saved')}>Success</Button>
			<Button variant="danger" onclick={() => toast.error('Something went wrong')}>Error</Button>
			<Button onclick={() => toast.warning('Storage almost full')}>Warning</Button>
			<Button onclick={() => toast.info('New version available')}>Info</Button>
		</div>
	</Example>

	<Example title="With Description" code={descriptionCode}>
		<Button
			onclick={() =>
				toast.add({
					message: 'File uploaded',
					description: 'report.pdf was uploaded successfully.',
					variant: 'success'
				})}
		>
			Toast with Description
		</Button>
	</Example>

	<Example title="With Action" code={actionCode}>
		<Button
			onclick={() =>
				toast.add({
					message: 'Item deleted',
					action: { label: 'Undo', onclick: () => toast.info('Undone!') }
				})}
		>
			Toast with Action
		</Button>
	</Example>

	<Example title="Stable ID (replace in place)" code={stableIdCode}>
		<div class="flex flex-wrap gap-2">
			<Button
				size="sm"
				onclick={() =>
					toast.add({
						id: 'demo-sync',
						message: 'Saving…',
						duration: 0,
						dismissible: false
					})}
			>
				Start save
			</Button>
			<Button
				size="sm"
				variant="primary"
				onclick={() =>
					toast.add({
						id: 'demo-sync',
						message: 'Saved',
						variant: 'success',
						duration: 2500
					})}
			>
				Finish save
			</Button>
		</div>
	</Example>

	<Example title="Persistent & clear" code={persistentCode}>
		<div class="flex flex-wrap gap-2">
			<Button size="sm" onclick={() => toast.add({ message: 'Pinned - click ✕ to close', duration: 0 })}>Sticky toast</Button>
			<Button size="sm" variant="outline" onclick={() => toast.clear()}>Clear all</Button>
		</div>
	</Example>
</div>
