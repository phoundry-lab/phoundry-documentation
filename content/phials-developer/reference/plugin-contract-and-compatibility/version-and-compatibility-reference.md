---
title: "Version and compatibility reference"
description: "Specifies plugin SemVer, minimum Phials version, Plugin API version, defaulting, comparison, and combined runtime compatibility."
ai_disclosure: true
order: 3
---

# Version and compatibility reference

Phials evaluates three independent semantic versions for a plugin release. Only
two participate in runtime compatibility.

| Version | Manifest field | Meaning | Runtime compatibility input |
| --- | --- | --- | --- |
| Plugin version | `version` | The plugin's own release version | No |
| Minimum Phials version | `minAppVersion` | The oldest Phials release the plugin supports | Yes |
| Plugin API version | `pluginApiVersion` | The public SDK contract the release targets | Yes |

Do not substitute one version for another. Svelte, `phoundry-ui`, and other npm
package versions are separate version domains.

## Accepted SemVer form

Each manifest version is one exact semantic version, not a range or tag:

```text
MAJOR.MINOR.PATCH
MAJOR.MINOR.PATCH-prerelease
MAJOR.MINOR.PATCH+build
MAJOR.MINOR.PATCH-prerelease+build
```

Valid examples include `1.4.0`, `2.0.0-beta.3`, and
`2.0.0-beta.3+build.17`.

Values such as `v1.4.0`, `1.4`, `^1.4.0`, `>=1.4.0`, and `latest` are invalid.
An invalid version makes the manifest invalid and prevents loading.

Comparison follows SemVer precedence:

1. Compare major, minor, and patch numerically.
2. A prerelease is lower than the release with the same core version.
3. Prerelease identifiers compare according to SemVer numeric and lexical
   rules.
4. Build metadata does not affect precedence.

## Plugin version

`version` identifies the plugin release. Increment it according to the impact on
plugin users:

- patch for a backward-compatible fix;
- minor for a backward-compatible plugin feature;
- major for a breaking plugin behavior, configuration, data, or workflow
  change.

The source definition, `dist/manifest.json`, Git tag, GitHub release, and
matching release artifacts must identify the same plugin version.

Plugin version orders updates but does not grant access to a Phials capability
and does not make a release runtime-compatible.

## Minimum Phials version

`minAppVersion` is required. It names the oldest Phials release in which every
app behavior the plugin requires is available.

The app-version check is:

```text
current Phials version >= minAppVersion
```

Raise this field when a release depends on a capability, destination, corrected
host behavior, lifecycle guarantee, manifest feature, or other app behavior
first implemented by a newer Phials release.

The minimum is inclusive. `minAppVersion: "1.4.0"` accepts Phials `1.4.0` and
later releases, subject to the separate Plugin API check.

## Plugin API version

`pluginApiVersion` names the public SDK contract used to build the release.
Plugin API `1.0.0` is the finalized initial contract, and every authored source
manifest declares it explicitly. Omission belonged only to incomplete
pre-release scaffolding and is not part of the synchronized public contract.

For the finalized initial contract, the Plugin API check is exact:

```text
supported Plugin API version = pluginApiVersion = 1.0.0
```

Do not substitute a newer or older value. A later published Plugin API contract
will define its own compatibility rule when it exists.

Plugin API versions follow semantic versioning:

- patch versions contain compatible corrections and clarifications;
- minor versions add backward-compatible capabilities;
- major versions contain breaking public contract changes.

## Combined runtime compatibility

A release is runtime-compatible only when both lower bounds are satisfied:

```text
current Phials version >= minAppVersion
and
supported Plugin API version = pluginApiVersion = 1.0.0
```

Phials checks this condition before loading and activation. When either side
fails, the release can remain installed but its code and capabilities do not
activate.

| Current Phials | Supported API | Manifest minimum | Manifest API | Result |
| --- | --- | --- | --- | --- |
| `1.6.0` | `1.0.0` | `1.4.0` | `1.0.0` | Compatible |
| `1.4.0` | `1.0.0` | `1.4.0` | `1.0.0` | Compatible at the app-version bound |
| `1.3.2` | `1.0.0` | `1.4.0` | `1.0.0` | Minimum Phials version fails |
| `1.6.0` | `1.0.0` | `1.4.0` | `1.1.0` | Plugin API version fails |
| `1.3.2` | `1.0.0` | `1.4.0` | `1.1.0` | Both boundaries fail |

Compatibility is a declared lower-bound check, not proof of correctness. Test
the release at the exact minimum, on a current Phials release, and against one
intentionally incompatible app and API combination.

## Choosing the two runtime bounds

For every public capability used by a release:

1. Identify the first Plugin API version containing the required contract.
2. Identify the first Phials release implementing the required behavior.
3. Select the highest Plugin API requirement across the plugin.
4. Select the highest minimum Phials requirement across the plugin.
5. Record and test both exact bounds.

Optional behavior must use a documented optional SDK field or capability.
Compatibility fields are evaluated before plugin code runs, so they are not a
substitute for probing undocumented runtime state.

The [public SDK support contract](./public-sdk-support-contract.md) defines
which surfaces have a versioned guarantee. The
[plugin manifest field reference](../manifest-and-permissions-reference/plugin-manifest-field-reference.md)
defines the exact manifest validation rules.
