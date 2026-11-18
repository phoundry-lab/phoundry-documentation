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

	let multiValue = $state<string[]>([]);

	function setMultiValue(value: ComboboxValue) {
		multiValue = Array.isArray(value) ? value : [value].filter(Boolean);
	}
</script>

<button
	type="button"
	class="rounded-md border border-border-default bg-surface-raised px-3 py-2 text-sm text-txt-primary"
	{@attach combobox({
		api,
		options: frameworkOptions,
		value: multiValue,
		onchange: setMultiValue,
		multiple: true,
		placeholder: "Add frameworks...",
	})}
>
	{multiValue.join(", ") || "Add frameworks"}
</button>
<p class="mt-2 text-xs text-txt-tertiary">
	Selected: {multiValue.join(", ") || "none"}
</p>
