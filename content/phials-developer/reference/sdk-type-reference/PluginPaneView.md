---
title: "PluginPaneView"
description: "TypeScript signature and members for the PluginPaneView public SDK declaration."
ai_disclosure: true
order: 99
aliases:
  - references/PluginPaneView
---

# PluginPaneView

**Since Plugin API:** `1.0.0`

## Signature

```typescript
interface PluginPaneView {
    readonly availableViews: readonly PluginViewDescriptor[];
    readonly mode: string;
    setMode(viewId: string): void;
    readonly itemSize: number | null;
    readonly columns: readonly PluginPaneColumn[];
    readonly sorting: readonly PluginPaneSort[];
    readonly options: Readonly<Record<string, JsonValue>>;
}
```

## Members

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `availableViews` | `readonly PluginViewDescriptor[]` | yes | Reactive, host-ordered choices for this pane; picker panes only offer Details. |
| `mode` | `string` | yes | - |
| `setMode` | `(viewId: string) => void` | yes | Activate an exact registered view ID, including custom views. Throws without mutation if unknown or unavailable for this pane. Non-details requests in picker mode and selecting the current view are no-ops. |
| `itemSize` | `number &#124; null` | yes | - |
| `columns` | `readonly `[`PluginPaneColumn`](PluginPaneColumn.md)`[]` | yes | - |
| `sorting` | `readonly `[`PluginPaneSort`](PluginPaneSort.md)`[]` | yes | - |
| `options` | `Readonly<Record<string, `[`JsonValue`](JsonValue.md)`>>` | yes | - |
