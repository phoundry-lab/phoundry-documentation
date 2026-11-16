---
title: "Style and theme plugin interfaces"
description: "Style plugin interfaces with host-supplied Phoundry UI styles, semantic theme hooks, scoped CSS, and optional styling tools."
ai_disclosure: true
order: 3
---

# Style and theme plugin interfaces

Style a plugin interface with ordinary CSS and Phoundry UI’s public `--ph-*` theme hooks. Component-scoped styles are a useful default for following the active Phials theme while keeping layout changes local.

The plugin starter compiles CSS into the optional `styles.css` release artifact. Phials loads that file into the application document, so every unscoped selector can affect more than your plugin.

## Use the host’s shared styles

Phials imports `phoundry-ui/styles` and supplies the active theme. Phoundry UI uses plain CSS; its shared styles include foundation colors, control dimensions, semantic primitives, and a low-priority native-element reset. A plugin does not need to import another copy of those global styles or a fixed light or dark theme.

The starter has no `src/app.css` and no Tailwind setup by default. Add component styles or your own stylesheet when needed. Tailwind and other styling tools are optional, plugin-owned build choices, not requirements for Phoundry UI.

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
		border: 1px solid var(--ph-border-muted);
		border-radius: 0.5rem;
		background: var(--ph-surface-3);
		color: var(--ph-text-primary);
	}

	.summary p {
		margin: 0;
		color: var(--ph-text-secondary);
	}
</style>
```

For shared plugin rules, a plugin-specific wrapper or prefixed class helps make the intended scope clear. Local theme-hook overrides are valid; setting a public `--ph-*` property on a wrapper customizes inheriting descendants without intentionally changing the whole document.

You can use Svelte `:global(...)`, standard CSS selectors, and theme-hook overrides. Choose their scope deliberately: global rules and root-level overrides can affect Phials and other plugins. A component or wrapper selector is usually the best starting point when styling only your own interface.

## Use semantic theme tokens

Semantic hooks describe a role rather than a fixed color. Useful families include:

| Purpose | CSS custom properties |
| --- | --- |
| Surfaces | `--ph-surface-0` through `--ph-surface-7`, deepest to highest elevation |
| Text | `--ph-text-primary`, `--ph-text-secondary`, `--ph-text-tertiary`, `--ph-text-disabled`, `--ph-text-link` |
| Borders | `--ph-border-muted`, `--ph-border-default`, `--ph-border-emphasis` |
| Controls | `--ph-control-bg`, `--ph-control-bg-hover`, `--ph-control-bg-pressed` |
| Solid accent | `--ph-accent`, `--ph-accent-hover`, `--ph-accent-pressed`, `--ph-accent-fg` |
| Status | `--ph-success-fg`, `--ph-warning-fg`, `--ph-danger-fg`, `--ph-info-fg`, with corresponding `-bg` and `-border` hooks |
| Selected items | `--ph-item-bg-selected`, `--ph-item-bg-selected-hover`, `--ph-item-fg-selected` |
| Selected text | `--ph-text-selection-bg`, `--ph-text-selection-fg` |

These hooks have foundation defaults; a theme need not define every one. Typography hooks include `--ph-font-sans`, `--ph-font-serif`, and `--ph-font-mono`. Shared control dimensions use `--ph-comp-*` hooks.

See the [Phoundry UI theming guide](/phoundry-ui/guides/theming) for the full public contract. If you add a utility framework, configure its aliases and source discovery yourself; Phoundry UI does not require a utility compiler or supply Tailwind color aliases.

## Let components own component visuals

Phoundry UI components expose typed variants and sizes. Prefer those props to conflicting utility classes:

```svelte
<Button variant="danger" size="sm" fullWidth>
	Remove record
</Button>
```

Use additive classes for placement, with your own CSS defining their layout. For visual customization, use public `--ph-*` hooks and documented theme-relevant part selectors. Public component roots use `ph-*`, with variant and size axes expressed by `data-variant` and `data-size`.

Undocumented descendants, generated Svelte scope attributes, and `--_ph-*` properties are internal implementation details. DOM nesting is not guaranteed; target documented parts without assuming their immediate parent.

## Use icons as semantic interface elements

Prefer `PhiIcons` for common interface actions and register the Phoundry collections once as described in [Use Phoundry UI components](use-phoundry-ui-components.md). Use a consistent icon for the same action, keep decorative icons out of the accessibility tree, and give icon-only controls a label.

Provider metadata accepts Iconify IDs. Include those IDs in the plugin’s `icons` array so Phials can preload them before displaying host-owned tabs, commands, or view controls.

## Check every supported theme

Before packaging:

1. Switch between a light and dark Phials theme.
2. Check normal, hover, focus, selected, disabled, warning, and error states.
3. Confirm text and icons remain legible over each semantic surface.
4. Enable reduced motion and confirm the interface remains understandable without transition cues.
5. If the build emits `dist/styles.css`, inspect global rules and theme overrides for effects outside the intended plugin surface.

If the plugin supplies a complete theme rather than merely consuming the active theme, follow [Create themes](../../add-capabilities/create-themes/index.md).
