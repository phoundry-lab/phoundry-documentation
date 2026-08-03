---
title: "Publish your plugin"
description: "Publish a GitHub release, submit a registry entry, and verify the public installation."
ai_disclosure: true
---

# Publish your plugin

Publish the exact verified release artifacts, make the repository discoverable
through the community registry, then install through the same public path a
user receives. These are separate gates:

1. A **plugin release** gives Phials one versioned set of installable files.
2. A **registry entry** gives Phials the plugin ID and GitHub repository to
   discover.
3. A published-installation test proves the registry and latest-release chain
   resolves to an activated plugin.

The registry does not host release files and does not duplicate manifest
metadata. Phials resolves the registry entry's repository, requests its latest
stable GitHub release, and installs the exact supported assets from that
release.

## Before you publish

Complete [Prepare a release](../prepare-a-release/index.md) first. You should
have:

- one clean release commit and semantic plugin version;
- matching package, manifest, exported plugin, tag, and release versions;
- a validated `manifest.json` and `main.js`;
- supported optional `styles.css` and theme assets when needed;
- release notes that explain permission, compatibility, settings, and data
  consequences; and
- an artifact inventory with filenames, byte sizes, and SHA-256 checksums.

If any artifact changes after that gate, rebuild and verify a new candidate
before publication.

## Publish in order

1. [Publish a GitHub release](./publish-a-github-release.md) from the verified
   release commit and attach the exact candidate files.
2. [Submit your plugin to the community registry](./submit-your-plugin-to-the-community-registry.md)
   with the permanent plugin ID and owning repository.
3. [Verify the published installation](./verify-the-published-installation.md)
   in a clean Phials Home after the registry change reaches its default branch.

For a plugin already in the registry, publish the new GitHub release and verify
the upgrade. Change the registry entry only when its allowed discovery metadata
or repository ownership changes.

## Publication outcome

Publication is complete only when a clean Phials profile can find the registry
entry, install the intended latest stable release, review its declared
permissions, activate it on a compatible build, and exercise every advertised
plugin capability.

A GitHub release page, a merged registry pull request, or an Enabled badge alone
does not prove that complete path.
