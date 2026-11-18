<script lang="ts">
	import { EmptyState } from "phoundry-ui";
	import { Button } from "phoundry-ui";
	import { PhiIcons } from "phoundry-ui";
</script>

<EmptyState
	icon={PhiIcons.folder}
	title="No projects yet"
	description="Create a project to organize your work."
>
	{#snippet action()}
		<Button variant="primary" icon={PhiIcons.add}>New Project</Button>
	{/snippet}
</EmptyState>
