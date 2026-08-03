---
title: "Add panels and tabs"
description: "Add panel and center-tab interfaces with stable identity, persisted state, and safe finalization."
ai_disclosure: true
aliases:
  - types/module
---

# Add panels and tabs

A panel or center-tab capability gives a plugin a persistent place for an interactive Svelte interface. You define the interface once with a [ModuleProvider](../../reference/sdk-type-reference/ModuleProvider.md), then declare where Phials may place it: the Left Dock, Right Dock, Bottom Dock, center tabs, or a combination of them.

Phials owns the surrounding dock and tab chrome. Your provider owns the module's component, opaque state, content identity, and any unresolved work. When a user moves a module between an allowed dock and a center tab, Phials preserves the same module instance ID and state.

This hub follows the complete module workflow:

1. [Define and place a panel or tab](./define-and-place-a-panel-or-tab.md) with a [ModuleProvider](../../reference/sdk-type-reference/ModuleProvider.md) and explicit placement capabilities.
2. [Manage instances and persisted state](./manage-instances-and-persisted-state.md) across surface unmounts, moves, and session restore.
3. [Open or focus center tabs](./open-or-focus-center-tabs.md) through the typed modules API.
4. [Identify and replace center tabs](./identify-and-replace-center-tabs.md) without duplicating equivalent content or overwriting unresolved work.
5. [Finalize unsaved work before close or replacement](./finalize-unsaved-work-before-close-or-replacement.md) with a provider-owned finalization guard.
6. [Add titles, icons, shortcuts, and tab menus](./add-titles-icons-shortcuts-and-tab-menus.md) that stay synchronized with module state.

## Choose placements by workflow

| Placement | Best for |
| --- | --- |
| `"left"` | Navigation, sources, and compact lists that support the main task. |
| `"right"` | Inspectors, properties, outlines, and contextual details. |
| `"bottom"` | Wide supporting tools such as logs, consoles, and queues. |
| `"center"` | Primary work that benefits from a named tab, splitting, pinning, and session restore. |

A provider may support several placements when the same responsive interface is useful in each. Do not register separate providers merely to put the same capability in a dock and the center. Restrict `allowedPositions` when a surface cannot remain useful at a destination's practical size or when moving it would change its meaning.

## Provider and instance responsibilities

[ModuleProvider](../../reference/sdk-type-reference/ModuleProvider.md) describes a capability and is registered once when the plugin is activated. A [ModuleInstance](../../reference/sdk-type-reference/ModuleInstance.md) is one placed occurrence of that capability.

The distinction matters:

- The provider ID identifies the module type.
- The instance ID identifies one logical occurrence through moves and remounts.
- Instance `state` is plugin-owned, serializable data that Phials preserves.
- Center-tab identity identifies the content represented by an instance, such as a project root or database record.
- The mounted Svelte component is only the current surface. It may be destroyed while the instance and its state continue to exist.

The examples in this hub build a project-notes module. Each center tab represents one project, while its draft and presentation preferences remain in instance state.

For generated signatures, see [ModuleProvider](../../reference/sdk-type-reference/ModuleProvider.md), [`ModuleProviderProps`](../../reference/sdk-type-reference/ModuleProviderProps.md), and [`ModulesAPI`](../../reference/sdk-type-reference/ModulesAPI.md).
