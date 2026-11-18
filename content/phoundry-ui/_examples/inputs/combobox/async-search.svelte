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

	let asyncValue = $state("");

	let asyncLoading = $state(false);

	function valueLabel(value: ComboboxValue): string {
		return Array.isArray(value) ? value.join(", ") : value;
	}

	async function mockRemoteSearch(query: string): Promise<ComboboxOption[]> {
		await new Promise((resolve) => setTimeout(resolve, 350));
		const q = query.toLowerCase();
		return frameworkOptions.filter(
			(option) =>
				option.label.toLowerCase().includes(q) ||
				option.description?.toLowerCase().includes(q),
		);
	}
</script>

<div class="max-w-sm">
	<input
		class="w-full rounded-md border border-border-default bg-surface-base px-3 py-2 text-sm text-txt-primary"
		placeholder="Debounced remote filter..."
		value={asyncValue}
		{@attach combobox({
			api,
			options: [],
			value: asyncValue,
			onchange: (value) => {
				asyncValue = valueLabel(value);
			},
			onSearch: async (query: string) => {
				asyncLoading = true;
				try {
					return await mockRemoteSearch(query);
				} finally {
					asyncLoading = false;
				}
			},
			openOn: "focus",
			searchMode: "trigger",
		})}
	/>
</div>
<p class="mt-2 text-xs text-txt-tertiary">
	Selected: {asyncValue || "none"}{asyncLoading ? " (loading...)" : ""}
</p>
