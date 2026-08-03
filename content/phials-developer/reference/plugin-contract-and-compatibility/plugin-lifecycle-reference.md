---
title: "Plugin lifecycle reference"
description: "Specifies installation-independent runtime states, lifecycle hook order, registration and cleanup boundaries, reload state transfer, and failure behavior."
ai_disclosure: true
order: 2
---

# Plugin lifecycle reference

The plugin lifecycle separates durable installation and user preference from
runtime execution. Only an activated plugin contributes live capabilities.

## Runtime states

| State | Exact meaning |
| --- | --- |
| **Installed** | Phials has a matching set of release artifacts for the plugin. No plugin code needs to be running. |
| **Enabled** | The user preference allows the installed plugin to run. Compatibility, trust, load, or activation checks can still block it. |
| **Loaded** | Phials has imported the plugin's JavaScript module and obtained its default plugin export. |
| **Activated** | Phials has accepted the plugin definition, prepared its public API and plugin-owned data contracts, registered its capabilities, completed `onActivate()`, and committed the runtime transition. |
| **Deactivated** | The plugin is not contributing capabilities or owned runtime registrations. Its release artifacts and durable data can remain. |
| **Reloaded** | Phials has completed the defined before-reload, deactivation, replacement activation, and after-reload path. |

The normal forward path is:

```text
installed → enabled → loaded → activated
```

This is not a single status. For example, a plugin can be installed and enabled
but not loaded because community plugin safe mode is on. It can be loaded but
not activated because its definition or activation hook fails.

## Eligibility before loading

Phials does not load community-plugin code until all pre-load checks succeed:

1. Community plugin safe mode is off.
2. The plugin is installed and enabled.
3. Its manifest is valid and its identities agree.
4. The installed artifact inventory still matches the checksummed candidate.
5. The running app satisfies both runtime compatibility checks.
6. The manifest's current permission set has user approval.

Failure at this boundary leaves the plugin unactivated and exposes none of its
providers, themes, styles, subscriptions, or other runtime contributions.

## Loading and definition acceptance

After eligibility succeeds, Phials:

1. preloads manifest-owned icon identifiers without importing plugin code;
2. reads and imports `main.js`;
3. requires a default export;
4. calls the export when it is a factory, otherwise uses it as the
   [PhialsPlugin](../../reference/sdk-type-reference/PhialsPlugin.md) definition;
5. verifies that the definition ID and version match the installed manifest;
6. prepares the permission-gated [PluginAPI](../../reference/sdk-type-reference/PluginAPI.md) and documented callback scopes.

Top-level module code runs during loading, before activation. It has no
lifecycle-managed [PluginAPI](../../reference/sdk-type-reference/PluginAPI.md). Keep it limited to repeatable declarations and
factory setup. Runtime work belongs in `onActivate(api)`.

## Activation order

For an accepted definition, Phials performs one activation transition in this
order:

1. Load plugin settings and apply schema defaults.
2. Initialize the declared plugin database schema.
3. Register every provider and its commands, components, shortcuts, and
   activation-scoped event ownership.
4. Register plugin theme assets.
5. Call and await `onActivate(api)`, when present.
6. Install optional active styles and commit the plugin as activated.

The supplied [PluginAPI](../../reference/sdk-type-reference/PluginAPI.md) is the plugin's base runtime scope. Provider callbacks
can receive a narrower or specialized API described by that provider's
contract. Do not construct, retain across replacement code, or widen these API
objects.

Activation is atomic from the author's perspective. It succeeds only after the
complete transition. If any step fails, Phials reports an activation failure,
removes contributions created by the attempt, and does not mark the plugin
activated.

Rollback removes styles and themes, unregisters providers and shortcuts,
releases event and file subscriptions, and clears activation-scoped caches in
reverse ownership order. Stable-ID collisions fail the transition; Phials never
replaces the earlier owner.

Calling activate for an already activated plugin is a no-op. Phials does not
call `onActivate()` again until a complete deactivation has occurred.

## Deactivation order

Deactivation stops runtime behavior without uninstalling the release. Phials:

1. calls and awaits `onDeactivate()`, when present;
2. unregisters plugin themes;
3. unregisters all providers;
4. unregisters plugin-owned shortcuts;
5. removes plugin-owned event listeners, file subscriptions, and active styles;
6. clears runtime settings caches and other activation-scoped handles;
7. invalidates the base, Preview, and Metadata API objects supplied by that
   activation;
8. commits the plugin as deactivated.

Phials continues host-owned cleanup even when `onDeactivate()` throws. The
plugin becomes deactivated and the error remains diagnosable; a failing hook
cannot keep providers or subscriptions active.

Use `onDeactivate()` to release resources the plugin owns directly, such as
timers, observers, workers, connections, and third-party subscriptions. Cleanup
must tolerate partial startup and be safe to repeat. Calling deactivate for an
already deactivated plugin is a no-op.

Deactivation preserves:

- installed release artifacts;
- the enabled preference unless the surrounding workflow changes it;
- plugin settings;
- plugin key-value storage;
- plugin database records;
- other durable data governed by a documented storage contract.

Uninstallation and explicit data removal are separate workflows.

## Reload order and state transfer

Reload replaces running plugin code through lifecycle hooks. For an activated
plugin, Phials:

1. calls and awaits `onBeforeReload()`;
2. clones the returned plain data as transient reload state;
3. stages and validates the replacement identity and checksummed artifacts;
4. completely deactivates the current code;
5. atomically swaps and activates the replacement runtime, contributions, and
   styles;
6. calls and awaits `onAfterReload(state)` on the replacement, when the
   before-reload hook returned a value.

`undefined` means there is no reload state to transfer, so `onAfterReload()` is
not called. Durable settings, storage, and database records remain available
through their own contracts and do not belong in reload state.

Reload state should be plain, bounded, and version-tolerant. It must not contain
DOM nodes, component instances, API objects, subscriptions, open handles, or
other resources owned by the old activation.

Non-cloneable state fails before deactivation, so the current activation remains
unchanged.

If `onBeforeReload()` fails, reload stops before deactivation. If replacement
loading, activation, or `onAfterReload()` fails, Phials rolls back the
replacement, restores the previous activated release, and reports the failing
stage. The failed replacement never remains partly active. Reload handoff state
belongs only to the replacement attempt and is not passed back into the restored
release.

## Failure guarantees

| Failure point | Result |
| --- | --- |
| Manifest, identity, safe-mode, permission-review, or compatibility check | Plugin remains unloaded and unactivated |
| Module read or import | Plugin remains unactivated; no provider or style contribution remains |
| Default export or definition validation | Plugin remains unactivated; the definition is not registered |
| Settings, database, provider, theme, style, or `onActivate()` work | Activation is rolled back and all contributions from the attempt are removed |
| `onDeactivate()` or plugin-owned cleanup | Host-owned cleanup continues; plugin becomes deactivated and the error is reported |
| Reload before-state hook | Existing activation remains in place and reload stops |
| Reload replacement load, activation, or after-state hook | Previous activated release is restored; no mixed activation remains; failure is reported and durable data is preserved |

An update that cannot activate its new release restores the previous installed
release when a recoverable backup is available. Permission review is not an
activation failure: the new release remains installed but cannot activate until
the user approves its current permission set.

For a conceptual walkthrough, see
[Understand the plugin lifecycle](../../get-started/understand-phials-plugins/understand-the-plugin-lifecycle.md).
