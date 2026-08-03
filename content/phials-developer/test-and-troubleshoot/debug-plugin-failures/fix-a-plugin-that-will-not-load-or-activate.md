---
title: "Fix a plugin that will not load or activate"
description: "Checks installation shape, identity, module import, compatibility, safe mode, enablement, permission review, and activation errors in least-cost order."
ai_disclosure: true
order: 1
---

# Fix a plugin that will not load or activate

Use the installed plugin card to identify the last lifecycle boundary Phials
reached. Do not begin by deleting plugin data: settings, storage, and database
records are separate from discovery, module import, and most activation
failures.

## Read the installed state first

Open **Settings → Plugins → Community plugins → Installed** and locate the
plugin.

| Visible symptom | Likely cause | Next action | Expected result |
| --- | --- | --- | --- |
| The plugin is not listed | The installed release is missing, in the wrong plugin-ID directory, or has an invalid manifest | Rebuild, validate, and install the development release again | The plugin appears in Installed without needing to enable it |
| The plugin is listed but cannot be enabled | Community plugin safe mode is on, the release is incompatible, or permissions need review | Read the status on the card and resolve only that status | The enable control becomes available |
| The card says **Permissions need review** | This is the first installation or the manifest permission set differs from the last approved set | Review the complete requested set, then approve or deny it | Approval clears the review state and allows activation |
| The card says the release is incompatible | `minAppVersion` or `pluginApiVersion` does not match the running Phials build | Test with a compatible Phials build or update the plugin to the supported SDK contract | The compatibility warning clears without weakening an accurate declaration |
| The card says **Activation failed** | Module import, exported plugin identity, registration, or activation code failed | Preserve the exact error and continue with the checks below | Reload completes and the card shows Enabled without an activation error |

An **enabled** preference is not proof of activation. Safe mode, permission
review, incompatibility, or a load or activation failure can still prevent the
plugin's capabilities from running.

## Validate the installed release

From the plugin project:

```bash
npm run check
npm run build
npm run validate
```

Validation should confirm that the release contains:

```text
dist/
├── main.js
├── manifest.json
└── styles.css  # optional
```

`main.js` and `manifest.json` are required. `main.js` must be a loadable ES
module with a default export. All runtime dependencies must be included in the
release output; imports that still point to source files, package-manager
directories, or undeclared release files will work in an authoring environment
but fail when Phials imports the installed `main.js`.

Install the validated release:

```bash
npm run dev:install
```

If you use an isolated Phials Home, pass the same absolute path used to launch
Phials:

```bash
npm run dev:install -- --phials-home /absolute/path/to/phials-plugin-dev
```

The expected result is an Installed card for the version and identity shown in
`dist/manifest.json`.

## Verify one identity across the release

The following values must identify the same plugin:

- the `id` and `version` in `dist/manifest.json`;
- the `id` and `version` on the default-exported [PhialsPlugin](../../reference/sdk-type-reference/PhialsPlugin.md);
- the directory selected by the development install command; and
- the identity intended by the package's manifest synchronization settings.

Use a stable lowercase ID such as `com.example.review-tools`. Do not repair a
mismatch by renaming only the installed directory: correct the source identity,
rebuild, validate, and reinstall so the next release remains consistent.

If the plugin appears under the correct name and version after reinstalling,
discovery and manifest parsing succeeded. Continue only if enabling or
activation still fails.

## Resolve compatibility, safe mode, and permission review

Work from the status visible on the card:

1. If community plugin safe mode is on, turn it off only in the Phials Home
   where you intend to test trusted development code.
2. If runtime compatibility fails, compare the running Phials version with
   `minAppVersion` and its supported contract with `pluginApiVersion`.
3. If permissions need review, confirm every requested permission is required
   by an actual operation, then approve the current set.
4. Enable the plugin.

Do not lower `minAppVersion`, use an older `pluginApiVersion`, or remove a
permission only to clear a warning when the code still relies on the newer
contract or gated operation. The expected result is a valid declaration and an
approved release, not merely an enabled toggle.

See [Declare Phials and Plugin API compatibility](../../package-and-publish/configure-the-plugin-manifest/declare-phials-and-plugin-api-compatibility.md)
and [Request the least plugin permissions](../../package-and-publish/configure-the-plugin-manifest/request-the-least-plugin-permissions.md).

## Isolate module import and activation

When the card shows **Activation failed**, copy the exact error before another
reload. Classify it by the earliest failed boundary:

- **Import or dependency error:** make the production build self-contained and
  rerun `npm run validate`.
- **Missing default export:** default-export a plugin factory or
  [PhialsPlugin](../../reference/sdk-type-reference/PhialsPlugin.md) definition.
- **Plugin identity mismatch:** regenerate the release and runtime definition
  from `src/plugin.manifest.ts`; confirm package version, manifest, exported
  definition, release tag, registry entry, and candidate checksum agree.
- **Stable-ID collision:** change the new provider, command, view, module, event,
  or theme ID; Phials does not replace the existing owner.
- **Provider registration error:** temporarily retain one known-good provider,
  then restore providers one at a time.
- **Activation-hook error:** make `onActivate` bind the supplied [PluginAPI](../../reference/sdk-type-reference/PluginAPI.md) and
  return without starting optional work. Restore settings reads,
  subscriptions, watches, and other startup tasks one at a time.

Keep the reduced plugin useful enough to prove activation. A command that shows
a notification is a good probe because it confirms both provider registration
and access to the activated Plugin API.

After each change:

```bash
npm run check
npm run build
npm run validate
npm run dev:install
```

Then choose **Reload** on the installed plugin card. A plugin reload is the
defined before-reload, deactivation, activation, and after-reload lifecycle; it
is not the build itself or a page refresh.

The failure is resolved when the card has no activation error, the activation
signal runs, and one provider capability is visible or executable. Restore the
remaining startup work incrementally so the first change that reintroduces the
failure identifies the owner.
