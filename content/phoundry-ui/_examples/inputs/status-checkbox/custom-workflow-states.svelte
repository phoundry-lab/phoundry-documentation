<script lang="ts">
	import { StatusCheckbox } from "phoundry-ui";
	import type { StatusCheckboxStateDef } from "phoundry-ui";

	let workflow = $state("todo");

	const workflowStates: StatusCheckboxStateDef[] = [
		{ key: "todo", label: "Todo" },
		{
			key: "in_progress",
			label: "In progress",
			icon: "carbon:subtract",
			color: "var(--color-option-yellow)",
		},
		{
			key: "done",
			label: "Done",
			icon: "carbon:checkmark",
			color: "var(--color-option-green)",
		},
	];
</script>

<div class="flex items-center gap-3">
	<StatusCheckbox
		bind:activeKey={workflow}
		states={workflowStates}
		ariaLabelPrefix="Task"
	/>
	<span class="text-sm text-txt-secondary"
		>Key: <code class="text-txt-primary">{workflow}</code></span
	>
</div>
