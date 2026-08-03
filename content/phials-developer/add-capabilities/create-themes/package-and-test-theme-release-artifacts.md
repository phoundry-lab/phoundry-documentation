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

## Build and validate the release set

Run the starter’s release checks:

```bash
npm run check
npm run build
npm run validate
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

For every theme pair, validation checks:

- both files exist and use the same slug
- the slug contains only lowercase letters, numbers, and hyphens
- `theme.json` parses and contains a unique `id`, `name`, and light or dark `mode`
- optional author and preview fields have valid shapes
- `theme.css` defines every required Phoundry UI token
- the manifest, `main.js`, and plugin definition share one plugin ID and version

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

Install the exact release candidate through the supported development or published-install path. Phials writes the flat assets into:

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

Also test an incomplete pair, duplicate ID, unknown metadata key, invalid preview color, and missing or invalid required token. Activation must fail with the owning file and field/token in its diagnostic, unregister any themes already staged by that activation, and preserve the previously active release and theme preference during update rollback.

For final publication checks, continue with [Verify a release candidate](../../package-and-publish/prepare-a-release/verify-a-release-candidate.md) and [Verify the published installation](../../package-and-publish/publish-your-plugin/verify-the-published-installation.md).
