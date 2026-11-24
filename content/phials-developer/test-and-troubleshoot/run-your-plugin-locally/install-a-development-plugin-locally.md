---
title: "Install a development plugin locally"
description: "Builds and installs a plugin into the normal Phials home, with optional environment and directory overrides."
ai_disclosure: true
order: 1
---

# Install a development plugin locally

From your plugin project, run:

```bash
npm run dev:install
```

The installer builds the plugin, generates its metadata, and installs it into your normal Phials home. You do not need to find the home directory, publish a release, or prepare a release inventory first.

## Where the plugin is installed

The destination is:

```text
<Phials home>/plugins/<plugin-id>/
```

The installer reports the full path. It chooses the home in this order:

1. `--phials-home <directory>`, if provided.
2. `PHIALS_HOME`, if set in the installer's environment.
3. The platform default below.

| Platform | Default Phials home |
| --- | --- |
| macOS | `~/Library/Application Support/com.phials` |
| Windows | `%LOCALAPPDATA%\com.phials` |
| Linux | `$XDG_DATA_HOME/com.phials`, or `~/.local/share/com.phials` when `XDG_DATA_HOME` is unset or not absolute |

Without an override, launch Phials normally. Use **Reveal Phials home folder** in the Command Bar to check which home the app is using.

## What installation does

The command:

1. Builds the plugin into `dist/` and generates `release/release-inventory.json`.
2. Stages the supported files under the plugin's ID.
3. Replaces a previous installation of that ID, with rollback if replacement fails.

`main.js` and `manifest.json` are required; `styles.css` is included when emitted. Source files, SDK declarations, and `node_modules` are not installed.

The plugin ID in `src/plugin.manifest.ts`, the built manifest, the exported definition, and the installation directory must agree. The version comes from `package.json`. Fix source metadata and rebuild rather than editing generated files.

Installing files does not enable or reload the plugin. If a first installation is not discovered in an already-running app, restart Phials.

## Enable and try the plugin

In Phials:

1. Open **Settings → Plugins → Installed & Community**.
2. Turn off **Community plugins safe mode** and accept the trust warning if needed.
3. Find the plugin in **Installed**.
4. Review permissions if prompted, then enable it.
5. Try one of its capabilities.

Safe mode defaults to on in a new home. Community plugins run trusted JavaScript, so enable only code you trust. The starter's command and preview do not need privileged permissions.

Check each stage separately:

- **Installed:** the plugin appears with the expected identity and version.
- **Enabled:** you have allowed it to run.
- **Loaded:** its JavaScript module imports successfully.
- **Activated:** activation completes and the capability works.

If a stage fails, use **Copy diagnostics** on the plugin card. See [Fix a plugin that will not load or activate](../debug-plugin-failures/fix-a-plugin-that-will-not-load-or-activate.md).

## Optionally use a separate home

A separate home is useful for first-run, permission, settings, or data tests. It is not required for routine development.

```bash
npm run dev:install -- --phials-home /absolute/path/to/phials-plugin-dev
```

The path names the home itself, not its `plugins` child. Launch a fresh Phials process with that same home.

macOS:

```bash
PHIALS_HOME="$HOME/Phials/plugin-dev" \
  /Applications/Phials.app/Contents/MacOS/Phials
```

Linux, using the executable path for your installation:

```bash
PHIALS_HOME="$HOME/Phials/plugin-dev" /path/to/Phials
```

Windows PowerShell, using the executable path for your installation:

```powershell
$env:PHIALS_HOME = "C:\Users\me\Phials\plugin-dev"
& "C:\path\to\Phials.exe"
```

Set the variable before launching Phials. An already-running process does not change homes when you set a variable in a terminal, and desktop launchers do not automatically inherit a terminal's temporary environment.

You can also set `PHIALS_HOME` when running `npm run dev:install`; the explicit `--phials-home` flag takes precedence if both are supplied.

Next, [rebuild and reload plugin changes](rebuild-and-reload-plugin-changes.md).
