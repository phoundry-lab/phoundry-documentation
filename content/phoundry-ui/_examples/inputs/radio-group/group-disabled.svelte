<script lang="ts">
	import { RadioGroup } from "phoundry-ui";
	import type { RadioOption } from "phoundry-ui";

	let groupDisabledVal = $state("x");

	const groupDisabledOptions: RadioOption[] = [
		{ value: "x", label: "One" },
		{ value: "y", label: "Two" },
	];
</script>

<p class="mb-2 text-xs text-txt-secondary">
	Disables the entire radiogroup- Individual option <code>disabled</code> flags add
	finer control.
</p>
<RadioGroup
	options={groupDisabledOptions}
	value={groupDisabledVal}
	onchange={(v: string) => (groupDisabledVal = v)}
	disabled
/>
