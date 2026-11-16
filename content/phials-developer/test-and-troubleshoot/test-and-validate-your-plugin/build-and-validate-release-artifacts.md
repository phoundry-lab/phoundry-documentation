---
title: "Build and validate release artifacts"
description: "Creates production output and verifies required filenames, matching manifest identity and version, optional CSS and theme pairs, and loadable ES-module shape."
ai_disclosure: true
order: 3
---

# Build and validate release artifacts

From the plugin project root:

```bash
npm run build
npm run release:verify
```

The example’s build produces `dist/main.js`, `dist/manifest.json`, optional `dist/styles.css`, and automatically writes `release/release-inventory.json`. Watch builds through `npm run dev` also produce output and an inventory; use a completed production build for a release.

## Know the release files

| Artifact | When present |
| --- | --- |
| `manifest.json` | Always |
| `main.js` | Always |
| `styles.css` | When the plugin emits interface CSS |
| `theme-<slug>.json` | For a contributed theme |
| `theme-<slug>.css` | Paired with the matching theme JSON |

Attach installable files individually, not as a plugin archive. Source, source maps, test fixtures, local configuration, dependencies, and the release inventory are not plugin release assets.

Theme assets use flat release filenames with matching lowercase kebab-case slugs. See [Package and test theme release artifacts](../../add-capabilities/create-themes/package-and-test-theme-release-artifacts.md) if your plugin adds themes.

## Understand the build checks

The build validates the manifest and checks basic module identity by importing its own bundle. `package.json` is the sole version source, imported by `src/plugin.manifest.ts` and carried into the bundled plugin and generated manifest.

This import executes plugin module code in Node. It is **not a sandbox** and does not provide a broad provider or lifecycle harness. It does not prove activation, permission enforcement, UI behavior, or persistence in Phials.

Test your styles and theme contributions in Phials too. Build checks do not assess layout, contrast, or the effects of global CSS on the surrounding interface.

Correct metadata or source and rebuild when checks fail. Do not hand-edit `dist/manifest.json` or `main.js`.

## Verify the existing candidate

The inventory records artifact names, byte sizes, and SHA-256 checksums. After building:

```bash
npm run release:verify
```

This compares the existing artifact bytes and bundled manifest against the inventory without rebuilding or rewriting it. It detects changes to a recorded candidate; it is not a substitute for source checks or installed-runtime testing.

For a release, run:

```bash
npm ci
npm run check
npm test
npm run build
npm run release:verify
```

## Install without changing the candidate

For routine development, `npm run dev:install` builds first and installs into your normal Phials home. An optional `--phials-home` argument or `PHIALS_HOME` environment variable selects another home.

Do **not** use that command to install a frozen release candidate: it always rebuilds. Instead copy the exact `dist/manifest.json`, `dist/main.js`, and optional `dist/styles.css` into `<Phials home>/plugins/<id>/`. Map each flat `theme-<slug>.json` and `.css` pair to `themes/<slug>/theme.json` and `themes/<slug>/theme.css` inside that plugin directory. Check the copied bytes against the inventory, then test loading and activation in Phials.

A rebuild or artifact edit creates a new candidate. Continue with [Prepare a release](../../package-and-publish/prepare-a-release/index.md).
