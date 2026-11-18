<script lang="ts">
	import { ColorPicker } from "phoundry-ui";

	let hexColor = $state("#3b82f6");
</script>

<ColorPicker
	value={hexColor}
	onchange={(c: string) => {
		hexColor = c;
	}}
/>
<p class="mt-2 text-xs text-txt-tertiary">Value: {hexColor}</p>
