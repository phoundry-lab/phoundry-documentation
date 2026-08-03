---
title: Kbd
layout: ui
order: 3
---

<script lang="ts">
	import UiDocHeader from '$lib/docs/ui/UiDocHeader.svelte';
	import Example from '$lib/docs/ui/Example.svelte';
	import PropTable from '$lib/docs/ui/PropTable.svelte';
	import type { PropDef } from '$lib/docs/ui/PropTable.svelte';
	import Separator from '$phoundry/components/display/Separator.svelte';
	import Kbd from '$phoundry/components/display/Kbd.svelte';

	const props: PropDef[] = [
		{
			name: 'keys',
			type: 'string',
			description: 'Key combo string with "+" separator, e.g. "Mod+Shift+K".',
			required: true
		},
		{ name: 'size', type: "'sm' | 'md'", default: "'sm'", description: 'Key cap height aligned to Button `sm` / `md` (h-5.5 / h-7).' },
		{ name: 'class', type: 'string', description: 'Additional CSS classes.' }
	];

	const basicCode = `<Kbd keys="Mod+S" />
<Kbd keys="Enter" />
<Kbd keys="Escape" />`;

	const modifiersCode = `<Kbd keys="Mod+Shift+K" />
<Kbd keys="Ctrl+Alt+Delete" />
<Kbd keys="Mod+Z" />`;

	const sizesCode = `<Kbd keys="Mod+K" size="sm" />
<Kbd keys="Mod+K" size="md" />`;

	const arrowsCode = `<Kbd keys="Up" />
<Kbd keys="Down" />
<Kbd keys="Left" />
<Kbd keys="Right" />`;
</script>

<UiDocHeader
	title="Kbd"
	description="Keyboard shortcut display that renders key combinations with platform-appropriate symbols. Accepts a '+' separated key string."
	importCode={"import { Kbd } from 'phoundry-ui';"}
/>

<Example title="Basic Shortcuts" code={basicCode}>
	<div class="flex items-center gap-4">
		<Kbd keys="Mod+S" />
		<Kbd keys="Enter" />
		<Kbd keys="Escape" />
	</div>
</Example>

<Example title="Modifier Combos" code={modifiersCode}>
	<div class="flex items-center gap-4">
		<Kbd keys="Mod+Shift+K" />
		<Kbd keys="Ctrl+Alt+Delete" />
		<Kbd keys="Mod+Z" />
	</div>
</Example>

<Example title="Arrow keys" code={arrowsCode}>
	<p class="mb-2 text-xs text-txt-secondary">Direction tokens map to arrows on macOS glyphs.</p>
	<div class="flex flex-wrap items-center gap-3">
		<Kbd keys="Up" />
		<Kbd keys="Down" />
		<Kbd keys="Left" />
		<Kbd keys="Right" />
	</div>
</Example>

<Example title="Sizes" code={sizesCode}>
	<div class="flex items-center gap-4">
		<span class="text-xs text-txt-tertiary">sm:</span>
		<Kbd keys="Mod+K" size="sm" />
		<span class="text-xs text-txt-tertiary">md:</span>
		<Kbd keys="Mod+K" size="md" />
	</div>
</Example>

<Separator />

<PropTable {props} />

## Usage tips

- `Mod` resolves to ⌘ on macOS and Ctrl on other platforms.
- Keys are automatically uppercased and mapped to platform glyphs (e.g. ⇧ for Shift on Mac).
- Pair with command palette items, menu labels, or tooltip descriptions to show shortcuts inline.
