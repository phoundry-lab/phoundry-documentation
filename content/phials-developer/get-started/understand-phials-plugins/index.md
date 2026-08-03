---
title: "Understand Phials plugins"
description: "Learn what plugins can add, how capabilities and providers relate, and where the public trust boundary sits."
ai_disclosure: true
aliases:
  - overview/overview
---

# Understand Phials plugins

A Phials plugin is one independently packaged addition that can contribute several capabilities to the app. It can add an action, teach Phials how to present or describe a file, introduce another Explorer view, add a panel or tab, or combine those pieces into one focused workflow.

Start here to build a reliable mental model before choosing an API:

- [What can plugins add to Phials?](./what-can-plugins-add-to-phials.md) surveys the author-visible capabilities and points to the guide for each one.
- [Understand plugins, capabilities, and providers](./understand-plugins-capabilities-and-providers.md) explains how one plugin definition owns the typed provider objects that register its capabilities.
- [Understand the plugin lifecycle](./understand-the-plugin-lifecycle.md) distinguishes installation, enablement, loading, activation, deactivation, and reload.
- [Understand the public SDK and trust boundary](./understand-the-public-sdk-and-trust-boundary.md) explains what plugin code can rely on and what permissions and safe mode do.

When those boundaries are clear, continue with [Build your first plugin](../build-your-first-plugin/index.md) for the shortest working path from the plugin starter to an activated development plugin.
