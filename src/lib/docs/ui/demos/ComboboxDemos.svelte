<script lang="ts">
	import Example from '$lib/docs/ui/Example.svelte';
	import {
		Badge,
		PhiIcons,
		combobox,
		useComboboxAPI,
		type ComboboxOption,
		type ComboboxValue
	} from 'phoundry-ui';

	const api = useComboboxAPI();

	const frameworkOptions: ComboboxOption[] = [
		{ value: 'svelte', label: 'Svelte', description: 'Web framework', group: 'Frontend' },
		{ value: 'react', label: 'React', description: 'UI library', group: 'Frontend' },
		{ value: 'vue', label: 'Vue', description: 'Progressive framework', group: 'Frontend' },
		{ value: 'express', label: 'Express', description: 'Node.js framework', group: 'Backend' },
		{ value: 'fastify', label: 'Fastify', description: 'Fast Node.js server', group: 'Backend' },
		{ value: 'django', label: 'Django', description: 'Python framework', group: 'Backend' }
	];

	let singleValue = $state('');
	let multiValue = $state<string[]>([]);

	let creatableItems = $state<ComboboxOption[]>([
		{ value: 'red', label: 'Red' },
		{ value: 'blue', label: 'Blue' },
		{ value: 'green', label: 'Green' }
	]);
	let creatableValue = $state('');

	let asyncValue = $state('');
	let asyncLoading = $state(false);

	function valueLabel(value: ComboboxValue): string {
		return Array.isArray(value) ? value.join(', ') : value;
	}

	function setSingleValue(value: ComboboxValue) {
		singleValue = valueLabel(value);
	}

	function setMultiValue(value: ComboboxValue) {
		multiValue = Array.isArray(value) ? value : [value].filter(Boolean);
	}

	async function mockRemoteSearch(query: string): Promise<ComboboxOption[]> {
		await new Promise((resolve) => setTimeout(resolve, 350));
		const q = query.toLowerCase();
		return frameworkOptions.filter(
			(option) =>
				option.label.toLowerCase().includes(q) ||
				option.description?.toLowerCase().includes(q)
		);
	}

	const basicCode = `import { combobox, useComboboxAPI } from 'phoundry-ui';

const api = useComboboxAPI();

<button
  {@attach combobox({
    api,
    options,
    value,
    onchange: (next) => (value = next as string)
  })}
>
  Pick framework
</button>`;

	const triggerSearchCode = `<input
  {@attach combobox({
    api,
    options,
    value,
    onchange,
    openOn: 'focus',
    searchMode: 'trigger'
  })}
/>`;

	const multiCode = `<button
  {@attach combobox({
    api,
    options,
    value: tags,
    onchange: (next) => (tags = next as string[]),
    multiple: true
  })}
>
  Add frameworks
</button>`;

	const creatableCode = `<input
  {@attach combobox({
    api,
    options: items,
    value,
    onchange,
    creatable: true,
    onCreate: (query) => {
      items = [...items, { value: query.toLowerCase(), label: query }];
      value = query.toLowerCase();
    },
    openOn: 'focus',
    searchMode: 'trigger'
  })}
/>`;

	const asyncCode = `<input
  {@attach combobox({
    api,
    options: [],
    value,
    onchange,
    onSearch: async (query) => await api.search(query),
    openOn: 'focus',
    searchMode: 'trigger'
  })}
/>`;

	const customOptionCode = `{#snippet optionRow(item, isActive, isSelected)}
  …
{/snippet}

<button {@attach combobox({ api, options, value, onchange, option: optionRow })}>
  Pick framework
</button>`;
</script>

{#snippet optionRow(item: ComboboxOption, isActive: boolean, isSelected: boolean)}
	<div class="flex w-full items-center justify-between gap-2 px-1 py-0.5">
		<span class:text-accent-secondary={isActive} class="text-sm">{item.label}</span>
		{#if item.description}
			<span class="max-w-[120px] truncate text-[10px] text-txt-tertiary">{item.description}</span>
		{/if}
		{#if isSelected}
			<Badge color="blue" size="sm" icon={PhiIcons.check}>On</Badge>
		{/if}
	</div>
{/snippet}

<div class="space-y-8">
	<Example title="Button trigger" code={basicCode}>
		<button
			type="button"
			class="rounded-md border border-border-default bg-surface-raised px-3 py-2 text-sm text-txt-primary"
			{@attach combobox({
				api,
				options: frameworkOptions,
				value: singleValue,
				onchange: setSingleValue,
				placeholder: 'Search frameworks...'
			})}
		>
			{singleValue || 'Pick framework'}
		</button>
		<p class="mt-2 text-xs text-txt-tertiary">Selected: {singleValue || 'none'}</p>
	</Example>

	<Example title="Input trigger search" code={triggerSearchCode}>
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
					openOn: 'focus',
					searchMode: 'trigger'
				})}
			/>
		</div>
	</Example>

	<Example title="Multiple selection" code={multiCode}>
		<button
			type="button"
			class="rounded-md border border-border-default bg-surface-raised px-3 py-2 text-sm text-txt-primary"
			{@attach combobox({
				api,
				options: frameworkOptions,
				value: multiValue,
				onchange: setMultiValue,
				multiple: true,
				placeholder: 'Add frameworks...'
			})}
		>
			{multiValue.join(', ') || 'Add frameworks'}
		</button>
		<p class="mt-2 text-xs text-txt-tertiary">Selected: {multiValue.join(', ') || 'none'}</p>
	</Example>

	<Example title="Creatable" code={creatableCode}>
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
							{ value: query.toLowerCase(), label: query }
						];
						creatableValue = query.toLowerCase();
					},
					openOn: 'focus',
					searchMode: 'trigger'
				})}
			/>
		</div>
	</Example>

	<Example title="Async search" code={asyncCode}>
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
					openOn: 'focus',
					searchMode: 'trigger'
				})}
			/>
		</div>
		<p class="mt-2 text-xs text-txt-tertiary">
			Selected: {asyncValue || 'none'}{asyncLoading ? ' (loading...)' : ''}
		</p>
	</Example>

	<Example title="Custom option row" code={customOptionCode}>
		<button
			type="button"
			class="rounded-md border border-border-default bg-surface-raised px-3 py-2 text-sm text-txt-primary"
			{@attach combobox({
				api,
				options: frameworkOptions,
				value: singleValue,
				onchange: setSingleValue,
				placeholder: 'Framework...',
				option: optionRow
			})}
		>
			{singleValue || 'Framework...'}
		</button>
	</Example>
</div>
