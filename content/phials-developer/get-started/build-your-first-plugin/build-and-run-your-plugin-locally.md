---
title: "Build and run your plugin locally"
description: "Builds and validates the starter, installs its development release artifacts, enables it, and confirms activation."
ai_disclosure: true
order: 3
---

# Build and run your plugin locally

Build the project, install its release artifacts into your Phials Home, then enable it in Phials. These steps prove more than a successful compilation: they show that Phials can discover, load, and activate the plugin.

## Build and validate

Run the complete starter preflight from the project root:

```bash
npm run check
npm run test:run
npm run build
npm run validate
```

The commands do three different jobs:

- `check` checks the TypeScript and Svelte source against the synchronized public SDK.
- `build` creates an ES-module `dist/main.js`, writes `dist/styles.css` when the project has CSS, and synchronizes `dist/manifest.json`.
- `validate` checks the release filenames, manifest schema, matching ID and version, default export, and loadable module shape.

A successful validation ends with:

```text
validate-dist: OK
```

The resulting development release contains:

```text
dist/
├── main.js
├── manifest.json
└── styles.css
```

`manifest.json` and `main.js` are required. `styles.css` is optional in the general release contract, but the starter emits it because the example file surface imports styles.

## Install the development artifacts

Install the exact validated files into the default Phials Home:

```bash
npm run dev:install
```

The command reads the plugin ID from `dist/manifest.json` and atomically places the release artifacts in:

```text
$PHIALS_HOME/plugins/acme.hello-phials/
```

When `PHIALS_HOME` is not set, Phials uses its default home and the command reports the resolved destination. To keep development separate from your normal Phials profile, pass an explicit home:

```bash
npm run dev:install -- --phials-home /absolute/path/to/phials-plugin-dev
```

Launch Phials with the same `PHIALS_HOME` value when you use an isolated home. Installing artifacts does not enable or activate the plugin.

## Enable the plugin

In Phials:

1. Open **Settings → Plugins → Community plugins**.
2. Turn off **Community plugins safe mode** and accept the trust warning if this is your first community plugin in that Phials Home.
3. Open **Installed** and find **Hello Phials**.
4. Enable the plugin.

First install always requires permission review, including when the declared set is empty. Review the tutorial's empty set, or review each requested operation if you changed `permissions`, before activation.

Phials now advances through four distinct states:

1. The release files are present, so the plugin is **installed**.
2. The toggle records that the plugin is **enabled**.
3. Phials successfully imports `main.js`, so the plugin is **loaded**.
4. Phials accepts the exported [PhialsPlugin](../../reference/sdk-type-reference/PhialsPlugin.md), registers its providers, and completes `onActivate`, so the plugin is **activated**.

Enablement is not proof of activation. If loading or activation fails, the Installed card remains available and shows the failure without claiming that the capabilities are running.

## Confirm activation

The starter gives you two direct checks:

1. Confirm that the plugin card shows **Installed**, **Enabled**, **Loaded**, and **Activated**.
2. Open the Command Bar, search for **Hello from Phials**, run the command, and confirm the **Hello from acme.hello-phials** notification appears.

The Activated stage proves the lifecycle hook completed. The command proves the [CommandProvider](../../reference/sdk-type-reference/CommandProvider.md) was registered and can use the plugin's runtime [PluginAPI](../../reference/sdk-type-reference/PluginAPI.md). Routine activation is intentionally silent.

You can also create a text file whose name ends in `.phials-demo-preview.txt` and open it in File mode to inspect the starter's Svelte surface. The command remains the canonical first-plugin check because it does not depend on a particular file or presentation.

If the plugin does not activate, verify that the install directory name, manifest `id`, and exported plugin `id` are all `acme.hello-phials`; then rerun `npm run validate`. [Fix a plugin that will not load or activate](../../test-and-troubleshoot/debug-plugin-failures/fix-a-plugin-that-will-not-load-or-activate.md) provides the complete recovery sequence.

Next, [make and reload your first change](./make-and-reload-your-first-change.md).
