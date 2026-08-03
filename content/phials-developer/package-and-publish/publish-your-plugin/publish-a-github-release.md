---
title: "Publish a GitHub release"
description: "Creates the version tag and GitHub release, attaches exact matching release artifacts, and verifies that the latest release is the intended install source."
ai_disclosure: true
order: 1
---

# Publish a GitHub release

Create an immutable version tag from the verified release commit, publish a
stable GitHub release from that tag, and attach the exact files whose checksums
passed the release gate. Phials installs the repository's latest stable release,
so an older or draft release is not a usable public install source.

## Confirm the release candidate

From the clean plugin repository, rerun the non-mutating release check:

```bash
npm run release:verify
```

Confirm:

- the current commit is the reviewed release commit;
- the worktree is clean;
- `manifest.json` and `main.js` are present in `dist/`;
- optional CSS and theme assets form a complete supported set;
- the artifact inventory still matches every file; and
- the release notes describe this exact candidate.

Do not rebuild between this check and upload. A rebuild can change generated
bytes even when the source appears unchanged.

## Create and push the version tag

For plugin version `1.3.0`:

```bash
git tag -a v1.3.0 -m "Review Tools 1.3.0"
git push origin v1.3.0
```

Use either `v1.3.0` or `1.3.0` consistently for tags. The manifest stores
`1.3.0` without a leading `v`, and the normalized tag version must equal it.

Verify the tag resolves to the release commit:

```bash
git rev-list -n 1 v1.3.0
git rev-parse HEAD
```

The two commit IDs should match. Do not move or reuse a published version tag.

## Stage the exact release assets

Create a draft release with the verified notes and required files:

```bash
gh release create v1.3.0 \
	dist/manifest.json \
	dist/main.js \
	--verify-tag \
	--draft \
	--title "1.3.0" \
	--notes-file release-notes.md
```

Add `dist/styles.css` when the plugin ships compiled interface styles:

```bash
gh release upload v1.3.0 dist/styles.css
```

Upload each theme pair with its exact flat filename:

```bash
gh release upload v1.3.0 \
	dist/theme-slate-light.json \
	dist/theme-slate-light.css \
	dist/theme-slate-dark.json \
	dist/theme-slate-dark.css
```

The supported release assets are:

| Asset | Requirement |
| --- | --- |
| `manifest.json` | Required, exact filename |
| `main.js` | Required, exact filename |
| `styles.css` | Optional, exact filename |
| `theme-<slug>.json` | Optional, paired with matching CSS |
| `theme-<slug>.css` | Optional, paired with matching JSON |

Attach the files individually. Do not replace them with a source archive or a
plugin archive. GitHub may add automatic source-code archives to the release;
Phials does not use them as plugin release artifacts.

The draft keeps an incomplete upload out of the in-app installation path while
you verify the public copies. Do not mark a stable candidate as a prerelease;
prereleases are intentionally excluded from the stable in-app path.

## Verify and publish the staged release

Inspect the draft:

```bash
gh release view v1.3.0 \
	--json tagName,isDraft,isPrerelease,assets,url
```

Confirm that the tag, notes, and complete asset names match the candidate. Then
download the staged assets to a new directory:

```bash
release_download="$(mktemp -d)"
gh release download v1.3.0 --dir "$release_download"
shasum -a 256 "$release_download/manifest.json"
shasum -a 256 "$release_download/main.js"
```

Hash every optional asset as well. Each checksum and byte size must match the
recorded release inventory. This catches selecting files from an older `dist/`,
an incomplete upload, or a post-verification edit.

Open the downloaded `manifest.json` and confirm:

- `id` is the permanent plugin ID;
- `version` equals the normalized release tag;
- `minAppVersion` and `pluginApiVersion` are the verified boundaries;
- permissions equal the reviewed set; and
- repository and public metadata identify this project.

Phials can fall back to raw files at the release tag when attached required
assets are absent, but do not use that fallback as the publishing strategy.
Direct assets make the reviewed bytes explicit and support optional theme
installation.

Publish the verified draft:

```bash
gh release edit v1.3.0 --draft=false
```

Now inspect the release GitHub exposes as latest:

```bash
gh api "repos/{owner}/{repo}/releases/latest" \
	--jq '{tag: .tag_name, draft: .draft, prerelease: .prerelease, assets: [.assets[].name]}'
```

Confirm:

- `tag` is `v1.3.0`;
- `draft` and `prerelease` are both `false`;
- `manifest.json` and `main.js` are listed exactly once;
- every expected optional artifact is present;
- no development-only artifact was attached; and
- the release body matches the reviewed notes.

An existing newer stable release will continue to win even if you publish an
older version later. Correct the release ordering before registry submission.

## Never patch a published version

After publication, do not replace assets, move the tag, or edit the release into
a different build. If any public asset is wrong, preserve the historical
release and publish a verified corrective version such as `1.3.1`.

Once GitHub exposes the intended release as latest, continue to
[Submit your plugin to the community registry](./submit-your-plugin-to-the-community-registry.md).
