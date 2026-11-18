<script lang="ts">
	import { ColorPicker } from "phoundry-ui";

	let rgbFlow = $state("#22c55e");

	let hslFlow = $state("#a855f7");
</script>

<p class="mb-2 text-xs text-txt-secondary">
	<code>format</code> switches the editable text representation and accepted
	manual syntax.
	<code>onchange</code> still passes a hex string for consistent storage -
	convert locally if you need CSS <code>rgb()</code>/<code>hsl()</code>.
</p>
<div class="flex flex-col gap-4 sm:flex-row">
	<div class="flex-1">
		<p class="mb-1 text-[11px] font-medium text-txt-secondary">RGB</p>
		<ColorPicker
			value={rgbFlow}
			onchange={(c: string) => {
				rgbFlow = c;
			}}
			format="rgb"
		/>
		<p class="mt-1 text-[11px] text-txt-tertiary">state: {rgbFlow}</p>
	</div>
	<div class="flex-1">
		<p class="mb-1 text-[11px] font-medium text-txt-secondary">HSL</p>
		<ColorPicker
			value={hslFlow}
			onchange={(c: string) => {
				hslFlow = c;
			}}
			format="hsl"
		/>
		<p class="mt-1 text-[11px] text-txt-tertiary">state: {hslFlow}</p>
	</div>
</div>
