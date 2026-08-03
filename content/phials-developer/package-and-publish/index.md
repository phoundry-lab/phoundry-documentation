---
title: "Package and publish"
description: "Configure, package, publish, and maintain community plugin releases."
ai_disclosure: true
---

# Package and publish

Phials installs a plugin from the matching release artifacts attached to a versioned GitHub release. The community registry identifies the repository; it is not the plugin package itself.

- [Configure the plugin manifest](./configure-the-plugin-manifest/index.md) defines identity, public metadata, compatibility, permissions, and validation.
- [Prepare a release](./prepare-a-release/index.md) aligns versions, builds the complete artifact set, documents changes, and applies the release gate.
- [Publish your plugin](./publish-your-plugin/index.md) publishes a GitHub release, submits the registry entry, and verifies the same installation path users receive.
- [Maintain a published plugin](./maintain-a-published-plugin/index.md) covers upgrades, permission and compatibility changes, data migrations, broken releases, ownership, and unlisting.

Keep `manifest.json`, `main.js`, optional `styles.css`, and any supported theme assets from one build together. A release is complete only when its identity and version agree across every artifact.
