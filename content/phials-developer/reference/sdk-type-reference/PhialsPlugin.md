---
title: "PhialsPlugin"
description: "TypeScript signature and members for the PhialsPlugin public SDK declaration."
ai_disclosure: true
order: 65
aliases:
  - references/PhialsPlugin
---

# PhialsPlugin

**Since Plugin API:** `1.0.0`

A plugin is a container that can provide one or more providers.
Each provider type has its own interface and registration mechanism.

## Signature

```typescript
interface PhialsPlugin {
    id: string;
    name: string;
    version: string;
    settings?: PluginSettingsSchema;
    settingsComponent?: import("svelte").Component<PluginSettingsComponentProps>;
    database?: PluginDatabaseSchema;
    onActivate?: (api: PluginAPI) => void | Promise<void>;
    onDeactivate?: () => void | Promise<void>;
    onBeforeReload?: () => unknown | Promise<unknown>;
    onAfterReload?: (state: unknown) => void | Promise<void>;
    providers: PluginProvider[];
}
```

## Members

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `string` | yes | Unique plugin identifier (e.g., 'phials.terminal', 'vendor.preview-pdf') |
| `name` | `string` | yes | Human-readable name |
| `version` | `string` | yes | Plugin version (semver) |
| `settings` | [`PluginSettingsSchema`](PluginSettingsSchema.md) | no | Settings schema contributed by this plugin |
| `settingsComponent` | `import("svelte").Component<`[`PluginSettingsComponentProps`](PluginSettingsComponentProps.md)`>` | no | Custom settings UI for Settings → Plugins. When set, replaces the generic field loop; `settings` still supplies defaults and reset. |
| `database` | [`PluginDatabaseSchema`](PluginDatabaseSchema.md) | no | Database schema for plugin-owned SQL tables |
| `onActivate` | `(api: `[`PluginAPI`](PluginAPI.md)`) => void &#124; Promise<void>` | no | Called when the plugin is activated |
| `onDeactivate` | `() => void &#124; Promise<void>` | no | Called when the plugin is deactivated |
| `onBeforeReload` | `() => unknown &#124; Promise<unknown>` | no | Called before the plugin is reloaded. Return any state that should be preserved across the reload. |
| `onAfterReload` | `(state: unknown) => void &#124; Promise<void>` | no | Called after the plugin is reloaded. Receives the state that was returned from onBeforeReload. |
| `providers` | [`PluginProvider`](PluginProvider.md)`[]` | yes | Providers contributed by this plugin |
