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

<div class="max-w-sm">
	<input
		class="w-full rounded-md border border-border-default bg-surface-base px-3 py-2 text-sm text-txt-primary"
		placeholder="Search frameworks..."
		value={singleValue}
		{@attach combobox({
			api,
			options: frameworkOptions,
			value: singleValue,
			onchange: setSingleValue,
			openOn: "focus",
			searchMode: "trigger",
		})}
	/>
</div>
