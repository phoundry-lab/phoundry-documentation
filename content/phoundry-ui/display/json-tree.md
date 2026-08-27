---
title: JsonTree
layout: ui
order: 9
---

<script lang="ts">
	import UiDocHeader from '$lib/docs/ui/UiDocHeader.svelte';
	import PropTable from '$lib/docs/ui/PropTable.svelte';
	import type { PropDef } from '$lib/docs/ui/PropTable.svelte';
	import Separator from '$phoundry/components/display/Separator.svelte';
	import JsonTreeDemos from '$lib/docs/ui/demos/JsonTreeDemos.svelte';

	const props: PropDef[] = [
		{
			name: 'value',
			type: 'unknown',
			required: true,
			description:
				'Already-parsed JSON. Objects and arrays render as a foldable tree of keys or indices. JsonTree does not parse strings.'
		},
		{
			name: 'defaultExpandDepth',
			type: 'number',
			default: '1',
			description:
				'How many levels start open. `1` lists the value\'s own keys or indices and leaves nested objects and arrays collapsed.'
		},
		{ name: 'class', type: 'string', description: 'Additional CSS classes on the root tree.' }
	];
</script>

<UiDocHeader
	title="JsonTree"
	description="Inspect-only foldable tree for a JSON object or array. The Consumer owns the value. Not TreeView, not CodeBlock, and not a parser."
	importCode={"import { JsonTree } from 'phoundry-ui';"}
/>

<JsonTreeDemos />

<Separator />

<PropTable {props} />

## Usage tips

- Pass a parsed object or array. Detection and `JSON.parse` belong in the Consumer.
- There is no wrapper `{` / `[` row. The tree starts at the value's own keys or indices.
- Nested string leaves stay strings. JsonTree does not sniff them again.
- Empty objects and arrays render as `{}` / `[]` leaves, not as blank fold rows.
- This is inspect-only. There is no selection and no drag.
