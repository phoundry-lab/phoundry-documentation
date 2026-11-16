---
title: "Create a plugin project from the starter"
description: "Creates a Svelte and TypeScript plugin project with the public SDK, installs dependencies, and introduces the starter files."
ai_disclosure: true
order: 1
---

# Create a plugin project from the starter

Start from [phials-plugin-example](https://github.com/phoundry/phials-plugin-example). It includes a command, a Svelte preview, Phoundry UI, and the build configuration needed to run them in Phials. You do not need a Phials source checkout.

## Prerequisites

You need:

- Node.js 24;
- npm and Git; and
- a Phials installation that supports Plugin API 3.0.0.

You can learn the interface tools as you go. [Use Svelte and Phoundry UI](../use-svelte-and-phoundry-ui/index.md) introduces the component patterns used by plugins.

## Clone and install

Choose a project directory, then install the dependencies:

```bash
git clone https://github.com/phoundry/phials-plugin-example.git hello-phials
cd hello-phials
npm install
npm run check
```

`check` checks Svelte and TypeScript, including the build scripts and tests. A successful Svelte check reports:

```text
svelte-check found 0 errors and 0 warnings
```

If installation fails, confirm that `node --version` reports Node 24 and retry `npm install`.

## Know the project

| Path | Purpose |
| --- | --- |
| `package.json` | Project name, plugin version, dependencies, and commands. |
| `src/plugin.manifest.ts` | Plugin identity, compatibility, icons, and permissions. It imports the version from `package.json`. |
| `src/main.ts` | Plugin definition, command, preview provider, and activation/deactivation hooks. |
| `src/ExamplePreview.svelte` | The preview component. |
| `src/manifest-icons.ts` | Registration of packaged Phoundry icon collections. |
| `env.d.ts` | Makes the public SDK types available to the project. |
| `scripts/` | Build metadata, local installation, and release verification. |
| `tests/` | Tests for installation-path resolution and release integrity. |
| `dist/` | Generated plugin files. Rebuild them rather than editing them. |
| `release/release-inventory.json` | Generated list of release files, sizes, and checksums. |

The starter depends on `@phoundry/phials-plugin-sdk@3.0.0`. Its ambient declarations provide public types such as [PhialsPlugin](../../reference/sdk-type-reference/PhialsPlugin.md), [PluginAPI](../../reference/sdk-type-reference/PluginAPI.md), and [PreviewProvider](../../reference/sdk-type-reference/PreviewProvider.md). Runtime manifest helpers come from:

```ts
import { definePlugin, definePluginManifest } from "@phoundry/phials-plugin-sdk/manifest";
```

There is no SDK directory to synchronize. SDK updates are dependency updates; use the public package rather than importing Phials application source.

## What the example does

- A command appears in the Command Bar and shows a notification.
- A preview matches `.phials-demo-preview.txt` files and renders a Phoundry UI button.

Neither example needs privileged permissions. Phials supplies the shared UI styles and active theme. The starter does not require Tailwind; you can use Svelte component CSS or add your preferred styling tools.

Next, [set your plugin identity](./set-your-plugin-identity.md).
