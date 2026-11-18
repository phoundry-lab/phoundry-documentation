<script lang="ts">
	import { TimePicker } from "phoundry-ui";

	let hour = $state(14);

	let minute = $state(30);

	let dh = $state(9);

	let dm = $state(0);

	let log = $state("");
</script>

<TimePicker
	bind:hour={dh}
	bind:minute={dm}
	onchange={(h: number, m: number) => {
		log = `${h}:${String(m).padStart(2, "0")}`;
	}}
/>
<p class="mt-2 text-xs text-txt-tertiary">
	Last callback: {log || "move a field"}
</p>
