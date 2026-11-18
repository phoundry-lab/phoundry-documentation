<script lang="ts">
	import { Select } from 'phoundry-ui';

	let value = $state<string | undefined>();
	const options = [
		{ label: 'Fruit', options: [{ value: 'apple', label: 'Apple' }, { value: 'banana', label: 'Banana' }] },
		{ label: 'Vegetables', options: [{ value: 'carrot', label: 'Carrot' }, { value: 'pepper', label: 'Bell pepper' }] }
	];
</script>

<Select {options} {value} onchange={(next) => (value = next)} searchable placeholder="Choose produce..." />
