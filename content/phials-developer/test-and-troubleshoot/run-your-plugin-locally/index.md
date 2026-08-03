---
title: "Run your plugin locally"
description: "Install a development plugin, reload changes, and verify lifecycle and persisted state."
ai_disclosure: true
---

# Run your plugin locally

Use the starter's development workflow to test the same release artifacts Phials will eventually install for users. A reliable loop has four gates:

```text
check and build → validate and install → reload → verify
```

Do not treat a successful build, an Enabled badge, or a notification by itself as proof that the complete plugin is running.

## Start with the first-plugin path

If you have not run a plugin yet, follow [Build your first plugin](../../get-started/build-your-first-plugin/index.md). It establishes a stable ID, builds the starter artifacts, and proves one command.

Return here for the complete loop:

1. [Install a development plugin locally](install-a-development-plugin-locally.md), preferably in an isolated Phials Home.
2. [Rebuild and reload plugin changes](rebuild-and-reload-plugin-changes.md) without restarting the app.
3. [Test activation, restart, and persisted state](test-activation-restart-and-persisted-state.md) across lifecycle boundaries.

## Know the four runtime states

| State | Meaning | Direct evidence |
| --- | --- | --- |
| **Installed** | A valid release directory exists under the active Phials Home. | The plugin appears under **Settings → Plugins → Community plugins → Installed** with the expected ID and version. |
| **Enabled** | The active Phials Home records that the plugin may run. | The Installed card shows **Enabled** and no permission review is pending. |
| **Loaded** | Phials imported `main.js` and accepted its module shape and identity. | The card has no load diagnostic; a load failure identifies the import, export, or identity problem before activation. |
| **Activated** | Phials registered the plugin's capabilities and `onActivate` completed. | An activation probe and one representative capability both work. |

Each later state depends on the earlier ones. A plugin can be installed but disabled, enabled but unable to load, or loaded but unable to activate.

## Use one active Phials Home

`PHIALS_HOME` selects the portable profile containing plugin artifacts, enablement, permission approvals, settings, storage, databases, and session state. The install command and the running Phials process must use the same absolute path.

Use an isolated home when testing:

- permission changes
- first-run safe mode
- destructive plugin settings or data migrations
- repeated uninstall and reinstall
- incompatible or intentionally broken artifacts

Do not run two Phials processes against the same development home at once.

## Keep the loop observable

Give every development change a visible proof:

- a changed command label
- a version or build marker in a development-only interface
- a changed viewer state
- a lifecycle notification used only while debugging

Verify both presence and absence. After reload, the new result should appear and the old result should be gone.

If a gate fails, stop at that boundary. Use [Fix a plugin that will not load or activate](../debug-plugin-failures/fix-a-plugin-that-will-not-load-or-activate.md) rather than changing unrelated code.

## Related reference

- [Plugin lifecycle reference](../../reference/plugin-contract-and-compatibility/plugin-lifecycle-reference.md)
- [Build and validate release artifacts](../test-and-validate-your-plugin/build-and-validate-release-artifacts.md)
