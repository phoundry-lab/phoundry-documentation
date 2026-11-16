---
title: "Build a complete release artifact set"
description: "Produces matching required and optional files, including supported CSS and theme assets, without publishing development-only files."
ai_disclosure: true
order: 2
---

# Build a complete release artifact set

Build release artifacts from a clean, versioned checkout. Publish only the files Phials supports.

## Run the release build

From the plugin project root:

```bash
npm ci
npm run check
npm test
npm run build
npm run release:verify
```

`build` produces `dist/` and automatically writes `release/release-inventory.json`; `release:verify` checks those existing files without rebuilding or rewriting them. Do not copy an older artifact forward or hand-edit generated output.

## Include the required files

Every release contains:

```text
dist/
├── manifest.json
└── main.js
```

Add optional artifacts only when the plugin supplies them:

```text
dist/
├── manifest.json
├── main.js
├── styles.css
├── theme-slate-light.json
├── theme-slate-light.css
├── theme-slate-dark.json
└── theme-slate-dark.css
```

| Artifact | Contract |
| --- | --- |
| `manifest.json` | Strict manifest for this exact plugin version |
| `main.js` | Loadable ES module with the plugin’s default export |
| `styles.css` | Optional compiled global CSS for plugin interfaces |
| `theme-<slug>.json` | Optional flat theme metadata asset |
| `theme-<slug>.css` | Required matching CSS half of a theme pair |

Theme pairs use one identical lowercase kebab-case slug. Follow [Package and test theme release artifacts](../../add-capabilities/create-themes/package-and-test-theme-release-artifacts.md) when the plugin contributes themes.

## Exclude development files

Do not attach:

- source files or source maps
- `node_modules/`
- package-manager lockfiles
- test files or fixtures
- local environment or editor files
- SDK source declarations
- screenshots or release-note drafts
- a zip or tar archive containing the real artifacts

Release notes belong in the GitHub release body. Images used by those notes may be uploaded as release-description media, but they are not plugin release artifacts.

## Verify the artifact set as one unit

The build validates the manifest and checks basic module identity by importing the plugin’s own bundle. It also records artifact sizes and SHA-256 checksums in the release inventory. This is not a sandbox or a provider and lifecycle test harness; installed behavior still needs testing.

Review optional styles and theme pairs yourself. The example does not enforce a CSS policy.

Use [Build and validate release artifacts](../../test-and-troubleshoot/test-and-validate-your-plugin/build-and-validate-release-artifacts.md) for the detailed checks.

## Freeze the candidate

The build has already written `release/release-inventory.json`, containing artifact filenames, byte sizes, and SHA-256 checksums. Review it and keep it with your release records; do not upload it as a plugin asset.

```bash
npm run release:verify
```

This compares the existing inventory with the artifact bytes and bundled manifest without rebuilding or rewriting anything.

Attach files directly from the verified `dist/`. If a later command rewrites, minifies, renames, signs, or otherwise changes an artifact, it is a new candidate and needs a new validation and inventory.

Phials prefers attached `manifest.json` and `main.js` from the latest GitHub release. Attach the complete optional set as well; do not rely on repository files or a raw-tag fallback to supply missing assets.
