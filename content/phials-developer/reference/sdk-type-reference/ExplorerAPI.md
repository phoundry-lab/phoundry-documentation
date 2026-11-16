---
title: "ExplorerAPI"
description: "TypeScript signature and members for the ExplorerAPI public SDK declaration."
ai_disclosure: true
order: 26
aliases:
  - references/ExplorerAPI
---

# ExplorerAPI

**Since Plugin API:** `1.0.0`

## Signature

```typescript
interface ExplorerAPI {
    readonly views: readonly PluginViewDescriptor[];
    getActivePane(): PluginPaneContext | null;
    getPane(id: string): PluginPaneContext | null;
}
```

## Members

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `views` | `readonly PluginViewDescriptor[]` | yes | Reactive, host-ordered metadata for all registered views, including custom views. |
| `getActivePane` | `() => `[`PluginPaneContext`](PluginPaneContext.md)` &#124; null` | yes | - |
| `getPane` | `(id: string) => `[`PluginPaneContext`](PluginPaneContext.md)` &#124; null` | yes | - |
