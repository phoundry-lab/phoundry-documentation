<script lang="ts">
	import { TextInput } from "phoundry-ui";

	let outline = $state("");

	let fill = $state("");

	let ghost = $state("");

	let trueGhost = $state("");
</script>

<div class="flex max-w-sm flex-col gap-3">
	<TextInput
		variant="outline"
		value={outline}
		oninput={(v: string) => {
			outline = v;
		}}
		placeholder="Outline (default)"
	/>
	<TextInput
		variant="fill"
		value={fill}
		oninput={(v: string) => {
			fill = v;
		}}
		placeholder="Fill"
	/>
	<TextInput
		variant="ghost"
		value={ghost}
		oninput={(v: string) => {
			ghost = v;
		}}
		placeholder="Ghost"
	/>
	<TextInput
		variant="trueGhost"
		value={trueGhost}
		oninput={(v: string) => {
			trueGhost = v;
		}}
		placeholder="True ghost"
	/>
</div>
