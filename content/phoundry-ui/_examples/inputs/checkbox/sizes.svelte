<script lang="ts">
	import { Checkbox } from "phoundry-ui";

	let mdSize = $state(true);
</script>

<div class="flex flex-col gap-3">
	<Checkbox
		checked={mdSize}
		onchange={() => (mdSize = !mdSize)}
		size="sm"
		label="Small box"
	/>
	<Checkbox
		checked={mdSize}
		onchange={() => (mdSize = !mdSize)}
		size="md"
		label="Medium box"
	/>
</div>
