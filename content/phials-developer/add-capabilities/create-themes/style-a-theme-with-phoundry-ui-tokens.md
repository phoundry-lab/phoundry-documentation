---
title: "Style a theme with Phoundry UI tokens"
description: "Customize plain CSS themes with optional public hooks, component selectors, and practical contrast and interaction checks."
ai_disclosure: true
order: 3
---

# Style a theme with Phoundry UI tokens

Theme CSS is ordinary CSS. Phials already supplies `phoundry-ui/styles`, including complete light and dark foundations, shared control dimensions, component styles, and a low-priority native-element reset. Your theme can override only what it needs.

There is no mandatory token set, token-completeness validator, or CSS selector policy. A theme can use custom properties, component rules, fonts, effects, and CSS imports. Tailwind and other CSS build tools are optional, not part of the theme contract.

## Start with one override

For a theme whose metadata declares `"mode": "dark"`, this is a sufficient `theme.css`:

```css
:root {
	--ph-accent: #8fb3ff;
}
```

The selected foundation supplies every other library value. When Phials applies a theme, the theme manager commits its stylesheet and `data-theme-mode` together. The foundation also sets the browser’s `color-scheme` for native controls.

The accent is the exact solid fill you choose. Hover, pressed, and subtle treatments have derived defaults, but foreground contrast and visual quality remain your responsibility. There is no automatic contrast-selection engine.

For more individual treatment, add explicit overrides:

```css
:root {
	--ph-accent: #8fb3ff;
	--ph-accent-fg: #101218;
	--ph-accent-hover: #a8c4ff;
	--ph-accent-pressed: #739cf2;
	--ph-surface-3: #1c2029;
	--ph-text-primary: #f4f6fb;
	--ph-item-bg-selected: #343d4d;
}
```

Explicit values remain fixed when input colors change. Other defaults continue deriving from the effective inputs. To design a full palette, use Default Dark or Default Light as a reference rather than treating every hook as required.

## Choose public hooks by role

The [Phoundry UI theming guide](/phoundry-ui/guides/theming) describes the full public CSS contract. Common optional hooks include:

| Role | Hooks |
| --- | --- |
| Surfaces | `--ph-surface-0` through `--ph-surface-7`, deepest to highest elevation |
| Text | `--ph-text-primary`, `--ph-text-secondary`, `--ph-text-tertiary`, `--ph-text-disabled`, `--ph-text-link` |
| Borders | `--ph-border-muted`, `--ph-border-default`, `--ph-border-emphasis` |
| Controls | `--ph-control-bg`, `--ph-control-bg-hover`, `--ph-control-bg-pressed` |
| Solid accent | `--ph-accent`, `--ph-accent-hover`, `--ph-accent-pressed`, `--ph-accent-fg` |
| Subtle accent | `--ph-accent-subtle-bg`, `--ph-accent-subtle-bg-hover`, `--ph-accent-subtle-bg-pressed`, `--ph-accent-subtle-fg` |
| Selected items | `--ph-item-bg-selected`, `--ph-item-bg-selected-hover`, `--ph-item-fg-selected` |
| Selected text | `--ph-text-selection-bg`, `--ph-text-selection-fg` |
| Status | `--ph-{success,warning,danger,info}-{fg,bg,border}` |
| Named hues | `--ph-hue-{red,orange,yellow,green,cyan,blue,purple,pink,gray}` |
| Syntax | `--ph-syntax-{keyword,string,number,comment,function,variable}` |
| Panel shadow | `--ph-shadow-panel` |

Braces abbreviate separate names. Surfaces describe elevation, not a mandatory brightness progression. Choose a treatment appropriate to the surface’s role instead of assuming every dark theme becomes lighter at every step.

Changing the accent does not recolor status, named-hue, or syntax families unless you override them. Pressed controls, persistent item selection, and selected text are independent treatments.

Typography uses `--ph-font-sans`, `--ph-font-serif`, `--ph-font-mono`, and `--ph-font-logo`. Shared control geometry includes the `--ph-comp-h-xs/sm/md/lg` height hooks and `--ph-comp-icon-xs/sm/md/lg` icon-size hooks. Consult the component documentation before changing geometry or motion hooks.

## Customize component visuals

Phoundry UI components own unlayered vanilla CSS. Public component roots use `ph-*` classes, with `data-variant` and `data-size` for their variant and size axes. Public `--ph-*` custom properties and documented theme-relevant part selectors are available for customization:

```css
:root .ph-btn {
	box-shadow: none;
}

:root .ph-btn .ph-btn-icon {
	opacity: 0.9;
}
```

Normal CSS specificity and source order apply. The example targets a documented part without assuming its immediate parent. Undocumented descendants, generated Svelte scope attributes, and `--_ph-*` properties are internal; DOM nesting is not guaranteed.

Keyboard focus shares the hover treatment by default, without a focus-ring token or default rings. A theme can provide its own focus appearance. Check that keyboard users can identify the focused control, including chrome-free variants and controls over different surfaces.

## Consider application-wide effects

Theme CSS applies to the whole document while selected. `:root`, `html`, `body`, broad element selectors, token overrides, and global rules are available, not validation failures. Local wrapper overrides are also valid when only part of the interface should change.

Prefer public hooks and documented selectors for changes intended to survive component updates. Broad rules or selectors tied to Phials internals can affect unrelated surfaces; inspect those effects deliberately. Phials already supplies the shared reset, so another reset or utility framework may change more than the theme’s colors.

CSS imports and fonts are allowed, but plan their delivery. The plugin release format contains flat theme pairs, not arbitrary asset directories. Inline supporting resources when needed, and test offline behavior if you rely on remote resources. No theme CSS compiler is required; if you add one, make sure the emitted theme asset contains its output.

## Test contrast and the whole state system

Check these relationships in the running application:

- primary, secondary, and tertiary text against the surfaces where each appears
- accent foreground against normal, hover, and pressed accent fills
- selected-item foreground against its selected background
- selected text against its selection background
- borders and focus treatments against both controls and surrounding surfaces
- status colors with readable text or icons, not color alone
- syntax colors, including quieter comments, on editor and code-block surfaces

Aim for at least 4.5:1 contrast for normal text and 3:1 for large text and meaningful non-text graphics. These are visual and accessibility checks you perform, not token-validation gates.

Verify representative Phials surfaces:

- app chrome, Explorer, settings, menus, popovers, dialogs, and notifications
- inputs, buttons, links, tabs, tables, and tree rows
- normal, hover, pressed, selected, disabled, keyboard focus, warning, and error states
- code blocks and editors with representative syntax
- narrow layouts, increased text size, and reduced motion

Manage motion introduced by your theme and test it with reduced-motion preferences. Switch the application color scheme to confirm Phials selects the separately configured theme for the other mode.
