<script lang="ts">
	import { FormField } from "phoundry-ui";
	import { TextInput } from "phoundry-ui";

	let errorVal = $state("");
</script>

<div class="max-w-sm">
	<FormField
		label="Password"
		id="doc-password"
		error="Password must be at least 8 characters."
	>
		{#snippet children(control)}
			<TextInput
				{...control}
				type="password"
				value={errorVal}
				oninput={(v: string) => {
					errorVal = v;
				}}
				placeholder="Enter password"
			/>
		{/snippet}
	</FormField>
</div>
