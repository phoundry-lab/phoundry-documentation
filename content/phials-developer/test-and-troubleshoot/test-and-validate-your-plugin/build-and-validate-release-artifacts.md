---
title: "Build and validate release artifacts"
description: "Creates production output and verifies required filenames, matching manifest identity and version, optional CSS and theme pairs, and loadable ES-module shape."
ai_disclosure: true
order: 3
---

# Build and validate release artifacts

Build the production output, then validate the exact files that will be installed or attached to a plugin release:

```bash
npm run build
npm run validate
```

`build` creates a clean `dist/` and synchronizes release metadata. `validate` checks the complete artifact set without relying on source files that will not be installed.

## Know the supported release files

Every plugin requires:

```text
dist/
├── manifest.json
└── main.js
```

The complete supported set is:

| Artifact | When present |
| --- | --- |
| `manifest.json` | Always |
| `main.js` | Always |
| `styles.css` | When the plugin contributes compiled global CSS |
| `theme-<slug>.json` | Once for each contributed theme |
| `theme-<slug>.css` | Paired with the matching theme JSON |

Release assets are individual files, not one plugin archive. Development source, source maps, test fixtures, local configuration, and dependency directories are not release artifacts.

## Validate the manifest and identity

The release validator checks:

- strict manifest schema with no unknown fields
- valid stable plugin ID and semantic version
- `minAppVersion` and `pluginApiVersion`
- known permission names with no duplicates
- package, manifest, and exported plugin versions agree
- install directory, manifest, and exported plugin IDs agree

The starter synchronizes `dist/manifest.json` from the source manifest and package version during the build. Do not edit the generated `dist` copy to make validation pass; correct the source metadata and rebuild.

Use [Validate a plugin manifest](../../package-and-publish/configure-the-plugin-manifest/validate-a-plugin-manifest.md) for field-specific diagnosis.

## Validate the JavaScript module

`main.js` must:

- be a loadable ES module
- have one default export that produces a [PhialsPlugin](../../reference/sdk-type-reference/PhialsPlugin.md)
- bundle runtime dependencies needed by the plugin
- contain no unresolved relative imports or missing split chunks
- export the Svelte `mount` and `unmount` runtime when the plugin contributes Svelte components
- match the manifest ID and version

The validator imports the artifact in an isolated plugin harness, constructs the plugin definition, inspects every provider, and deactivates it after validation. It does not grant filesystem, clipboard, or network permissions during this structural check.

## Validate optional CSS and themes

When `styles.css` exists, validation parses it and reports:

- missing or malformed CSS
- broad global selectors that can affect unrelated Phials interfaces
- unresolved local asset imports
- fixed theme values where semantic tokens are expected

Theme assets must form exact flat pairs:

```text
theme-slate-light.json
theme-slate-light.css
theme-slate-dark.json
theme-slate-dark.css
```

The matching slug must be lowercase kebab-case. Each metadata sidecar and CSS file is validated against the theme contract. See [Package and test theme release artifacts](../../add-capabilities/create-themes/package-and-test-theme-release-artifacts.md).

## Inspect the validator result

A successful run ends with:

```text
validate-dist: OK
```

Treat warnings as release work when they identify unsupported imports, unscoped CSS, missing theme tokens, or metadata drift. Do not publish a locally hand-edited artifact set.

For reproducible release evidence:

```bash
npm ci
npm run check
npm run test:run
npm run build
npm run validate
```

Run those commands from a clean checkout. Then install that same `dist/` output through [Install a development plugin locally](../run-your-plugin-locally/install-a-development-plugin-locally.md). Rebuilding after validation creates a different release candidate and requires another validation run.

Release versioning and publication continue under [Prepare a release](../../package-and-publish/prepare-a-release/index.md).
