---
title: "Test activation, restart, and persisted state"
description: "Exercises enable, disable, deactivate, reload, full app restart, and expected settings, storage, database, and instance-state retention."
ai_disclosure: true
order: 3
---

# Test activation, restart, and persisted state

Test lifecycle transitions deliberately. Reload, disable, safe mode, and full restart remove different runtime state while preserving different durable state.

Use an isolated Phials Home so you can inspect first-run behavior and reset the profile without affecting normal files or plugin data.

## Add a small lifecycle probe

During development, make activation and deactivation observable:

```ts
export default function createPlugin(): PhialsPlugin {
  let api: PluginAPI | null = null;

  return {
    id: "acme.lifecycle-probe",
    name: "Lifecycle probe",
    version: "1.0.0",

    onActivate(pluginApi) {
      api = pluginApi;
      api.notify.info("Lifecycle probe activated");
    },

    onDeactivate() {
      api = null;
    },

    providers: [],
  };
}
```

Pair the notification with a representative capability. An activation notification proves the hook ran; it does not prove every provider, surface, or persisted value works.

## Test enable and disable

From **Settings → Plugins → Community plugins → Installed**:

1. Enable the plugin.
2. Confirm one activation and one copy of each capability.
3. Open or configure representative plugin state.
4. Disable the plugin.
5. Confirm `onDeactivate` cleanup and that capabilities disappear.
6. Enable it again.
7. Confirm durable state returns without duplicate subscriptions or UI.

Disable retains the plugin's release files and durable user data. It removes active capabilities and runtime resources.

Safe mode is broader: turning it on deactivates all enabled community plugins in that Phials Home without changing their durable enabled preference. Turning safe mode off reactivates eligible plugins, but does not silently bypass permission review.

## Test reload

With the plugin enabled:

1. Create known transient and durable values.
2. Build, validate, and install a visibly changed release.
3. Choose **Reload**.
4. Confirm one deactivation followed by one activation of the new module.
5. Confirm `onBeforeReload` to `onAfterReload` handoff where implemented.
6. Confirm settings, storage, and database values remain.
7. Confirm old capabilities, listeners, styles, and in-memory objects are gone.

Then install one intentionally invalid development build and verify reload reports the failure and restores the prior activated release. Return immediately to a valid build.

## Test a full restart

With the plugin enabled and permission-approved:

1. Record the active plugin version and representative state.
2. Quit Phials completely.
3. Confirm no Phials process remains.
4. Relaunch with the same `PHIALS_HOME`.
5. Confirm the plugin is still enabled, loads once, and activates once.
6. Confirm durable state and host-restored instance state.
7. Confirm reload-only handoff and ordinary module variables are absent.

Repeat with the plugin disabled. It should remain installed and disabled after restart, and no capability should activate.

Repeat after adding a manifest permission. The durable enabled preference should remain selected, but the plugin must stay deactivated until the changed permission set is reviewed.

## Use the persistence matrix

| State | Reload | Disable and enable | Full restart | Uninstall, retain data |
| --- | --- | --- | --- | --- |
| Ordinary variables and component state | Lost unless explicitly handed off | Lost | Lost | Lost |
| `onBeforeReload` handoff | Passed to the new module | Not used | Not used | Not used |
| Plugin settings | Retained | Retained | Retained | Retained |
| Key-value plugin storage | Retained | Retained | Retained | Retained |
| Plugin database rows | Retained | Retained | Retained | Retained |
| Event subscriptions and folder watches | Recreated by new activation | Recreated | Recreated | Removed |
| Enabled state | Retained | Changes by the user's action | Retained | Removed |
| Permission approval | Retained if the set is unchanged | Retained if unchanged | Retained if unchanged | Removed |
| Host-owned panel or tab instance state | Restored when compatible | Retained for later compatible activation | Restored from session when compatible | Retained only when the host explicitly preserves orphaned instance state |

The uninstall confirmation can instead delete plugin settings and data. Test that option only in an isolated Phials Home with disposable fixtures.

See [Choose between settings, storage, and a database](../../work-with-phials/store-plugin-data/choose-between-settings-storage-and-a-database.md) and [Manage instances and persisted state](../../add-capabilities/add-panels-and-tabs/manage-instances-and-persisted-state.md).

## Verify persistence by identity

All durable plugin state is namespaced by the plugin ID. A changed ID creates a different plugin and therefore a different settings, storage, database, enablement, and permission identity.

Keep the ID stable during normal development. If a test intentionally changes it:

- expect a second Installed entry
- do not treat missing old settings as data loss
- clean up both development identities explicitly

Changing only the plugin version does not create a new storage namespace.

## Test failures at lifecycle boundaries

Exercise at least:

| Boundary | Failure to provoke | Expected result |
| --- | --- | --- |
| Load | malformed or missing default export | Load diagnostic; no activation. |
| Identity | manifest and export IDs differ | Rejected before capabilities register. |
| Permission review | add `filesystem.read` | Disabled until approved. |
| Activation | throw from a development-only activation branch | Activation diagnostic; no partial active plugin. |
| Reload | valid old release, invalid new release | Failure reported; prior release restored. |
| Restart | enabled compatible plugin | One fresh activation with durable state. |
| Cleanup | listener or watch active before disable | No reaction after deactivation. |

Do not leave intentionally broken artifacts installed after the test.

## Record the matrix result

For each release candidate, record:

- Phials version and Plugin API version
- plugin version and artifact checksum or commit
- operating system
- Phials Home used
- tested permissions
- transitions exercised
- expected and observed persistence

This turns “worked after reload” into reproducible evidence.

## Troubleshoot

- [Fix a plugin that will not load or activate](../debug-plugin-failures/fix-a-plugin-that-will-not-load-or-activate.md)
- [Recover plugin settings and data](../debug-plugin-failures/recover-plugin-settings-and-data.md)
- [Verify permissions and runtime compatibility](../test-and-validate-your-plugin/verify-permissions-and-runtime-compatibility.md)
