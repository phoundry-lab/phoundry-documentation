---
title: "Build your first plugin"
description: "Create, identify, run, change, and reload a plugin using the official starter."
ai_disclosure: true
aliases:
  - overview/getting-started
---

# Build your first plugin

The official plugin starter is the shortest supported route to a working Phials plugin. It already contains the synchronized public SDK, a Svelte 5 and TypeScript build, Phoundry UI, manifest validation, and two small capabilities you can inspect after activation.

Follow these articles in order:

1. [Create a plugin project from the starter](./create-a-plugin-project-from-the-starter.md) and install its npm dependencies.
2. [Set your plugin identity](./set-your-plugin-identity.md) so the manifest, source, and generated release artifacts describe one plugin.
3. [Build and run your plugin locally](./build-and-run-your-plugin-locally.md), then verify that it is installed, enabled, loaded, and activated.
4. [Make and reload your first change](./make-and-reload-your-first-change.md) without restarting Phials.

The tutorial changes the starter's command because it gives you a quick, unambiguous result in the Command Bar. The starter also includes a small file viewing capability for files ending in `.phials-demo-preview.txt`; the dedicated capability guides take that example from demonstration code to production behavior.

## What you will have

At the end of this path, you will have:

- a plugin project with its own stable ID and version;
- validated `manifest.json`, `main.js`, and optional `styles.css` release artifacts;
- an installed development plugin that Phials can activate;
- a repeatable build, install, and reload loop; and
- a command whose updated label and notification prove that Phials is running your latest code.

Installation and activation are separate. Copying valid release artifacts into Phials makes the plugin **installed**. Allowing it to run makes it **enabled**. Phials must then import its JavaScript module before it is **loaded**, and registration plus `onActivate` must finish before it is **activated**. The checks in this tutorial confirm each state instead of treating one as proof of the next.

For the complete development loop, including isolated Phials Homes, watch builds, restart testing, and persisted state, continue to [Run your plugin locally](../../test-and-troubleshoot/run-your-plugin-locally/index.md).
