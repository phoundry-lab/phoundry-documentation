---
title: RichTextEditor
layout: ui
order: 8
status: experimental
---

<script lang="ts">
	import UiDocHeader from '$lib/docs/ui/UiDocHeader.svelte';
	import PropTable from '$lib/docs/ui/PropTable.svelte';
	import type { PropDef } from '$lib/docs/ui/PropTable.svelte';
	import Separator from '$phoundry/components/display/Separator.svelte';
	import RichTextEditorDemos from '$lib/docs/ui/demos/RichTextEditorDemos.svelte';

	const props: PropDef[] = [
		{ name: 'value', type: 'string', description: 'HTML content string.', required: true },
		{
			name: 'onchange',
			type: '(html: string) => void',
			description: 'Called when content changes.',
			required: true
		},
		{
			name: 'placeholder',
			type: 'string',
			default: "'Start writing…'",
			description: 'Placeholder text when empty.'
		},
		{
			name: 'toolbar',
			type: 'ToolbarAction[]',
			description: 'Which toolbar buttons to show. Defaults to all actions.'
		},
		{ name: 'disabled', type: 'boolean', default: 'false', description: 'Disable editing.' },
		{
			name: 'minHeight',
			type: 'string',
			default: "'120px'",
			description: 'Minimum editor height.'
		},
		{
			name: 'maxHeight',
			type: 'string',
			default: "'400px'",
			description: 'Maximum editor height before scrolling.'
		},
		{ name: 'class', type: 'string', description: 'Additional CSS classes.' }
	];

	const toolbarActions: PropDef[] = [
		{ name: 'bold', type: 'ToolbarAction', description: 'Bold text formatting.' },
		{ name: 'italic', type: 'ToolbarAction', description: 'Italic text formatting.' },
		{ name: 'underline', type: 'ToolbarAction', description: 'Underline text.' },
		{ name: 'strikethrough', type: 'ToolbarAction', description: 'Strikethrough text.' },
		{ name: 'code', type: 'ToolbarAction', description: 'Inline code formatting.' },
		{ name: 'link', type: 'ToolbarAction', description: 'Insert or edit hyperlink.' },
		{ name: 'heading', type: 'ToolbarAction', description: 'Toggle heading level.' },
		{ name: 'bulletList', type: 'ToolbarAction', description: 'Unordered list.' },
		{ name: 'numberedList', type: 'ToolbarAction', description: 'Ordered list.' },
		{ name: 'blockquote', type: 'ToolbarAction', description: 'Block quote formatting.' },
		{ name: 'horizontalRule', type: 'ToolbarAction', description: 'Insert horizontal rule.' },
		{
			name: 'clearFormatting',
			type: 'ToolbarAction',
			description: 'Remove all formatting from selection.'
		}
	];
</script>

<UiDocHeader
	title="RichTextEditor"
	description="Contenteditable HTML editor with configurable toolbar, placeholder, and HTML output."
	importCode={"import { RichTextEditor } from 'phoundry-ui';"}
/>

<RichTextEditorDemos />

<Separator />

<PropTable {props} />

<PropTable props={toolbarActions} title="ToolbarAction Values" />

## Usage tips

- The `value` is raw HTML - sanitize it before persisting or rendering elsewhere to prevent XSS.
- Use a minimal toolbar (`['bold', 'italic', 'link']`) for comment fields and short-form inputs.
- Set `maxHeight` to constrain tall content - the editor scrolls internally.
- The editor uses `contenteditable` - no external dependencies required.
- Toolbar shortcut keys: `⌘/Ctrl+B/I/U` for bold/italic/underline, `⌘/Ctrl+K` for links, `Tab` inserts two spaces (does not move focus).
- The `heading` action maps to an `h3` via `formatBlock` - browser support for formatting commands varies slightly.
