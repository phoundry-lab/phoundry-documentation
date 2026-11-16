---
title: "Add a theme to a plugin"
description: "Creates the convention-based theme directory and connects theme discovery to plugin activation and deactivation."
ai_disclosure: true
order: 1
---

# Add a theme to a plugin

Author a `theme.json` and `theme.css` pair, emit it as flat release assets, and install the plugin. Phials discovers complete pairs beneath the installed plugin’s `themes/` directory when the plugin activates. The starter does not automatically scan your source `themes/` directory; add the explicit build step in [Package and test theme release artifacts](package-and-test-theme-release-artifacts.md).

## Create the theme directory

Start from the [plugin starter repo](../../get-started/build-your-first-plugin/create-a-plugin-project-from-the-starter.md). Add one directory for each independently selectable theme:

```text
example-theme-plugin/
├── package.json
├── vite.config.ts
├── src/
│   ├── main.ts
│   └── plugin.manifest.ts
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

Create `themes/slate-dark/theme.css` using the example in [Style a theme with Phoundry UI tokens](style-a-theme-with-phoundry-ui-tokens.md). A single `--ph-accent` override is enough to start: the selected light or dark foundation supplies the other values. There is no required token checklist.

## Keep the plugin entry point minimal

A plugin that contributes only themes still exports a valid [PhialsPlugin](../../reference/sdk-type-reference/PhialsPlugin.md). It does not need a theme provider.

Keep the starter’s source manifest in `src/plugin.manifest.ts`. Set its ID to `example.theme-pack`, update its name and repository, and retain its `version` import from `../package.json`. Change the release version in `package.json`, not in a separate public manifest.

A minimal `src/main.ts` retains the exports expected by the starter build:

```typescript
import { definePlugin } from "@phoundry/phials-plugin-sdk/manifest";
import { pluginManifest } from "./plugin.manifest";

export { mount, unmount } from "svelte";
export { pluginManifest as manifest } from "./plugin.manifest";

export default definePlugin(pluginManifest, {
	providers: [],
});
```

The build generates `dist/manifest.json` from the bundled named `manifest` export and checks that the plugin definition matches. A theme-only plugin normally declares an empty `permissions` array because discovery does not use a permission-gated Plugin API operation.

## Build and install the pair locally

First configure the [theme asset build step](package-and-test-theme-release-artifacts.md#emit-theme-assets-with-vite), then run the starter checks:

```bash
npm run check
npm run build
npm run release:verify
```

With that build step in place, Vite emits each source pair as flat release assets. For this example:

```text
dist/
├── manifest.json
├── main.js
├── theme-slate-dark.json
└── theme-slate-dark.css
```

Run `npm run dev:install` to build and install into your normal Phials home, then reload the plugin in **Settings → Plugins**. The installer respects `PHIALS_HOME` and the optional `--phials-home` flag; use the same home when launching Phials. See [Install a development plugin locally](../../test-and-troubleshoot/run-your-plugin-locally/install-a-development-plugin-locally.md) for details. Its installed shape is:

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
