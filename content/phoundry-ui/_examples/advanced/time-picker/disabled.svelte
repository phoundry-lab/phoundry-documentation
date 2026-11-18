<script lang="ts">
	import { TimePicker } from "phoundry-ui";

	let hour = $state(14);

	let minute = $state(30);

	let dh = $state(9);

	let dm = $state(0);
</script>

<TimePicker bind:hour={dh} bind:minute={dm} disabled />
