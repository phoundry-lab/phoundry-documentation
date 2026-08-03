---
title: "Install a development plugin locally"
description: "Uses an isolated Phials Home when appropriate, places matching development release artifacts under the plugin ID, and confirms installed, enabled, loaded, and activated states separately."
ai_disclosure: true
order: 1
---

# Install a development plugin locally

Build and validate the starter release, install it into one Phials Home, then enable it from the matching Phials process. Keep the plugin ID, version, directory name, and exported definition aligned.

## Choose a Phials Home

For routine interface work, you can use your normal Phials Home. For lifecycle, permissions, data, or failure testing, choose a dedicated absolute path:

```text
/Users/me/Phials/plugin-dev
C:\Users\me\Phials\plugin-dev
```

`PHIALS_HOME` points to that directory itself, not to its `plugins` child.

Launch Phials with the environment variable set at process start.

macOS:

```bash
PHIALS_HOME=/Users/me/Phials/plugin-dev \
  /Applications/Phials.app/Contents/MacOS/Phials
```

Linux:

```bash
PHIALS_HOME=/home/me/Phials/plugin-dev phials
```

Windows PowerShell:

```powershell
$env:PHIALS_HOME = "C:\Users\me\Phials\plugin-dev"
& "C:\Program Files\Phials\Phials.exe"
```

A Phials app launched from Finder, the Dock, Start, or another desktop launcher does not automatically inherit a terminal's temporary environment variable.

In the launched app, run **Reveal Phials home folder** from the Command Bar. Confirm it opens the isolated path before installing or changing data.

## Build and validate the release

From the plugin project:

```bash
npm run check
npm run build
npm run validate
```

The validated development release contains:

```text
dist/
├── main.js
├── manifest.json
└── styles.css
```

`main.js` and `manifest.json` are required. `styles.css` is included when the plugin imports a global entry stylesheet. Theme assets can add their documented release files.

Before installation, these identities must agree:

| Location | Value |
| --- | --- |
| `public/manifest.json` | permanent plugin ID |
| `dist/manifest.json` | same plugin ID and built version |
| default [PhialsPlugin](../../reference/sdk-type-reference/PhialsPlugin.md) export | same plugin ID and version |
| install directory | same plugin ID |

Run validation after every source-manifest or package-version change. Do not edit `dist/manifest.json` by hand.

## Install atomically

Install the validated artifacts into the same isolated home:

```bash
npm run dev:install -- \
  --phials-home /Users/me/Phials/plugin-dev
```

On Windows:

```powershell
npm run dev:install -- `
  --phials-home "C:\Users\me\Phials\plugin-dev"
```

The starter reads the ID from the validated manifest and atomically replaces:

```text
<PHIALS_HOME>/plugins/<plugin-id>/
```

It copies only supported release artifacts and reports the resolved destination. Do not copy `src/`, `node_modules/`, the SDK, or source maps into the installed directory.

Atomic replacement matters when Phials is running: it never observes a directory containing a new `main.js` and an old manifest.

Installing files does not enable or reload the plugin.

## Enable the plugin

In the Phials process using that home:

1. Open **Settings → Plugins → Community plugins**.
2. Turn off **Community plugins safe mode** and accept the trust warning.
3. Open **Installed** and find the expected plugin ID and version.
4. Review requested permissions when prompted.
5. Choose **Enable**.

Safe mode defaults to on in a new Phials Home. While it is on, community plugins cannot be enabled and previously enabled community plugins are deactivated.

If the manifest's permissions changed since the last approved build, Phials marks the plugin for **permission review** and keeps it disabled until the current set is approved.

## Verify each state separately

Use this order:

1. **Installed** — the Installed card appears with the expected ID and version.
2. **Enabled** — the card shows Enabled after trust and permission review.
3. **Loaded** — no load failure reports invalid JavaScript, missing default export, incompatible runtime, or ID mismatch.
4. **Activated** — `onActivate` completes and one representative capability works.

A useful temporary activation probe is:

```ts
onActivate(api) {
  api.notify.info("acme.review-tools activated");
}
```

The probe proves the hook ran. Also verify a capability, such as finding and executing one namespaced command. That proves provider registration survived activation.

Remove noisy lifecycle notifications before publishing.

## Diagnose the first failed boundary

| Symptom | First check |
| --- | --- |
| No Installed card | Wrong Phials Home, wrong install directory, or invalid/missing manifest. |
| Installed but cannot enable | Safe mode, pending permission review, or compatibility failure. |
| Enabled with load failure | `main.js` syntax/import, missing default export, or artifact identity. |
| Loaded with activation failure | Provider validation, database initialization, or `onActivate`. |
| Activated but capability absent | Provider matching, context, placement, or visible verification path. |

Continue with [Fix a plugin that will not load or activate](../debug-plugin-failures/fix-a-plugin-that-will-not-load-or-activate.md) or [Fix missing or unavailable plugin capabilities](../debug-plugin-failures/fix-missing-or-unavailable-plugin-capabilities.md) for the full recovery sequence.

## Keep the home isolated

An isolated Phials Home contains real durable state. Reusing it is useful for migration and restart tests; replacing it gives you a clean first-run profile.

Do not point `PHIALS_HOME` at:

- the plugin project
- its `dist` directory
- the normal `~/.phials` directory when you intend isolation
- a shared folder used by another running Phials process

Next, [rebuild and reload plugin changes](rebuild-and-reload-plugin-changes.md).
