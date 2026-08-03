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

A theme cannot target both. Phials stores separate selected theme IDs for light and dark color schemes, so each variant must be a complete registration.

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

Do not make one CSS file switch values with `prefers-color-scheme`. The selected light and dark themes are independent user choices.

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

Match them to the final values of:

| Preview field | Theme token |
| --- | --- |
| `background` | `--surface-base` |
| `foreground` | `--text-primary` |
| `accent` | `--accent-primary` |

Preview swatches are optional. When omitted, Phials derives them from those three tokens. Explicit swatches are useful when CSS expressions such as `color-mix()` make static release validation or preview extraction less predictable.

Use valid CSS colors and preserve enough contrast for the small picker preview. Preview metadata is not a substitute for defining the corresponding required tokens in `theme.css`.

## Validate variants independently

For every metadata file, verify:

- the ID is unique across the plugin and remains stable between releases
- the name distinguishes the variant
- the mode matches the CSS appearance and `color-scheme` declaration
- all three preview values are valid CSS colors
- the neighboring `theme.css` belongs to the same variant

If a plugin supplies both variants, test each one directly rather than assuming that mirrored color values produce equivalent contrast and states.
