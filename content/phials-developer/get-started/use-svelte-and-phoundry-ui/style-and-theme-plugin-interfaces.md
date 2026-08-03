---
title: "Style and theme plugin interfaces"
description: "Covers scoped component styles, the starter’s selected Phoundry UI and Tailwind imports, theme tokens, global styles.css risk, and icons."
ai_disclosure: true
order: 3
---

# Style and theme plugin interfaces

Style a plugin interface with scoped component CSS, Phoundry UI’s semantic tokens, and complete Tailwind utility names. This lets the interface follow the active Phials theme without taking ownership of application-wide styling.

The plugin starter compiles CSS into the optional `styles.css` release artifact. Phials loads that file into the application document, so every unscoped selector can affect more than your plugin.

## Keep the starter style imports

The starter’s `src/app.css` imports the selected styling layers:

```css
@import "tailwindcss";
@import "phoundry-ui/styles/theme.css";
@import "phoundry-ui/styles/tokens.css";
@import "phoundry-ui/styles/components.css";
@import "phoundry-ui/styles/utils.css";
```

These imports provide:

- Tailwind CSS utilities used by your source
- semantic Tailwind aliases such as `bg-surface-base` and `text-txt-secondary`
- component-level Phoundry UI tokens
- shared component and utility styles

Keep the imports in the global entry stylesheet and import that stylesheet once from `src/main.ts`. Do not import a fixed light or dark theme into a component. Phials supplies the active theme values.

## Prefer scoped component styles

A `<style>` block in a Svelte component is scoped to that component. Use it for component-specific structure and CSS that does not need to be shared:

```svelte
<section class="summary">
	<h2>File summary</h2>
	<p>Three matching records</p>
</section>

<style>
	.summary {
		display: grid;
		gap: 0.5rem;
		padding: 1rem;
		border: 1px solid var(--border-muted);
		border-radius: 0.5rem;
		background: var(--surface-base);
		color: var(--text-primary);
	}

	.summary p {
		margin: 0;
		color: var(--text-secondary);
	}
</style>
```

Reserve `app.css` for package imports and rules that genuinely must be global. Prefix any plugin-owned global class or custom property with the plugin ID:

```css
.example-labels-visually-clipped {
	overflow: clip;
}

:root {
	--example-labels-chart-gap: 0.75rem;
}
```

Avoid broad selectors such as `button`, `input`, `h1`, `[role="tab"]`, or `*` in global CSS. Do not redefine Phoundry UI tokens on `:root`; that would change Phials and every other loaded plugin.

## Use semantic theme tokens

Semantic tokens describe a role rather than a fixed color. Prefer these families:

| Purpose | CSS variables | Tailwind examples |
| --- | --- | --- |
| Surfaces | `--surface-deep`, `--surface-sunken`, `--surface-base`, `--surface-raised`, `--surface-overlay` | `bg-surface-base`, `bg-surface-raised` |
| Text | `--text-primary`, `--text-secondary`, `--text-tertiary`, `--text-on-accent` | `text-txt-primary`, `text-txt-secondary` |
| Borders | `--border-muted`, `--border-default`, `--border-emphasis` | `border-border-muted`, `border-border-default` |
| Accent | `--accent-primary`, `--accent-primary-hover`, `--accent-secondary` | `bg-accent-primary`, `text-accent-secondary` |
| Status | `--semantic-success`, `--semantic-warning`, `--semantic-error`, `--semantic-info` | `text-semantic-error`, `bg-semantic-warning/10` |
| Selection and focus | `--selection-bg`, `--selection-text`, `--focus-ring` | `bg-selection-bg`, `ring-focus-ring` |

Use CSS variables in component styles and the corresponding semantic aliases in Tailwind classes:

```svelte
<div
	class={[
		"rounded-lg border border-border-muted bg-surface-base p-3",
		"text-txt-primary",
		hasError && "border-semantic-error",
	]}
>
	<p class="text-sm text-txt-secondary">Import status</p>
	<strong>{hasError ? "Needs attention" : "Ready"}</strong>
</div>
```

Tailwind discovers utility classes as source text. Keep every possible utility as a complete literal. Do not construct class names such as `` `text-${tone}` ``; use a typed map or explicit condition instead.

```typescript
const statusClass = {
	success: "text-semantic-success",
	warning: "text-semantic-warning",
	error: "text-semantic-error",
} as const;
```

## Let components own component visuals

Phoundry UI components expose typed variants and sizes. Prefer those props to conflicting utility classes:

```svelte
<Button variant="danger" size="sm" fullWidth>
	Remove record
</Button>
```

Additive classes are appropriate for placement:

```svelte
<Button class="self-end" variant="secondary">
	Cancel
</Button>
```

If a component does not expose a visual contract you need, use a native element with semantic tokens or choose another shared component. Do not target a Phoundry UI component’s private descendants or generated Svelte scope attributes.

## Use icons as semantic interface elements

Prefer `PhiIcons` for common interface actions and register the Phoundry collections once as described in [Use Phoundry UI components](use-phoundry-ui-components.md). Use a consistent icon for the same action, keep decorative icons out of the accessibility tree, and give icon-only controls a label.

Provider metadata accepts Iconify IDs. Include those IDs in the plugin’s `icons` array so Phials can preload them before displaying host-owned tabs, commands, or view controls.

## Check every supported theme

Before packaging:

1. Switch between a light and dark Phials theme.
2. Check normal, hover, focus, selected, disabled, warning, and error states.
3. Confirm text and icons remain legible over each semantic surface.
4. Enable reduced motion and confirm the interface remains understandable without transition cues.
5. Inspect `dist/styles.css` for accidental broad selectors and fixed theme values.

If the plugin supplies a complete theme rather than merely consuming the active theme, follow [Create themes](../../add-capabilities/create-themes/index.md).
