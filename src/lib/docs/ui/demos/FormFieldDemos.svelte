<script lang="ts">
	import Example from '$lib/docs/ui/Example.svelte';
	import FormField from '$phoundry/components/form/FormField.svelte';
	import TextInput from '$phoundry/components/inputs/TextInput.svelte';

	let basic = $state('');
	let desc = $state('');
	let errorVal = $state('');
	let req = $state('');
	let apiKey = $state('');

	const basicCode = `<FormField label="Username" id="username">
  <TextInput id="username" value={name} oninput={(v) => name = v} placeholder="Enter username" />
</FormField>`;

	const descCode = `<FormField label="Email" id="email" description="We'll never share your email.">
  <TextInput id="email" value={email} oninput={(v) => email = v} placeholder="you@example.com" />
</FormField>`;

	const errorCode = `<FormField label="Password" id="password" error="Password must be at least 8 characters.">
  <TextInput id="password" type="password" value={pw} oninput={(v) => pw = v} placeholder="Enter password" />
</FormField>`;

	const requiredCode = `<FormField label="Full Name" id="fullname" required>
  <TextInput id="fullname" value={name} oninput={(v) => name = v} placeholder="Jane Doe" />
</FormField>`;

	const snippetCode = `{#snippet labelSnippet()}
  API Key <span class="text-semantic-error">*</span>
{/snippet}

<FormField label={labelSnippet} id="apikey" description="Stored encrypted at rest.">
  <TextInput id="apikey" value={key} oninput={(v) => (key = v)} />
</FormField>`;
</script>

{#snippet labelSnippet()}
	API Key <span class="text-txt-tertiary">(scoped)</span>
{/snippet}

<div class="space-y-8">
	<Example title="Basic with Label" code={basicCode}>
		<div class="max-w-sm">
			<FormField label="Username" id="doc-username">
				<TextInput
					id="doc-username"
					value={basic}
					oninput={(v: string) => {
						basic = v;
					}}
					placeholder="Enter username"
				/>
			</FormField>
		</div>
	</Example>

	<Example title="With Description" code={descCode}>
		<div class="max-w-sm">
			<FormField label="Email" id="doc-email" description="We'll never share your email.">
				<TextInput
					id="doc-email"
					value={desc}
					oninput={(v: string) => {
						desc = v;
					}}
					placeholder="you@example.com"
				/>
			</FormField>
		</div>
	</Example>

	<Example title="With Error" code={errorCode}>
		<div class="max-w-sm">
			<FormField label="Password" id="doc-password" error="Password must be at least 8 characters.">
				<TextInput
					id="doc-password"
					type="password"
					value={errorVal}
					oninput={(v: string) => {
						errorVal = v;
					}}
					placeholder="Enter password"
				/>
			</FormField>
		</div>
	</Example>

	<Example title="Required" code={requiredCode}>
		<div class="max-w-sm">
			<FormField label="Full Name" id="doc-fullname" required>
				<TextInput
					id="doc-fullname"
					value={req}
					oninput={(v: string) => {
						req = v;
					}}
					placeholder="Jane Doe"
				/>
			</FormField>
		</div>
	</Example>

	<Example title="Snippet label" code={snippetCode}>
		<div class="max-w-sm">
			<FormField label={labelSnippet} id="doc-apikey" description="Rich labels still associate correctly when ids match.">
				<TextInput
					id="doc-apikey"
					value={apiKey}
					oninput={(v: string) => {
						apiKey = v;
					}}
					placeholder="pk_live_…"
				/>
			</FormField>
		</div>
	</Example>
</div>
