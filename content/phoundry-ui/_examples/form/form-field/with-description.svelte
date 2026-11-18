<script lang="ts">
	import { FormField } from "phoundry-ui";
	import { TextInput } from "phoundry-ui";

	let desc = $state("");
</script>

<div class="max-w-sm">
	<FormField
		label="Email"
		id="doc-email"
		description="We'll never share your email."
	>
		{#snippet children(control)}
			<TextInput
				{...control}
				value={desc}
				oninput={(v: string) => {
					desc = v;
				}}
				placeholder="you@example.com"
			/>
		{/snippet}
	</FormField>
</div>
