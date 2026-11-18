<script lang="ts">
	import { TimePicker } from "phoundry-ui";

	let hour = $state(14);

	let minute = $state(30);

	function formatTime(h: number, m: number): string {
		const period = h >= 12 ? "PM" : "AM";
		const h12 = h % 12 || 12;
		return `${h12}:${String(m).padStart(2, "0")} ${period}`;
	}
</script>

<TimePicker bind:hour bind:minute />
<p class="mt-2 text-xs text-txt-tertiary">
	Selected: {formatTime(hour, minute)} ({hour}:{String(minute).padStart(2, "0")} 24h)
</p>
