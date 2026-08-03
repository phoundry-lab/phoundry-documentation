---
title: "Understand the public SDK and trust boundary"
description: "Explains the supported SDK boundary, trusted-renderer model, permission gating, and safe mode without duplicating exact reference tables."
ai_disclosure: true
order: 4
aliases:
  - plugins/external-plugins
---

# Understand the public SDK and trust boundary

Build against the synchronized public SDK and treat it as the complete supported contract between a plugin and Phials. Community plugins run as trusted JavaScript in the Phials renderer; permissions gate supported Plugin API operations and approved host commands, but they do not create a JavaScript sandbox.

Both parts of that statement matter. The SDK tells you what Phials supports. The trust model tells users what installing the JavaScript permits in practice.

## Depend only on the public SDK

The public SDK includes:

- the [PhialsPlugin](../../reference/sdk-type-reference/PhialsPlugin.md) definition and typed provider contracts;
- the base [PluginAPI](../../reference/sdk-type-reference/PluginAPI.md) and provider-specific API scopes;
- shared file, command, shortcut, and event types;
- the plugin manifest schema, permission names, and validation helpers;
- the generated SDK type reference and the written support contract.

The plugin starter contains a synchronized `sdk/` directory. Use those declarations instead of importing files from a Phials source checkout. The declarations are available to the starter project as ambient types, so plugin source can use names such as [PhialsPlugin](../../reference/sdk-type-reference/PhialsPlugin.md), [PluginAPI](../../reference/sdk-type-reference/PluginAPI.md), and [CommandProvider](../../reference/sdk-type-reference/CommandProvider.md) directly.

The support boundary is default-deny: if a host object, command, field, or behavior is not exposed by the synchronized SDK or named by the public support contract, a plugin cannot rely on it. A value that happens to exist at runtime is not a compatibility promise.

When the SDK does not cover a general plugin-author need, define the missing outcome and propose an additive public contract. Do not reach through an untyped object, import app source, or depend on a private command as a shortcut.

See the [public SDK support contract](../../reference/plugin-contract-and-compatibility/public-sdk-support-contract.md) for stability and compatibility rules.

## Understand what permissions gate

A plugin requests named permissions in `manifest.json`. Phials checks those permissions before allowing the corresponding permission-gated Plugin API operation or approved `api.invoke` command.

Use permissions as a narrow declaration of intended behavior:

- request only permissions used by the released plugin;
- ask for them in the manifest before calling the gated operation;
- handle rejection as a normal runtime failure;
- explain why a new permission is needed in release notes;
- prefer a typed Plugin API method when one exists.

Changing the requested set triggers permission review. Until the user approves the current set, Phials does not activate the updated plugin. Earlier approval never silently covers a later permission expansion.

The plugin can remain enabled as a stored user preference while review blocks activation. That preference does not grant the new permissions and does not make its capabilities available.

The exact permission-to-operation mapping belongs in [Manifest and permissions reference](../../reference/manifest-and-permissions-reference/index.md).

## Do not describe community plugins as sandboxed

Permission checks protect supported bridges into Phials and its host environment. They are not complete isolation for arbitrary JavaScript.

A community plugin's code runs in the renderer and can use JavaScript and browser capabilities available there. A manifest permission does not prove that the code is unable to observe or transmit other renderer-accessible information. It also does not turn an unsupported browser or host technique into a supported SDK contract.

For plugin authors, this has practical consequences:

- keep dependencies small enough to review and update;
- do not load or evaluate remote code;
- make network behavior and collected data explicit;
- avoid retaining file content or personal information unless the capability requires it;
- publish source that corresponds to the release artifacts;
- treat every dependency update as part of the plugin's trusted code.

For users, repository ownership, source review, release provenance, requested permissions, and author reputation are trust signals. The manifest is useful disclosure, not a security proof.

The complete model is specified in [Community plugin trust model](../../reference/plugin-contract-and-compatibility/community-plugin-trust-model.md).

## Understand community plugin safe mode

Community plugin safe mode is a global user control that prevents community-plugin activation. It is independent of whether a particular plugin is installed or enabled.

When safe mode is on:

- installed release artifacts remain installed;
- stored enabled choices remain separate from the global block;
- durable plugin data remains subject to its normal storage contract;
- community-plugin code and capabilities do not activate;
- browsing, installing, enabling, updating, and other community-plugin actions remain unavailable until the user turns safe mode off.

A plugin must not attempt to bypass this state or present enablement as proof that it is running. After safe mode is turned off, normal compatibility, permission-review, loading, and activation checks still apply.

## Communicate the boundary accurately

Use precise claims in your README, release notes, and user-facing copy:

- Say which Phials capability the plugin adds.
- Name the filesystem, clipboard, or network behavior that justifies each permission.
- Distinguish local plugin storage from data sent elsewhere.
- State the supported minimum Phials version and Plugin API version.
- Do not claim that Phials sandboxes the plugin or that permission approval makes arbitrary JavaScript safe.

Then verify those claims against the exact release artifacts. [Verify permissions and runtime compatibility](../../test-and-troubleshoot/test-and-validate-your-plugin/verify-permissions-and-runtime-compatibility.md) covers that release check.
