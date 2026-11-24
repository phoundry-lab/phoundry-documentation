---
title: "Run a local Node process"
description: "Use the Plugin API to run a managed Node.js process on the local desktop."
ai_disclosure: true
order: 6
---

# Run a local Node process

`api.runtime.start()` is available in Plugin API 3.2.0. It requires matching SDK declarations and a Phials build that supports that API version. The npm-published 3.1.0 SDK does not contain this API.

Use the Node runtime for code you own that needs to run on the desktop. The user must select their local desktop in Phials, have Node.js 24 or later installed, and grant the `runtime.node` permission when enabling a community plugin. Declare that permission in `manifest.json` and set `minPluginApiVersion` to at least `3.2.0`. The permission grants the process the same operating-system access as the user running Phials. Only pass code you trust and never build source from untrusted input.

## Start a process

Pass a self-contained ES module as `source` and a callback to receive events. You can supply an absolute `nodePath` when the user chooses a specific Node executable. Phials runs Node directly and leaves dependency installation to the plugin author. The process runs in its plugin data directory, also available as `PHIALS_PLUGIN_DATA_DIR`.

## Exchange messages and stop

- Call `send(message)` on the returned handle to send a JSON-serializable value. The process receives one JSON value per line on standard input.
- Write one JSON value per line to standard output. The callback receives messages, standard-error text, runtime errors, and an exit event.
- Call `stop()` when the work ends or the user cancels. Phials also stops the process when the plugin unloads, the user switches away from the local desktop, or the owning window closes.

Use [Plugin permissions](../../reference/manifest-and-permissions-reference/plugin-permission-reference.md) to decide which access your plugin needs.
