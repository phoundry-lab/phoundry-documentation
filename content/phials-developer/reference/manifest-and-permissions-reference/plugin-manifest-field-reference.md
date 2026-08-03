---
title: "Plugin manifest field reference"
description: "Lists every supported field, type, requirement, validation rule, default, and relationship without duplicating setup procedures."
ai_disclosure: true
order: 1
---

# Plugin manifest field reference

`manifest.json` is a strict JSON object that Phials validates before importing
plugin JavaScript. It accepts only the fields in this page.

## Complete field table

| Field | Type | Required | Default when omitted | Validation and meaning |
| --- | --- | --- | --- | --- |
| `id` | `string` | Yes | None | Permanent community plugin identity. Must match `^[a-z][a-z0-9]*\.[a-z][a-z0-9-]*[a-z0-9]$`, must not use `phials.`, and must not conflict with a built-in identity. |
| `name` | `string` | Yes | None | Non-empty trimmed display name. Must equal the default-exported `PhialsPlugin.name`. |
| `version` | SemVer `string` | Yes | None | Exact plugin version without a leading `v` or range. Must equal package metadata, the exported plugin version, normalized release tag, and release assets. |
| `minAppVersion` | SemVer `string` | Yes | None | Inclusive oldest supported Phials version. Runtime requires current Phials `>= minAppVersion`. |
| `pluginApiVersion` | SemVer `string` | Yes | None | Public SDK contract targeted by the release. The finalized initial contract requires exactly `"1.0.0"`. |
| `author` | `string` | Yes | None | Non-empty trimmed person, team, or organization responsible for the release. |
| `description` | `string` | Yes | None | Non-empty trimmed sentence describing the user-visible plugin outcome. |
| `authorUrl` | HTTPS URL `string` | No | Absent | Absolute `https://` website or profile URL for the author. |
| `repository` | HTTPS URL `string` | No | Absent | Absolute `https://` URL for the public source and release repository. In a community release, use the GitHub repository named by the registry entry. |
| `icons` | `string[]` | No | `[]` | Unique Iconify identifiers in `collection:name` form. Each value names an icon to preload; URLs and local paths are invalid. |
| `permissions` | `PluginPermission[]` | No | `[]` | Unique names from the [permission catalog](./plugin-permission-reference.md). Write permissions imply the corresponding read permission, so redundant pairs are invalid. |

No field accepts `null`. Optional fields are either present with the declared
type or omitted.

## Complete manifest shape

```json
{
	"id": "acme.review-tools",
	"name": "Review Tools",
	"version": "1.3.0",
	"minAppVersion": "1.4.0",
	"pluginApiVersion": "1.0.0",
	"author": "Acme",
	"description": "Adds review commands and file annotations.",
	"authorUrl": "https://acme.example",
	"repository": "https://github.com/acme/review-tools",
	"icons": [
		"phoundry-mono:check",
		"phoundry-mono:circle-info"
	],
	"permissions": [
		"filesystem.write"
	]
}
```

The order of object fields has no runtime meaning. Keep arrays sorted for stable
release diffs.

## `id`

The ID contains one vendor segment, one period, and one plugin segment:

```text
vendor.plugin-name
```

Valid:

```text
acme.review-tools
papertrail.pdf-review
studio7.contact-sheet
```

Invalid:

```text
ReviewTools
acme
acme.review_tools
acme.-review
acme.review-
phials.review-tools
```

The vendor segment begins with a lowercase letter and then contains lowercase
letters or digits. The plugin segment begins with a lowercase letter, ends with
a lowercase letter or digit, and may contain lowercase letters, digits, or
hyphens between them.

The ID owns installation identity, enablement, permission approval, settings,
storage, database namespacing, and update continuity. Changing it creates a new
plugin rather than renaming an existing one.

## Version fields

`version`, `minAppVersion`, and `pluginApiVersion` each contain one exact
semantic version:

```text
MAJOR.MINOR.PATCH
MAJOR.MINOR.PATCH-prerelease
MAJOR.MINOR.PATCH+build
MAJOR.MINOR.PATCH-prerelease+build
```

Examples: `1.4.0`, `2.0.0-beta.3`, and
`2.0.0-beta.3+build.17`.

Invalid values include `v1.4.0`, `1.4`, `^1.4.0`, `>=1.4.0`, and `latest`.
SemVer precedence, including prerelease ordering and ignored build metadata, is
defined in [Version and compatibility reference](../plugin-contract-and-compatibility/version-and-compatibility-reference.md).

Runtime compatibility is the conjunction:

```text
current Phials version >= minAppVersion
and
supported Plugin API version = pluginApiVersion = "1.0.0"
```

`version` orders plugin releases; it is not part of this compatibility
comparison.

## Public metadata and URLs

`name`, `author`, and `description` reject empty or whitespace-only strings.
They are public metadata, not release notes.

`authorUrl` and `repository` must be absolute HTTPS URLs. The registry's
`repo` field has a different shape: it uses `owner/repo`, while the manifest
uses a complete URL.

URL fragments, query strings, credentials, `file:` URLs, local paths, email
addresses, and bare `owner/repo` values are invalid manifest links.

## Icons

Every `icons` value must be a complete Iconify identifier:

```text
collection:name
```

Values are case-sensitive identifiers and must be unique. The source manifest
is the only community-plugin icon preload declaration; the exported
[PhialsPlugin](../../reference/sdk-type-reference/PhialsPlugin.md) does not
repeat it. The list preloads known icons and does not download arbitrary
assets.

An empty array and an omitted field have the same runtime meaning.

## Permissions

Every `permissions` value must be one of:

```text
filesystem.read
filesystem.write
clipboard.read
clipboard.write
network.fetch
workspace-folders.read
workspace-folders.write
```

Values must be unique. `filesystem.write` satisfies supported read and write
file operations, so a manifest containing both filesystem permissions is
invalid as redundant.

`workspace-folders.write` likewise implies `workspace-folders.read`; declaring
both Workspace Folder permissions is invalid.

An empty array and an omitted field mean the plugin requests no gated Plugin API
operations. Any change to the complete permission set can require
[permission review](./plugin-permission-reference.md#permission-review).

## Unknown fields

The manifest rejects every field not listed above. Common invalid fields
include:

```text
providers
settings
database
themes
releaseNotes
homepage
downloadUrl
schemaVersion
```

Capabilities, settings, database tables, and lifecycle hooks belong to the
default-exported [PhialsPlugin](../../reference/sdk-type-reference/PhialsPlugin.md). Registry discovery metadata belongs to the
community registry entry.

## Cross-file relationships

Schema validation checks the manifest in isolation. Release validation also
enforces these relationships:

| Relationship | Required result |
| --- | --- |
| `src/plugin.manifest.ts` and `package.json` | Equal `version` |
| Generated `manifest.json` and default-exported [PhialsPlugin](../../reference/sdk-type-reference/PhialsPlugin.md) | Equal generated `id`, `name`, and `version` |
| Source and release manifest | Release manifest is an exact data-only projection |
| Install directory and manifest | Directory name equals `id` |
| Community registry and manifest | Registry `id` equals manifest `id`; registry `repo` identifies the repository URL |
| Git tag and manifest | Tag normalized by removing one leading `v` equals `version` |
| GitHub release and checksummed candidate | Attached and installed bytes match the verified artifact inventory and checksum |
| Manifest permissions and runtime operations | Every gated operation is declared; no unused permission is requested |
| Compatibility fields and SDK use | Bounds include every public contract and Phials behavior required by the release |

For the authoring workflow, see
[Configure the plugin manifest](../../package-and-publish/configure-the-plugin-manifest/index.md).
