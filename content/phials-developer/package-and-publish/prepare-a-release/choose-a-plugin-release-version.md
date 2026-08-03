---
title: "Choose a plugin release version"
description: "Selects the next semantic version according to user-visible behavior and public-contract changes and keeps package, manifest, tag, and release versions aligned."
ai_disclosure: true
order: 1
---

# Choose a plugin release version

Choose the next semantic version from what changes for users and the plugin’s durable public behavior. The plugin version is independent of the minimum Phials version and Plugin API version.

## Classify the release

| Increment | Use it for |
| --- | --- |
| Patch | Backward-compatible fixes, performance work, and presentation corrections |
| Minor | Backward-compatible capabilities, settings, formats, and workflows |
| Major | Removed or incompatible behavior, identifiers, settings, data, or integration contracts |

Phials-specific examples:

- Fixing a command that fails on an empty selection is a patch.
- Adding a new command or optional metadata field is a minor.
- Adding a setting with a safe default is a minor.
- Adding a permission for a new opt-in workflow is at least a minor and requires explicit release notes.
- Renaming a command, provider, theme, or persisted setting ID is a major because existing references or user choices no longer resolve.
- Removing supported file behavior or requiring an incompatible data migration is a major.
- Raising `minAppVersion` so previously supported users cannot update is a compatibility break; treat it as a major unless the plugin’s published pre-1.0 policy says otherwise.

Permission expansion, a raised compatibility boundary, or a data migration is never an unremarked patch.

For a `0.x` plugin, document the project’s pre-1.0 versioning policy. SemVer permits incompatible changes in minor releases before `1.0.0`, but users still need an explicit description of the break and migration.

## Set one version everywhere

Use the starter’s version command:

```bash
npm run version:set -- 1.3.0
```

It updates:

- `package.json`
- the package lockfile
- the source plugin manifest
- the exported `PhialsPlugin.version`

Build output then carries the same version into `dist/manifest.json`. Use:

```text
Package version:  1.3.0
Manifest version: 1.3.0
Plugin version:   1.3.0
Git tag:          v1.3.0
Release title:    1.3.0
```

Run the version command before the final build. Do not edit `dist/manifest.json` or bundled `main.js` to repair a mismatch.

## Keep compatibility versions separate

These fields answer different questions:

| Value | Meaning |
| --- | --- |
| `version` | Version of this plugin release |
| `minAppVersion` | Oldest Phials release supported by the plugin |
| `pluginApiVersion` | Public SDK contract targeted by the plugin |

A plugin `2.0.0` can still target Plugin API `1.0.0`. A patch release can raise neither boundary unless the actual code requires it and the release classification and notes account for the lost compatibility.

## Never reuse a released version

After publishing:

- do not replace assets under the same version
- do not move or recreate the version tag
- do not edit the release into a different build

If `1.3.0` is broken, preserve it as historical evidence and publish a verified `1.3.1` or later corrective release. See [Recover from a broken release](../maintain-a-published-plugin/recover-from-a-broken-release.md) when the latest public release cannot install or activate.
