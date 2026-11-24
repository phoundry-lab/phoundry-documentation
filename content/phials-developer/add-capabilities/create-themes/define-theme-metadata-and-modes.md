---
title: "Define theme metadata and modes"
description: "Choose a stable ID, display name, light or dark mode, and optional preview colors."
ai_disclosure: true
order: 2
---

# Define theme metadata and modes

Keep `theme.json` beside the corresponding `theme.css`.

```json
{
	"id": "example.slate-dark",
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

| Field | Required | What to use |
| --- | --- | --- |
| `id` | Yes | A unique ID such as `example.slate-dark`. Use up to 128 characters and at least two dot-separated lowercase segments. Each segment starts with a letter, can contain internal hyphens, and ends with a letter or digit. The `phi.`, `phials.`, and `phoundry.` prefixes are reserved. |
| `name` | Yes | The name people see when choosing a theme. |
| `mode` | Yes | `light` or `dark`, which sets the theme’s foundation and determines where it appears in Appearance settings. |
| `author` | No | The author or organization. If included, it must match the author in the community listing. |
| `preview` | No | An object with all three CSS colors shown above. If omitted, Phials uses generic swatches for the mode. |

Keep the ID when you change a theme’s name or colors so Phials can recognize an update. Give light and dark variants distinct IDs and names, such as **Slate Light** and **Slate Dark**. Each variant has its own selection in Phials.

The [community theme listing](./package-and-test-theme-release-artifacts.md) supplies the version, description, repository, and release details. Keep `theme.json` to the five supported fields.
