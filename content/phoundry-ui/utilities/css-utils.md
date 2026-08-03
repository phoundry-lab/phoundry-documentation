---
title: CSS Utilities
layout: ui
order: 1
---

<script lang="ts">
	import UiDocHeader from '$lib/docs/ui/UiDocHeader.svelte';
	import Example from '$lib/docs/ui/Example.svelte';
	import Separator from '$phoundry/components/display/Separator.svelte';

	const stylesImportCode = `import 'phoundry-ui/styles/theme.css';
import 'phoundry-ui/styles/components.css';
import 'phoundry-ui/styles/utils.css';`;

	const specularCode = `<div class="phi-specular-card relative rounded-xl border border-border-muted bg-surface-base p-6">
  <div class="relative z-10">
    <h3>Title</h3>
    <p>Body copy stays readable above the gloss.</p>
  </div>
</div>`;

	const focusRingCode = `<button type="button" class="focus-ring rounded-md px-2 py-1 text-xs">Keyboard focus me</button>`;
</script>

<UiDocHeader
	title="CSS Utilities"
	description="Shared classes shipped with phoundry-ui styles: import phoundry-ui/styles or the split theme.css + components.css + utils.css bundle so overlays, focus rings, and decorative utilities resolve."
	importCode={stylesImportCode}
/>

## Specular card

`.phi-specular-card` adds a soft corner glow and edge highlight. Layer content above the pseudo-elements (`relative z-10` on children) if you need crisp text atop the effect.

<Example title="Specular effect" code={specularCode}>
	<div class="flex items-center justify-center rounded-lg bg-surface-sunken p-8">
		<div class="phi-specular-card relative w-64 rounded-xl border border-border-muted bg-surface-base p-6 shadow-lg">
			<div class="relative z-10">
				<h3 class="mb-2 text-base font-medium text-txt-primary">Specular Effect</h3>
				<p class="text-sm text-txt-tertiary">Soft glow top-left plus a thin specular rim.</p>
			</div>
		</div>
	</div>
</Example>

<Separator />

## Focus rings

`.focus-ring` and `.focus-ring-inset` pair with `--focus-ring` from the theme. Inputs such as `Checkbox` already include them.

<Example title="Focus ring" code={focusRingCode}>
	<button type="button" class="focus-ring rounded-md bg-surface-raised px-2 py-1 text-xs text-txt-primary">
		Tab to focus
	</button>
</Example>

<Separator />

## Z-index tokens

`components.css` defines `--z-dropdown` through `--z-tooltip`. Overlay components (context menu, command bar, modals) reference these - override in your theme if you stack third-party widgets.

<Separator />

## Overlay chrome

Panel shells such as `.ctx-menu-panel`, `.cmd-bar-panel`, `.modal-panel`, and `.tour-panel` style built-in overlays. Custom modals opened through the modal manager should keep the `modal-panel` class on the inner card for consistent depth.
