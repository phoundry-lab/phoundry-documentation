<script lang="ts">
	import {
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

<button
	type="button"
	class="rounded-md border border-border-default bg-surface-raised px-3 py-2 text-sm text-txt-primary"
	{@attach combobox({
		api,
		options: frameworkOptions,
		value: singleValue,
		onchange: setSingleValue,
		placeholder: "Search frameworks...",
	})}
>
	{singleValue || "Pick framework"}
</button>
<p class="mt-2 text-xs text-txt-tertiary">Selected: {singleValue || "none"}</p>
