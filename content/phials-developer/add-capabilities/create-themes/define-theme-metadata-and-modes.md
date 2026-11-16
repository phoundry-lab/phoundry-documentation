---
title: "Define theme metadata and modes"
description: "Defines stable identity, display name, light or dark mode, author information, and optional preview swatches; light and dark variants register separately."
ai_disclosure: true
order: 2
---

# Define theme metadata and modes

Use `theme.json` to give each theme a stable identity, a picker label, and exactly one light or dark mode. The metadata file sits beside that theme’s `theme.css`.

```json
{
	"id": "example.theme-pack.slate-dark",
	"name": "Slate Dark",
	"mode": "dark",
	"author": "Example Studio",
	"preview": {
		"background": "#1c2029",
		"foreground": "#f4f6fb",
		"accent": "#8fb3ff"
	}
}
```

## Set each metadata field

| Field | Required | Contract |
| --- | --- | --- |
| `id` | Yes | Globally unique, stable theme identity |
| `name` | Yes | Concise user-facing name shown in the theme picker |
| `mode` | Yes | Exactly `"light"` or `"dark"` |
| `author` | No | Theme author or organization |
| `preview` | No | Background, foreground, and accent CSS colors for the picker |

### Choose a stable ID

Namespace the ID beneath the stable plugin ID:

```text
<plugin-id>.<variant>
```

For a plugin with ID `example.theme-pack`, use IDs such as:

- `example.theme-pack.slate-light`
- `example.theme-pack.slate-dark`

Never use a built-in `phi.` ID. Do not change an ID to revise capitalization, the display name, or colors. A changed ID is a new theme and does not retain the user’s selection.

The directory slug and theme ID serve different purposes. The slug controls filenames and installation layout; the ID controls theme identity. Keep both stable and use the same variant wording so release artifacts remain easy to inspect.

### Write a useful name and author

The `name` should identify the appearance without repeating “theme.” Use a shared family name plus a clear variant when you publish related appearances, such as **Slate Light** and **Slate Dark**.

Use `author` when attribution helps users identify the source. Keep plugin-level repository, website, and description information in the standard plugin manifest rather than duplicating it in every theme.

### Declare one mode

`mode` determines which picker list contains the theme:

- `"light"` registers a light theme.
- `"dark"` registers a dark theme.

A theme declares one mode. Phials stores separate selected theme IDs for light and dark color schemes, so each variant has its own registration. Applying the theme sets `data-theme-mode` and uses the matching light or dark foundation; you do not need to redefine its defaults or set `color-scheme` yourself.

For a paired family:

```text
themes/
├── slate-light/
│   ├── theme.json  # id: example.theme-pack.slate-light, mode: light
│   └── theme.css
└── slate-dark/
    ├── theme.json  # id: example.theme-pack.slate-dark, mode: dark
    └── theme.css
```

The selected light and dark themes are independent user choices. If you use `prefers-color-scheme` in your CSS, account for the fact that the user may explicitly select a mode rather than follow the system preference.

## Define preview swatches

`preview` contains three CSS colors:

```json
{
	"preview": {
		"background": "#1c2029",
		"foreground": "#f4f6fb",
		"accent": "#8fb3ff"
	}
}
```

Choose swatches representative of the finished appearance: a main surface, readable foreground text, and the accent. For example, these might match `--ph-surface-3`, `--ph-text-primary`, and `--ph-accent` if your CSS overrides them.

Preview swatches are optional. When omitted, the picker uses a generic light or dark fallback, not colors extracted from your CSS. Listing an unselected theme does not parse its stylesheet or render it offscreen. Use explicit, self-contained CSS colors to represent the theme accurately in the picker, and preserve enough contrast for the small preview.

If `preview` is present, all three fields are required. Unknown metadata keys are rejected; keep the sidecar to `id`, `name`, `mode`, optional `author`, and optional `preview`. The ID must be trimmed and begin with the plugin ID followed by a dot. `name` and a supplied `author` must be non-empty strings.

## Validate variants independently

For every metadata file, verify:

- the ID is unique across the plugin and remains stable between releases
- the name distinguishes the variant
- the mode matches the intended CSS appearance
- all three preview values, when supplied, are valid CSS colors
- the neighboring `theme.css` belongs to the same variant

If a plugin supplies both variants, test each one directly rather than assuming that mirrored color values produce equivalent contrast and states.
