---
title: "Understand the plugin lifecycle"
description: "Introduces installation, enablement, loading, activation, deactivation, and reload at the conceptual level."
ai_disclosure: true
order: 3
---

# Understand the plugin lifecycle

Treat installation, enablement, loading, and activation as separate states. A plugin can reach one state without reaching the next, which makes the distinction important when testing or diagnosing a failure.

## Follow the path to activation

The normal path is:

1. **Installed**: Phials has the plugin's matching release artifacts. No plugin code needs to be running.
2. **Enabled**: the user has allowed the installed plugin to run. This is a stored preference, not proof of runtime success.
3. **Loaded**: Phials has passed compatibility and trust checks and successfully imported the plugin's JavaScript module.
4. **Activated**: Phials has accepted the plugin definition, prepared its public API scopes and plugin-owned data contracts, registered its capabilities, and completed its activation path.

Only an activated plugin contributes live capabilities. An installed plugin might be disabled. An enabled plugin might be blocked by community plugin safe mode, permission review, incompatibility, a load error, or an activation error.

The exact state checks and hook ordering are specified in the [plugin lifecycle reference](../../reference/plugin-contract-and-compatibility/plugin-lifecycle-reference.md).

## Design activation as one complete transition

The `onActivate(api)` hook receives the plugin's runtime [PluginAPI](../../reference/sdk-type-reference/PluginAPI.md). Use it to initialize work that depends on the running app, such as retaining an API reference, subscribing to events, or loading plugin-owned state needed by several providers.

Activation succeeds only when the whole transition completes. If loading or activation fails, Phials reports the failure and does not leave a partial set of capabilities available. Correct the cause, then activate or reload the plugin again.

Do not use module import as an activation hook. Top-level code runs while Phials is loading the release and has no lifecycle-managed [PluginAPI](../../reference/sdk-type-reference/PluginAPI.md). Keep top-level work limited to definitions that are safe to evaluate again.

## Clean up during deactivation

Deactivation stops the running plugin without uninstalling it. Phials calls `onDeactivate()`, removes the plugin's active providers and owned runtime registrations, releases lifecycle-managed subscriptions, and removes its active interface contributions.

Use `onDeactivate()` to stop anything the plugin retained itself, including timers, observers, workers, and connections that are not owned by a Plugin API subscription handle.

Deactivation preserves durable settings, key-value storage, database records, and other data covered by their storage contracts. Do not clear durable data in `onDeactivate()` unless the user's action explicitly requested that result. Uninstallation and user-directed data removal are separate workflows.

Your cleanup should be safe to call after a partial startup and safe to repeat. This keeps disable, reload, update, and recovery paths predictable.

## Carry explicit state through reload

Plugin reload is a lifecycle transition, not just a rebuild or page refresh. For an activated plugin, Phials:

1. calls `onBeforeReload()` and retains its return value;
2. deactivates the current plugin and removes its active capabilities;
3. loads and activates the replacement plugin code;
4. passes the retained value to `onAfterReload(state)`.

Return only transient state that should survive replacement of the running code, such as the currently selected plugin-owned record or an unfinished in-memory form that has an explicit recovery policy. Keep the value plain and version-tolerant. Do not place DOM nodes, component instances, open handles, or API objects in reload state.

Durable settings, storage, and database data already have their own lifecycle and do not need to be copied through `onBeforeReload()`.

If the replacement code fails to load or activate, Phials reports the reload failure, does not call `onAfterReload()`, and restores the previous activated release. The failed attempt's transient handoff value is discarded; durable plugin data remains available to the restored release.

For the repeatable development workflow, see [Rebuild and reload plugin changes](../../test-and-troubleshoot/run-your-plugin-locally/rebuild-and-reload-plugin-changes.md).

## Expect lifecycle transitions in ordinary use

Design and test for more than the first activation:

- Disabling a plugin deactivates it but keeps it installed.
- Re-enabling it creates a fresh runtime activation over its durable data.
- App restart loads and activates enabled, eligible plugins again.
- An update may deactivate the old release before installing and activating the new one.
- A permission change pauses activation until the user reviews the current set.
- Community plugin safe mode blocks community-plugin activation globally.

The plugin should either complete each transition or leave a clear, recoverable failure. [Test activation, restart, and persisted state](../../test-and-troubleshoot/run-your-plugin-locally/test-activation-restart-and-persisted-state.md) turns these states into a practical test checklist.
