<script lang="ts">
	import { TextInput } from "phoundry-ui";

	let email = $state("");
</script>

<div class="flex max-w-sm flex-col gap-3">
	<TextInput
		type="email"
		value={email}
		oninput={(v: string) => {
			email = v;
		}}
		autocomplete="email"
		placeholder="Email address"
	/>
	<p class="text-xs text-txt-tertiary">
		Browser may suggest saved email addresses
	</p>
</div>
