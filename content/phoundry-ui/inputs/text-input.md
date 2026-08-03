---
title: TextInput
layout: ui
order: 1
---

<script lang="ts">
	import UiDocHeader from '$lib/docs/ui/UiDocHeader.svelte';
	import PropTable from '$lib/docs/ui/PropTable.svelte';
	import type { PropDef } from '$lib/docs/ui/PropTable.svelte';
	import Separator from '$phoundry/components/display/Separator.svelte';
	import TextInputDemos from '$lib/docs/ui/demos/TextInputDemos.svelte';

	const props: PropDef[] = [
		{ name: 'value', type: 'string', default: "''", description: 'Current input value (`bind:value` friendly).' },
		{ name: 'onchange', type: '(value: string) => void', description: 'Fires on blur / Enter after value changes' },
		{ name: 'oninput', type: '(value: string) => void', description: 'Fires on every keystroke' },
		{ name: 'type', type: "'text' | 'email' | 'password' | 'search' | 'url' | 'tel'", default: "'text'", description: 'HTML input type' },
		{ name: 'placeholder', type: 'string', description: 'Placeholder text' },
		{ name: 'size', type: "'xs' | 'sm' | 'md' | 'lg'", default: "'md'", description: 'Control size aligned to Button scale (`xs` h-4 / 16px … `lg` h-8 / 32px outer box)' },
		{ name: 'variant', type: "'outline' | 'fill' | 'ghost'", default: "'outline'", description: 'Visual style variant' },
		{ name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the input' },
		{ name: 'readonly', type: 'boolean', default: 'false', description: 'Makes the input read-only' },
		{ name: 'icon', type: 'string', description: 'Iconify icon string shown at the leading edge' },
		{ name: 'prefix', type: 'string', description: 'Fixed text after the icon and before the typed value (e.g. currency symbol)' },
		{ name: 'prefixBg', type: 'boolean', default: 'false', description: 'Inset background on the combined icon/prefix region' },
		{ name: 'suffix', type: 'string', description: 'Fixed text after the typed value (e.g. file extension)' },
		{ name: 'suffixBg', type: 'boolean', default: 'false', description: 'Inset background on the suffix region' },
		{ name: 'clearable', type: 'boolean', default: 'false', description: 'Shows a trailing clear button when the input has a value' },
		{ name: 'class', type: 'string', description: 'Additional CSS classes' },
		{ name: 'id', type: 'string', description: 'HTML id attribute' },
		{ name: 'name', type: 'string', description: 'HTML name attribute for forms' },
		{ name: 'autocomplete', type: 'AutoFill', description: 'Browser autocomplete hint' },
		{ name: 'element', type: 'HTMLInputElement', description: 'Bindable reference to the underlying input element' },
		{ name: '…rest', type: 'HTMLAttributes<input>', description: 'Forwarded to the inner `<input>` (e.g. `aria-*`, `inputmode`, `maxlength`).' }
	];
</script>

<UiDocHeader
	title="TextInput"
	description="Single-line text input with optional leading icon, optional prefix text after the icon, and optional trailing suffix. Supports multiple HTML input types, four sizes, three visual variants, and callbacks for both input and change events."
	importCode={"import { TextInput, PhiIcons } from 'phoundry-ui';"}
/>

<TextInputDemos />

<Separator />

<PropTable {props} />

## Usage tips

- Use `oninput` for real-time feedback (e.g. live search) and `onchange` for commit-on-blur behavior.
- Set `type="search"` with an icon for a native-feeling search field that shows a clear button in some browsers.
- Pair with `FormField` to get labels, descriptions, and error messaging for free.
