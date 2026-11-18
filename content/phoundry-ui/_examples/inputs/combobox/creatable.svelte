<script lang="ts">
	import {
		combobox,
		useComboboxAPI,
		type ComboboxOption,
		type ComboboxValue,
	} from "phoundry-ui";

	const api = useComboboxAPI();

	let creatableItems = $state<ComboboxOption[]>([
		{ value: "red", label: "Red" },
		{ value: "blue", label: "Blue" },
		{ value: "green", label: "Green" },
	]);

	let creatableValue = $state("");

	function valueLabel(value: ComboboxValue): string {
		return Array.isArray(value) ? value.join(", ") : value;
	}
</script>

<div class="max-w-sm">
	<input
		class="w-full rounded-md border border-border-default bg-surface-base px-3 py-2 text-sm text-txt-primary"
		placeholder="Pick or create a color..."
		value={creatableValue}
		{@attach combobox({
			api,
			options: creatableItems,
			value: creatableValue,
			onchange: (value) => {
				creatableValue = valueLabel(value);
			},
			creatable: true,
			onCreate: (query: string) => {
				creatableItems = [
					...creatableItems,
					{ value: query.toLowerCase(), label: query },
				];
				creatableValue = query.toLowerCase();
			},
			openOn: "focus",
			searchMode: "trigger",
		})}
	/>
</div>
