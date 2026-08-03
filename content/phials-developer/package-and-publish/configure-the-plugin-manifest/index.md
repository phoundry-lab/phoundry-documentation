---
title: "Configure the plugin manifest"
description: "Define plugin identity, compatibility, permissions, and valid public metadata."
ai_disclosure: true
---

# Configure the plugin manifest

Every plugin release includes `manifest.json`. Phials reads it before importing plugin JavaScript, so the manifest must describe the release accurately without running any plugin code.

The manifest owns:

- permanent plugin identity
- user-facing name, author, and description
- release version
- minimum Phials version
- targeted Plugin API version
- requested plugin permissions
- public links and preload icons

It does not register capabilities or contain plugin settings. Those belong to the default [PhialsPlugin](../../reference/sdk-type-reference/PhialsPlugin.md) export.

## Start from the plugin starter

Keep the authored manifest at:

```text
public/manifest.json
```

The starter build validates it, synchronizes the release version, and writes:

```text
dist/manifest.json
```

Edit the source manifest and package metadata. Never patch `dist/manifest.json` by hand.

## Configure it in order

1. [Create and synchronize a plugin manifest](create-and-synchronize-a-plugin-manifest.md)
2. [Choose a stable plugin ID and public metadata](choose-a-stable-plugin-id-and-public-metadata.md)
3. [Declare Phials and Plugin API compatibility](declare-phials-and-plugin-api-compatibility.md)
4. [Request the least plugin permissions](request-the-least-plugin-permissions.md)
5. [Validate a plugin manifest](validate-a-plugin-manifest.md)

## A complete small manifest

```json
{
  "id": "acme.review-tools",
  "name": "Review Tools",
  "version": "1.2.0",
  "minAppVersion": "1.4.0",
  "pluginApiVersion": "1.0.0",
  "author": "Acme",
  "description": "Adds review commands and file annotations.",
  "authorUrl": "https://acme.example",
  "repository": "https://github.com/acme/review-tools",
  "icons": [
    "phoundry-mono:check",
    "phoundry-mono:circle-info"
  ],
  "permissions": [
    "filesystem.write"
  ]
}
```

Every field has one job. Do not add provider declarations, arbitrary configuration, release notes, or undocumented metadata.

## Keep the release identities aligned

One release has one identity and version across:

```text
package.json
public/manifest.json
dist/manifest.json
default PhialsPlugin export
installed directory name
release tag and assets
```

The plugin ID is permanent. The version changes for releases. A mismatch is a validation or load failure, not a migration mechanism.

## Use the reference for exact lookup

These task articles explain how to make decisions. Use [Plugin manifest field reference](../../reference/manifest-and-permissions-reference/plugin-manifest-field-reference.md) for the exhaustive field schema and [Plugin permission reference](../../reference/manifest-and-permissions-reference/plugin-permission-reference.md) for exact permission names.

For the broader runtime boundary, see [Version and compatibility reference](../../reference/plugin-contract-and-compatibility/version-and-compatibility-reference.md) and [Community plugin trust model](../../reference/plugin-contract-and-compatibility/community-plugin-trust-model.md).
