<script lang="ts">
	import Example from '$lib/docs/ui/Example.svelte';
	import DatePicker from '$phoundry/components/advanced/DatePicker.svelte';

	let singleDate = $state<Date | null>(null);
	let rangeStart = $state<Date | null>(null);
	let rangeEnd = $state<Date | null>(null);
	let constrainedDate = $state<Date | null>(null);

	const minBoundary = new Date(2026, 4, 1);
	const maxBoundary = new Date(2026, 4, 31);

	function formatDate(d: Date | null): string {
		if (!d) return 'none';
		return d.toLocaleDateString();
	}

	const singleCode = `let date = $state<Date | null>(null);

<DatePicker
  value={date}
  onchange={(d) => date = d}
/>`;

	const rangeCode = `let start = $state<Date | null>(null);
let end = $state<Date | null>(null);

<DatePicker
  mode="range"
  rangeStart={start}
  rangeEnd={end}
  onrangechange={(s, e) => { start = s; end = e; }}
/>`;

	const inputSizeCode = `<DatePicker value={date} onchange={(d) => (date = d)} inputSize="sm" />`;

	const constrainedCode = `<DatePicker
  value={date}
  onchange={(d) => (date = d)}
  minDate={new Date(2026, 4, 1)}
  maxDate={new Date(2026, 4, 31)}
  weekStartsOn={1}
  placeholder="Pick a May 2026 date"
/>`;
</script>

<div class="max-w-3xl space-y-8">
	<Example title="Single date" code={singleCode}>
		<DatePicker
			value={singleDate}
			onchange={(d: Date) => {
				singleDate = d;
			}}
		/>
		<p class="mt-2 text-xs text-txt-tertiary">Selected: {formatDate(singleDate)}</p>
	</Example>

	<Example title="Date range" code={rangeCode}>
		<DatePicker
			mode="range"
			rangeStart={rangeStart}
			rangeEnd={rangeEnd}
			onrangechange={(s: Date, e: Date) => {
				rangeStart = s;
				rangeEnd = e;
			}}
		/>
		<p class="mt-2 text-xs text-txt-tertiary">
			Range: {formatDate(rangeStart)} - {formatDate(rangeEnd)}
		</p>
	</Example>

	<Example title="Trigger size" code={inputSizeCode}>
		<div class="flex flex-wrap items-end gap-3">
			<DatePicker
				value={singleDate}
				onchange={(d: Date) => {
					singleDate = d;
				}}
				inputSize="sm"
			/>
			<DatePicker
				value={singleDate}
				onchange={(d: Date) => {
					singleDate = d;
				}}
				inputSize="lg"
			/>
		</div>
		<p class="mt-2 text-xs text-txt-tertiary">
			Same selection; <code>inputSize</code> only affects the field height.
		</p>
	</Example>

	<Example title="Bounds, Monday week, placeholder" code={constrainedCode}>
		<div class="flex flex-wrap items-end gap-4">
			<DatePicker
				value={constrainedDate}
				onchange={(d: Date) => {
					constrainedDate = d;
				}}
				minDate={minBoundary}
				maxDate={maxBoundary}
				weekStartsOn={1}
				placeholder="Pick a May 2026 date"
			/>
			<DatePicker value={singleDate} onchange={(d: Date) => (singleDate = d)} disabled placeholder="Disabled trigger" />
		</div>
		<p class="mt-2 text-xs text-txt-tertiary">Constrained: {formatDate(constrainedDate)}</p>
	</Example>
</div>
