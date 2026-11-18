<script lang="ts">
	import { Button } from "phoundry-ui";
	import { PhiIcons } from "phoundry-ui";
</script>

<div class="flex items-center gap-2">
	<Button loading>Saving...</Button>
	<Button active>Active</Button>
	<Button variant="outline" icon={PhiIcons.folder} active>Add Folder</Button>
	<Button disabled>Disabled</Button>
</div>
