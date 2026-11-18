<script lang="ts">
	import { Textarea } from "phoundry-ui";

	let fillDemo = $state("");

	let ghostDemo = $state("");

	let outlineDemo = $state("");

	let trueGhostDemo = $state("");
</script>

<div class="flex max-w-md flex-col gap-3">
	<Textarea
		value={outlineDemo}
		oninput={(v: string) => (outlineDemo = v)}
		variant="outline"
		placeholder="outline"
		rows={2}
	/>
	<Textarea
		value={fillDemo}
		oninput={(v: string) => (fillDemo = v)}
		variant="fill"
		placeholder="fill"
		rows={2}
	/>
	<Textarea
		value={ghostDemo}
		oninput={(v: string) => (ghostDemo = v)}
		variant="ghost"
		placeholder="ghost"
		rows={2}
	/>
	<Textarea
		value={trueGhostDemo}
		oninput={(v: string) => (trueGhostDemo = v)}
		variant="trueGhost"
		placeholder="true ghost"
		rows={2}
	/>
</div>
