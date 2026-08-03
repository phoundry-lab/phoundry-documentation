<script lang="ts">
	import Icon from '@iconify/svelte';
	import Button from '$phoundry/components/buttons/Button.svelte';

	interface Props {
		projectName: string;
		onClose: (result?: 'exported' | 'archived') => void;
		icon?: string;
		iconColor?: string;
	}

	let { projectName, onClose, icon, iconColor }: Props = $props();
</script>

<div class="modal-panel w-96 max-w-[90vw]">
	<div class="flex items-center gap-2 px-3 py-2.5">
		{#if icon}
			<Icon {icon} width={16} height={16} class="shrink-0 {iconColor ?? 'text-txt-tertiary'}" />
		{/if}
		<h2 class="text-sm font-medium text-txt-primary">Project actions</h2>
	</div>
	<div class="-mt-1 px-3 pb-2.5">
		<p class="mt-1 text-sm text-txt-secondary">
			What should happen to <span class="font-medium text-txt-primary">{projectName}</span>?
		</p>
	</div>
	<div class="flex flex-col gap-1 px-3 pb-2">
		<Button variant="ghost" class="justify-start" onclick={() => onClose('exported')}
			>Export snapshot</Button
		>
		<Button variant="ghost" class="justify-start" onclick={() => onClose('archived')}
			>Archive project</Button
		>
	</div>
	<div class="flex justify-end px-3 py-2.5">
		<Button variant="ghost" onclick={() => onClose()}>Cancel</Button>
	</div>
</div>
