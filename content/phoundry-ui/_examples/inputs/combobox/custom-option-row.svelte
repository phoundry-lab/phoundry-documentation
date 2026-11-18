<script lang="ts">
	import {
		Badge,
		PhiIcons,
		combobox,
		useComboboxAPI,
		type ComboboxOption,
		type ComboboxValue,
	} from "phoundry-ui";

	const api = useComboboxAPI();

	const frameworkOptions: ComboboxOption[] = [
		{
			value: "svelte",
			label: "Svelte",
			description: "Web framework",
			group: "Frontend",
		},
		{
			value: "react",
			label: "React",
			description: "UI library",
			group: "Frontend",
		},
		{
			value: "vue",
			label: "Vue",
			description: "Progressive framework",
			group: "Frontend",
		},
		{
			value: "express",
			label: "Express",
			description: "Node.js framework",
			group: "Backend",
		},
		{
			value: "fastify",
			label: "Fastify",
			description: "Fast Node.js server",
			group: "Backend",
		},
		{
			value: "django",
			label: "Django",
			description: "Python framework",
			group: "Backend",
		},
	];

	let singleValue = $state("");

	function valueLabel(value: ComboboxValue): string {
		return Array.isArray(value) ? value.join(", ") : value;
	}

	function setSingleValue(value: ComboboxValue) {
		singleValue = valueLabel(value);
	}
</script>

{#snippet optionRow(
	item: ComboboxOption,
	isActive: boolean,
	isSelected: boolean,
)}
	<div class="flex w-full items-center justify-between gap-2 px-1 py-0.5">
		<span class:text-accent-secondary={isActive} class="text-sm"
			>{item.label}</span
		>
		{#if item.description}
			<span class="max-w-[120px] truncate text-[10px] text-txt-tertiary"
				>{item.description}</span
			>
		{/if}
		{#if isSelected}
			<Badge color="blue" size="xs" icon={PhiIcons.check}>On</Badge>
		{/if}
	</div>
{/snippet}

<button
	type="button"
	class="rounded-md border border-border-default bg-surface-raised px-3 py-2 text-sm text-txt-primary"
	{@attach combobox({
		api,
		options: frameworkOptions,
		value: singleValue,
		onchange: setSingleValue,
		placeholder: "Framework...",
		option: optionRow,
	})}
>
	{singleValue || "Framework..."}
</button>
