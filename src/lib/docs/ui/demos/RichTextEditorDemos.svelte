<script lang="ts">
	import Example from '$lib/docs/ui/Example.svelte';
	import RichTextEditor from '$phoundry/components/advanced/RichTextEditor.svelte';

	let fullContent = $state('<p>Start editing here...</p>');
	let minimalContent = $state('');
	let disabledContent = $state('<p>Read-only body</p>');

	const fullToolbar = [
		'bold',
		'italic',
		'underline',
		'strikethrough',
		'code',
		'heading',
		'bulletList',
		'numberedList',
		'blockquote',
		'link',
		'horizontalRule',
		'clearFormatting'
	] as const;

	const minimalToolbar = ['bold', 'italic', 'link'] as const;

	const fullCode = `let content = $state('<p>Start editing here...</p>');

<RichTextEditor
  value={content}
  onchange={(html) => content = html}
  toolbar={[
    'bold', 'italic', 'underline', 'strikethrough', 'code',
    'heading', 'bulletList', 'numberedList', 'blockquote',
    'link', 'horizontalRule', 'clearFormatting',
  ]}
/>`;

	const minimalCode = `<RichTextEditor
  value={content}
  onchange={(html) => content = html}
  toolbar={['bold', 'italic', 'link']}
  placeholder="Write a comment..."
  minHeight="80px"
/>`;

	const disabledCode = `<RichTextEditor value={html} onchange={set} disabled />`;
</script>

<div class="max-w-3xl space-y-8">
	<Example title="Full Toolbar" code={fullCode}>
		<RichTextEditor
			value={fullContent}
			onchange={(html: string) => {
				fullContent = html;
			}}
			toolbar={[...fullToolbar]}
		/>
	</Example>

	<Example title="Minimal Toolbar" code={minimalCode}>
		<RichTextEditor
			value={minimalContent}
			onchange={(html: string) => {
				minimalContent = html;
			}}
			toolbar={[...minimalToolbar]}
			placeholder="Write a comment..."
			minHeight="80px"
		/>
	</Example>

	<Example title="Disabled" code={disabledCode}>
		<p class="mb-2 text-xs text-txt-secondary">Toolbar actions no-op; the surface is not editable.</p>
		<RichTextEditor value={disabledContent} onchange={(html: string) => (disabledContent = html)} disabled minHeight="72px" />
	</Example>
</div>
