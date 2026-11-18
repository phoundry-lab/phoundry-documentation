<script lang="ts">
	import { RadioGroup } from "phoundry-ui";
	import type { RadioOption } from "phoundry-ui";

	let sizeDemo = $state("sm");

	const sizeOptions: RadioOption[] = [
		{ value: "sm", label: "Small" },
		{ value: "md", label: "Medium" },
	];
</script>

<div class="flex flex-wrap items-start gap-8">
	<div>
		<p class="mb-2 text-[10px] text-txt-tertiary">
			size=&quot;sm&quot; (default)
		</p>
		<RadioGroup
			options={sizeOptions}
			value={sizeDemo}
			onchange={(v: string) => (sizeDemo = v)}
			size="sm"
		/>
	</div>
	<div>
		<p class="mb-2 text-[10px] text-txt-tertiary">size=&quot;md&quot;</p>
		<RadioGroup
			options={sizeOptions}
			value={sizeDemo}
			onchange={(v: string) => (sizeDemo = v)}
			size="md"
		/>
	</div>
</div>
