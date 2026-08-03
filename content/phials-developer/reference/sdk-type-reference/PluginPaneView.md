---
title: "PluginPaneView"
description: "TypeScript signature and members for the PluginPaneView public SDK declaration."
ai_disclosure: true
order: 94
aliases:
  - references/PluginPaneView
---

# PluginPaneView

**Since Plugin API:** `1.0.0`

## Signature

```typescript
interface PluginPaneView {
    readonly mode: string;
    readonly itemSize: number | null;
    readonly columns: readonly PluginPaneColumn[];
    readonly sorting: readonly PluginPaneSort[];
    readonly options: Readonly<Record<string, JsonValue>>;
}
```

## Members

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `mode` | `string` | yes | - |
| `itemSize` | `number &#124; null` | yes | - |
| `columns` | `readonly `[`PluginPaneColumn`](PluginPaneColumn.md)`[]` | yes | - |
| `sorting` | `readonly `[`PluginPaneSort`](PluginPaneSort.md)`[]` | yes | - |
| `options` | `Readonly<Record<string, `[`JsonValue`](JsonValue.md)`>>` | yes | - |
