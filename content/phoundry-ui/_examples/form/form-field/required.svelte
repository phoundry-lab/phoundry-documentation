<script lang="ts">
	import { FormField } from "phoundry-ui";
	import { TextInput } from "phoundry-ui";

	let req = $state("");
</script>

<div class="max-w-sm">
	<FormField label="Full Name" id="doc-fullname" required>
		{#snippet children(control)}
			<TextInput
				{...control}
				value={req}
				oninput={(v: string) => {
					req = v;
				}}
				placeholder="Jane Doe"
			/>
		{/snippet}
	</FormField>
</div>
