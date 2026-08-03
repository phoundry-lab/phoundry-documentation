---
title: "Style a theme with Phoundry UI tokens"
description: "Defines required CSS tokens, validates contrast and component states, and avoids leaking unrelated global styles."
ai_disclosure: true
order: 3
---

# Style a theme with Phoundry UI tokens

Define every required Phoundry UI token in `theme.css`. The tokens describe semantic roles such as an elevated surface, primary text, an error, or a focus ring. Components consume those roles without knowing the theme’s literal colors.

The shared base theme layer does not provide fallback palette values. An omitted token can therefore make text, borders, states, or editor syntax disappear.

## Start from a complete theme file

This dark theme defines the complete required set:

```css
:root {
	color-scheme: dark;

	/* Surface elevation: recessed to elevated */
	--surface-deep: #101218;
	--surface-sunken: #171a21;
	--surface-base: #1c2029;
	--surface-dim: #222733;
	--surface-raised: #29303d;
	--surface-overlay: #343d4d;

	/* Borders */
	--border-muted: #343b49;
	--border-default: #4a5568;
	--border-emphasis: #718096;

	/* Text */
	--text-primary: #f4f6fb;
	--text-secondary: #c5cada;
	--text-tertiary: #9ba4b8;
	--text-on-accent: #101218;

	/* Accent states */
	--accent-primary: #8fb3ff;
	--accent-primary-hover: #a8c4ff;
	--accent-primary-active: #739cf2;
	--accent-secondary: #b89cff;

	/* Semantic status */
	--semantic-success: #69d49a;
	--semantic-warning: #f6c76f;
	--semantic-error: #ff8d9b;
	--semantic-info: #7fc8ff;

	/* Selection and focus */
	--selection-bg: #8fb3ff;
	--selection-text: #101218;
	--focus-ring: #b8ceff;

	/* Syntax */
	--syntax-keyword: #d7a8ff;
	--syntax-string: #82d9a6;
	--syntax-number: #ffb4c8;
	--syntax-comment: #a4adbf;
	--syntax-function: #8fc7ff;
	--syntax-variable: #ffc38b;

	/* Option colors */
	--option-red: #ff7b89;
	--option-orange: #f7a76c;
	--option-yellow: #e6c861;
	--option-green: #68cf91;
	--option-cyan: #62ced5;
	--option-blue: #75a7f7;
	--option-purple: #a990ef;
	--option-pink: #ed8fca;
	--option-gray: #9da6b8;

	/* Option tints */
	--option-orange-light: #ffc69d;
	--option-yellow-light: #f5dc89;
	--option-green-light: #98e2b5;
	--option-cyan-light: #96e2e7;
	--option-blue-light: #a9c8ff;
	--option-purple-light: #cbb8ff;
	--option-pink-light: #f7b9df;

	/* Elevated panel shadow */
	--shadow-panel: 0 12px 32px rgb(0 0 0 / 28%);
}
```

Set `color-scheme: light` in a light theme so native controls and browser-provided chrome use the corresponding appearance.

Do not define `--surface-*-transparent` values. Phoundry UI derives those aliases from the six opaque surface tokens.

## Preserve semantic relationships

### Surfaces and borders

The surface ladder runs from most recessed to most elevated:

```text
deep → sunken → base → dim → raised → overlay
```

In a dark theme, elevation usually becomes lighter. In a light theme, the luminance direction often reverses, but the semantic order remains the same. Inputs and wells must still read as sunken, while menus and floating controls must still read as overlays.

Muted, default, and emphasis borders should remain distinguishable against every adjacent surface without becoming the strongest element on the page.

### Text, accent, and selection

Check these pairs explicitly:

- primary, secondary, and tertiary text on base, sunken, raised, and overlay surfaces
- text on accent against primary, hover, and active accent states
- selection text against the selection background
- focus ring against both the control and the surrounding surface

Aim for at least 4.5:1 contrast for normal text and 3:1 for large text, focus indicators, control boundaries, and meaningful non-text graphics. Do not use tertiary text for essential low-size content if it cannot meet the normal-text target.

Hover and active values must remain recognizably related to the primary accent while still producing a visible state change. Do not communicate selection, warning, or error state by color alone.

### Status, syntax, and option colors

Semantic status tokens communicate meaning across notifications, validation, and badges. Verify each status on the surfaces where it appears and pair it with text or an icon.

Syntax colors must remain distinguishable in both editor surfaces and code blocks. Comments still need readable contrast even though they are intentionally quieter.

Option colors appear in user-defined labels and metadata. Treat the base and light variants as a coordinated family, not as a decorative rainbow with interchangeable roles.

## Override component tokens deliberately

Phoundry UI derives component tokens such as `--button-bg`, `--input-bg`, and `--modal-bg` from the required semantic tokens. Most themes should keep those mappings.

You may override a documented component token when the theme needs a consistent component-level decision:

```css
:root {
	--button-radius: 0.25rem;
	--input-radius: 0.25rem;
	--modal-radius: 0.375rem;
}
```

Retest every variant and state of the affected component. A component override should not compensate for a broken semantic palette.

## Keep theme CSS within its scope

Theme CSS is application-wide while the theme is active. Keep most rules in the `:root` token block. Do not target undocumented Phials markup, generated Svelte attributes, or broad elements such as `button`, `input`, and `*`.

Use additional selectors only for stable web-platform behavior that is part of the theme:

```css
::selection {
	background: var(--selection-bg);
	color: var(--selection-text);
}
```

Do not import a reset, utility framework, component library, remote font, or another complete theme. A theme release should be deterministic, usable offline, and limited to the appearance it owns.

## Test the whole state system

Verify the theme in representative Phials surfaces:

- app chrome, Explorer, settings, menus, popovers, dialogs, and notifications
- inputs, buttons, links, tabs, tables, and tree rows
- normal, hover, active, selected, disabled, focus-visible, warning, and error states
- code blocks and editors with representative syntax
- narrow layouts, increased text size, and reduced motion

Test the theme itself in light or dark mode, then switch the color scheme to confirm Phials selects the separately configured theme for the other mode.
