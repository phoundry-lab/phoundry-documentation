<script lang="ts">
	import Example from '$lib/docs/ui/Example.svelte';
	import TimePicker from '$phoundry/components/advanced/TimePicker.svelte';

	let hour = $state(14);
	let minute = $state(30);
	let dh = $state(9);
	let dm = $state(0);
	let log = $state('');

	function formatTime(h: number, m: number): string {
		const period = h >= 12 ? 'PM' : 'AM';
		const h12 = h % 12 || 12;
		return `${h12}:${String(m).padStart(2, '0')} ${period}`;
	}

	const basicCode = `let hour = $state(14);
let minute = $state(30);

<TimePicker bind:hour bind:minute />`;

	const onChangeCode = `<TimePicker
  bind:hour
  bind:minute
  onchange={(h, m) => console.log(h, m)}
/>`;

	const disabledCode = `<TimePicker bind:hour bind:minute disabled />`;
</script>

<div class="max-w-3xl space-y-8">
	<Example title="Basic usage" code={basicCode}>
		<TimePicker bind:hour bind:minute />
		<p class="mt-2 text-xs text-txt-tertiary">
			Selected: {formatTime(hour, minute)} ({hour}:{String(minute).padStart(2, '0')} 24h)
		</p>
	</Example>

	<Example title="onchange callback" code={onChangeCode}>
		<TimePicker
			bind:hour={dh}
			bind:minute={dm}
			onchange={(h: number, m: number) => {
				log = `${h}:${String(m).padStart(2, '0')}`;
			}}
		/>
		<p class="mt-2 text-xs text-txt-tertiary">Last callback: {log || 'move a field'}</p>
	</Example>

	<Example title="Disabled" code={disabledCode}>
		<TimePicker bind:hour={dh} bind:minute={dm} disabled />
	</Example>
</div>
