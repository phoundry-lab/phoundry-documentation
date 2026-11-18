<script lang="ts">
	import { Button } from "phoundry-ui";
	import { PhiIcons } from "phoundry-ui";
</script>

<div class="flex items-center gap-2">
	<Button size="xs">Extra Small</Button>
	<Button size="sm">Small</Button>
	<Button size="md">Medium</Button>
	<Button size="lg">Large</Button>
</div>
<div class="mt-2 flex items-center gap-2">
	<Button icon={PhiIcons.add} size="xs">Extra Small</Button>
	<Button icon={PhiIcons.info} size="sm">Small</Button>
	<Button icon={PhiIcons.edit} size="md">Medium</Button>
	<Button icon={PhiIcons.add} size="lg">Large</Button>
</div>
