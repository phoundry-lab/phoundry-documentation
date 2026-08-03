---
title: "Add a theme to a plugin"
description: "Creates the convention-based theme directory and connects theme discovery to plugin activation and deactivation."
ai_disclosure: true
order: 1
---

# Add a theme to a plugin

Add a theme by placing a `theme.json` and `theme.css` pair in the starter’s convention-based `themes/` directory. Phials discovers the pair automatically when the plugin activates.

## Create the theme directory

Start from the [plugin starter repo](../../get-started/build-your-first-plugin/create-a-plugin-project-from-the-starter.md). Add one directory for each independently selectable theme:

```text
example-theme-plugin/
├── public/
│   └── manifest.json
├── src/
│   └── main.ts
└── themes/
    └── slate-dark/
        ├── theme.json
        └── theme.css
```

Use a lowercase kebab-case directory slug such as `slate-dark`. The slug becomes part of the release artifact name, so keep it stable after publication.

## Add the metadata sidecar

Create `themes/slate-dark/theme.json`:

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

The theme ID is independent of the directory slug. Namespace it beneath the plugin ID so it cannot collide with a built-in theme or another plugin’s theme.

## Add the theme CSS

Create `themes/slate-dark/theme.css` from the complete working file in [Style a theme with Phoundry UI tokens](style-a-theme-with-phoundry-ui-tokens.md). A theme must define the complete required token set; a partial palette has no fallback values.

## Keep the plugin entry point minimal

A plugin that contributes only themes still exports a valid [PhialsPlugin](../../reference/sdk-type-reference/PhialsPlugin.md). It does not need a theme provider:

```typescript
export default function createPlugin(): PhialsPlugin {
	return {
		id: "example.theme-pack",
		name: "Example theme pack",
		version: "1.0.0",
		providers: [],
	};
}
```

Keep the same plugin ID, name, and version in the release manifest. A theme-only plugin normally declares an empty `permissions` array because discovery does not use a permission-gated Plugin API operation.

## Build and install the pair locally

Run the starter checks:

```bash
npm run check
npm run build
npm run validate
```

The theme build stages each source pair as flat release assets. For this example:

```text
dist/
├── manifest.json
├── main.js
├── theme-slate-dark.json
└── theme-slate-dark.css
```

Install the development plugin as described in [Install a development plugin locally](../../test-and-troubleshoot/run-your-plugin-locally/install-a-development-plugin-locally.md). Its installed shape is:

```text
example.theme-pack/
├── manifest.json
├── main.js
└── themes/
    └── slate-dark/
        ├── theme.json
        └── theme.css
```

Enable the plugin, then open Phials appearance settings. **Slate Dark** should appear only in the dark-theme list. Select it and verify that the application changes immediately.

Disabling the plugin deactivates it and removes its themes from the picker. Re-enable it to confirm discovery is repeatable and does not require an application restart.
