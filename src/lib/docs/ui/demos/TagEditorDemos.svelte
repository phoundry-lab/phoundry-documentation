<script lang="ts">
	import Example from '$lib/docs/ui/Example.svelte';
	import TagEditor from '$phoundry/components/tags/TagEditor.svelte';

	let basicTags = $state<string[]>(['svelte', 'typescript']);
	let suggestedTags = $state<string[]>(['react']);
	let limitedTags = $state<string[]>(['alpha', 'beta']);
	let validatedTags = $state<string[]>([]);
	let asyncTags = $state<string[]>([]);

	const allSuggestions = ['svelte', 'react', 'vue', 'angular', 'solid', 'preact', 'lit', 'qwik'];

	const basicCode = `<TagEditor
  tags={tags}
  onchange={(t) => tags = t}
/>`;

	const suggestionsCode = `<TagEditor
  tags={tags}
  onchange={(t) => tags = t}
  suggestions={['svelte', 'react', 'vue', 'angular', 'solid']}
/>`;

	const maxCode = `<TagEditor
  tags={tags}
  onchange={(t) => tags = t}
  maxTags={4}
/>`;

	const validateCode = `<TagEditor
  tags={tags}
  onchange={(t) => tags = t}
  validate={(tag) => tag.length >= 3 || 'Min 3 characters'}
/>`;

	const asyncSuggestCode = `<TagEditor
  tags={tags}
  onchange={(t) => tags = t}
  suggestions={async (q) => await fetchTags(q)}
/>`;

	const disabledCode = `<TagEditor tags={tags} onchange={set} disabled />`;
</script>

<div class="space-y-8">
	<Example title="Basic" code={basicCode}>
		<TagEditor
			tags={basicTags}
			onchange={(t: string[]) => {
				basicTags = t;
			}}
		/>
	</Example>

	<Example title="With Suggestions" code={suggestionsCode}>
		<TagEditor
			tags={suggestedTags}
			onchange={(t: string[]) => {
				suggestedTags = t;
			}}
			suggestions={allSuggestions}
			placeholder="Type to see suggestions…"
		/>
	</Example>

	<Example title="With Max Tags (4)" code={maxCode}>
		<TagEditor
			tags={limitedTags}
			onchange={(t: string[]) => {
				limitedTags = t;
			}}
			maxTags={4}
		/>
		<p class="mt-2 text-xs text-txt-tertiary">{limitedTags.length} / 4 tags</p>
	</Example>

	<Example title="Validation" code={validateCode}>
		<p class="mb-2 text-xs text-txt-secondary">Return <code>true</code>, <code>false</code>, or a string error message from <code>validate</code>.</p>
		<TagEditor
			tags={validatedTags}
			onchange={(t: string[]) => {
				validatedTags = t;
			}}
			validate={(tag: string) => tag.length >= 3 || 'Use at least 3 characters'}
			placeholder="Try “ab” vs “abc”"
		/>
	</Example>

	<Example title="Async suggestions" code={asyncSuggestCode}>
		<p class="mb-2 text-xs text-txt-secondary">The lookup is debounced (~200ms). Errors fall back to an empty suggestion list.</p>
		<TagEditor
			tags={asyncTags}
			onchange={(t: string[]) => {
				asyncTags = t;
			}}
			suggestions={async (q: string) => {
				await new Promise((r) => setTimeout(r, 150));
				return allSuggestions.filter((s) => s.toLowerCase().includes(q.trim().toLowerCase()));
			}}
			placeholder="Type “sv”…"
		/>
	</Example>

	<Example title="Disabled" code={disabledCode}>
		<TagEditor tags={basicTags} onchange={() => {}} disabled />
	</Example>
</div>
