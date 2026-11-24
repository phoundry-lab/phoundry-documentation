---
title: "Build and run your plugin locally"
description: "Builds and installs the starter into Phials, enables it, and checks the command and preview."
ai_disclosure: true
order: 3
---

# Build and run your plugin locally

Install the plugin from its project directory, then enable it in Phials. You do not need a separate development profile or a published release.

## Build and install

Run:

```bash
npm run dev:install
```

The command builds the plugin and installs it into your normal Phials home under `plugins/<plugin-id>/`. It reports the destination, replaces a previous installation of the same ID, and can restore that installation if replacement fails.

The build produces:

```text
dist/
├── main.js
├── manifest.json
└── styles.css  # when CSS is emitted
release/
└── release-inventory.json
```

The manifest and inventory are generated automatically. You do not need a separate build, validation, or inventory command before installing.

`npm run check` checks Svelte and TypeScript, and `npm test` runs the automated tests. Run them when checking your source changes; neither replaces trying the plugin in Phials.

## Enable the plugin

If Phials is not running, launch it normally. If a first installation does not appear in an already-running app, restart Phials.

1. Open **Settings → Plugins → Installed & Community**.
2. Turn off **Community plugins safe mode** and accept the trust warning if needed.
3. Find **Hello Phials** in **Installed**.
4. Review permissions if prompted and enable the plugin.

Community plugins run trusted JavaScript in Phials. Enable only code you trust. This tutorial's command and preview do not request privileged permissions.

The plugin moves through these states:

- **Installed:** Phials finds its manifest and files.
- **Enabled:** you have allowed it to run.
- **Loaded:** Phials imports the module successfully.
- **Activated:** its definition is accepted and `onActivate` completes.

A saved enabled preference alone does not mean the plugin activated. Use the card's status and **Copy diagnostics** if a stage fails.

## Try the command and preview

After following [Set your plugin identity](./set-your-plugin-identity.md):

1. Open the Command Bar and search for **Hello from Phials**.
2. Run the command and confirm the notification says **Hello from acme.hello-phials**.
3. Create a text file ending in `.phials-demo-preview.txt` and open it to try the preview.

If you have not renamed the example, its command is **Demo: Hello from community plugin**.

## Optionally use a separate home

For tests that need separate settings or plugin data, choose an isolated home:

```bash
npm run dev:install -- --phials-home /absolute/path/to/phials-plugin-dev
```

Launch Phials with `PHIALS_HOME` set to the same directory. The flag overrides the installer's `PHIALS_HOME` environment variable, which otherwise overrides the platform default. The directory is the Phials home itself, not its `plugins` child.

See [Install a development plugin locally](../../test-and-troubleshoot/run-your-plugin-locally/install-a-development-plugin-locally.md) for platform paths and launch examples.

Next, [make and reload your first change](./make-and-reload-your-first-change.md).
