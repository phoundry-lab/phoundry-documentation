---
title: "Plugin contract and compatibility"
description: "Look up the public SDK support contract, lifecycle, compatibility rules, and community trust model."
ai_disclosure: true
---

# Plugin contract and compatibility

Use this hub for the exact boundaries Phials applies to plugin code. These
references define what the public SDK supports, when a plugin is active, how
runtime compatibility is decided, and what the community plugin trust model
does and does not protect.

| Reference | Canonical subject |
| --- | --- |
| [Public SDK support contract](./public-sdk-support-contract.md) | Supported declarations and behaviors, SDK ownership, stability, and change policy |
| [Plugin lifecycle reference](./plugin-lifecycle-reference.md) | Installed, enabled, loaded, and activated states; hook order; cleanup; reload; failure behavior |
| [Version and compatibility reference](./version-and-compatibility-reference.md) | Plugin version, minimum Phials version, Plugin API version, SemVer comparison, and the combined runtime check |
| [Community plugin trust model](./community-plugin-trust-model.md) | Trusted renderer execution, permission gating, permission review, safe mode, and author disclosure |

These contracts work together. A plugin can activate only when it is enabled,
runtime-compatible, allowed by community plugin safe mode, approved for its
current permission set, successfully loaded, and successfully activated.

The [manifest and permissions reference](../manifest-and-permissions-reference/index.md)
owns the exact field and permission catalogs. The
[SDK type reference](../sdk-type-reference/index.md) owns generated TypeScript
signatures. Task guides elsewhere in the plugin documentation show how to use
the contracts without redefining them.
