---
title: "ModuleProvider"
description: "TypeScript signature and members for the ModuleProvider public SDK declaration."
ai_disclosure: true
order: 56
aliases:
  - references/ModuleProvider
---

# ModuleProvider

**Since Plugin API:** `1.0.0`

Module provider - provides a UI module for panels and center tab groups

Modules are self-contained UI components like Navigator, File Preview,
or Terminal that can be arranged in panel tabs or modular center groups.

## Signature

```typescript
interface ModuleProvider {
    type: "module";
    id: string;
    name: string;
    icon: string;
    allowedPositions?: ModulePosition[];
    defaultPosition?: ModulePosition;
    component: import("svelte").Component<ModuleProviderProps>;
    allowMultiple?: boolean;
    requiresRemount?: boolean;
    getDefaultState?: () => unknown;
    shortcut?: ItemShortcutConfig;
    getTabTitle?: (state?: unknown) => string;
    getTabIcon?: (state?: unknown) => string;
    getCenterTabIdentity?: (state?: unknown) => string | undefined;
    canReplaceCenterTab?: (currentState: unknown, requestedState: unknown) => boolean;
    finalizeCenterTab?: (moduleInstance: ModuleInstance) => Promise<boolean>;
    getTabBarMenuItems?: (moduleInstance: ModuleInstance, api: ModuleAPI) => import("phoundry-ui").MenuItem[];
}
```

## Members

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `type` | `"module"` | yes | - |
| `id` | `string` | yes | Unique module identifier (e.g., 'phials.module.navigator') |
| `name` | `string` | yes | Human-readable name for display |
| `icon` | `string` | yes | Icon for tabs and headers |
| `allowedPositions` | [`ModulePosition`](ModulePosition.md)`[]` | no | Positions where this module can be placed (default: all panels, not center) |
| `defaultPosition` | [`ModulePosition`](ModulePosition.md) | no | Default position for new instances |
| `component` | `import("svelte").Component<`[`ModuleProviderProps`](ModuleProviderProps.md)`>` | yes | The module component |
| `allowMultiple` | `boolean` | no | Whether multiple instances of this module are allowed (default: false) |
| `requiresRemount` | `boolean` | no | If true, the center host fully remounts the component when the remount key changes: `getCenterTabIdentity(state)` when defined, otherwise the module instance id. Needed for lifecycle-heavy modules (Terminal, Page, Preview) so **center tab replacement** reloads content when only state changes. Default: false. |
| `getDefaultState` | `() => unknown` | no | Default state for new module instances |
| `shortcut` | [`ItemShortcutConfig`](ItemShortcutConfig.md) | no | Keyboard shortcut to toggle/focus this module |
| `getTabTitle` | `(state?: unknown) => string` | no | Dynamic tab title when rendered in center (falls back to `name`) |
| `getTabIcon` | `(state?: unknown) => string` | no | Dynamic tab icon when rendered in center (falls back to `icon`) |
| `getCenterTabIdentity` | `(state?: unknown) => string &#124; undefined` | no | Stable content identity used to focus an equivalent center tab before creating one. |
| `canReplaceCenterTab` | `(currentState: unknown, requestedState: unknown) => boolean` | no | Opt in to same-type replacement of an active, unpinned center tab. |
| `finalizeCenterTab` | `(moduleInstance: `[`ModuleInstance`](ModuleInstance.md)`) => Promise<boolean>` | no | Finalize or refuse unresolved state before close or center-tab replacement. |
| `getTabBarMenuItems` | `(moduleInstance: `[`ModuleInstance`](ModuleInstance.md)`, api: `[`ModuleAPI`](ModuleAPI.md)`) => import("phoundry-ui").MenuItem[]` | no | Optional panel module tab bar menu items (phoundry-ui context menu rows). |
