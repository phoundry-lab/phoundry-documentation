---
title: "Submit your plugin to the community registry"
description: "Adds the allowed registry fields, proves ID and repository ownership, validates the index, and opens a reviewable pull request."
ai_disclosure: true
order: 2
---

# Submit your plugin to the community registry

Add one strict entry to the
[Phials community plugins registry](https://github.com/EliWimmer/phials-plugins).
The entry makes one immutable release candidate from a public GitHub repository
discoverable in Phials. It records the reviewed release inventory but does not
host or copy the release artifacts.

Submit only after the repository's latest stable GitHub release is public and
passes [Publish a GitHub release](./publish-a-github-release.md).

## Confirm identity and ownership

Before editing the index:

- the plugin ID is permanent, lowercase, unique, and does not start with
  `phials.`;
- the registry ID equals `manifest.json.id` and the default-exported plugin ID;
- the GitHub repository is publicly readable;
- the GitHub user or organization that owns the repository matches the vendor
  segment of the plugin ID; and
- the repository's latest stable release contains the verified assets.

For `acme.review-tools`, the expected repository owner is `acme`. If the names
do not match because of a legitimate transfer or established project identity,
describe the ownership chain in the pull request and provide confirmation from
the prior owner when applicable.

An ID change creates a new plugin identity in Phials. Do not rename an existing
ID to make an ownership check pass.

## Add only the allowed fields

Fork and check out the registry repository, then add one object to
`community-plugins.json`:

```json
{
	"id": "acme.review-tools",
	"name": "Review Tools",
	"author": "Acme",
	"description": "Adds review commands and file annotations for local documents.",
	"repo": "acme/phials-review-tools",
	"release": {
		"tag": "v1.0.0",
		"version": "1.0.0",
		"candidateSha256": "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
		"assets": [
			{
				"name": "manifest.json",
				"size": 512,
				"sha256": "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb"
			},
			{
				"name": "main.js",
				"size": 4096,
				"sha256": "cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc"
			}
		]
	}
}
```

Copy the candidate checksum, filenames, byte sizes, and file checksums from the
starter's `release/release-inventory.json`; the example values above are
placeholders. Every top-level field and release field is required for a listed
plugin:

| Field | Value |
| --- | --- |
| `id` | Permanent plugin ID; must equal the release manifest |
| `name` | Short public display name |
| `author` | Maintainer or team shown in the browser |
| `description` | One or two useful sentences describing current capabilities |
| `repo` | GitHub `owner/repo`, without a URL or leading slash |
| `release` | Stable tag/version and the exact immutable candidate inventory |

Do not add permissions, compatibility, release URLs, download URLs, categories,
screenshots, replacement/deprecation metadata, or arbitrary fields. The
manifest remains canonical for plugin behavior and compatibility; the release
record pins the exact reviewed bytes.

Keep the description factual and current. Explain what the plugin lets a user
do; do not use the registry entry as release notes.

## Validate the index and public release

From the registry repository:

```bash
npm run validate
npm run test:run
npm run validate:remote
```

Validation checks:

- valid JSON and only allowed root and entry fields;
- required non-empty string values;
- plugin-ID format, reserved namespaces, and uniqueness;
- `owner/repo` syntax and repository availability;
- vendor ownership or documented transfer evidence;
- a public latest stable release;
- exact required asset names;
- matching registry, manifest, exported plugin, and normalized tag identity and
  version;
- supported manifest permissions and runtime compatibility declarations; and
- complete optional CSS and theme assets.

A successful remote run ends with:

```text
community-plugins.json OK (1 listed, 0 temporarily unlisted)
```

Fix every error before pushing. A malformed index can prevent Phials from
loading the complete community list, so registry validation is an all-entry
gate rather than a best-effort warning.

Remote validation downloads every attached asset from the repository named by
`repo`, rejects extra or missing files, recomputes every checksum and the
candidate checksum, and checks manifest identity. Local `dist/` files do not
prove that the published release is complete.

## Open a focused pull request

Use a branch dedicated to the entry:

```bash
git switch -c add-acme-review-tools
git add community-plugins.json
git commit -m "Add acme.review-tools"
git push -u origin add-acme-review-tools
```

Open a pull request that includes:

- plugin ID and display name;
- public repository URL;
- exact latest stable release tag and URL;
- a short ownership statement;
- requested permissions and why each is needed;
- `minAppVersion` and `pluginApiVersion`;
- the local validator result; and
- one sentence naming the representative capability workflow you tested.

Keep the diff limited to the registry entry unless a maintainer requested a
policy, schema, or validator change. Do not combine multiple unrelated plugins
in one submission.

Registry maintainers review the repository, latest release assets, declared
permissions, ownership, and index validation. Listing means GitHub release
trust plus registry review; it is not a cryptographic guarantee and does not
turn the plugin into sandboxed code.

## Respond to review without moving the target

If review finds a release problem:

1. fix the plugin source;
2. choose a new semantic version;
3. repeat the release gate;
4. publish the newer stable GitHub release; and
5. update the pull request with the new tag and validation result.

Do not replace assets beneath the reviewed tag. The latest release can change
while a registry pull request is open, so rerun validation immediately before
merge.

After the entry reaches the registry's default branch, continue to
[Verify the published installation](./verify-the-published-installation.md).
