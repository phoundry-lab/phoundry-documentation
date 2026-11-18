<script lang="ts">
	import { FormField } from "phoundry-ui";
	import { TextInput } from "phoundry-ui";

	let apiKey = $state("");
</script>

{#snippet labelSnippet()}
	API Key <span class="text-txt-tertiary">(scoped)</span>
{/snippet}

<div class="max-w-sm">
	<FormField
		label={labelSnippet}
		id="doc-apikey"
		description="Rich labels still associate correctly when ids match."
	>
		{#snippet children(control)}
			<TextInput
				{...control}
				value={apiKey}
				oninput={(v: string) => {
					apiKey = v;
				}}
				placeholder="pk_live_…"
			/>
		{/snippet}
	</FormField>
</div>
