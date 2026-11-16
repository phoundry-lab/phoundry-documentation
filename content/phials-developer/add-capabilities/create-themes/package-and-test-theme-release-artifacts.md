---
title: "Package and test theme release artifacts"
description: "Builds the supported theme asset pairs, publishes their required flat release-asset names, installs them into the expected directory shape, and verifies activation and removal."
ai_disclosure: true
order: 4
---

# Package and test theme release artifacts

Build each theme pair into two flat release assets. Phials maps those assets into the nested directory shape used for discovery during installation.

For the source pair:

```text
themes/slate-dark/theme.json
themes/slate-dark/theme.css
```

publish:

```text
theme-slate-dark.json
theme-slate-dark.css
```

The JSON and CSS filenames must use the exact same lowercase kebab-case slug.

## Emit theme assets with Vite

The starter does not scan `themes/` or copy `public/` files: its Vite configuration sets `publicDir: false`. Add an explicit asset-emission plugin to the existing `vite.config.ts`.

Add `readFileSync` and the `Plugin` type to its imports, keeping the existing `resolve` import and other configuration:

```typescript
import { readFileSync } from "node:fs";
import type { Plugin } from "vite";
```

Define the plugin above the existing `defineConfig` call:

```typescript
function themeAssets(): Plugin {
	const slugs = ["slate-dark"];

	return {
		name: "theme-assets",
		apply: "build",
		generateBundle() {
			for (const slug of slugs) {
				for (const extension of ["json", "css"]) {
					const sourcePath = resolve(
						import.meta.dirname,
						"themes",
						slug,
						`theme.${extension}`,
					);
					this.addWatchFile(sourcePath);
					this.emitFile({
						type: "asset",
						fileName: `theme-${slug}.${extension}`,
						source: readFileSync(sourcePath, "utf8"),
					});
				}
			}
		},
	};
}
```

Insert it into the existing plugins array, retaining the starter’s Svelte and artifact plugins:

```typescript
plugins: [svelte(), themeAssets(), pluginArtifacts(import.meta.dirname)],
```

Keep the rest of the starter configuration, including `publicDir: false` and its library build settings. Add each source directory slug to `slugs`. This example reads plain CSS verbatim; if you choose a CSS preprocessor, emit its compiled output instead.

Vite emits these assets during `generateBundle`. The starter’s artifact plugin then writes `dist/manifest.json` and automatically generates `release/release-inventory.json` in `writeBundle`, after the emitted files are on disk. Do not hand-edit either generated file or add a separate inventory command.

## Build and verify the release set

Run the starter’s release checks:

```bash
npm run check
npm run build
npm run release:verify
```

A theme-only plugin release contains:

```text
dist/
├── manifest.json
├── main.js
├── theme-slate-dark.json
└── theme-slate-dark.css
```

If the plugin also contributes Svelte interfaces, it may include `styles.css`. Theme CSS always remains in its own `theme-<slug>.css` asset; do not merge it into `styles.css`.

The starter’s build and `release:verify` check the release file set, paired asset names, bundled plugin exports, plugin identity and version agreement, and inventory checksums. A slug starts with a lowercase letter or number and otherwise uses lowercase letters, numbers, and hyphens. `release:verify` checks the existing built bytes without rebuilding them.

When Phials activates the installed plugin, theme discovery checks:

- each discovered theme has both `theme.json` and `theme.css`
- metadata parses as an object containing only supported fields
- the trimmed theme ID starts with `<plugin-id>.` and does not collide with another theme
- the name is non-empty and the mode is exactly `light` or `dark`
- optional author and preview fields are valid, including all three CSS colors when preview is supplied

Phials checks this metadata when discovering the installed theme. You can override only the public hooks you need; omitted values use the foundation defaults. Test the rendered theme for valid CSS, contrast, and effects on the rest of the interface.

Follow [Build and validate release artifacts](../../test-and-troubleshoot/test-and-validate-your-plugin/build-and-validate-release-artifacts.md) for the complete source and output checks.

## Attach flat assets to the plugin release

Attach the exact files from `dist/` to one GitHub release:

| Asset | Required |
| --- | --- |
| `manifest.json` | Yes |
| `main.js` | Yes |
| `styles.css` | Only when the plugin build emits it |
| `theme-<slug>.json` | Once for every theme |
| `theme-<slug>.css` | Once for every theme |

Do not upload the `themes/` source directory as an archive and do not rename one half of a pair in the release UI. A release with an unpaired theme asset is incomplete.

Theme assets must be attached to the GitHub release. Repository files alone are not the published installation source for theme pairs.

Use [Build a complete release artifact set](../../package-and-publish/prepare-a-release/build-a-complete-release-artifact-set.md) for version and release-set construction, then [Publish a GitHub release](../../package-and-publish/publish-your-plugin/publish-a-github-release.md).

## Verify the installed shape

For normal development, run `npm run dev:install`. It builds first and installs into your normal Phials home unless `PHIALS_HOME` or `--phials-home` selects another home. Reload the plugin in **Settings → Plugins**; watch mode alone does not install or reload it.

For a frozen release candidate, do not use `dev:install` as a copy-only command: it would rebuild. Preserve the existing `dist/` files and `release/release-inventory.json`, run `npm run release:verify`, and test those exact bytes. You can copy the existing files into a test Phials home’s `plugins/<plugin-id>/` directory, mapping each flat theme asset into the layout below, or install the same attached files through the published-install path. Launch Phials with that test home when using one. The installed layout is:

```text
<plugin-id>/
├── manifest.json
├── main.js
├── styles.css                 # when present
└── themes/
    ├── slate-light/
    │   ├── theme.json
    │   └── theme.css
    └── slate-dark/
        ├── theme.json
        └── theme.css
```

The release slug becomes the installed directory name. The files inside every variant directory are always named `theme.json` and `theme.css`.

## Test activation and removal

Test the exact installed files, not only the source directory:

1. Install the plugin and confirm that installation alone does not imply activation.
2. Enable the plugin and confirm each theme appears only in its declared light or dark list.
3. Select each theme and verify metadata, preview swatches, complete styling, contrast, and interactive states.
4. Switch between system, light, and dark color-scheme preferences and verify the separately selected variant.
5. Reload the plugin and restart Phials; the selected theme should remain selected and render completely.
6. Disable the plugin; its themes should disappear. If one was selected, Phials persistently selects `phi.default-light` or `phi.default-dark` for that mode.
7. Re-enable the plugin; its themes should return without duplicate entries.
8. Install an update with the same IDs and slugs; user selections should continue to refer to the updated themes.
9. Remove the plugin; its theme files and picker entries should be removed, with the same persistent built-in same-mode fallback.

Check an incomplete pair, duplicate ID, unknown metadata key, and invalid preview color separately from your final candidate. An unpaired flat release asset is rejected by release-set checks; malformed installed pairs and metadata fail host discovery. Confirm failed updates preserve the previous release and theme preference rather than leaving partial registrations.

A theme with only `--ph-accent` is valid and should use foundation defaults for other hooks. Missing token declarations are not an activation failure. Invalid CSS values may be ignored by the browser or produce unintended appearance, so inspect the rendered result as well as the metadata.

For final publication checks, continue with [Verify a release candidate](../../package-and-publish/prepare-a-release/verify-a-release-candidate.md) and [Verify the published installation](../../package-and-publish/publish-your-plugin/verify-the-published-installation.md).
