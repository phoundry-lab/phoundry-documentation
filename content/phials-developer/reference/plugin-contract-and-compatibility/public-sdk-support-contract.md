---
title: "Public SDK support contract"
description: "Defines the default-deny public surface, synchronized SDK ownership, stability expectations, unsupported host internals, and contract-change policy."
ai_disclosure: true
order: 1
aliases:
  - plugins/public-api-contract
---

# Public SDK support contract

The public SDK is the complete supported interface between a plugin and Phials.
Its boundary is default-deny: a type, field, method, host command, callback
behavior, or runtime guarantee is supported only when the synchronized SDK or
this documentation explicitly exposes it.

A single curated declaration graph defines the finalized initial Plugin API
`1.0.0` contract. Pre-release declaration experiments are not a legacy API:
removed shapes have no compatibility shim, and additions after this baseline
follow the versioning rules below.

A value that can be observed at runtime does not become public API by
observation. A successful type cast, deep import, or direct browser interaction
does not add that behavior to the Phials compatibility contract.

## Supported surface

The public SDK consists of these coordinated surfaces:

| Surface | Contract |
| --- | --- |
| Plugin definition | [PhialsPlugin](../../reference/sdk-type-reference/PhialsPlugin.md), lifecycle hooks, settings and database declarations, and [PluginProvider](../../reference/sdk-type-reference/PluginProvider.md) contracts |
| Capability contracts | Providers and callback props for commands, file viewing and editing, file metadata, file views, and panels and tabs |
| Runtime services | [PluginAPI](../../reference/sdk-type-reference/PluginAPI.md) and the specialized API scope supplied to each documented callback |
| Shared models | Public file, command, shortcut, event, context, and component-facing types |
| Manifest | [PluginManifest](../../reference/sdk-type-reference/PluginManifest.md), supported permission names, validation helpers, and compatibility helpers |
| Written behavior | The exact lifecycle, compatibility, permission, event, data, and capability references in this documentation |

The synchronized `sdk/` directory in the
[plugin starter](https://github.com/phoundry/phials-plugin-example) contains
the public declarations and manifest module used to type-check a plugin. Its
ambient declarations let plugin source use public names such as [PhialsPlugin](../../reference/sdk-type-reference/PhialsPlugin.md),
[PluginAPI](../../reference/sdk-type-reference/PluginAPI.md), and [CommandProvider](../../reference/sdk-type-reference/CommandProvider.md) without importing Phials application source.

The [SDK type reference](../sdk-type-reference/index.md) is generated from the
same public source set. It is the quickest way to inspect an exact TypeScript
signature. Written reference pages remain authoritative for behavior that a
type alone cannot express, including ordering, cleanup, permissions, and
failure semantics.

Public helper functions and constants are part of the same generated reference,
including [validateManifest](../sdk-type-reference/validateManifest.md),
[SUPPORTED_PLUGIN_API_VERSION](../sdk-type-reference/SUPPORTED_PLUGIN_API_VERSION.md),
and [PERMISSION_DESCRIPTIONS](../sdk-type-reference/PERMISSION_DESCRIPTIONS.md).
They are not silently copied around the generated declaration pages.

## SDK ownership

Phials owns the synchronized SDK as one versioned contract:

- public plugin, provider, API, file, command, shortcut, event, and context
  declarations;
- the manifest schema, supported permission names, and validation and
  compatibility helpers;
- the generated SDK type reference;
- the behavioral references linked from this page.

Generated files under the starter's `sdk/` directory are machine-owned. Do not
edit them. A Phials SDK update replaces them as a coordinated set so declarations,
manifest behavior, and reference pages describe the same Plugin API version.
Phials verifies the starter SDK, generated pages, aliases, link map, and landing
coverage without rewriting them; a clean synchronization followed by
verification must produce no diff.

Svelte and the `phoundry-ui` package have their own package contracts and
versions. Their public exports can be used as documented, but their versions
are not Plugin API versions. Phials guarantees only the integration behavior
named in the plugin documentation, not every API exposed by those dependencies.

## Default-deny support rules

Plugin code can rely on a surface when all applicable conditions are true:

1. Its shape is present in the synchronized SDK or a documented public package
   export.
2. Its behavior is described in the corresponding public reference or task
   guide.
3. The release declares a `pluginApiVersion` and `minAppVersion` that include
   the surface.
4. Any required plugin permission is present in the release manifest and
   approved by the user.

The following do not establish support:

- importing from a Phials source checkout or application build output;
- calling a host command absent from the approved host command reference;
- depending on undocumented object fields, DOM structure, CSS selectors, or
  application state;
- depending on a host persistence format, database layout, file location, or
  migration detail;
- constructing an API scope instead of using the instance supplied by Phials;
- treating a browser API as a Phials SDK guarantee.

When the public SDK cannot express a generally useful plugin outcome, the
supported path is an additive public contract. Until that contract is
documented and synchronized, the missing surface is not portable across Phials
releases.

## Stability classes

Every surface in the current public SDK is stable for the Plugin API version
that contains it. There is no experimental public surface.

| Change | Compatibility classification |
| --- | --- |
| Add an optional field, provider capability, event, method, or manifest behavior | Additive when existing plugins continue to behave correctly |
| Clarify documentation without changing accepted input or observable behavior | Patch-compatible |
| Correct behavior in a way an existing plugin may depend on | Requires an appropriate minimum Phials version; breaking corrections require a new major Plugin API version |
| Rename or remove a public type, method, field, permission, event, or callback parameter | Breaking |
| Add a required field or make an optional callback mandatory | Breaking |
| Narrow accepted input, permissions, delivery guarantees, or lifecycle behavior | Breaking |

An additive SDK feature can require both a newer Plugin API version and a newer
minimum Phials version. The Plugin API version identifies the public contract;
the minimum Phials version identifies the first app release that implements the
behavior the plugin needs.

## Contract-change policy

Public contract changes follow semantic versioning:

- patch versions contain non-breaking corrections and clarifications;
- minor versions add backward-compatible public capabilities;
- major versions contain breaking contract changes.

Phials keeps a plugin compatible when the running build satisfies both declared
version boundaries. It does not infer compatibility from source code, package
dependencies, or a successful build.

Plugin authors should update the synchronized SDK as a complete generated set,
raise `pluginApiVersion` when the release uses a newer public contract, and
raise `minAppVersion` when it depends on newer app behavior. The exact
comparison is defined in the
[version and compatibility reference](./version-and-compatibility-reference.md).

## Contract precedence

Use these sources in order of specificity:

1. The synchronized SDK defines public TypeScript and manifest shapes.
2. A dedicated reference defines the exact behavior of that shape.
3. A task guide explains a supported workflow using the reference.
4. Examples demonstrate one valid use but do not expand the contract.

If generated declarations, reference prose, and runtime behavior disagree, the
release is a contract defect. Do not depend on the discrepancy. Report it with
the Plugin API version, Phials version, exact release artifacts, and a minimal
reproduction.
