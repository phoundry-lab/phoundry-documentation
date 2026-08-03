<script lang="ts">
	import Example from '$lib/docs/ui/Example.svelte';
	import StatusCheckbox from '$phoundry/components/inputs/StatusCheckbox.svelte';
	import type { StatusCheckboxStateDef } from '$phoundry/components/inputs/status-checkbox.types.js';
	import Separator from '$phoundry/components/display/Separator.svelte';

	let basic = $state('unchecked');
	let workflow = $state('todo');

	const workflowStates: StatusCheckboxStateDef[] = [
		{ key: 'todo', label: 'Todo' },
		{
			key: 'in_progress',
			label: 'In progress',
			icon: 'carbon:subtract',
			color: 'var(--color-option-yellow)'
		},
		{
			key: 'done',
			label: 'Done',
			icon: 'carbon:checkmark',
			color: 'var(--color-option-green)'
		}
	];

	const defaultCode = `<StatusCheckbox bind:activeKey />`;

	const workflowCode = `<StatusCheckbox bind:activeKey states={workflowStates} ariaLabelPrefix="Task" />`;
</script>

<div class="space-y-8">
	<Example title="Default three states" code={defaultCode}>
		<div class="flex items-center gap-3">
			<StatusCheckbox bind:activeKey={basic} />
			<span class="text-sm text-txt-secondary">Key: <code class="text-txt-primary">{basic}</code></span>
		</div>
		<p class="text-xs text-txt-tertiary">Click to snap between unchecked and checked; Ctrl/Cmd+click cycles all states.</p>
	</Example>

	<Separator />

	<Example title="Custom workflow states" code={workflowCode}>
		<div class="flex items-center gap-3">
			<StatusCheckbox bind:activeKey={workflow} states={workflowStates} ariaLabelPrefix="Task" />
			<span class="text-sm text-txt-secondary">Key: <code class="text-txt-primary">{workflow}</code></span>
		</div>
	</Example>
</div>
