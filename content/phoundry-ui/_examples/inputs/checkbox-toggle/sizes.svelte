<script lang="ts">
	import { CheckboxToggle } from "phoundry-ui";

	let sizeSm = $state(true);

	let sizeMd = $state(false);
</script>

<div class="flex flex-col gap-3">
	<CheckboxToggle
		checked={sizeSm}
		onchange={() => (sizeSm = !sizeSm)}
		size="sm"
		label="Small (default)"
	/>
	<CheckboxToggle
		checked={sizeMd}
		onchange={() => (sizeMd = !sizeMd)}
		size="md"
		label="Medium"
	/>
</div>
