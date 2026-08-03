<script lang="ts">
	import Example from '$lib/docs/ui/Example.svelte';
	import DatePickerAdvanced, { type DatePickerAdvancedValue } from '$phoundry/components/advanced/DatePickerAdvanced.svelte';

	let dateValue = $state<DatePickerAdvancedValue>({
		startDate: null,
		endDate: null,
		includeTime: false,
		includeEndDate: false
	});

	let compactValue = $state<DatePickerAdvancedValue>({
		startDate: new Date(2026, 4, 10),
		endDate: null,
		includeTime: false,
		includeEndDate: false
	});

	const advMin = new Date(2026, 4, 1);
	const advMax = new Date(2026, 4, 28);

	let disabledDemo = $state<DatePickerAdvancedValue>({
		startDate: new Date(2026, 4, 15),
		endDate: null,
		includeTime: false,
		includeEndDate: false
	});

	function formatDateTime(d: Date | null): string {
		if (!d) return 'none';
		return d.toLocaleString();
	}

	const togglesCode = `let dateValue = $state<DatePickerAdvancedValue>({
	startDate: null,
	endDate: null,
	includeTime: false,
	includeEndDate: false
});

<DatePickerAdvanced
  bind:value={dateValue}
  weekStartsOn={1}
/>`;

	const compactCode = `<DatePickerAdvanced
  bind:value={compactValue}
  showToggles={false}
  minDate={advMin}
  maxDate={advMax}
/>`;

	const disabledCode = `<DatePickerAdvanced bind:value={locked} disabled />`;
</script>

<div class="max-w-3xl space-y-8">
	<Example title="Notion-style toggles" code={togglesCode}>
		<p class="mb-2 text-xs text-txt-tertiary">End date, include time, and clear - controlled via bindable value. Week starts on Monday.</p>
		<DatePickerAdvanced bind:value={dateValue} weekStartsOn={1} />
		<p class="mt-2 text-xs text-txt-tertiary">
			Date: {formatDateTime(dateValue.startDate)}
			{#if dateValue.includeEndDate && dateValue.endDate}
				→ {formatDateTime(dateValue.endDate)}
			{/if}
		</p>
	</Example>

	<Example title="Compact calendar (no toggles)" code={compactCode}>
		<p class="mb-2 text-xs text-txt-secondary">
			Matches the internal panel used by <code>DatePicker</code> - only the grid + navigation chrome.
		</p>
		<DatePickerAdvanced bind:value={compactValue} showToggles={false} minDate={advMin} maxDate={advMax} />
	</Example>

	<Example title="Disabled" code={disabledCode}>
		<DatePickerAdvanced bind:value={disabledDemo} disabled />
	</Example>
</div>
