---
title: "Use app and Explorer context"
description: "Use runtime API scopes, Explorer pane context, app settings, and approved host commands."
ai_disclosure: true
---

# Use app and Explorer context

Phials gives each activated plugin a scoped runtime API. Provider callbacks may receive a more specialized version of that API, and Explorer-related callbacks receive the exact pane that caused the work. These values are the supported bridge between a plugin and the running app.

Use the narrowest public contract available:

| Need | Public contract |
| --- | --- |
| Plugin-owned settings, storage, database, files, dialogs, notifications, modules, and events | [PluginAPI](../../reference/sdk-type-reference/PluginAPI.md) |
| Provider-specific operations | The specialized API in that callback's signature |
| The listing, selection, navigation, and view state for one Explorer pane | [PluginPaneContext](../../reference/sdk-type-reference/PluginPaneContext.md) |
| Supported global display preferences | `api.appSettings` |
| A documented native capability with no typed API | `api.invoke()` |

Do not import Phials source files, app managers, Tauri APIs, or whichever pane happens to be globally active. Those are implementation details rather than the public plugin contract.

Work through this hub by task:

1. [Understand runtime API scopes](./understand-runtime-api-scopes.md) and retain only the scope Phials supplies.
2. [Use Explorer pane context](./use-explorer-pane-context.md) for pane-owned listing, selection, navigation, and view behavior.
3. [Read Phials app settings](./read-phials-app-settings.md) without taking ownership of global preferences.
4. [Call approved host commands](./call-approved-host-commands.md) only when no typed API covers the operation.

## Context is capability, not global access

The runtime API is scoped to the plugin that receives it. Its settings, storage, database, events, permissions, and operations retain that plugin identity.

An Explorer pane context is scoped differently: it identifies one Explorer pane and remains independent from other panes in the same application window. A callback's pane is authoritative for that callback. A module's optional pane can provide inspection context, but does not grant permission to perform an unrelated destructive Explorer action.

App settings are intentionally narrower than the full Phials configuration. Their getters expose only supported read-only values. If a value is absent from [ReadonlyAppSettings](../../reference/sdk-type-reference/ReadonlyAppSettings.md), do not reach around the SDK to read it.

`api.invoke()` is narrower still. A string matching an internal command name is not automatically public. The command must be in the approved plugin allowlist and the plugin must have any required permission.

For exact generated signatures, see [PluginAPI](../../reference/sdk-type-reference/PluginAPI.md), [`PluginPaneContext`](../../reference/sdk-type-reference/PluginPaneContext.md), and [`ReadonlyAppSettings`](../../reference/sdk-type-reference/ReadonlyAppSettings.md).
