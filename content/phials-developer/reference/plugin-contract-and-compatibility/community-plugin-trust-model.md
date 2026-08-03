---
title: "Community plugin trust model"
description: "Specifies trusted renderer execution, permission gating without sandbox claims, permission review, safe mode, and the security consequences authors must communicate."
ai_disclosure: true
order: 4
---

# Community plugin trust model

Community plugins are trusted JavaScript running in the Phials renderer. Plugin
permissions gate supported Plugin API operations and approved host commands;
they do not form a JavaScript sandbox.

Installing a community plugin therefore grants trust to its released code and
dependencies, not only to the capabilities named in `manifest.json`.

## Protection layers

| Layer | What it does | What it does not prove |
| --- | --- | --- |
| Registry entry and repository review | Establishes plugin identity, repository ownership, and a reviewable distribution source | That every release is harmless or sandboxed |
| GitHub release provenance | Gives users and Phials a named source for matching release artifacts | That artifacts are cryptographically signed by Phials |
| Permission review | Requires the user to approve the release's complete current permission set | That arbitrary JavaScript cannot perform other renderer-accessible work |
| Permission-gated Plugin API | Rejects a supported gated operation when its required permission is absent | That browser globals, the DOM, or dependency behavior are isolated |
| Community plugin safe mode | Globally prevents community-plugin activation and community registry actions | That an individually enabled plugin is safe |
| Public SDK support contract | Defines what plugin authors can rely on across Phials releases | That an unsupported runtime technique is technically impossible |

Phials does not require a platform signature or checksum as an installation
trust guarantee. Registry review, repository and release provenance, source
inspection, requested permissions, author reputation, and user judgment remain
the trust signals. Authors should still publish checksums so users and reviewers
can verify that tested and published artifacts match.

## Trusted renderer execution

Phials imports a community plugin's `main.js` into the application renderer.
The plugin and every dependency included in that artifact execute in the same
JavaScript environment.

The code can use browser capabilities available to that renderer. This includes
ambient web APIs and DOM access even when those techniques are outside the
supported public SDK. The ability to perform an action does not make it a
supported Phials contract, and the absence of a manifest permission does not
prove arbitrary JavaScript is incapable of that action.

In particular, `network.fetch` gates `api.fetch`. It does not disable the
renderer's ambient `fetch` or prevent a dependency from initiating network
requests. Permission disclosure and source review must account for the whole
release artifact.

## Plugin permission guarantees

A plugin permission is a named manifest capability requested before using its
corresponding permission-gated Plugin API operation or approved host command.

Phials guarantees:

- the manifest accepts only permission names in the public permission catalog;
- a gated Plugin API operation rejects before performing its work when the
  required permission is absent;
- the Plugin API instance is scoped to the installed plugin identity and its
  approved manifest permissions;
- permission approval does not make unsupported host commands public API;
- permissions with documented implication rules, such as filesystem write
  satisfying supported read operations, follow those rules exactly.

The complete mapping belongs in the
[plugin permission reference](../manifest-and-permissions-reference/plugin-permission-reference.md)
and
[permission-gated Plugin API operations](../manifest-and-permissions-reference/permission-gated-plugin-api-operations.md).

Request only permissions exercised by the released workflows. A permission is
not a convenient reserve for possible future behavior.

## Permission review

Phials stores the last permission set the user approved for each plugin
identity. Sets are compared without regard to order.

Permission review is required when the requested set differs in any way:

- adding a permission;
- removing a permission;
- replacing one permission with another;
- installing a plugin whose current set has not yet been approved, including an
  empty set.

First installation always establishes an explicit reviewed baseline. An empty
set presents no gated operations, but it still records the exact set that later
updates are compared against.

Until the complete current set is approved:

- the plugin cannot activate;
- no provider, theme, style, event listener, or other runtime contribution is
  available;
- earlier approval does not grant the new set;
- an existing enabled preference may remain recorded, but it is not activation.

After approval, normal safe-mode, compatibility, loading, and activation checks
still apply. Approval belongs to the exact set, not to all future versions of
the plugin.

An author changing permissions must explain the user-visible behavior that
requires each addition, removal, or replacement. Release notes should describe
the complete new data or system access, not merely name the permission.

## Community plugin safe mode

Community plugin safe mode is a global user control, separate from any one
plugin's installed or enabled state. It defaults to on for a new Phials Home.

While safe mode is on:

- community plugins do not load or activate;
- active community plugins are deactivated;
- registry browsing, installation, enablement, and updates are unavailable;
- installed release artifacts remain installed;
- durable plugin settings, storage, and database data remain governed by their
  normal contracts;
- built-in Phials capabilities are unaffected.

Turning safe mode off removes the global block. It does not approve a permission
set, repair compatibility, clear an activation error, or silently enable a
plugin. Each plugin must still pass its normal gates.

Plugin code must not bypass or simulate this state. User-facing status must
distinguish enabled preference from successful activation.

## Author security obligations

A release should make its trust consequences reviewable:

1. Keep the dependency graph as small and current as the capability allows.
2. Review every dependency update as code that will execute in the renderer.
3. Publish source corresponding to the release artifacts.
4. Do not load, import, or evaluate remote code after installation.
5. Request the least permission set and handle a denied operation without
   partial work.
6. State what file content, clipboard content, user input, identifiers, or
   diagnostics the plugin reads, retains, or transmits.
7. Name every external service and the purpose of each network request.
8. Avoid retaining personal or file data beyond the stated workflow.
9. Sanitize untrusted file and network content before rendering or executing it.
10. Publish permission, compatibility, dependency, and data-handling changes in
    release notes.

Do not describe the plugin as sandboxed, isolated, certified safe, or limited
only to its manifest permissions. Accurate language is narrower:

> This community plugin runs as trusted JavaScript in the Phials renderer. Its
> manifest permissions gate supported Phials APIs; review the plugin's source,
> dependencies, and disclosed data handling before installing it.

For the conceptual boundary, see
[Understand the public SDK and trust boundary](../../get-started/understand-phials-plugins/understand-the-public-sdk-and-trust-boundary.md).
