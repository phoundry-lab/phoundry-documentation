---
title: "Test and validate your plugin"
description: "Type-check, test, build, and validate a plugin against permissions and runtime compatibility."
ai_disclosure: true
---

# Test and validate your plugin

Validate a plugin in layers. Each layer catches a different class of failure:

1. [Type-check your plugin project](type-check-your-plugin-project.md) against Svelte and the synchronized public SDK.
2. [Test plugin logic and interfaces](test-plugin-logic-and-interfaces.md) with deterministic logic, provider, component, accessibility, and representative-file tests.
3. [Build and validate release artifacts](build-and-validate-release-artifacts.md) as the exact files Phials will install.
4. [Verify permissions and runtime compatibility](verify-permissions-and-runtime-compatibility.md) in an isolated Phials Home with both compatible and deliberately incompatible manifests.

Run the complete source and artifact gate from the plugin project root:

```bash
npm run check
npm run test:run
npm run build
npm run validate
```

A clean run proves that the source agrees with the public SDK, deterministic behavior passes, and the release artifact set is structurally valid. It does not prove that the plugin activates with its real permissions and compatibility declarations. The installed-runtime checks provide that final evidence.

## Match tests to plugin capabilities

Every plugin should test:

- its exported [PhialsPlugin](../../reference/sdk-type-reference/PhialsPlugin.md) identity and lifecycle
- each provider’s matching, availability, and failure behavior
- permission-gated operations it actually calls
- durable settings or data across reload and restart when applicable
- release artifacts produced from a clean checkout

Add capability-specific cases from the relevant [Add capabilities](../../add-capabilities/index.md) hub. A file viewer needs representative files and destination states; a command needs visible and disabled contexts; a panel or tab needs mount, remount, and finalization behavior.

For the repeatable local lifecycle after validation, use [Run your plugin locally](../run-your-plugin-locally/index.md).
