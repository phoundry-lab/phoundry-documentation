---
title: DropZone
layout: ui
order: 5
---

<script lang="ts">
	import UiDocHeader from '$lib/docs/ui/UiDocHeader.svelte';
	import PropTable from '$lib/docs/ui/PropTable.svelte';
	import type { PropDef } from '$lib/docs/ui/PropTable.svelte';
	import Separator from '$phoundry/components/display/Separator.svelte';
	import DropZoneDemos from '$lib/docs/ui/demos/DropZoneDemos.svelte';

	const props: PropDef[] = [
		{
			name: 'ondrop',
			type: '(files: File[], event: DragEvent) => void',
			description: 'Called with accepted files on drop.',
			required: true
		},
		{
			name: 'accept',
			type: 'string[]',
			description: "MIME types or extensions to accept (e.g. ['image/*', '.pdf'])."
		},
		{ name: 'disabled', type: 'boolean', default: 'false', description: 'Disable the drop zone.' },
		{ name: 'class', type: 'string', description: 'Additional CSS classes on the wrapper.' },
		{ name: 'children', type: 'Snippet', description: 'Default content inside the drop zone.' },
		{
			name: 'active',
			type: 'Snippet',
			description: 'Custom overlay content shown during drag-over.'
		}
	];
</script>

<UiDocHeader
	title="DropZone"
	description="File drop target that wraps arbitrary content. Shows an overlay on drag-over with optional file type validation via the accept prop."
	importCode={"import { DropZone } from 'phoundry-ui';"}
/>

<DropZoneDemos />

<Separator />

<PropTable {props} />

## Usage tips

- The default overlay shows "Drop to upload" on valid drag and "Invalid file type" when files don't match `accept`.
- Use the `active` snippet to fully customize the drag-over overlay.
- The `accept` array supports MIME types (`'image/*'`), exact MIME (`'application/pdf'`), and extensions (`'.csv'`).
- Files that don't match `accept` are silently filtered out of the `ondrop` callback.
