<script lang="ts">
	import { ColorPicker } from "phoundry-ui";

	let smallPicker = $state("#f97316");

	let disabledPicker = $state("#64748b");
</script>

<div class="flex flex-wrap items-start gap-6">
	<div>
		<p class="mb-1 text-[11px] font-medium text-txt-secondary">
			size=&quot;sm&quot;
		</p>
		<ColorPicker
			value={smallPicker}
			onchange={(c: string) => {
				smallPicker = c;
			}}
			size="sm"
		/>
	</div>
	<div>
		<p class="mb-1 text-[11px] font-medium text-txt-secondary">disabled</p>
		<ColorPicker value={disabledPicker} onchange={() => {}} disabled />
	</div>
</div>
