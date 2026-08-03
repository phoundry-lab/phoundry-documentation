---
title: "Maintain a published plugin"
description: "Update, migrate, recover, transfer, deprecate, or unlist a published plugin safely."
ai_disclosure: true
---

# Maintain a published plugin

Maintain one stable plugin identity while its code, permissions, compatibility requirements, and durable data evolve.

Most updates require only a newer verified GitHub release. The registry entry points Phials to the repository rather than to one version, so edit the registry only when its `name`, `author`, `description`, or `repo` changes.

## Choose the maintenance path

1. [Publish a plugin update](publish-a-plugin-update.md) for the normal upgrade path.
2. [Change permissions and compatibility safely](change-permissions-and-compatibility-safely.md) when the manifest’s permission set or runtime boundaries change.
3. [Migrate plugin settings and data](migrate-plugin-settings-and-data.md) before new code depends on a changed durable format.
4. [Recover from a broken release](recover-from-a-broken-release.md) when the latest public release is not a safe install source.
5. [Transfer, deprecate, or unlist a plugin](transfer-deprecate-or-unlist-a-plugin.md) when stewardship or registry availability changes.

## Preserve the contracts users already have

Across releases, keep these values stable unless you are deliberately creating a new plugin:

- plugin ID
- registry entry ID
- provider, command, setting, theme, and event IDs
- durable settings and data namespaces
- documented file formats and integration identifiers

The plugin version changes for every release. The minimum Phials version, Plugin API version, and requested permissions change only when the new implementation requires them.

An ID change is not an update. Phials treats it as a new plugin with separate installation state, permission approval, settings, storage, and database data.

## Verify maintenance from an existing installation

A clean installation proves only the new-release path. Every maintained release also needs an upgrade test from the previous public version:

```text
previous public release
→ representative settings and data
→ install latest release
→ permission or compatibility decision
→ migration
→ activation
→ restart
→ representative workflows
```

Keep the previous release available until the upgraded installation, activation, migration, and restart paths pass against the exact published artifacts.

## Use registry policy for governance

The registry repository owns the exact rules for ownership transfer, takedown, temporary removal, deprecation, and unlisting. This hub explains the plugin-author workflow and consequences; it does not replace the [community registry policy](https://github.com/EliWimmer/phials-plugins/blob/master/POLICY.md).

Unlisting affects discovery and future registry-based installs or updates. It does not disable, uninstall, or delete data from copies already installed by users.
