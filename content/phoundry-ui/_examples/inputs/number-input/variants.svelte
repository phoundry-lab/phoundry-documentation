<script lang="ts">
	import { NumberInput } from "phoundry-ui";
	import type { ComponentProps } from "svelte";
	type TextFieldVariant = NonNullable<
		ComponentProps<typeof NumberInput>["variant"]
	>;

	let variantValue = $state(10);

	const variants: TextFieldVariant[] = [
		"outline",
		"fill",
		"ghost",
		"trueGhost",
	];
</script>

<div class="flex flex-wrap items-center gap-4">
	{#each variants as variant}
		<div class="flex flex-col items-start gap-1">
			<span class="text-[10px] text-txt-tertiary">{variant}</span>
			<NumberInput
				value={variantValue}
				onchange={(v: number) => (variantValue = v)}
				{variant}
			/>
		</div>
	{/each}
</div>
