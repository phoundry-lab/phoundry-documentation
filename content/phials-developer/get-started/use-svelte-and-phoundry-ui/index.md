---
title: "Use Svelte and Phoundry UI"
description: "Build responsive, accessible plugin interfaces with the supported Svelte and Phoundry UI stack."
ai_disclosure: true
aliases:
  - overview/svelte-and-phoundry-ui
---

# Use Svelte and Phoundry UI

Svelte 5 and Phoundry UI are the recommended stack for plugin interfaces. The [plugin starter repo](../build-your-first-plugin/create-a-plugin-project-from-the-starter.md) already includes Svelte, TypeScript, Vite, Tailwind CSS, the synchronized public SDK, and the `phoundry-ui` package. Start there so your components use the same compilation and packaging contract that Phials expects.

Phials mounts a plugin component into several kinds of host-owned space:

- a responsive file viewer or editor
- a file thumbnail or toolbar contribution
- a file view
- a left, right, or bottom panel
- a center tab
- a custom plugin-settings interface

The public SDK declares the props for each surface. Your component owns its markup and local state; Phials owns when it is mounted, which props it receives, and where it appears. Build against those props instead of reading application globals or assuming a particular dock, tab, or window size.

## Recommended path

1. [Build plugin components with Svelte 5](build-plugin-components-with-svelte-5.md) to learn the component boundary, props, state, and cleanup patterns used by plugin capabilities.
2. [Use Phoundry UI components](use-phoundry-ui-components.md) for controls that should match Phials interaction and accessibility behavior.
3. [Style and theme plugin interfaces](style-and-theme-plugin-interfaces.md) with scoped styles, semantic theme tokens, and the starter’s CSS pipeline.
4. [Design responsive and accessible plugin surfaces](design-responsive-and-accessible-plugin-surfaces.md) for narrow panels, wide center tabs, keyboard use, focus, and assistive technology.

These articles explain the Phials-specific working contract rather than general Svelte development. The [Svelte documentation](https://svelte.dev/docs/svelte/overview) remains the source for the language and framework as a whole.

## Before adding a component

Choose the plugin capability first. Its provider contract determines the component props and lifecycle:

- [Build file viewers and editors](../../add-capabilities/build-file-viewers-and-editors/index.md)
- [Build file views](../../add-capabilities/build-file-views/index.md)
- [Add panels and tabs](../../add-capabilities/add-panels-and-tabs/index.md)
- [Build a custom settings interface](../../add-capabilities/add-plugin-settings/build-a-custom-settings-interface.md)

Use one component in more than one placement only when it responds to its container and every placement has the same interaction semantics. A file surface, for example, can appear in different host destinations, while a panel or tab component receives a different public props contract.
