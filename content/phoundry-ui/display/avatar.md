---
title: Avatar
layout: ui
order: 2
---

<script lang="ts">
	import UiDocHeader from '$lib/docs/ui/UiDocHeader.svelte';
	import Example from '$lib/docs/ui/Example.svelte';
	import PropTable from '$lib/docs/ui/PropTable.svelte';
	import type { PropDef } from '$lib/docs/ui/PropTable.svelte';
	import Separator from '$phoundry/components/display/Separator.svelte';
	import Avatar from '$phoundry/components/display/Avatar.svelte';
	import { PhiIcons } from '$phoundry/icons.js';

	const props: PropDef[] = [
		{ name: 'src', type: 'string', description: 'Image URL for the avatar.' },
		{ name: 'alt', type: 'string', description: 'Alt text for the image.' },
		{
			name: 'initials',
			type: 'string',
			description: 'Initials to display when no image is provided.'
		},
		{
			name: 'icon',
			type: 'string',
			description: 'Iconify icon string used as fallback when no image or initials.'
		},
		{
			name: 'size',
			type: "'xs' | 'sm' | 'md' | 'lg'",
			default: "'md'",
			description: 'Avatar size.'
		},
		{
			name: 'status',
			type: "'online' | 'offline' | 'away' | 'busy'",
			description: 'Status dot indicator.'
		},
		{ name: 'class', type: 'string', description: 'Additional CSS classes.' }
	];

	const imageCode = `<Avatar src="https://i.pravatar.cc/80?u=1" alt="Jane Doe" />`;

	const initialsCode = `<Avatar initials="JD" />
<Avatar initials="AB" />
<Avatar initials="XY" />`;

	const iconCode = `<Avatar icon={PhiIcons.folder} />
<Avatar icon={PhiIcons.document} />`;

	const imageWithStatusCode = `<Avatar src="/photo.jpg" alt="Team lead" status="online" size="lg" />`;

	const defaultUserGlyphCode = `<Avatar />
<!-- Same fallback as omitting src, initials, and icon -->`;

	const sizesCode = `<Avatar initials="XS" size="xs" />
<Avatar initials="SM" size="sm" />
<Avatar initials="MD" size="md" />
<Avatar initials="LG" size="lg" />`;

	const statusCode = `<Avatar initials="ON" status="online" />
<Avatar initials="AW" status="away" />
<Avatar initials="BS" status="busy" />
<Avatar initials="OF" status="offline" />`;
</script>

<UiDocHeader
	title="Avatar"
	description="Circular avatar displaying an image, initials, or icon fallback. Supports four sizes and an optional status dot indicator."
	importCode={"import { Avatar } from 'phoundry-ui';"}
/>

<Example title="With Image" code={imageCode}>
	<Avatar src="https://i.pravatar.cc/80?u=1" alt="Jane Doe" />
</Example>

<Example title="Initials" code={initialsCode}>
	<div class="flex items-center gap-3">
		<Avatar initials="JD" />
		<Avatar initials="AB" />
		<Avatar initials="XY" />
	</div>
</Example>

<Example title="Icon Fallback" code={iconCode}>
	<p class="mb-2 text-xs text-txt-secondary">
		Use any Iconify id or shared tokens from <code>PhiIcons</code> when there is no photo or initials.
	</p>
	<div class="flex items-center gap-3">
		<Avatar icon={PhiIcons.folder} />
		<Avatar icon={PhiIcons.document} />
	</div>
</Example>

<Example title="Image with status" code={imageWithStatusCode}>
	<div class="flex items-center gap-3">
		<Avatar src="https://i.pravatar.cc/80?u=7" alt="Team member" status="online" size="md" />
		<Avatar src="https://i.pravatar.cc/80?u=8" alt="Away user" status="away" size="sm" />
	</div>
</Example>

<Example title="Default user glyph" code={defaultUserGlyphCode}>
	<div class="flex items-center gap-3">
		<Avatar size="sm" />
		<Avatar size="md" />
	</div>
</Example>

<Example title="Sizes" code={sizesCode}>
	<div class="flex items-center gap-3">
		<Avatar initials="XS" size="xs" />
		<Avatar initials="SM" size="sm" />
		<Avatar initials="MD" size="md" />
		<Avatar initials="LG" size="lg" />
	</div>
</Example>

<Example title="Status Indicators" code={statusCode}>
	<div class="flex items-center gap-3">
		<Avatar initials="ON" status="online" />
		<Avatar initials="AW" status="away" />
		<Avatar initials="BS" status="busy" />
		<Avatar initials="OF" status="offline" />
	</div>
</Example>

<Separator />

<PropTable {props} />

## Usage tips

- The avatar falls back gracefully: image → initials → explicit `icon` → default user icon.
- If the image fails to load, the component automatically switches to the initials or icon fallback.
- Provide meaningful `alt` text whenever `src` is set; it defaults to an empty string.
- Use `status` alongside user avatars in chat, team lists, or collaboration UIs.
