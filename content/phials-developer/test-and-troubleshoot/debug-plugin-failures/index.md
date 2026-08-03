---
title: "Debug plugin failures"
description: "Diagnose loading, capability, interface, permission, and data failures from visible symptoms."
ai_disclosure: true
---

# Debug plugin failures

Start with what Phials shows, then test the cheapest boundary that could produce
that symptom. A successful build proves that the source compiled; it does not
prove that the release artifacts were installed, the plugin was loaded and
activated, its providers match the current context, or a permission-gated
operation was approved.

## Choose the article by symptom

| Visible symptom | Start here |
| --- | --- |
| The plugin is absent from Installed, cannot be enabled, or shows **Activation failed** | [Fix a plugin that will not load or activate](./fix-a-plugin-that-will-not-load-or-activate.md) |
| The plugin is activated, but a command, viewer, file view, panel, tab, or metadata field is missing | [Fix missing or unavailable plugin capabilities](./fix-missing-or-unavailable-plugin-capabilities.md) |
| A plugin surface says it failed to load, is blank, is unstyled, or behaves incorrectly when resized or focused | [Fix plugin interface and rendering failures](./fix-plugin-interface-and-rendering-failures.md) |
| An operation is denied, a new permission awaits review, or an API member or approved host command is unavailable | [Fix permission and Plugin API failures](./fix-permission-and-plugin-api-failures.md) |
| A bad setting, stored value, database record, or restored panel or tab state prevents normal use | [Recover plugin settings and data](./recover-plugin-settings-and-data.md) |
| The failure remains after a focused reproduction | [Collect diagnostics for unresolved failures](./collect-diagnostics-for-unresolved-failures.md) |

## Use one diagnostic loop

For each test, record four things:

1. **Visible symptom:** the exact status, message, missing capability, or broken
   interaction.
2. **Likely cause:** the smallest boundary consistent with that symptom.
3. **Next action:** one reversible check or change.
4. **Expected result:** the observable signal that confirms or rejects the
   cause.

Change one boundary at a time. Rebuilding, reinstalling, changing permissions,
and deleting data together may make the plugin appear fixed while hiding the
actual fault.

Before changing runtime state, run the starter preflight:

```bash
npm run check
npm run build
npm run validate
```

If those commands pass, continue from the installed plugin card in
**Settings → Plugins → Community plugins → Installed**. Keep the distinction
between **installed**, **enabled**, **loaded**, and **activated** visible during
the investigation.

## Prefer reversible recovery

Reload before restarting Phials. Reset one plugin setting before all settings.
Delete one key or database row before clearing a complete store. When a plugin
must be reinstalled, keep its data unless the data itself is the confirmed
cause.

Full data deletion is recovery of last resort. Collect a privacy-reviewed
diagnostic report before using it so the original evidence is not lost.
