<script lang="ts">
	import { FormField } from "phoundry-ui";
	import { TextInput } from "phoundry-ui";

	let basic = $state("");
</script>

<div class="max-w-sm">
	<FormField label="Username" id="doc-username">
		{#snippet children(control)}
			<TextInput
				{...control}
				value={basic}
				oninput={(v: string) => {
					basic = v;
				}}
				placeholder="Enter username"
			/>
		{/snippet}
	</FormField>
</div>
