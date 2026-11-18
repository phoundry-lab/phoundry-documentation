<script lang="ts">
	import { NumberInput } from "phoundry-ui";

	let disabledDemo = $state(3);
</script>

<p class="mb-2 text-xs text-txt-secondary">
	Steppers are inert and the field does not accept edits.
</p>
<NumberInput
	value={disabledDemo}
	onchange={(v: number) => (disabledDemo = v)}
	disabled
/>
