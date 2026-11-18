<script lang="ts">
	import { Button } from "phoundry-ui";
	import { PhiIcons } from "phoundry-ui";
</script>

<div class="flex items-center gap-2">
	<Button icon={PhiIcons.add} variant="primary">Add Item</Button>
	<Button icon={PhiIcons.edit} iconPosition="right">Settings</Button>
	<Button icon={PhiIcons.close} title="Close" tooltipPlacement="right" />
</div>
