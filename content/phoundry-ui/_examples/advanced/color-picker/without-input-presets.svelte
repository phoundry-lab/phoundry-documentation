<script lang="ts">
	import { ColorPicker } from "phoundry-ui";

	let minimalColor = $state("#ef4444");
</script>

<ColorPicker
	value={minimalColor}
	onchange={(c: string) => {
		minimalColor = c;
	}}
	showInput={false}
	showPresets={false}
/>
<p class="mt-2 text-xs text-txt-tertiary">Value: {minimalColor}</p>
