---
title: "Phials plugin documentation"
description: "Build, test, package, publish, and maintain plugins for Phials."
ai_disclosure: true
aliases:
  - plugins
---

# Phials plugin documentation

Build plugins that add focused capabilities to Phials, from commands and file views to editors, panels, metadata, and themes. The public SDK gives your plugin typed registration contracts, runtime services, validation tools, and generated API reference.

Start with the plugin starter if you are building your first plugin. If you already have a project, go directly to the capability or workflow you need.

- [Get started](./get-started/index.md) explains the plugin model, walks through a first working plugin, and introduces Svelte 5 and Phoundry UI.
- [Add capabilities](./add-capabilities/index.md) covers commands, file viewing and editing, metadata, file views, panels and tabs, settings, and themes.
- [Work with Phials](./work-with-phials/index.md) covers files, Explorer context, durable data, events, dialogs, and notifications.
- [Test and troubleshoot](./test-and-troubleshoot/index.md) establishes a repeatable local workflow, validation strategy, and symptom-driven recovery path.
- [Package and publish](./package-and-publish/index.md) covers manifests, release artifacts, the community registry, and ongoing maintenance.
- [Reference](./reference/index.md) defines compatibility, lifecycle, permissions, events, and the generated public SDK surface.

Community plugins run as trusted JavaScript in the Phials renderer. Permissions gate supported Plugin API operations, but they are not a JavaScript sandbox. Review the [community plugin trust model](./reference/plugin-contract-and-compatibility/community-plugin-trust-model.md) before you publish a plugin that handles sensitive files or data.
