---
title: "Create a plugin project from the starter"
description: "Clones or uses the plugin starter repo, installs dependencies, and identifies the project areas the first workflow will touch."
ai_disclosure: true
order: 1
---

# Create a plugin project from the starter

Start from `phials-plugin-example`. The starter is the supported source for the synchronized public SDK and the build conventions Phials expects, so you do not need to copy types from the Phials application or assemble a blank Svelte project.

## Prerequisites

You need:

- Node.js 20 or newer;
- npm and Git; and
- a current Phials installation for the local run in the next article.

Svelte 5 and Phoundry UI experience are not prerequisites. The starter supplies their configuration, and [Use Svelte and Phoundry UI](../use-svelte-and-phoundry-ui/index.md) explains the Phials-specific component patterns when you begin building interfaces.

## Clone and install

Choose a directory name for your project, then clone the starter and install its dependencies:

```bash
git clone https://github.com/phoundry/phials-plugin-example.git hello-phials
cd hello-phials
npm install
npm run check
```

`npm run check` checks the TypeScript and Svelte source against the committed public SDK. A clean checkout finishes with:

```text
svelte-check found 0 errors and 0 warnings
```

If dependency installation fails, first confirm `node --version` reports version 20 or newer, then rerun `npm install`. Do not replace the committed `sdk/` directory with declarations copied from Phials source.

## Know the project

The first-plugin workflow touches a small set of files:

| Path | Purpose |
| --- | --- |
| `package.json` | Owns the npm project name, plugin version, dependencies, and build commands. |
| `public/manifest.json` | Declares the plugin's public identity, compatibility, permissions, and release metadata. |
| `src/main.ts` | Exports the [PhialsPlugin](../../reference/sdk-type-reference/PhialsPlugin.md) definition and registers the starter's command and file viewing capabilities. |
| `src/ExamplePreview.svelte` | Implements the starter's small Svelte file surface. |
| `src/app.css` | Imports Tailwind CSS and the selected Phoundry UI styles into `styles.css`. |
| `scripts/` | Synchronizes the manifest into `dist/`, validates release artifacts, and installs development artifacts. |
| `sdk/` | Contains generated public declarations and the manifest validator synchronized from Phials. |
| `dist/` | Contains generated release artifacts. Rebuild these files; do not edit them directly. |

The SDK declarations are ambient, so `src/main.ts` can use public types such as [PhialsPlugin](../../reference/sdk-type-reference/PhialsPlugin.md), [PluginAPI](../../reference/sdk-type-reference/PluginAPI.md), [CommandProvider](../../reference/sdk-type-reference/CommandProvider.md), and [PreviewProvider](../../reference/sdk-type-reference/PreviewProvider.md) without importing them from Phials. Imports from the Phials application source tree are outside the public SDK contract.

The starter deliberately includes more than an empty activation hook:

- a command that appears in the Command Bar and shows a notification; and
- a [PreviewProvider](../../reference/sdk-type-reference/PreviewProvider.md) that matches `.phials-demo-preview.txt` files and renders a Phoundry UI button.

This tutorial uses the command as the first success check. Keep the file surface in place; it will be useful when you continue to [Build file viewers and editors](../../add-capabilities/build-file-viewers-and-editors/index.md).

Next, [set your plugin identity](./set-your-plugin-identity.md) before installing the project into Phials.
