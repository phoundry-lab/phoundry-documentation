---
title: Modal
layout: ui
order: 2
---

<script lang="ts">
	import UiDocHeader from '$lib/docs/ui/UiDocHeader.svelte';
	import PropTable from '$lib/docs/ui/PropTable.svelte';
	import type { PropDef } from '$lib/docs/ui/PropTable.svelte';
	import Separator from '$phoundry/components/display/Separator.svelte';
	import ModalDemos from '$lib/docs/ui/demos/ModalDemos.svelte';

	const modalProps: PropDef[] = [
		{ name: 'title', type: 'string', description: 'Modal title displayed in the header.', required: true },
		{ name: 'onClose', type: '() => void', description: 'Called when the modal should close (escape, backdrop, close button).', required: true },
		{ name: 'closeOnBackdrop', type: 'boolean', default: 'true', description: 'Allow closing by clicking the backdrop overlay.' },
		{ name: 'size', type: "'sm' | 'md' | 'lg' | 'xl' | 'full'", default: "'md'", description: 'Named size controlling max-width (sm=400, md=560, lg=720, xl=960, full=100%).' },
		{ name: 'noTitle', type: 'boolean', default: 'false', description: 'Hide the title bar for custom header layouts.' },
		{ name: 'icon', type: 'string', description: 'Iconify icon id shown before the title. Ignored when noTitle is true.' },
		{ name: 'iconColor', type: 'string', default: 'text-txt-tertiary', description: 'Tailwind text color class for the leading icon when unset in props.' },
		{ name: 'children', type: 'Snippet', description: 'Modal body content.', required: true }
	];

	const confirmProps: PropDef[] = [
		{ name: 'title', type: 'string', description: 'Dialog heading.', required: true },
		{ name: 'message', type: 'string', description: 'Dialog body text.', required: true },
		{ name: 'confirmLabel', type: 'string', default: "'Confirm'", description: 'Label for the confirm button.' },
		{ name: 'cancelLabel', type: 'string', default: "'Cancel'", description: 'Label for the cancel button.' },
		{ name: 'danger', type: 'boolean', default: 'false', description: 'Use danger variant for the confirm button.' },
		{ name: 'icon', type: 'string', description: 'Iconify id for a leading icon.' }
	];

	const promptProps: PropDef[] = [
		{ name: 'title', type: 'string', description: 'Dialog heading.', required: true },
		{ name: 'message', type: 'string', description: 'Optional help text above the field.' },
		{ name: 'defaultValue', type: 'string', default: "''", description: 'Initial value for the input.' },
		{ name: 'placeholder', type: 'string', default: "''", description: 'Input placeholder text.' },
		{ name: 'confirmLabel', type: 'string', default: "'OK'", description: 'Label for the submit button.' }
	];

	const alertProps: PropDef[] = [
		{ name: 'title', type: 'string', description: 'Dialog heading.', required: true },
		{ name: 'message', type: 'string', description: 'Dialog body text.', required: true },
		{ name: 'confirmLabel', type: 'string', default: "'OK'", description: 'Label for the single action button.' },
		{ name: 'icon', type: 'string', default: 'carbon:information-filled', description: 'Iconify id; defaults to an information icon if omitted.' }
	];
</script>

<UiDocHeader
	title="Modal"
	description="Stack-based modal system with a programmatic API. Includes built-in confirm, prompt, and alert dialogs, or pass your own Svelte component to open()."
	importCode={"import { useModalManagerAPI, Modal } from 'phoundry-ui';"}
/>

<ModalDemos />

<Separator />

<PropTable props={modalProps} title="Modal Props" />

<PropTable props={confirmProps} title="Confirm Options" />

<PropTable props={promptProps} title="Prompt Options" />

<PropTable props={alertProps} title="Alert Options" />

## Usage tips

- Call `setupOverlays()` once in your root layout to initialize all overlay managers together, including the modal stack and `ModalOverlay`.
- Use `useModalManagerAPI()` inside components (context-based) or `getModalManager()` from non-component code (global singleton).
- `manager.open(Component, props, options)` returns a `Promise` that resolves when the modal closes, with the value passed to `onClose(result)`.
- Modals stack - opening a second modal layers it on top. `manager.closeAll()` dismisses the entire stack.
