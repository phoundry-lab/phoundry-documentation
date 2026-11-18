<script lang="ts">
	import { Textarea } from "phoundry-ui";

	let small = $state("");

	let medium = $state("");

	let large = $state("");
</script>

<div class="flex max-w-md flex-col gap-3">
	<Textarea
		value={small}
		oninput={(v: string) => {
			small = v;
		}}
		placeholder="Small"
		size="sm"
		rows={2}
	/>
	<Textarea
		value={medium}
		oninput={(v: string) => {
			medium = v;
		}}
		placeholder="Medium"
		size="md"
		rows={2}
	/>
	<Textarea
		value={large}
		oninput={(v: string) => {
			large = v;
		}}
		placeholder="Large"
		size="lg"
		rows={2}
	/>
</div>
