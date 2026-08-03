---
title: "Declare Phials and Plugin API compatibility"
description: "Sets the minimum Phials version and Plugin API version according to the capabilities actually used."
ai_disclosure: true
order: 3
---

# Declare Phials and Plugin API compatibility

Declare two different runtime boundaries:

```json
{
  "minAppVersion": "1.4.0",
  "pluginApiVersion": "1.0.0"
}
```

`minAppVersion` describes the oldest Phials release your plugin supports. `pluginApiVersion` describes the Public SDK contract the built artifacts target.

Both are exact semantic versions, not ranges.

## Set the minimum Phials version

Choose the oldest Phials release in which all required host behavior exists and passes your plugin tests.

Raise `minAppVersion` when the release begins depending on:

- a capability or destination introduced in a later Phials release
- corrected host behavior essential to safe operation
- a new manifest or runtime feature
- a storage, UI, or lifecycle guarantee absent from older releases

Do not set it to your currently installed Phials version automatically. That needlessly excludes earlier compatible releases.

Do not lower it without testing the complete release in the older app.

## Set the Plugin API version

Use the Plugin API version synchronized with the SDK against which you build:

```json
{
  "pluginApiVersion": "1.0.0"
}
```

Raise it when the built plugin uses a public type, method, field, lifecycle guarantee, or manifest behavior introduced in a newer Plugin API contract.

Keep it explicit even though an omitted field defaults to `1.0.0`. Explicit metadata makes release review and diagnostics unambiguous.

Do not use the package version of `phoundry-ui`, Svelte, or the plugin itself as `pluginApiVersion`. They are separate version domains.

## Understand the combined check

A Phials build can activate the plugin only when:

```text
current Phials version ≥ minAppVersion
and
supported Plugin API version ≥ pluginApiVersion
```

Example:

| Current Phials | Supported API | Manifest minimum | Manifest API | Result |
| --- | --- | --- | --- | --- |
| `1.6.0` | `1.0.0` | `1.4.0` | `1.0.0` | Compatible |
| `1.3.2` | `1.0.0` | `1.4.0` | `1.0.0` | Phials too old |
| `1.6.0` | `1.0.0` | `1.4.0` | `1.1.0` | Plugin API too old |

Compatibility is checked before activation. A compatible comparison does not prove that your plugin is correct; it proves only that the declared lower bounds are satisfied.

## Use semantic versions correctly

Use `major.minor.patch`, optionally with a valid prerelease or build suffix:

```text
1.4.0
1.5.0-beta.2
1.5.0+build.17
```

Do not use:

```text
v1.4.0
1.4
^1.4.0
>=1.4.0
latest
```

The manifest stores versions, not npm ranges or Git tags.

## Derive bounds from actual usage

For each capability:

1. Identify the first Plugin API version containing every public type and method used.
2. Identify the first Phials release implementing the required runtime behavior.
3. Choose the highest required lower bound across the plugin.
4. Test at those exact boundary versions.
5. Test one intentionally incompatible combination and confirm Phials refuses activation clearly.

Record the boundary decision in release notes when it changes.

## Do not use compatibility as feature detection

The manifest is evaluated before plugin code runs. Do not declare an older boundary and then probe unsupported host internals at runtime.

When behavior is optional, use a documented optional Public SDK capability. When it is required, raise the declared boundary.

## Verify before publishing

Test:

- the exact `minAppVersion`
- the current Phials release
- a Phials release below the minimum
- the declared Plugin API version
- a host supporting an older Plugin API contract

See [Verify permissions and runtime compatibility](../../test-and-troubleshoot/test-and-validate-your-plugin/verify-permissions-and-runtime-compatibility.md).

## Reference

- [Version and compatibility reference](../../reference/plugin-contract-and-compatibility/version-and-compatibility-reference.md)
- [Public SDK support contract](../../reference/plugin-contract-and-compatibility/public-sdk-support-contract.md)
