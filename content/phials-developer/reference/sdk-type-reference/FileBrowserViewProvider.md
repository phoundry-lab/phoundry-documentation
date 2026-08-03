---
title: "FileBrowserViewProvider"
description: "TypeScript signature and members for the FileBrowserViewProvider public SDK declaration."
ai_disclosure: true
order: 29
aliases:
  - references/FileBrowserViewProvider
---

# FileBrowserViewProvider

**Since Plugin API:** `1.0.0`

File browser view provider - provides custom view modes

## Signature

```typescript
interface FileBrowserViewProvider {
    type: "view";
    id: string;
    name: string;
    priority: number;
    icon: string;
    component: import("svelte").Component<FileBrowserViewProps>;
    columns?: ViewColumnDefinition[];
    collectionOnly?: boolean;
    defaultItemSizePreset?: ViewItemSizePreset;
    getConfigurationItems?: (pane: PluginPaneContext, api: ViewAPI) => import("phoundry-ui").MenuItem[];
}
```

## Members

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `type` | `"view"` | yes | - |
| `id` | `string` | yes | - |
| `name` | `string` | yes | - |
| `priority` | `number` | yes | Sort order when listing views (lower appears first). Built-in views use 1–6; extension views should use higher numbers. |
| `icon` | `string` | yes | Icon for view switcher |
| `component` | `import("svelte").Component<`[`FileBrowserViewProps`](FileBrowserViewProps.md)`>` | yes | View component |
| `columns` | [`ViewColumnDefinition`](ViewColumnDefinition.md)`[]` | no | Optional: custom column configuration for this view |
| `collectionOnly` | `boolean` | no | If true, this view is only available in collections (vials) |
| `defaultItemSizePreset` | [`ViewItemSizePreset`](ViewItemSizePreset.md) | no | Default item size when a folder has no per-folder override (`itemSize` null). Details family uses row-height ticks; thumbnails / gallery use grid ticks; Boards uses its column-width ticks. |
| `getConfigurationItems` | `(pane: `[`PluginPaneContext`](PluginPaneContext.md)`, api: `[`ViewAPI`](ViewAPI.md)`) => import("phoundry-ui").MenuItem[]` | no | Optional inline view configuration items (phoundry-ui menu row contract). `api` is scoped to the plugin that registered this view. |
